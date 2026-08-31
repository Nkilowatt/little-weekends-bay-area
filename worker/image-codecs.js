import jpegDecoderFactory from "./image-codecs-vendor/jpeg/codec/dec/mozjpeg_dec.js";
import jpegDecoderWasm from "./image-codecs-vendor/jpeg/codec/dec/mozjpeg_dec.wasm";
import { initEmscriptenModule } from "./image-codecs-vendor/jpeg/utils.js";
import initPng, { decode as decodePngBytes } from "./image-codecs-vendor/png/codec/pkg/squoosh_png.js";
import pngDecoderWasm from "./image-codecs-vendor/png/codec/pkg/squoosh_png_bg.wasm";
import initResize, { resize as resizePixels } from "./image-codecs-vendor/resize/lib/resize/pkg/squoosh_resize.js";
import resizeWasm from "./image-codecs-vendor/resize/lib/resize/pkg/squoosh_resize_bg.wasm";
import webpDecoderFactory from "./image-codecs-vendor/webp/codec/dec/webp_dec.js";
import webpDecoderWasm from "./image-codecs-vendor/webp/codec/dec/webp_dec.wasm";
import webpEncoderFactory from "./image-codecs-vendor/webp/codec/enc/webp_enc_simd.js";
import webpEncoderWasm from "./image-codecs-vendor/webp/codec/enc/webp_enc_simd.wasm";

const MAX_DECODED_PIXELS = 20_000_000;
const WEBP_OPTIONS = {
  quality: 82,
  target_size: 0,
  target_PSNR: 0,
  method: 4,
  sns_strength: 50,
  filter_strength: 60,
  filter_sharpness: 0,
  filter_type: 1,
  partitions: 0,
  segments: 4,
  pass: 1,
  show_compressed: 0,
  preprocessing: 0,
  autofilter: 0,
  partition_limit: 0,
  alpha_compression: 1,
  alpha_filtering: 1,
  alpha_quality: 100,
  lossless: 0,
  exact: 0,
  image_hint: 0,
  emulate_jpeg_size: 0,
  thread_level: 0,
  low_memory: 0,
  near_lossless: 100,
  use_delta_palette: 0,
  use_sharp_yuv: 0,
};

if (!globalThis.ImageData) {
  globalThis.ImageData = class ImageData {
    constructor(data, width, height) {
      this.data = data;
      this.width = width;
      this.height = height;
    }
  };
}

let codecModulesPromise;

function codecModules() {
  if (!codecModulesPromise) {
    initPng(pngDecoderWasm);
    initResize(resizeWasm);
    codecModulesPromise = Promise.all([
      initEmscriptenModule(jpegDecoderFactory, jpegDecoderWasm),
      initEmscriptenModule(webpDecoderFactory, webpDecoderWasm),
      initEmscriptenModule(webpEncoderFactory, webpEncoderWasm),
    ]).then(([jpegDecoder, webpDecoder, webpEncoder]) => ({ jpegDecoder, webpDecoder, webpEncoder }));
  }
  return codecModulesPromise;
}

function exactArrayBuffer(bytes) {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
}

function validateDecodedImage(image) {
  const width = Number(image?.width);
  const height = Number(image?.height);
  const pixelCount = width * height;
  if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1
    || !Number.isSafeInteger(pixelCount) || pixelCount > MAX_DECODED_PIXELS
    || !image?.data || image.data.byteLength !== pixelCount * 4) {
    throw new Error("INVALID_IMAGE");
  }
  return { data: new Uint8ClampedArray(image.data), width, height };
}

async function decodeImage(bytes, contentType, modules) {
  const buffer = exactArrayBuffer(bytes);
  if (contentType === "image/jpeg") return modules.jpegDecoder.decode(buffer, false);
  if (contentType === "image/png") {
    await initPng(pngDecoderWasm);
    return decodePngBytes(new Uint8Array(buffer));
  }
  if (contentType === "image/webp") return modules.webpDecoder.decode(buffer);
  throw new Error("UNSUPPORTED_TYPE");
}

async function resizeToFit(image, maxDimension) {
  const scale = Math.min(1, maxDimension / image.width, maxDimension / image.height);
  if (scale === 1) return image;
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));
  await initResize(resizeWasm);
  const resized = resizePixels(
    new Uint8Array(image.data.buffer, image.data.byteOffset, image.data.byteLength),
    image.width,
    image.height,
    width,
    height,
    3,
    true,
    true,
  );
  return { data: new Uint8ClampedArray(resized), width, height };
}

export async function reencodeImage(bytes, contentType, options = {}) {
  const modules = await codecModules();
  const decoded = validateDecodedImage(await decodeImage(bytes, contentType, modules));
  const resized = await resizeToFit(decoded, Number(options.maxDimension) || 1600);
  const encoded = modules.webpEncoder.encode(resized.data, resized.width, resized.height, {
    ...WEBP_OPTIONS,
    quality: Number(options.quality) || WEBP_OPTIONS.quality,
  });
  if (!encoded?.byteLength) throw new Error("INVALID_IMAGE");
  return exactArrayBuffer(encoded);
}

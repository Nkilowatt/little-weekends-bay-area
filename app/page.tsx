import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";

const source = readFileSync(join(process.cwd(), "index.html"), "utf8");
const evergreenScript = readFileSync(join(process.cwd(), "evergreen-outings.js"), "utf8");
const parkExpansionScript = readFileSync(join(process.cwd(), "park-expansion.js"), "utf8");
const planningScript = readFileSync(join(process.cwd(), "planning.js"), "utf8");
const appScript = readFileSync(join(process.cwd(), "app.js"), "utf8");
const appMarkup = source
  .match(/<body>([\s\S]*?)<script src="evergreen-outings\.js\?v=\d+"><\/script>[\s\S]*?<script src="app\.js\?v=\d+"><\/script>[\s\S]*?<\/body>/)?.[1]
  ?.trim();

export default function Home() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: appMarkup || "" }} />
      <Script
        id="little-weekends-evergreen"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: evergreenScript }}
      />
      <Script
        id="little-weekends-park-expansion"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: parkExpansionScript }}
      />
      <Script
        id="little-weekends-planning"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: planningScript }}
      />
      <Script
        id="little-weekends-app"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: appScript }}
      />
    </>
  );
}

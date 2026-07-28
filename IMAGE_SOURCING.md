# 실제 장소 이미지 수집

Little Weekends는 장소 사진을 로컬 자산으로 보관하고 `place-images.js`에서 장소 ID, 저작자, 라이선스, 원본 링크를 함께 관리한다. 등록된 사진이 없거나 로드에 실패하면 기존 카테고리 사진을 `활동 예시`로 표시해 사용한다.

## 허용 소스

- 우선: 직접 촬영했거나 장소 운영자로부터 사용 허가를 받은 사진
- 오픈 라이선스: Wikimedia Commons, Wikidata의 P18 이미지, Openverse에서 발견한 CC0·CC BY·CC BY-SA 이미지
- Openverse 결과는 검색 인덱스이므로 원본 페이지에서 장소와 라이선스를 다시 확인해야 한다.
- 일반 홈페이지, 블로그, 검색 결과 썸네일은 공개되어 있다는 이유만으로 복사하지 않는다.

## 후보 검색

```sh
npm run images:audit
```

기본적으로 아직 사진이 없는 장소를 Wikimedia Commons와 Openverse에서 검색한다. 결과에는 장소명, 도시, 좌표, 이미지 크기를 바탕으로 한 점수와 `high`·`review`·`low` 검수 등급이 포함된다.

특정 장소나 소스만 확인할 수도 있다.

```sh
npm run images:audit -- --ids=sonoma-traintown,childrens-fairyland
npm run images:audit -- --providers=commons --output=/tmp/place-image-audit.json
```

## 반영 기준

1. 사진이 카탈로그의 정확한 장소를 보여주는지 원본 페이지와 화면으로 확인한다.
2. 동명 장소, 행사 참가자 위주 사진, 시설을 알아보기 어려운 사진은 제외한다.
3. 상업적 사용과 수정이 가능한 CC0, CC BY, CC BY-SA만 사용한다.
4. 저작자, 라이선스 URL, Commons 페이지 ID, 확인 날짜를 `place-images.js`에 기록한다.
5. 긴 변 기준 960px 정도로 최적화한 로컬 JPG 또는 WebP를 `assets/places/`에 둔다.
6. `npm test`로 레지스트리 연결, 라이선스 메타데이터, 실제 파일 존재 여부를 확인한다.

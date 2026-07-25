(() => {
  const reviewedAt = "2026-07-25";
  const sources = {
    sf: ["https://sfrecpark.org/Facilities", "San Francisco Recreation and Parks"],
    sanMateo: ["https://www.cityofsanmateo.org/3318/Parks-and-Picnic-Areas", "City of San Mateo"],
    redwoodCity: ["https://www.redwoodcity.org/departments/parks-recreation-and-community-services/parks/park-locations/-sortd-asc/-sortn-FCName", "City of Redwood City"],
    menloBurgess: ["https://www.menlopark.gov/Parks/Burgess-Park", "City of Menlo Park"],
    menloHamilton: ["https://www.menlopark.gov/Parks/Hamilton-Park", "City of Menlo Park"],
    menloTinker: ["https://www.menlopark.gov/Parks/Tinker-Park", "City of Menlo Park"],
    menloWillowOaks: ["https://www.menlopark.gov/Parks/Willow-Oaks-Park-and-Dog-Park", "City of Menlo Park"],
    paloAlto: ["https://www.paloalto.gov/Departments/Community-Services/Parks-Open-Space-Golf-Division/Neighborhood-Parks", "City of Palo Alto"],
    mountainView: ["https://www.mountainview.gov/our-city/departments/community-services/parks-and-trails/parks/city-parks", "City of Mountain View"],
    sunnyvale: ["https://www.sunnyvale.ca.gov/recreation-and-community/parks-and-trails/parks-and-facilities-map/parks-and-facilities-directory", "City of Sunnyvale"],
    cupertino: ["https://www.cupertino.gov/Your-City/Departments/Public-Works/Maintenance-Services/Park-and-Sport-Field-Maintenance", "City of Cupertino"],
    santaClara: ["https://www.santaclaraca.gov/our-city/departments-g-z/parks-recreation/parks-and-facilities", "City of Santa Clara"],
    campbell: ["https://www.campbellca.gov/Facilities", "City of Campbell"],
    losGatos: ["https://www.losgatosca.gov/DocumentCenter/View/1072/Recreation-Inventory--Reduced-File-Size?bidId=", "Town of Los Gatos"],
    vasona: ["https://parks.santaclaracounty.gov/locations/vasona-lake-county-park", "Santa Clara County Parks"],
    sanJose: ["https://www.sanjoseca.gov/your-government/departments-offices/parks-recreation-neighborhood-services/parks-trails/search-parks-playgrounds", "City of San José"],
    santaClaraCounty: ["https://parks.santaclaracounty.gov/things-do/other-activities/play-childrens-playgrounds", "Santa Clara County Parks"],
    oakland: ["https://www.oaklandca.gov/Community/Parks-Facilities", "City of Oakland"],
    dalyCity: ["https://www.dalycity.org/Facilities", "City of Daly City"],
    southSanFrancisco: ["https://www.ssf.net/files/assets/public/v/1/parks-and-recreation/documents/ssf20parks2020recreation20.pdf", "City of South San Francisco"],
    burlingame: ["https://www.burlingame.org/DocumentCenter/View/643/Chapter-7---Open-Space-Parks-and-Recreation-PDF", "City of Burlingame"],
    millbrae: ["https://www.ci.millbrae.ca.us/Facilities", "City of Millbrae"],
    fosterBoothbay: ["https://www.fostercity.org/facilities/facility/details/Boothbay-Park-19", "City of Foster City"],
    fosterEdgewater: ["https://www.fostercity.org/Facilities/Facility/Details/Edgewater-Park-14", "City of Foster City"],
    belmontTwinPines: ["https://www.belmont.gov/Home/Components/FacilityDirectory/FacilityDirectory/208/509", "City of Belmont"],
    belmontAlexander: ["https://www.belmont.gov/Home/Components/FacilityDirectory/FacilityDirectory/447/2194", "City of Belmont"],
    sanCarlos: ["https://www.cityofsancarlos.org/Document%20Center/City%20Hall/Policies/Picnic%20Reservations%20Policy.pdf", "City of San Carlos"],
    berkeley: ["https://berkeleyca.gov/community-recreation/parks-recreation/parks", "City of Berkeley"],
    alameda: ["https://www.alamedaca.gov/Departments/Recreation-Parks", "City of Alameda"],
    marin: ["https://www.parks.marincounty.gov/parkspreserves", "Marin County Parks"],
    larkspur: ["https://www.cityoflarkspur.org/645/Parks", "City of Larkspur"],
  };

  const parkingNotes = {
    lot: "공원 주차장을 이용할 수 있어요.",
    street: "인근 노상 주차를 이용하세요.",
    mixed: "공원 또는 인근 주차 공간을 이용할 수 있어요.",
    paid: "공원 주차는 유료이며 최신 요금을 출발 전에 확인하세요.",
  };

  const records = [
    // San Francisco
    ["sf-argonne-playground", "Argonne Playground", "San Francisco", "18th Avenue & Geary Boulevard, San Francisco, CA 94121", 37.7794183, -122.4777096, "sf", "작은 아이 구역과 큰아이 구역이 나뉘어 있어 형제자매와 함께 가기 좋아요.", ["연령별 놀이 구역", "피크닉", "화장실"], true, "street", true],
    ["sf-excelsior-playground", "Excelsior Playground", "San Francisco", "Russia Avenue & Madrid Street, San Francisco, CA 94112", 37.7202773, -122.4332826, "sf", "게이트가 있는 유아 구역과 모래 놀이가 있어 토들러가 머물기 좋아요.", ["유아 구역", "게이트", "모래 놀이"], true, "street", true],
    ["sf-rochambeau-playground", "Rochambeau Playground", "San Francisco", "238 25th Avenue, San Francisco, CA 94121", 37.7847802, -122.4845559, "sf", "두 높이의 놀이 공간과 유아용 모래 구역을 한곳에서 이용할 수 있어요.", ["유아 구역", "모래 놀이", "화장실"], true, "street", true],

    // San Mateo
    ["san-mateo-laurie-meadows-park", "Laurie Meadows Park", "San Mateo", "111 Laurie Meadows Park, San Mateo, CA 94403", 37.5327387, -122.2816338, "sanMateo", "놀이터와 잔디, 예약 없이 쓰는 피크닉 테이블이 있어 가벼운 나들이에 좋아요.", ["놀이터", "잔디", "피크닉"], false, "mixed", true],
    ["san-mateo-mariners-island-park", "Mariners Island Park", "San Mateo", "1550 Shoal Drive, San Mateo, CA 94404", 37.5630226, -122.2880903, "sanMateo", "놀이 구역 두 곳과 잔디, 피크닉 테이블이 있는 조용한 동네 공원이에요.", ["놀이터 2곳", "잔디", "화장실"], true, "mixed", true],

    // Redwood City
    ["redwood-city-maddux-park", "Maddux Park", "Redwood City", "Maddux Drive & Kensington Road, Redwood City, CA 94061", 37.4574058, -122.2359831, "redwoodCity", "토들러용 놀이 구역과 물놀이 요소가 있어 더운 날 짧게 놀기 좋아요.", ["유아 놀이터", "물놀이", "화장실"], true, "street", true],
    ["redwood-city-andrew-spinas-park", "Andrew Spinas Park", "Redwood City", "2nd Avenue & Bay Road, Redwood City, CA 94063", 37.4836731, -122.2011381, "redwoodCity", "놀이터와 계절 물놀이 요소를 함께 즐길 수 있는 동네 공원이에요.", ["놀이터", "물놀이", "잔디"], false, "street", true],
    ["redwood-city-marlin-park", "Marlin Park", "Redwood City", "Neptune Drive & Cringle Drive, Redwood City, CA 94065", 37.5302649, -122.249732, "redwoodCity", "Redwood Shores 산책 동선과 놀이터를 함께 묶기 좋은 넓은 공원이에요.", ["놀이터", "산책", "피크닉"], true, "mixed", true],
    ["redwood-city-stafford-park", "Stafford Park", "Redwood City", "King Street & Hopkins Avenue, Redwood City, CA 94062", 37.4820195, -122.2474931, "redwoodCity", "놀이 기구와 잔디, 계절 물놀이 구역이 가까이 모여 있어요.", ["놀이터", "물놀이", "화장실"], true, "street", true],

    // Menlo Park
    ["menlo-park-burgess-park", "Burgess Park", "Menlo Park", "701 Laurel Street, Menlo Park, CA 94025", 37.452312, -122.1762496, "menloBurgess", "놀이터와 넓은 잔디, 그늘, 화장실이 갖춰진 중심 공원이에요.", ["놀이터", "그늘", "화장실"], true, "lot", true],
    ["menlo-park-hamilton-park", "Hamilton Park", "Menlo Park", "531 Hamilton Avenue, Menlo Park, CA 94025", 37.4791089, -122.1595833, "menloHamilton", "놀이 구조물과 로프 오르기, 열린 잔디가 있어 활동량 많은 아이에게 좋아요.", ["놀이터", "로프 오르기", "그늘"], false, "street", true],
    ["menlo-park-tinker-park", "Tinker Park", "Menlo Park", "1550 Santa Cruz Avenue, Menlo Park, CA 94025", 37.440392, -122.1942578, "menloTinker", "펜스로 둘러진 작은 유아 놀이터라 토들러와 짧게 머물기 좋아요.", ["유아 놀이터", "펜스", "그늘"], false, "street", true],
    ["menlo-park-willow-oaks-park", "Willow Oaks Park", "Menlo Park", "490 Willow Road, Menlo Park, CA 94025", 37.4608274, -122.159212, "menloWillowOaks", "포용형 놀이 시설과 그늘, 화장실이 있어 여러 연령이 함께 가기 편해요.", ["포용형 놀이터", "그늘", "화장실"], true, "lot", true],

    // Palo Alto
    ["palo-alto-mitchell-park", "Mitchell Park", "Palo Alto", "600 East Meadow Drive, Palo Alto, CA 94306", 37.4211048, -122.1147444, "paloAlto", "여러 놀이 구역과 잔디, 도서관을 한 번에 이용할 수 있어 반나절 코스로 좋아요.", ["여러 놀이 구역", "도서관 근처", "화장실"], true, "lot", true],
    ["palo-alto-rinconada-park", "Rinconada Park", "Palo Alto", "777 Embarcadero Road, Palo Alto, CA 94301", 37.4435623, -122.1412101, "paloAlto", "연령별 놀이 공간과 넓은 녹지, 화장실을 이용할 수 있는 큰 공원이에요.", ["연령별 놀이 구역", "잔디", "화장실"], true, "lot", true],
    ["palo-alto-johnson-park", "Johnson Park", "Palo Alto", "Everett Avenue & Waverley Street, Palo Alto, CA 94301", 37.4493796, -122.1632428, "paloAlto", "도심 안에서 놀이터와 잔디를 가볍게 이용하기 좋은 동네 공원이에요.", ["놀이터", "잔디", "도심"], false, "street", true],
    ["palo-alto-peers-park", "Peers Park", "Palo Alto", "1899 Park Boulevard, Palo Alto, CA 94306", 37.4319704, -122.1472938, "paloAlto", "두 놀이 구역과 잔디, 화장실이 있어 형제자매가 함께 놀기 좋아요.", ["놀이터 2곳", "잔디", "화장실"], true, "street", true],

    // Mountain View
    ["mountain-view-cuesta-park", "Cuesta Park", "Mountain View", "615 Cuesta Drive, Mountain View, CA 94040", 37.3726018, -122.0820276, "mountainView", "넓은 잔디와 놀이터, 화장실이 있어 오래 머물기 좋은 큰 공원이에요.", ["놀이터", "넓은 잔디", "화장실"], true, "lot", true],
    ["mountain-view-bubb-park", "Bubb Park", "Mountain View", "680 Barbara Avenue, Mountain View, CA 94040", 37.3783267, -122.0833621, "mountainView", "물·모래 놀이 요소와 놀이터가 있어 감각 놀이를 좋아하는 아이에게 잘 맞아요.", ["물·모래 놀이", "놀이터", "화장실"], true, "street", true],
    ["mountain-view-mariposa-park", "Mariposa Park", "Mountain View", "305 Mariposa Avenue, Mountain View, CA 94041", 37.3957844, -122.08846, "mountainView", "그네와 물·모래 놀이 요소가 있는 작은 동네 공원이에요.", ["그네", "물·모래 놀이", "동네 공원"], false, "street", true],
    ["mountain-view-wyandotte-park", "Wyandotte Park", "Mountain View", "2254 Wyandotte Street, Mountain View, CA 94043", 37.4170263, -122.0954308, "mountainView", "놀이터와 물·모래 놀이 요소가 있어 짧은 오후 나들이에 좋아요.", ["놀이터", "물·모래 놀이", "잔디"], false, "street", true],

    // Sunnyvale
    ["sunnyvale-las-palmas-park", "Las Palmas Park", "Sunnyvale", "850 Russet Drive, Sunnyvale, CA 94087", 37.3647831, -122.0381534, "sunnyvale", "열대 섬 테마의 유아 놀이터와 잔디, 화장실을 갖춘 공원이에요.", ["유아 놀이터", "테마 놀이", "화장실"], true, "lot", true],
    ["sunnyvale-ortega-park", "Ortega Park", "Sunnyvale", "636 Harrow Way, Sunnyvale, CA 94087", 37.3421743, -122.0255669, "sunnyvale", "유아 놀이터와 피크닉 공간, 화장실이 가까워 가족 나들이에 편해요.", ["유아 놀이터", "피크닉", "화장실"], true, "lot", true],
    ["sunnyvale-seven-seas-park", "Seven Seas Park", "Sunnyvale", "1010 Morse Avenue, Sunnyvale, CA 94089", 37.3987218, -122.0161025, "sunnyvale", "바다·해적 테마 놀이터와 계절 물놀이가 있어 목적지형 나들이로 좋아요.", ["테마 놀이터", "물놀이", "화장실"], true, "lot", true],
    ["sunnyvale-washington-park", "Washington Park", "Sunnyvale", "840 West Washington Avenue, Sunnyvale, CA 94086", 37.3772136, -122.0405984, "sunnyvale", "두 놀이 구역과 유아 공간, 화장실을 이용할 수 있어요.", ["놀이터 2곳", "유아 구역", "화장실"], true, "lot", true],

    // Cupertino
    ["cupertino-memorial-park", "Memorial Park", "Cupertino", "21121 Stevens Creek Boulevard, Cupertino, CA 95014", 37.3249424, -122.0451172, "cupertino", "놀이터와 넓은 잔디, 피크닉 공간을 함께 이용하기 좋은 중심 공원이에요.", ["놀이터", "넓은 잔디", "피크닉"], true, "lot", true],
    ["cupertino-creekside-park", "Creekside Park", "Cupertino", "10455 Miller Avenue, Cupertino, CA 95014", 37.3162054, -122.0156259, "cupertino", "놀이터와 산책 동선, 잔디가 이어져 가볍게 움직이기 좋아요.", ["놀이터", "산책", "잔디"], true, "lot", true],
    ["cupertino-portal-park", "Portal Park", "Cupertino", "10225 North Portal Avenue, Cupertino, CA 95014", 37.3260047, -122.0205891, "cupertino", "동네 놀이터와 잔디를 짧고 편하게 이용할 수 있는 공원이에요.", ["놀이터", "잔디", "동네 공원"], false, "street", true],
    ["cupertino-linda-vista-park", "Linda Vista Park", "Cupertino", "11111 Linda Vista Drive, Cupertino, CA 95014", 37.3077049, -122.061658, "cupertino", "놀이터와 피크닉 공간, 완만한 산책 구간을 함께 즐길 수 있어요.", ["놀이터", "피크닉", "산책"], true, "lot", true],

    // Santa Clara
    ["santa-clara-bowers-park", "Bowers Park", "Santa Clara", "2582 Cabrillo Avenue, Santa Clara, CA 95051", 37.3584414, -121.973573, "santaClara", "놀이터와 잔디, 피크닉 공간이 가까이 있는 동네 공원이에요.", ["놀이터", "잔디", "피크닉"], true, "lot", true],
    ["santa-clara-bracher-park", "Bracher Park", "Santa Clara", "2560 Alhambra Drive, Santa Clara, CA 95051", 37.3694887, -121.9759234, "santaClara", "놀이터와 피크닉 공간, 화장실이 있어 가족이 머물기 편해요.", ["놀이터", "피크닉", "화장실"], true, "lot", true],
    ["santa-clara-fuller-street-park", "Fuller Street Park", "Santa Clara", "61 Fuller Street, Santa Clara, CA 95054", 37.397391, -121.9648278, "santaClara", "작은 놀이터와 잔디를 가볍게 이용하기 좋은 동네 공원이에요.", ["놀이터", "잔디", "동네 공원"], false, "street", true],
    ["santa-clara-fremont-park", "Fremont Park", "Santa Clara", "1303 Fremont Street, Santa Clara, CA 95050", 37.3503451, -121.9512423, "santaClara", "도심 가까이에서 놀이터와 잔디를 짧게 즐길 수 있어요.", ["놀이터", "잔디", "도심"], false, "street", true],

    // Campbell
    ["campbell-campbell-park", "Campbell Park", "Campbell", "Campbell Avenue & Gilman Avenue, Campbell, CA 95008", 37.2857039, -121.9393844, "campbell", "놀이터와 물놀이 요소, Los Gatos Creek Trail을 한 번에 즐길 수 있어요.", ["놀이터", "물놀이", "화장실"], true, "lot", true],
    ["campbell-jack-fischer-park", "Jack Fischer Park", "Campbell", "Abbott Avenue & Pollard Road, Campbell, CA 95008", 37.2660801, -121.9761156, "campbell", "어린아이 중심 놀이 시설과 물놀이 요소가 있어 토들러에게 잘 맞아요.", ["유아 친화", "물놀이", "화장실"], true, "lot", true],
    ["campbell-stojanovich-family-park", "Stojanovich Family Park", "Campbell", "316 Union Avenue, Campbell, CA 95008", 37.2822178, -121.9349009, "campbell", "어린아이용 놀이 시설과 화장실이 있는 작은 가족 공원이에요.", ["유아 친화", "놀이터", "화장실"], true, "street", true],
    ["campbell-virginia-park", "Virginia Park", "Campbell", "460 Virginia Avenue, Campbell, CA 95008", 37.280354, -121.962928, "campbell", "놀이터와 잔디, 화장실을 가까이 이용할 수 있는 동네 공원이에요.", ["놀이터", "잔디", "화장실"], true, "street", true],

    // Los Gatos
    ["los-gatos-blossom-hill-park", "Blossom Hill Park", "Los Gatos", "16300 Blossom Hill Road, Los Gatos, CA 95032", 37.2336803, -121.9549016, "losGatos", "놀이터와 넓은 잔디, 화장실이 있어 활동량 많은 아이와 가기 좋아요.", ["놀이터", "넓은 잔디", "화장실"], true, "lot", true],
    ["los-gatos-bachman-park", "Bachman Park", "Los Gatos", "500 Bachman Avenue, Los Gatos, CA 95030", 37.2291438, -121.9869214, "losGatos", "나무와 잔디가 있는 작은 놀이터라 조용한 동네 나들이에 좋아요.", ["놀이터", "그늘·나무", "잔디"], false, "street", true],
    ["los-gatos-live-oak-manor-park", "Live Oak Manor Park", "Los Gatos", "220 Carlton Avenue, Los Gatos, CA 95032", 37.2451869, -121.954384, "losGatos", "놀이터와 농구장, 피크닉 공간이 모여 있는 동네 공원이에요.", ["놀이터", "피크닉", "잔디"], false, "street", true],
    ["los-gatos-vasona-lake-county-park", "Vasona Lake County Park", "Los Gatos", "333 Blossom Hill Road, Los Gatos, CA 95032", 37.2409234, -121.9701093, "vasona", "놀이터와 호숫가 산책, 피크닉을 묶어 반나절 보내기 좋은 큰 공원이에요.", ["놀이터", "호숫가 산책", "화장실"], true, "paid", true],

    // San Jose
    ["san-jose-almaden-lake-regional-park", "Almaden Lake Regional Park", "San Jose", "6099 Winfield Boulevard, San Jose, CA 95120", 37.2377498, -121.8704499, "sanJose", "2-5세 놀이터 두 곳과 큰아이 놀이터, 산책로가 있어 연령이 다른 아이들과 가기 좋아요.", ["2-5세 놀이터", "산책", "화장실"], true, "paid", true],
    ["san-jose-hellyer-county-park", "Hellyer County Park", "San Jose", "985 Hellyer Avenue, San Jose, CA 95111", 37.2839188, -121.8129342, "santaClaraCounty", "놀이터와 넓은 피크닉 공간, Coyote Creek 산책을 함께 즐길 수 있어요.", ["놀이터", "피크닉", "화장실"], true, "paid", true],

    // Oakland
    ["oakland-dimond-park", "Dimond Park", "Oakland", "3860 Hanly Road, Oakland, CA 94602", 37.8053014, -122.215568, "oakland", "유아용 놀이 구역과 큰 나무 그늘, 잔디가 있어 토들러와 머물기 좋아요.", ["유아 놀이터", "그늘·나무", "화장실"], true, "lot", true],
    ["oakland-lincoln-square-park", "Lincoln Square Park", "Oakland", "250 10th Street, Oakland, CA 94607", 37.8002323, -122.2683989, "oakland", "접근 가능한 놀이터와 유아 구역이 있어 도심 나들이에 편해요.", ["포용형 놀이터", "유아 구역", "화장실"], true, "street", true],
    ["oakland-defremery-park", "DeFremery Park", "Oakland", "1651 Adeline Street, Oakland, CA 94607", 37.8122012, -122.2869045, "oakland", "2-5세용 놀이 구역과 넓은 잔디, 커뮤니티 시설을 이용할 수 있어요.", ["2-5세 놀이터", "잔디", "화장실"], true, "street", true],
    ["oakland-mosswood-park", "Mosswood Park", "Oakland", "3612 Webster Street, Oakland, CA 94609", 37.8239749, -122.2604816, "oakland", "2-5세 유아 구역과 큰 나무가 있는 도심 공원이에요.", ["2-5세 놀이터", "그늘·나무", "화장실"], true, "street", true],

    // North Peninsula
    ["daly-city-gellert-park", "Gellert Park", "Daly City", "50 Wembley Drive, Daly City, CA 94015", 37.663765, -122.4710866, "dalyCity", "큰 놀이터와 잔디, 주차장을 이용할 수 있는 가족 공원이에요.", ["큰 놀이터", "잔디", "주차장"], true, "lot", true],
    ["daly-city-westlake-park", "Westlake Park", "Daly City", "145 Lake Merced Boulevard, Daly City, CA 94015", 37.7040026, -122.4843776, "dalyCity", "놀이터와 열린 운동 공간, 실내 편의시설이 가까운 공원이에요.", ["놀이터", "열린 공간", "화장실"], true, "lot", true],
    ["south-san-francisco-orange-memorial-park", "Orange Memorial Park", "South San Francisco", "1 West Orange Avenue, South San Francisco, CA 94080", 37.654067, -122.4271296, "southSanFrancisco", "놀이터와 넓은 잔디, 산책 동선이 있어 오래 머물기 좋은 중심 공원이에요.", ["놀이터", "넓은 잔디", "화장실"], true, "lot", true],
    ["south-san-francisco-westborough-park", "Westborough Park", "South San Francisco", "Westborough Boulevard & Galway Drive, South San Francisco, CA 94080", 37.6443755, -122.4576882, "southSanFrancisco", "놀이 구역 두 곳과 산책로, 피크닉 쉼터가 있어 여러 연령이 함께 가기 좋아요.", ["놀이터 2곳", "산책", "화장실"], true, "lot", true],
    ["burlingame-washington-park", "Washington Park", "Burlingame", "850 Burlingame Avenue, Burlingame, CA 94010", 37.5819852, -122.344079, "burlingame", "놀이터와 큰 나무 그늘, 화장실이 있어 도심에서 쉬어 가기 좋아요.", ["놀이터", "그늘·나무", "화장실"], true, "lot", true],
    ["burlingame-village-park", "Village Park", "Burlingame", "1535 California Drive, Burlingame, CA 94010", 37.5915888, -122.3743181, "burlingame", "놀이터와 잔디, 피크닉 공간을 갖춘 동네 공원이에요.", ["놀이터", "잔디", "화장실"], true, "street", true],
    ["millbrae-central-park", "Central Park", "Millbrae", "477 Lincoln Circle, Millbrae, CA 94030", 37.6005541, -122.3993245, "millbrae", "새로 정비된 놀이터와 잔디, 화장실이 있는 중심 공원이에요.", ["놀이터", "잔디", "화장실"], true, "lot", true],
    ["millbrae-marina-vista-park", "Marina Vista Park", "Millbrae", "Bay Street & Spruce Street, Millbrae, CA 94030", 37.6107903, -122.3947457, "millbrae", "펜스로 둘러진 놀이터와 그네, 그늘 피크닉 공간이 있어요.", ["펜스", "그네", "그늘"], false, "street", true],
    ["foster-city-boothbay-park", "Boothbay Park", "Foster City", "Boothbay Avenue & Edgewater Boulevard, Foster City, CA 94404", 37.5392392, -122.2732143, "fosterBoothbay", "작은 유아 전용 구역과 큰아이 놀이터가 나뉘어 있어요.", ["유아 구역", "연령별 놀이", "화장실"], true, "lot", true],
    ["foster-city-edgewater-park", "Edgewater Park", "Foster City", "Edgewater Boulevard & Regulus Street, Foster City, CA 94404", 37.5489126, -122.2752825, "fosterEdgewater", "놀이터와 잔디, 화장실이 있어 물가 동네 산책과 묶기 좋아요.", ["놀이터", "잔디", "화장실"], true, "lot", true],
    ["belmont-twin-pines-park", "Twin Pines Park", "Belmont", "1 Twin Pines Lane, Belmont, CA 94002", 37.5159755, -122.2787694, "belmontTwinPines", "나무 그늘 아래 놀이터와 산책 동선, 화장실을 이용할 수 있어요.", ["놀이터", "그늘·나무", "화장실"], true, "lot", true],
    ["belmont-alexander-park", "Alexander Park", "Belmont", "421 Yorkshire Way, Belmont, CA 94002", 37.5268734, -122.2803856, "belmontAlexander", "놀이터와 잔디, 피크닉 공간이 있는 조용한 동네 공원이에요.", ["놀이터", "잔디", "화장실"], true, "street", true],
    ["san-carlos-burton-park", "Burton Park", "San Carlos", "900 Chestnut Street, San Carlos, CA 94070", 37.4978006, -122.2582379, "sanCarlos", "유아 구역을 포함한 놀이터와 넓은 잔디, 화장실이 있어요.", ["유아 구역", "넓은 잔디", "화장실"], true, "lot", true],
    ["san-carlos-laureola-park", "Laureola Park", "San Carlos", "503 Old County Road, San Carlos, CA 94070", 37.5095673, -122.2595586, "sanCarlos", "놀이터와 피크닉 공간, 화장실을 갖춘 동네 공원이에요.", ["놀이터", "피크닉", "화장실"], true, "lot", true],

    // East Bay
    ["berkeley-ohlone-park", "Ohlone Park", "Berkeley", "1701 Hearst Avenue, Berkeley, CA 94703", 37.8731019, -122.2763405, "berkeley", "펜스로 둘러진 유아 놀이 구역과 넓은 선형 공원 산책을 함께 즐길 수 있어요.", ["유아 구역", "펜스", "화장실"], true, "street", true],
    ["berkeley-codornices-park", "Codornices Park", "Berkeley", "1201 Euclid Avenue, Berkeley, CA 94708", 37.8856594, -122.2614932, "berkeley", "큰 나무 아래 놀이터와 넓은 잔디, 화장실이 있는 자연형 공원이에요.", ["놀이터", "그늘·나무", "화장실"], true, "lot", true],
    ["berkeley-live-oak-park", "Live Oak Park", "Berkeley", "1301 Shattuck Avenue, Berkeley, CA 94709", 37.8843842, -122.2692646, "berkeley", "놀이터와 큰 나무 그늘, 개울가 산책을 함께 즐길 수 있어요.", ["놀이터", "그늘·나무", "화장실"], true, "street", true],
    ["berkeley-becky-temko-tot-park", "Becky Temko Tot Park", "Berkeley", "2424 Roosevelt Avenue, Berkeley, CA 94703", 37.8636841, -122.2759696, "berkeley", "작은 아이를 위한 토트 파크라 짧고 집중된 놀이에 좋아요.", ["유아 전용", "동네 공원", "피크닉"], false, "street", true],
    ["alameda-lincoln-park", "Lincoln Park", "Alameda", "1450 High Street, Alameda, CA 94501", 37.7580378, -122.2300805, "alameda", "놀이터와 넓은 잔디, 화장실과 주차장을 이용할 수 있어요.", ["놀이터", "넓은 잔디", "화장실"], true, "lot", true],
    ["alameda-washington-park", "Washington Park", "Alameda", "1300 8th Street, Alameda, CA 94501", 37.7692821, -122.2739362, "alameda", "놀이터와 피크닉 공간, 해변 쪽 산책을 묶기 좋은 큰 공원이에요.", ["놀이터", "피크닉", "화장실"], true, "lot", true],
    ["alameda-krusi-park", "Krusi Park", "Alameda", "3001 Otis Drive, Alameda, CA 94501", 37.7533602, -122.2396324, "alameda", "놀이터와 넓은 운동 공간, 화장실이 있어 가족이 머물기 좋아요.", ["놀이터", "열린 공간", "화장실"], true, "lot", true],

    // North Bay
    ["greenbrae-hal-brown-park", "Hal Brown Park at Creekside", "Greenbrae", "250 Bon Air Road, Greenbrae, CA 94904", 37.9492422, -122.5377969, "marin", "놀이터와 넓은 잔디, 개울가 산책로를 유모차로 함께 즐길 수 있어요.", ["놀이터", "산책", "화장실"], true, "street", true],
    ["larkspur-piper-park", "Piper Park", "Larkspur", "250 Doherty Drive, Larkspur, CA 94939", 37.9406506, -122.5293783, "larkspur", "미끄럼틀·회전 놀이·그네와 넓은 그늘 잔디가 있어 오래 머물기 좋아요.", ["놀이터", "그늘·나무", "화장실"], true, "lot", true],
    ["san-rafael-pueblo-park", "Pueblo Park", "San Rafael", "806 Hacienda Way, San Rafael, CA 94903", 38.0162908, -122.5146122, "marin", "놀이터와 잔디, 피크닉 테이블, 화장실이 모여 있는 작은 공원이에요.", ["놀이터", "피크닉", "화장실"], true, "street", true],
  ];

  const expandedParks = records.map(([
    id,
    name,
    city,
    address,
    lat,
    lng,
    sourceKey,
    why,
    placeFeatures,
    bathroom,
    parking,
    stroller,
  ]) => {
    const [source, sourceName] = sources[sourceKey];
    const parkingText = parkingNotes[parking];
    const bathroomText = bathroom ? "공원 내 화장실을 이용할 수 있어요." : "화장실 정보는 아직 확인되지 않았어요.";
    const strollerText = stroller ? "포장되거나 완만한 공원 진입 동선을 이용할 수 있어요." : "유모차 동선은 아직 확인되지 않았어요.";
    return {
      id,
      name,
      type: "park",
      setting: "outdoor",
      dateBucket: "anytime",
      timeLabel: "운영시간 확인",
      city,
      age: "1-8세·가족",
      minAgeMonths: 12,
      maxAgeMonths: 107,
      price: "free",
      reservation: "예약 불필요",
      source,
      sourceName,
      updated: "7월 25일 공식 정보 확인",
      lastReviewedAt: reviewedAt,
      confidenceStatus: "human_verified",
      address,
      why,
      placeFeatures,
      amenities: {
        parking: parkingText ? { status: "confirmed", text: parkingText } : { status: "unknown" },
        bathroom: bathroom ? { status: "confirmed", text: bathroomText } : { status: "unknown" },
        stroller: stroller ? { status: "confirmed", text: strollerText } : { status: "unknown" },
        changingTable: { status: "unknown" },
      },
      notes: {
        parking: parkingText || "주차 정보는 아직 확인되지 않았어요.",
        bathroom: bathroomText,
        stroller: strollerText,
      },
      location: { lat, lng },
    };
  });

  window.LITTLE_WEEKENDS_EVERGREEN = [
    ...(Array.isArray(window.LITTLE_WEEKENDS_EVERGREEN) ? window.LITTLE_WEEKENDS_EVERGREEN : []),
    ...expandedParks,
  ];
})();

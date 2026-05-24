export const ARCADE_APPS = [
  {
    "id": "pixelhub-arcade",
    "name": "PixelHub Arcade",
    "description": {
      "ar": "تطبيق Android لمجموعة ألعاب الريترو والمحمول مع دعم مستقبلي للحفظ والمكتبة.",
      "en": "Android app for retro and handheld game collections with future library and save support."
    },
    "androidUrl": "https://play.google.com/store/apps/details?id=com.pixelhub.arcade",
    "status": {
      "ar": "رابط Android قابل للتحديث",
      "en": "Android link ready to update"
    }
  },
  {
    "id": "comix-zone-game",
    "name": "Comix Zone Game",
    "description": {
      "ar": "تطبيق Android لمجموعة الأكشن والكلاسيكيات مع روابط دعم وسياسات جاهزة.",
      "en": "Android app for action and classic collections with support and policy routes ready."
    },
    "androidUrl": "https://play.google.com/store/apps/details?id=com.comixzone.game",
    "status": {
      "ar": "رابط Android موجود في ملفات التطبيق",
      "en": "Android link found in app files"
    }
  }
];

export const ARCADE_COLLECTIONS = [
  {
    "id": "official-demo",
    "platform": "NES",
    "genre": {
      "ar": "تجربة رسمية",
      "en": "Official demo"
    },
    "name": {
      "ar": "العرض الرسمي",
      "en": "Official Demo"
    },
    "count": 1
  },
  {
    "id": "mega-drive",
    "platform": "Mega Drive",
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "name": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "count": 63
  },
  {
    "id": "retro-quest",
    "platform": "NES",
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "name": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "count": 49
  },
  {
    "id": "pixel-saga",
    "platform": "NES",
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "name": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "count": 36
  },
  {
    "id": "color-quest",
    "platform": "Handheld",
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "name": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "count": 11
  },
  {
    "id": "handheld-quest",
    "platform": "Handheld",
    "genre": {
      "ar": "محمول",
      "en": "Handheld"
    },
    "name": {
      "ar": "Handheld Quest",
      "en": "Handheld Quest"
    },
    "count": 4
  },
  {
    "id": "pocket-quest",
    "platform": "Pocket",
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "name": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "count": 5
  },
  {
    "id": "dreamcast",
    "platform": "Dreamcast",
    "genre": {
      "ar": "قتال",
      "en": "Fighting"
    },
    "name": {
      "ar": "Dreamcast Vault",
      "en": "Dreamcast Vault"
    },
    "count": 1
  }
];

export const ARCADE_GAMES = [
  {
    "id": "art-style-demo",
    "title": "Art Style Demo",
    "platform": "NES",
    "collectionId": "official-demo",
    "collection": {
      "ar": "العرض الرسمي",
      "en": "Official Demo"
    },
    "genre": {
      "ar": "تجربة رسمية مملوكة",
      "en": "Owned official demo"
    },
    "cover": "/assets/arcade/covers/official/art-style-demo.svg",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": true,
    "searchText": "art style demo nes العرض الرسمي official demo تجربة رسمية مملوكة owned official demo"
  },
  {
    "id": "battletoads-world",
    "title": "Battletoads (World)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/battletoads-world.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "battletoads (world) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "berenstain-bears-camping-adventure-the-usa",
    "title": "Berenstain Bears' Camping Adventure, The (USA)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/berenstain-bears-camping-adventure-the-usa.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "berenstain bears' camping adventure, the (usa) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "bubsy-in-claws-encounters-of-the-furred-kind-usa-europe-2",
    "title": "Bubsy In Claws Encounters Of The Furred Kind (USA, Europe) 2",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/bubsy-in-claws-encounters-of-the-furred-kind-usa-europe-2.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "bubsy in claws encounters of the furred kind (usa, europe) 2 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "bugs-bunny-in-double-trouble",
    "title": "Bugs Bunny In Double Trouble",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/bugs-bunny-in-double-trouble.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "bugs bunny in double trouble mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "joe-and-mac-usa",
    "title": "Joe & Mac (USA)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/joe-and-mac-usa.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "joe & mac (usa) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "marsupilami",
    "title": "Marsupilami",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/marsupilami.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "marsupilami mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "mortal-kombat-3-usa",
    "title": "Mortal Kombat 3 (USA)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/mortal-kombat-3-usa.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "mortal kombat 3 (usa) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "rambo-iii-world",
    "title": "Rambo III (World)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/rambo-iii-world.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "rambo iii (world) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sonic-3d-blast-usa-beta",
    "title": "Sonic 3D Blast (USA) (Beta)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sonic-3d-blast-usa-beta.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sonic 3d blast (usa) (beta) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "teenage-mutant-ninja-turtles-tournament-fighters-usa",
    "title": "Teenage Mutant Ninja Turtles Tournament Fighters (USA)",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/teenage-mutant-ninja-turtles-tournament-fighters-usa.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "teenage mutant ninja turtles tournament fighters (usa) mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "untitled-design",
    "title": "Untitled Design",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/untitled-design.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "untitled design mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "aero-the-acro-bat-2",
    "title": "Aero The Acro Bat 2",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/aero-the-acro-bat-2.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "aero the acro bat 2 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "altered-beast",
    "title": "Altered Beast",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/altered-beast.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "altered beast mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "asterix-power-gods",
    "title": "Asterix Power Gods",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/asterix-power-gods.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "asterix power gods mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "batman-revenge-joker",
    "title": "Batman Revenge Joker",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/batman-revenge-joker.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "batman revenge joker mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "cheese-cat-astrophe",
    "title": "Cheese Cat Astrophe",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/cheese-cat-astrophe.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "cheese cat astrophe mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "chuck-rock-ii-son-of-chuck",
    "title": "Chuck Rock Ii Son Of Chuck",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/chuck-rock-ii-son-of-chuck.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "chuck rock ii son of chuck mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "comix-zone-jp",
    "title": "Comix Zone Jp",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/comix-zone-jp.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "comix zone jp mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "decapattack",
    "title": "Decapattack",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/decapattack.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "decapattack mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "dodge-danpei",
    "title": "Dodge Danpei",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/dodge-danpei.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "dodge danpei mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "donald-maui-mallard",
    "title": "Donald Maui Mallard",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/donald-maui-mallard.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "donald maui mallard mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "double-dribble-playoff-edition",
    "title": "Double Dribble Playoff Edition",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/double-dribble-playoff-edition.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "double dribble playoff edition mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "dyna-brothers",
    "title": "Dyna Brothers",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/dyna-brothers.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "dyna brothers mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "dynamite-headdy",
    "title": "Dynamite Headdy",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/dynamite-headdy.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "dynamite headdy mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "earthworm-jim",
    "title": "Earthworm Jim",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/earthworm-jim.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "earthworm jim mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "fantasia",
    "title": "Fantasia",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/fantasia.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "fantasia mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "fatal-fury",
    "title": "Fatal Fury",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/fatal-fury.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "fatal fury mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "flintstones",
    "title": "Flintstones",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/flintstones.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "flintstones mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "golden-axe",
    "title": "Golden Axe",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/golden-axe.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "golden axe mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "greendog-the-beached-surfer-dude",
    "title": "Greendog The Beached Surfer Dude",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/greendog-the-beached-surfer-dude.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "greendog the beached surfer dude mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "high-seas-havoc",
    "title": "High Seas Havoc",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/high-seas-havoc.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "high seas havoc mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "marko",
    "title": "Marko",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/marko.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "marko mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "michael-jacksons-moonwalker",
    "title": "Michael Jacksons Moonwalker",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/michael-jacksons-moonwalker.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "michael jacksons moonwalker mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "mr-nutz",
    "title": "Mr Nutz",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/mr-nutz.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "mr nutz mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "mystical-fighter",
    "title": "Mystical Fighter",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/mystical-fighter.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "mystical fighter mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "ncaa-football",
    "title": "Ncaa Football",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/ncaa-football.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "ncaa football mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "pac-mania",
    "title": "Pac Mania",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/pac-mania.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pac mania mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "pink-goes-to-hollywood",
    "title": "Pink Goes To Hollywood",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/pink-goes-to-hollywood.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pink goes to hollywood mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "pinocchio",
    "title": "Pinocchio",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/pinocchio.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pinocchio mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "pocahontas",
    "title": "Pocahontas",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/pocahontas.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocahontas mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "predator-2",
    "title": "Predator 2",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/predator-2.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "predator 2 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "pulseman",
    "title": "Pulseman",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/pulseman.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pulseman mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "quackshot",
    "title": "Quackshot",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/quackshot.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "quackshot mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "revenge-of-shinobi",
    "title": "Revenge Of Shinobi",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/revenge-of-shinobi.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "revenge of shinobi mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "ristar",
    "title": "Ristar",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/ristar.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "ristar mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "rockman-mega-world",
    "title": "Rockman Mega World",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/rockman-mega-world.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "rockman mega world mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "samurai-shodown",
    "title": "Samurai Shodown",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/samurai-shodown.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "samurai shodown mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "socket",
    "title": "Socket",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/socket.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "socket mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sonic-and-knuckles",
    "title": "Sonic And Knuckles",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sonic-and-knuckles.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sonic and knuckles mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sonic-the-hedgehog-2",
    "title": "Sonic The Hedgehog 2",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sonic-the-hedgehog-2.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sonic the hedgehog 2 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sparkster",
    "title": "Sparkster",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sparkster.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sparkster mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "spirou",
    "title": "Spirou",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/spirou.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "spirou mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "splatterhouse-2",
    "title": "Splatterhouse 2",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/splatterhouse-2.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "splatterhouse 2 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "spot-goes-to-hollywood",
    "title": "Spot Goes To Hollywood",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/spot-goes-to-hollywood.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "spot goes to hollywood mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "streets-of-rage-3",
    "title": "Streets Of Rage 3",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/streets-of-rage-3.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "streets of rage 3 mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sunset-riders",
    "title": "Sunset Riders",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sunset-riders.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sunset riders mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "sylvester-tweety-cagey-capers",
    "title": "Sylvester Tweety Cagey Capers",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/sylvester-tweety-cagey-capers.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "sylvester tweety cagey capers mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "tiny-toon-adventures-acme-all-stars",
    "title": "Tiny Toon Adventures Acme All Stars",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/tiny-toon-adventures-acme-all-stars.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "tiny toon adventures acme all stars mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "tmnt-return-shredder",
    "title": "Tmnt Return Shredder",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/tmnt-return-shredder.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "tmnt return shredder mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "toki-going-ape-spit",
    "title": "Toki Going Ape Spit",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/toki-going-ape-spit.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "toki going ape spit mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "world-heroes",
    "title": "World Heroes",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/world-heroes.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "world heroes mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "yu-yu-hakusho-makyou-toitsusen",
    "title": "Yu Yu Hakusho Makyou Toitsusen",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/yu-yu-hakusho-makyou-toitsusen.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "yu yu hakusho makyou toitsusen mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "zero-the-kamikaze-squirrel",
    "title": "Zero The Kamikaze Squirrel",
    "platform": "Mega Drive",
    "collectionId": "mega-drive",
    "collection": {
      "ar": "مجموعة Mega Drive",
      "en": "Mega Drive Collection"
    },
    "genre": {
      "ar": "أكشن كلاسيكي",
      "en": "Classic action"
    },
    "cover": "/assets/arcade/covers/mega-drive/zero-the-kamikaze-squirrel.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "zero the kamikaze squirrel mega drive مجموعة mega drive mega drive collection أكشن كلاسيكي classic action"
  },
  {
    "id": "app-icon",
    "title": "App Icon",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/app-icon.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "app icon nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest01",
    "title": "RetroQuest01",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest01.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest01 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest02",
    "title": "RetroQuest02",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest02.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest02 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest03",
    "title": "RetroQuest03",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest03.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest03 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest04",
    "title": "RetroQuest04",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest04.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest04 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest05",
    "title": "RetroQuest05",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest05.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest05 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest06",
    "title": "RetroQuest06",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest06.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest06 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest07",
    "title": "RetroQuest07",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest07.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest07 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest08",
    "title": "RetroQuest08",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest08.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest08 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest09",
    "title": "RetroQuest09",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest09.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest09 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest10",
    "title": "RetroQuest10",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest10.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest10 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest11",
    "title": "RetroQuest11",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest11.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest11 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest12",
    "title": "RetroQuest12",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest12.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest12 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest13",
    "title": "RetroQuest13",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest13.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest13 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest14",
    "title": "RetroQuest14",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest14.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest14 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest15",
    "title": "RetroQuest15",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest15.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest15 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest16",
    "title": "RetroQuest16",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest16.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest16 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest17",
    "title": "RetroQuest17",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest17.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest17 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest18",
    "title": "RetroQuest18",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest18.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest18 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest19",
    "title": "RetroQuest19",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest19.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest19 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest20",
    "title": "RetroQuest20",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest20.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest20 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest21",
    "title": "RetroQuest21",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest21.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest21 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest22",
    "title": "RetroQuest22",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest22.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest22 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest23",
    "title": "RetroQuest23",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest23.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest23 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest24",
    "title": "RetroQuest24",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest24.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest24 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest25",
    "title": "RetroQuest25",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest25.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest25 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest26",
    "title": "RetroQuest26",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest26.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest26 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest27",
    "title": "RetroQuest27",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest27.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest27 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest28",
    "title": "RetroQuest28",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest28.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest28 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest29",
    "title": "RetroQuest29",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest29.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest29 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest30",
    "title": "RetroQuest30",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest30.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest30 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest31",
    "title": "RetroQuest31",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest31.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest31 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest32",
    "title": "RetroQuest32",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest32.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest32 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest33",
    "title": "RetroQuest33",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest33.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest33 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest34",
    "title": "RetroQuest34",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest34.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest34 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest35",
    "title": "RetroQuest35",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest35.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest35 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest36",
    "title": "RetroQuest36",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest36.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest36 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest37",
    "title": "RetroQuest37",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest37.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest37 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest38",
    "title": "RetroQuest38",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest38.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest38 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest39",
    "title": "RetroQuest39",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest39.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest39 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest40",
    "title": "RetroQuest40",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest40.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest40 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest41",
    "title": "RetroQuest41",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest41.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest41 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest42",
    "title": "RetroQuest42",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest42.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest42 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest43",
    "title": "RetroQuest43",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest43.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest43 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest44",
    "title": "RetroQuest44",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest44.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest44 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest45",
    "title": "RetroQuest45",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest45.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest45 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest46",
    "title": "RetroQuest46",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest46.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest46 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest47",
    "title": "RetroQuest47",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest47.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest47 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "retroquest48",
    "title": "RetroQuest48",
    "platform": "NES",
    "collectionId": "retro-quest",
    "collection": {
      "ar": "Retro Quest",
      "en": "Retro Quest"
    },
    "genre": {
      "ar": "ريترو",
      "en": "Retro"
    },
    "cover": "/assets/arcade/covers/retro-quest/retroquest48.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "retroquest48 nes retro quest retro quest ريترو retro"
  },
  {
    "id": "pixelsaga01",
    "title": "PixelSaga01",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga01.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga01 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga02",
    "title": "PixelSaga02",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga02.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga02 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga03",
    "title": "PixelSaga03",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga03.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga03 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga04",
    "title": "PixelSaga04",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga04.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga04 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga05",
    "title": "PixelSaga05",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga05.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga05 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga06",
    "title": "PixelSaga06",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga06.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga06 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga07",
    "title": "PixelSaga07",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga07.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga07 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga08",
    "title": "PixelSaga08",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga08.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga08 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga09",
    "title": "PixelSaga09",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga09.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga09 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga10",
    "title": "PixelSaga10",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga10.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga10 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga11",
    "title": "PixelSaga11",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga11.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga11 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga12",
    "title": "PixelSaga12",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga12.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga12 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga13",
    "title": "PixelSaga13",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga13.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga13 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga14",
    "title": "PixelSaga14",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga14.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga14 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga15",
    "title": "PixelSaga15",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga15.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga15 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga16",
    "title": "PixelSaga16",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga16.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga16 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga17",
    "title": "PixelSaga17",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga17.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga17 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga18",
    "title": "PixelSaga18",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga18.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga18 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga19",
    "title": "PixelSaga19",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga19.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga19 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga20",
    "title": "PixelSaga20",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga20.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga20 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga21",
    "title": "PixelSaga21",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga21.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga21 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga22",
    "title": "PixelSaga22",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga22.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga22 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga23",
    "title": "PixelSaga23",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga23.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga23 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga24",
    "title": "PixelSaga24",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga24.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga24 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga25",
    "title": "PixelSaga25",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga25.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga25 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga26",
    "title": "PixelSaga26",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga26.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga26 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga27",
    "title": "PixelSaga27",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga27.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga27 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga28",
    "title": "PixelSaga28",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga28.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga28 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga29",
    "title": "PixelSaga29",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga29.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga29 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga30",
    "title": "PixelSaga30",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga30.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga30 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga31",
    "title": "PixelSaga31",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga31.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga31 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga32",
    "title": "PixelSaga32",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga32.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga32 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga33",
    "title": "PixelSaga33",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga33.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga33 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga34",
    "title": "PixelSaga34",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga34.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga34 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga35",
    "title": "PixelSaga35",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga35.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga35 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "pixelsaga36",
    "title": "PixelSaga36",
    "platform": "NES",
    "collectionId": "pixel-saga",
    "collection": {
      "ar": "Pixel Saga",
      "en": "Pixel Saga"
    },
    "genre": {
      "ar": "بيكسل",
      "en": "Pixel"
    },
    "cover": "/assets/arcade/covers/pixel-saga/pixelsaga36.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pixelsaga36 nes pixel saga pixel saga بيكسل pixel"
  },
  {
    "id": "colorquest01",
    "title": "ColorQuest01",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest01.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest01 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest011",
    "title": "ColorQuest011",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest011.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest011 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest02",
    "title": "ColorQuest02",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest02.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest02 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest03",
    "title": "ColorQuest03",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest03.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest03 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest04",
    "title": "ColorQuest04",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest04.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest04 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest05",
    "title": "ColorQuest05",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest05.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest05 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest06",
    "title": "ColorQuest06",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest06.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest06 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest07",
    "title": "ColorQuest07",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest07.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest07 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest08",
    "title": "ColorQuest08",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest08.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest08 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest09",
    "title": "ColorQuest09",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest09.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest09 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "colorquest10",
    "title": "ColorQuest10",
    "platform": "Handheld",
    "collectionId": "color-quest",
    "collection": {
      "ar": "Color Quest",
      "en": "Color Quest"
    },
    "genre": {
      "ar": "محمول ملون",
      "en": "Color handheld"
    },
    "cover": "/assets/arcade/covers/color-quest/colorquest10.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "colorquest10 handheld color quest color quest محمول ملون color handheld"
  },
  {
    "id": "handheldquest01",
    "title": "HandheldQuest01",
    "platform": "Handheld",
    "collectionId": "handheld-quest",
    "collection": {
      "ar": "Handheld Quest",
      "en": "Handheld Quest"
    },
    "genre": {
      "ar": "محمول",
      "en": "Handheld"
    },
    "cover": "/assets/arcade/covers/handheld-quest/handheldquest01.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "handheldquest01 handheld handheld quest handheld quest محمول handheld"
  },
  {
    "id": "handheldquest02",
    "title": "HandheldQuest02",
    "platform": "Handheld",
    "collectionId": "handheld-quest",
    "collection": {
      "ar": "Handheld Quest",
      "en": "Handheld Quest"
    },
    "genre": {
      "ar": "محمول",
      "en": "Handheld"
    },
    "cover": "/assets/arcade/covers/handheld-quest/handheldquest02.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "handheldquest02 handheld handheld quest handheld quest محمول handheld"
  },
  {
    "id": "handheldquest03",
    "title": "HandheldQuest03",
    "platform": "Handheld",
    "collectionId": "handheld-quest",
    "collection": {
      "ar": "Handheld Quest",
      "en": "Handheld Quest"
    },
    "genre": {
      "ar": "محمول",
      "en": "Handheld"
    },
    "cover": "/assets/arcade/covers/handheld-quest/handheldquest03.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "handheldquest03 handheld handheld quest handheld quest محمول handheld"
  },
  {
    "id": "handheldquest04",
    "title": "HandheldQuest04",
    "platform": "Handheld",
    "collectionId": "handheld-quest",
    "collection": {
      "ar": "Handheld Quest",
      "en": "Handheld Quest"
    },
    "genre": {
      "ar": "محمول",
      "en": "Handheld"
    },
    "cover": "/assets/arcade/covers/handheld-quest/handheldquest04.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "handheldquest04 handheld handheld quest handheld quest محمول handheld"
  },
  {
    "id": "pocketquest01",
    "title": "PocketQuest01",
    "platform": "Pocket",
    "collectionId": "pocket-quest",
    "collection": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "cover": "/assets/arcade/covers/pocket-quest/pocketquest01.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocketquest01 pocket pocket quest pocket quest جيب pocket"
  },
  {
    "id": "pocketquest02",
    "title": "PocketQuest02",
    "platform": "Pocket",
    "collectionId": "pocket-quest",
    "collection": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "cover": "/assets/arcade/covers/pocket-quest/pocketquest02.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocketquest02 pocket pocket quest pocket quest جيب pocket"
  },
  {
    "id": "pocketquest03",
    "title": "PocketQuest03",
    "platform": "Pocket",
    "collectionId": "pocket-quest",
    "collection": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "cover": "/assets/arcade/covers/pocket-quest/pocketquest03.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocketquest03 pocket pocket quest pocket quest جيب pocket"
  },
  {
    "id": "pocketquest04",
    "title": "PocketQuest04",
    "platform": "Pocket",
    "collectionId": "pocket-quest",
    "collection": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "cover": "/assets/arcade/covers/pocket-quest/pocketquest04.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocketquest04 pocket pocket quest pocket quest جيب pocket"
  },
  {
    "id": "pocketquest05",
    "title": "PocketQuest05",
    "platform": "Pocket",
    "collectionId": "pocket-quest",
    "collection": {
      "ar": "Pocket Quest",
      "en": "Pocket Quest"
    },
    "genre": {
      "ar": "جيب",
      "en": "Pocket"
    },
    "cover": "/assets/arcade/covers/pocket-quest/pocketquest05.webp",
    "androidApp": "pixelhub-arcade",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "pocketquest05 pocket pocket quest pocket quest جيب pocket"
  },
  {
    "id": "capcom-vs-snk",
    "title": "Capcom Vs Snk",
    "platform": "Dreamcast",
    "collectionId": "dreamcast",
    "collection": {
      "ar": "Dreamcast Vault",
      "en": "Dreamcast Vault"
    },
    "genre": {
      "ar": "قتال",
      "en": "Fighting"
    },
    "cover": "/assets/arcade/covers/dreamcast/capcom-vs-snk.webp",
    "androidApp": "comix-zone-game",
    "playMode": "web-emulator",
    "licensedBuild": false,
    "searchText": "capcom vs snk dreamcast dreamcast vault dreamcast vault قتال fighting"
  }
];

export const ARCADE_FILTERS = {
  platforms: [...new Set(ARCADE_GAMES.map((game) => game.platform))].sort(),
  collections: ARCADE_COLLECTIONS,
};

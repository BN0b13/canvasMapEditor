class MapTile {
  constructor(x, y, name) {
    this.x = x;
    this.y = y;
    this.w = 32;
    this.h = 32;
    this.name = name;
    this.img = new Image();
    this.img.src = '/grassTiles.png';
  }
}

// Out Of Bounds Tiles
const oobTiles = {
  top: {
    fill: new MapTile(0,0, 'OOB Fill'),
    left: {
      start: new MapTile(0,32),
      center: new MapTile(0,64)
    },
    right: {
      start: new MapTile(128,32),
      center: new MapTile(128,64)
    },
    bottom: {
      center: new MapTile(32,192),
      corner: {
        left: new MapTile(0,192),
        right: new MapTile(96,192)
      },
      top: {
        left: new MapTile(96,128),
        right: new MapTile(128,128)
      }
    }
  },
  bottom: {
    top: {
      center: new MapTile(64,32),
      start: {
        left:  new MapTile(32,32),
        right: {
          up: new MapTile(96,32),
          down: new MapTile(128,96)
        },
      },
      cave: {
        left: new MapTile(0,0),
        entrance: new MapTile(0,0)
      }
    },
    right: {
      center: new MapTile(96,64),
      top:  new MapTile(0,0),
      bottom:  new MapTile(0,0)
    }

  }
}

// Grass Tiles
const grassTiles = {
  fill: new MapTile(64, 64)
}

// Road Tiles
const roadTiles = {
  fill: new MapTile(352,0),
  horizontal: new MapTile(192,0),
  vertical: new MapTile(160,32),
  cross: new MapTile(192,32),
  upLeft: new MapTile(224,64),
  upRight: new MapTile(160,64),
  downLeft: new MapTile(224,0),
  downRight: new MapTile(160,0),
  stopUp: new MapTile(256,0),
  stopDown: new MapTile(256,32),
  stopLeft: new MapTile(288,0),
  stopRight: new MapTile(288,32),
  threeUp: new MapTile(256,64),
  threeDown: new MapTile(288,64),
  threeLeft: new MapTile(320,64),
  threeRight: new MapTile(320,32)
}
// Water Tiles
const waterTile = new MapTile(192,128);
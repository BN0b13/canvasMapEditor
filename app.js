// NOTES: Canvas is dynamically set up on a 12x12 grid
const tileType = document.getElementById('tileType');
const categoryTiles = document.getElementById('categoryTiles');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const gridSize = 10;
canvas.width = document.documentElement.clientWidth * .99 < document.documentElement.clientHeight ? gridChecker(Math.round(document.documentElement.clientWidth * .99)) : gridChecker(Math.round(document.documentElement.clientHeight * .99));
canvas.height = canvas.width;
const canvasSize = canvas.getBoundingClientRect();
let mapW = canvas.width;
let mapH = canvas.height;
let tileX =  mapW  / gridSize;
let tileY =  mapH  / gridSize;
let mapSprite;
let gameMap = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
let myArr = [];

function gridChecker(num) {
 let cur = num;
 for(i=0; i<cur; i++) {
  if(cur % gridSize !== 0) {
    cur --;
  }
  if(cur % gridSize == 0) {
    return cur;
  }
 }
}

class Character {
  constructor(src) {
    this.w = tileX;
    this.h = tileY;
    this.centerX = '';
    this.centerY = '';
    this.leftSide = [0,0];
    this.topSide = [0,0];
    this.rightSide = [0,0];
    this.bottomSide = [0,0];
    this.x = 0;
    this.y = 0;
    this.img = new Image();
    this.img.src = src;
  }
}

let dogCenterX;
let dogCenterY;
let dogLeftSide;
let dogTopSide;
let dogRightSide;
let dogBottomSide;

function charDimensions() {
  dogCenterX = (dog.x + (dog.w/2));
  dogCenterY = (dog.y + (dog.h/2));

  dogLeftSide = {
    start: [dog.x, dog.y],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
  dogTopSide = {
    start: [dog.x, dog.y],
    end: [(dog.x + dog.w), dog.y]
  }
  dogRightSide = {
    start: [(dog.x + dog.w), dog.y],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
  dogBottomSide = {
    start: [dog.x, (dog.y + dog.h)],
    end: [(dog.x + dog.w), (dog.y + dog.h)]
  }
}


function drawCanvas() {
  let currentTile;
  let curRow = 0;
  let curCol = 0;
  let tempArr = [];
  for(y=0; y<gridSize; y++) {
    curCol = 0;
    let row = curRow;
    curRow++;
    for(x=0; x<gridSize; x++) {
      switch(gameMap[(gridSize*y)+x]) {
        case 0:
          currentTile = 'black';
          break;
        case 1:
          currentTile = 'grey';
          break;
        case 2:
          currentTile = 'green';
          break;
        case 3:
          currentTile = 'tan';
          break;
        default:
          currentTile = 'white'
        }
        let col = curCol;
        tempArr.push( [row, col])
        curCol++
        colorRect(x*tileX,y*tileY,tileX,tileY,currentTile);
      }
    }
    myArr = tempArr;
}

function choosenTileType() {
  if(tileType.selectedOptions[0].innerText == 'Out Of Bounds') {
    mapSprite = oobTiles;
    categoryTiles.innerHTML = `<div></div>`
    for (const property in mapSprite) {
      console.log(`${property}: ${mapSprite[property]}`);
    }
  }
  if(tileType.selectedOptions[0].innerText == 'Grass') {
    mapSprite = grassTiles;
  }
  if(tileType.selectedOptions[0].innerText == 'Path') {
    mapSprite = roadTiles;
  }
}

function colorRect(topLeftX, topLeftY, boxWidth, boxHeight, fillColor) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(topLeftX, topLeftY, boxWidth, boxHeight);
}



function draw() {
  if(ctx==null) { return alert('Something Went Wrong! Please Refresh The Page.'); }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCanvas();
  requestAnimationFrame(draw);
  
}

draw();

canvas.addEventListener('click', function(e) {
  const mouseXCoord = Math.floor(e.x/tileX);
  const mouseYCoord = Math.floor(e.y/tileY);
  const arrPos = (mouseYCoord*gridSize) + (mouseXCoord);
  choosenTileType();
  if(gameMap[arrPos] >= 4) {
    gameMap[arrPos] = 0;
  } else {
    if(tileType.selectedOptions[0].innerText == 'Out Of Bounds') {
      if(gameMap[arrPos] == 1) {
        gameMap[arrPos] = 0;
      } else {
        gameMap[arrPos] = 1;
      }
    }
    if(tileType.selectedOptions[0].innerText == 'Grass') {
      if(gameMap[arrPos] == 2) {
        gameMap[arrPos] = 0;
      } else {
        gameMap[arrPos] = 2;
      }
    }
    if(tileType.selectedOptions[0].innerText == 'Path') {
      if(gameMap[arrPos] == 3) {
        gameMap[arrPos] = 0;
      } else {
        gameMap[arrPos] = 3;
      }
    }
  }
})


let lineCount = 80; // 將水草數量增加至 80
let lines = []; // 儲存水草的資料
let colors = []; // 儲存指定的五種顏色

function setup() { // 初始值設定
  createCanvas(windowWidth, windowHeight); // 畫布大小

  // 定義顏色調色盤
  colors = [
    color(237, 175, 184, 150), // 粉紅色，加入透明度
    color(247, 225, 215, 150), // 淺粉色，加入透明度
    color(222, 219, 210, 150), // 灰白色，加入透明度
    color(176, 196, 177, 150), // 淺綠色，加入透明度
    color(155, 34, 38, 150)    // 深紅色，加入透明度
  ];

  // 初始化水草資料
  for (let i = 0; i < lineCount; i++) {
    lines.push({
      x: (i + 0.5) * (width / lineCount), // 平均分布水草的水平位置
      height: random(100, 250), // 水草的高度範圍
      color: random(colors), // 隨機選擇一種顏色
      thickness: random(10, 20), // 水草的粗細
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }

  // 創建 iframe
  let iframe = createElement('iframe');
  iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  iframe.style('position', 'absolute');
  iframe.style('width', '60%');
  iframe.style('height', '60%');
  iframe.style('top', '20%'); // 垂直居中
  iframe.style('left', '20%'); // 水平居中
  iframe.style('border', 'none');
}

function draw() { // 畫圖
  background('#0d1b2a'); // 背景顏色改為深藍色 (#0d1b2a)
  blendMode(BLEND); // 設定混合模式為 BLEND，產生顏色重疊效果

  // 繪製每條水草
  for (let i = 0; i < lines.length; i++) {
    drawWavingLine(lines[i]);
  }
}

function drawWavingLine(line) {
  stroke(line.color); // 設定水草顏色
  strokeWeight(line.thickness); // 設定水草粗細
  noFill(); // 無填充

  beginShape();
  for (let y = height; y > height - line.height; y -= 10) {
    // 水草左右搖晃
    let offsetX = sin(frameCount * line.frequency + y * 0.05) * map(y, height - line.height, height, 10, 0);
    vertex(line.x + offsetX, y);
  }
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // 畫布大小隨視窗大小改變

  // 重新初始化水草資料
  lines = [];
  for (let i = 0; i < lineCount; i++) {
    lines.push({
      x: (i + 0.5) * (width / lineCount), // 平均分布水草的水平位置
      height: random(100, 250), // 水草的高度範圍
      color: random(colors), // 隨機選擇一種顏色
      thickness: random(10, 20), // 水草的粗細
      frequency: random(0.01, 0.05), // 水草搖晃的頻率
    });
  }
}
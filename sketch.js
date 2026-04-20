let capture;
let pg; // 宣告一個繪圖層變數

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.hide(); // 隱藏預設在畫布下方的 HTML 影片元件
  pg = createGraphics(640, 480); // 初始化繪圖層（暫定一個預設大小）
}

function draw() {
  background('#e7c6ff');

  let w = windowWidth * 0.6;
  let h = windowHeight * 0.6;
  let x = (windowWidth - w) / 2;
  let y = (windowHeight - h) / 2;

  // 當攝影機啟動後，確保繪圖層的大小與攝影機解析度完全一致
  if (capture.width > 0 && (pg.width !== capture.width || pg.height !== capture.height)) {
    pg = createGraphics(capture.width, capture.height);
  }

  // 在繪圖層 (pg) 上繪製內容
  pg.clear();
  capture.loadPixels(); // 載入攝影機像素資料

  if (capture.pixels.length > 0) {
    let stepSize = 20; // 定義單位大小為 20x20
    pg.fill(255);
    pg.noStroke();
    pg.textAlign(CENTER, CENTER);
    pg.textSize(10);

    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        let index = (x + y * capture.width) * 4; // 計算像素索引 (R, G, B, A)
        let r = capture.pixels[index];
        let g = capture.pixels[index + 1];
        let b = capture.pixels[index + 2];
        let avg = floor((r + g + b) / 3); // 計算平均亮度

        // 在該單位位置顯示平均值
        pg.text(avg, x + stepSize / 2, y + stepSize / 2);
      }
    }
  }

  push(); // 儲存目前的繪圖設定
  translate(x + w, y); // 將座標原點移至影像的右上角
  scale(-1, 1); // 水平翻轉座標軸
  image(capture, 0, 0, w, h); // 在翻轉後的座標系中繪製影像
  image(pg, 0, 0, w, h); // 將繪圖層疊加在影像上方
  pop(); // 還原繪圖設定，避免影響後續繪製的元件
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

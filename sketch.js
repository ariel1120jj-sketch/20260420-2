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
  pg.clear(); // 清除上一幀的內容（使其保持透明）
  pg.fill(255, 255, 0, 150); // 半透明黃色
  pg.noStroke();
  pg.ellipse(pg.width / 2, pg.height / 2, 100, 100); // 在繪圖層中心畫圓

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

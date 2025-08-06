const tbl = document.getElementById("tbl");
const tableCount = document.getElementById("tableCount");
const addBut = document.querySelector("#add");
const delBut = document.querySelector("#del");
const printBut = document.querySelector("#print");

// GitHub Pages上の画像URLに変更（ここを自分のURLに合わせて変更）
const bgImageUrl = "https://raw.githubusercontent.com/Shinnosuke-Nakayama/print-maker/refs/heads/main/IMG_3991.jpeg";

// A4サイズ（縦）ピクセル基準（300dpi: 約2480x3508）
const canvasWidth = 2480;
const canvasHeight = 3508;

addBut.addEventListener('click', add);
delBut.addEventListener('click', del);
printBut.addEventListener('click', generatePDF);

function add() {
  let tr = document.createElement("tr");
  for (let i = 0; i < 2; i++) {
    let td = document.createElement("td");
    let inp = document.createElement("input");
    td.appendChild(inp);
    tr.appendChild(td);
  }
  tbl.appendChild(tr);
  updateCount();
}

function del() {
  let rowCount = tbl.rows.length;
  if (rowCount > 1) {
    tbl.deleteRow(rowCount - 1);
    updateCount();
  }
}

function updateCount() {
  tableCount.textContent = `count：${tbl.rows.length - 1}`;
}

function generatePDF() {
  const rows = Array.from(tbl.rows).slice(1); // ヘッダー除く
  if (rows.length === 0) {
    alert("テーブルに行がありません");
    return;
  }

  const image = new Image();
  image.crossOrigin = "anonymous";
  image.src = "https://raw.githubusercontent.com/Shinnosuke-Nakayama/print-maker/refs/heads/main/IMG_3991.jpeg";

  image.onload = () => {
    const canvases = [];

    rows.forEach((row, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");

      // 背景画像描画
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      // テキスト抽出
      const name = row.cells[0].querySelector("input")?.value || "";
      const donation = row.cells[1].querySelector("input")?.value || "";

      // 縦書きフォントスタイル
      ctx.font = "100px serif";
      ctx.fillStyle = "#000";
      ctx.textBaseline = "top";
      ctx.textAlign = "center";

      // 名前を画像中央に縦書き
      drawVerticalText(ctx, name, canvasWidth / 2, 400);

      // 寄付額を画像右端に縦書き
      drawVerticalText(ctx, donation, canvasWidth - 200, 400);

      canvases.push(canvas);
    });

    // PDF生成
    const pdf = new jspdf.jsPDF({
      orientation: "portrait",
      unit: "px",
      format: [canvasWidth, canvasHeight]
    });

    canvases.forEach((canvas, i) => {
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, 0, canvasWidth, canvasHeight);
    });

    pdf.save("output.pdf");
  };

  image.onerror = () => {
    alert("背景画像の読み込みに失敗しました。URLを確認してください。");
  };
}

function drawVerticalText(ctx, text, x, startY) {
  const chars = text.split("");
  chars.forEach((char, i) => {
    ctx.fillText(char, x, startY + i * 100);
  });
}

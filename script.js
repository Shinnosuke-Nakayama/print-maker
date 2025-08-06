const tbl = document.getElementById("tbl");
const tableCount = document.getElementById("tableCount");
const addBut = document.querySelector("#add");
const delBut = document.querySelector("#del");
const printBut = document.querySelector("#print");

// GitHub Pages上の画像URL
const bgImageUrl = "https://raw.githubusercontent.com/Shinnosuke-Nakayama/print-maker/refs/heads/main/IMG_3991.jpeg";

// A4縦（300dpi相当）のキャンバスサイズ
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
  image.src = bgImageUrl;

  image.onload = () => {
    const canvases = [];

    rows.forEach((row, index) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");

      // 背景画像描画
      ctx.drawImage(image, 0, 0, canvasWidth, canvasHeight);

      // テキスト取得
      const name = row.cells[0].querySelector("input")?.value || "";
      const donation = row.cells[1].querySelector("input")?.value || "";

      // 中央の名前（大きなフォント、中央に縦書き）
      ctx.font = "350px serif";
      ctx.fillStyle = "#000";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      drawVerticalText(ctx, name, canvasWidth / 2, canvasHeight / 2 ); // 中央に配置

      // 右上の寄付額（小さなフォント、右上に縦書き）
      ctx.font = "250px serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      drawVerticalText(ctx, donation, canvasWidth - 100, 200); // 右上に配置

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

// 縦書き描画（1文字ずつ縦に配置）
function drawVerticalText(ctx, text, x, startY) {
  const chars = text.split("");
  chars.forEach((char, i) => {
    ctx.fillText(char, x, startY + i * parseInt(ctx.font)); // フォントサイズで縦間隔調整
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const table = document.getElementById("tbl");
  const addBtn = document.getElementById("add");
  const delBtn = document.getElementById("del");
  const printBtn = document.getElementById("print");
  const tableCount = document.getElementById("tableCount");

  function updateCount() {
    tableCount.textContent = `count: ${table.rows.length - 1}`;
  }

  addBtn.addEventListener("click", () => {
    const row = table.insertRow(-1);

    for (let i = 0; i < 2; i++) {
      const cell = row.insertCell(i);
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = i === 0 ? "名前" : "寄付";
      cell.appendChild(input);
    }
    updateCount();
  });

  delBtn.addEventListener("click", () => {
    if (table.rows.length > 1) {
      table.deleteRow(-1);
      updateCount();
    }
  });

  printBtn.addEventListener("click", async () => {
    const rows = [...table.rows].slice(1); // skip header
    if (rows.length === 0) return;

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4",
    });

    const A4_WIDTH = 595;
    const A4_HEIGHT = 842;

    const backgroundImage = await loadImage("https://raw.githubusercontent.com/Shinnosuke-Nakayama/print-maker/refs/heads/main/IMG_3991.jpeg");

    for (let i = 0; i < rows.length; i++) {
      if (i > 0) doc.addPage();

      const canvas = document.createElement("canvas");
      canvas.width = A4_WIDTH;
      canvas.height = A4_HEIGHT;
      const ctx = canvas.getContext("2d");

      // 背景画像
      ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);

      const name = rows[i].cells[0].querySelector("input").value;
      const donation = rows[i].cells[1].querySelector("input").value;

      ctx.fillStyle = "black";
      ctx.font = "36px 'Yu Mincho', 'serif'";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 縦書きの名前を中央に配置（縦横中央）
      const nameX = canvas.width / 2;
      const nameY = canvas.height / 2;
      drawVerticalText(ctx, name, nameX, nameY, "center");

      // 寄付は右上に縦書き
      const donationX = canvas.width - 60;
      const donationY = 60;
      drawVerticalText(ctx, donation, donationX, donationY, "top");

      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    }

    doc.save("output.pdf");
  });

  updateCount();
});

function drawVerticalText(ctx, text, x, y, align = "center") {
  const lineHeight = 40;
  const chars = text.split("");
  const offset = align === "top"
    ? 0
    : align === "center"
    ? -(chars.length - 1) * lineHeight / 2
    : -chars.length * lineHeight;

  chars.forEach((char, i) => {
    ctx.fillText(char, x, y + offset + i * lineHeight);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // CORS回避のため
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

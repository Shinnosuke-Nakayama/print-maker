const { jsPDF } = window.jspdf;
const body = document.querySelector("body");
const tbl = document.getElementById("tbl");
const tableCount = document.getElementById("tableCount");
const addBut = document.getElementById("add");
const delBut = document.getElementById("del");
const printBut = document.getElementById("print");

addBut.addEventListener('click', add);
delBut.addEventListener('click', del);
printBut.addEventListener('click', generatePDF);

function add() {
  const tr = document.createElement("tr");
  for (let i = 0; i < 2; i++) {
    const td = document.createElement("td");
    const inp = document.createElement("input");
    td.appendChild(inp);
    tr.appendChild(td);
  }
  tbl.appendChild(tr);
  updateCount();
}

function del() {
  const rw = tbl.rows.length;
  if (rw > 1) {
    tbl.deleteRow(rw - 1);
  }
  updateCount();
}

function updateCount() {
  const rw = tbl.rows.length;
  tableCount.textContent = `count：${rw - 1}`;
}

function generatePDF() {
  const rows = [...tbl.rows].slice(1);
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const image = new Image();
  image.src = "https://raw.githubusercontent.com/Shinnosuke-Nakayama/print-maker/refs/heads/main/IMG_3991.jpeg"; // 画像URLを差し替えてください

  image.onload = function () {
    rows.forEach((row, idx) => {
      const name = row.cells[0].querySelector("input")?.value || "";
      const donation = row.cells[1].querySelector("input")?.value || "";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = 595;  // A4 width in pt
      canvas.height = 842; // A4 height in pt

      // 背景画像
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

      // 中央の文字（縦書き）
      ctx.save();
      ctx.font = "24px serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const xCenter = canvas.width / 2;
      const yCenter = canvas.height / 2;
      const nameChars = name.split('');
      nameChars.forEach((char, i) => {
        ctx.fillText(char, xCenter, yCenter - (nameChars.length * 14) / 2 + i * 28);
      });
      ctx.restore();

      // 右上の文字（縦書き）
      ctx.save();
      ctx.font = "20px serif";
      ctx.textAlign = "right";
      ctx.textBaseline = "top";
      const rightText = donation.split('');
      rightText.forEach((char, i) => {
        ctx.fillText(char, canvas.width - 20, 20 + i * 22);
      });
      ctx.restore();

      const imgData = canvas.toDataURL("image/png");
      if (idx > 0) pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, 0, 210, 297); // A4サイズ(mm)
    });

    pdf.save("print.pdf");
  };
}

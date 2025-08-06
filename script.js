const body = document.querySelector("body");
const tbl = document.getElementById("tbl");
const tableCount = document.getElementById("tableCount"); 
const addBut = document.querySelector("#add");
const delBut = document.querySelector("#del");
const printBut = document.querySelector("#print");

addBut.addEventListener('click', add);
delBut.addEventListener('click', del);
printBut.addEventListener('click', print);

function add() {
  let tr = document.createElement("tr"); 
  for(let i = 0 ; i < 2; i++){
    let td = document.createElement("td");
    let inp = document.createElement("input");
    td.appendChild(inp);
    tr.appendChild(td);
  }
  tbl.appendChild(tr);
  let rw = tbl.rows.length;  
  tableCount.textContent = `count：${rw - 1}`;
}

function del() {
  let rw = tbl.rows.length;
  if (rw === 1) {
    tableCount.textContent = `count：${rw - 1}`;
  } else {
    tbl.deleteRow(rw - 1);
    tableCount.textContent = `count：${rw - 2}`;
  }
}

function print() {
  const contents = document.querySelectorAll("input");
  let rw = tbl.rows.length - 1;
  for (let i = 0; i < rw; i++) {
    let img = document.createElement("img");
    img.src = "img.png" 
    body.appendChild(img);
    console.dir(img);
  }
}

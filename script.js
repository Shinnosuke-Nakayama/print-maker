'use strict';

const tbl = document.getElementById("tbl");
const tableCount = document.getElementById("tableCount"); 

function add(){
  let tr = document.createElement("tr"); 
  for(let i=0; i<2; i++){
    let td = document.createElement("td");
    let inp = document.createElement("input");
    td.appendChild(inp);
    tr.appendChild(td);
  }
  tbl.appendChild(tr);
  let rw = tbl.rows.length;  
  tableCount.textContent = `count：${rw - 1}`;
}

function del(){
  let rw = tbl.rows.length;
  rw === 1 ? rw : tbl.deleteRow(rw - 1);
  rw === 1 ? tableCount.textContent = `count：${rw - 1}` : tableCount.textContent = `count：${rw - 2}`
}

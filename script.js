'use strict';
// please do not delete the 'use strict' line above

const body = document.querySelector("body");
const colorButton = document.getElementById('color-button');
colorButton.addEventListener('click', changeColor);

const span1 = document.createElement("span");
span1.innerText = "click me!";

const span2 = document.createElement("span");
span2.innerText = "click me!";

const div1 = document.createElement("div");
div1.style.height = "100px";
div1.style.width = "100px";
div1.style.fontSize = "20px";
div1.style.border = "solid black";
div1.style.marginRight = "100px";
div1.style.display = "flex";
div1.style.alignItems = "center";
div1.style.justifyContent = "center";
div1.style.visibility = "hidden";
body.prepend(div1);
div1.appendChild(span1);
div1.addEventListener("click",turnOrBound1);

const div2 = document.createElement("div");
div2.style.height = "100px";
div2.style.width = "100px";
div2.style.fontSize = "20px";
div2.style.border = "solid black";
div2.style.marginLeft = "100px";
div2.style.display = "flex";
div2.style.alignItems = "center";
div2.style.justifyContent = "center";
div2.style.visibility = "hidden";
body.appendChild(div2);
div2.appendChild(span2);
div2.addEventListener("click",turnOrBound2);

let counter = 0;

function changeColor() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);
  body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

  counter++;
  colorButton.innerText = `Change color 【${counter}】`;
  colorButton.style.fontSize = "20px";
  
  if (counter === 2) {
    div1.style.visibility = "visible";
    div2.style.visibility = "visible";
    div1.style.borderRadius = "100px";
    div2.style.borderRadius = "100px";
    div1.style.backgroundColor = "blue";
    div2.style.backgroundColor = "blue";
  } else if (counter % 2 === 1) {
    div1.style.borderRadius = "0px";
    div2.style.borderRadius = "0px";
    div1.style.backgroundColor = "red";
    div2.style.backgroundColor = "red";
  } else if (counter % 2 === 0) {
    div1.style.borderRadius = "100px";
    div2.style.borderRadius = "100px";
    div1.style.backgroundColor = "blue";
    div2.style.backgroundColor = "blue";
  }
  if (counter > 1) {
    div1.animate(
      [
        { transform: "translateX(-200px)"},
        { transform: "translateY(200px)"},
        { transform: "translateY(0px)"}
      ],
      {
        duration: 2000,
        iterations: 1,
        easing : "ease-out",
      }
    );
    div2.animate(
      [
        { transform: "translateX(200px)"},
        { transform: "translateY(-200px)"},
        { transform: "translateY(0px)"}
      ],
      {
        duration: 2000,
        iterations: 1,
        easing : "ease-out",
      }
    );
  }
}

function turnOrBound1() {
  if (div1.style.borderRadius === "0px") {
    div1.animate(
      [
        {transform: "rotateZ(360deg) translateX(0)"},
        {transform: "rotateZ(180deg) translateX(20vw)"},
        {transform: "rotateZ(0deg) translateX(0)"}
      ],
      {
        duration: 2000,
        iterations: 1,
      }
    );
  } else {
    div1.animate(
      [
        { transform: "translatey(-300px) scale(0.2, 1.5)"},
        { transform: "translateY(300px)"},
        { transform: "scale(0.6, 1.1)"},
        { transform: "scale(1.5, 0.2)"},
        { transform: "translateY(0px) scale(1)"}
      ],
      {
        duration: 2000,
        iterations: 1,
        easing : "ease-in",
      }
    );
  }
}

function turnOrBound2() {
  if (div2.style.borderRadius === "0px") {
    div2.animate(
      [
        {transform: "rotateZ(-360deg) translateX(0px)"},
        {transform: "rotateZ(-180deg) translateX(-20vw)"},
        {transform: "rotateZ(0deg) translateX(0px)"}
      ],
      {
        duration: 2000,
        iterations: 1,
      }
    );
  } else {
    div2.animate(
      [
        { transform: "translatey(-300px) scale(0.2, 1.5)"},
        { transform: "translateY(300px)"},
        { transform: "scale(0.6, 1.1)"},
        { transform: "scale(1.5, 0.2)"},
        { transform: "translateY(0px) scale(1)"}
      ],
      {
        duration: 2000,
        iterations: 1,
        easing : "ease-in",
      }
    );
  }
}

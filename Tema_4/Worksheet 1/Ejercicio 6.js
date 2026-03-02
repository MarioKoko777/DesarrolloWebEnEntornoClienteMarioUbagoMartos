const logo = document.querySelector("img");
logo.onmouseover = () => {
    logo.src = "logo 2.png";
}
logo.onmouseout = () => {
    logo.src = "logo 1.png";
}
const codigos = document.querySelectorAll(".codigo");
for(let i = 0; i < codigos.length; i++){
    codigos[i].addEventListener("mouseover", () => {
        codigos[i].style.color = codigos[i].textContent;
    });
    codigos[i].addEventListener("mouseout", () => {
        codigos[i].style.color = "black";
        codigos[i].textContent = codigos[i].id;
    });
}
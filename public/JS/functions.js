function plus(id) {
    let display = document.getElementById(id);
    let span = display.children[0].children[0];
    span.innerText = "";
    let input = display.children[0].children[1];
    input.type = "text";
    if (input.value < 4){
    let newValue = String(parseInt(input.value) + 1);
    display.children[0].children[1].value = newValue;
    }
}

function minus(id) {
    let display = document.getElementById(id);
    let span = display.children[0].children[0];
    span.innerText = "";
    let input = display.children[0].children[1];
    input.type = "text";
    if (input.value > 0){
        let newValue = String(parseInt(input.value) - 1);
        display.children[0].children[1].value = newValue;
    }
}

function plusSearch(id) {
    // alert("shut up");
    let display = document.querySelector("input.number-of-cards");
    if (display.value < 4){
        let newValue = String(parseInt(display.value) + 1);
        display.value = newValue;
    } 
}

function minusSearch(id) {
    let display = document.querySelector("input.number-of-cards");
    if (display.value > 1){
        let newValue = String(parseInt(display.value) - 1);
        display.value = newValue;
    }
}

onload = () => {
    let numbers = document.querySelectorAll(".number-show");
    let total = 0;
    numbers.forEach((n) => {
        total += parseInt(n.innerHTML);
    });

    let display = document.querySelector(".dashboard");
    display.innerText = "Cards: " + total;
}
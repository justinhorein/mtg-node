function plus() {
    let display = document.querySelector(".number-show");
    display.innerText = "";
    let input = document.querySelector(".number-display");
    input.type = "text";
    if (input.value < 4){
    let newValue = String(parseInt(input.value) + 1);
    input.value = newValue;
    }
}

function minus() {
    let display = document.querySelector(".number-show");
    display.innerText = "";
    let input = document.querySelector(".number-display");
    input.type = "text";
    if (input.value > 0){
        let newValue = String(parseInt(input.value) - 1);
        input.value = newValue;
    }
}
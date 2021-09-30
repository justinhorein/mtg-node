function plus(id) {
    let display = document.getElementById(id);
    let span = display.children[0];
    span.innerText = "";
    let input = display.children[1];
    input.type = "text";
    if (input.value < 4){
    let newValue = String(parseInt(input.value) + 1);
    display.children[1].value = newValue;
    }
}

function minus(id) {
    let display = document.getElementById(id);
    let span = display.children[0];
    span.innerText = "";
    let input = display.children[1];
    input.type = "text";
    if (input.value > 0){
        let newValue = String(parseInt(input.value) - 1);
        display.children[1].value = newValue;
    }
}
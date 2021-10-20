function plusSearch(img) {
    let container = document.getElementById(img);
    let display = container.children[1].children[0].children[1]
    if (display.value < 4){
        let newValue = String(parseInt(display.value) + 1);
        display.value = newValue;
    } 
}

function minusSearch(img) {
    let container = document.getElementById(img);
    let display = container.children[1].children[0].children[1]
    if (display.value > 1){
        let newValue = String(parseInt(display.value) - 1);
        display.value = newValue;
    }
}

function hideCard(img) {
    let card = document.getElementById(img);
    card.style.display = "none";
    let message = document.querySelector(".message");
    message.style.display = "none";
}
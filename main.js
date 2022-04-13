const b_block = 1;
const w_block = 0;
let turn = b_block;


// Start_Button
const start = document.getElementById("start");
const start_screen = document.querySelector(".start_screen");
start.addEventListener(`click`, ()=>{
    start_screen.classList.remove("show");
})

//Block Status


// Create div on click
const div_click = document.querySelector(".table_block");
div_click.addEventListener(`click`, ()=>{
    if(turn===1) {
        black_block();
        turn = w_block;
    }
    else {
        white_block();
        turn = b_block;    
    }
})


//function
function white_block() {
    document.querySelector(".table_block").innerHTML = `<div class="white_block"><div>`;
} 

function black_block() {
    document.querySelector(".table_block").innerHTML = `<div class="black_block"><div>`;
}


const b_block = 1;
const w_block = 0;
let turn = b_block;

//elemnet
const start = document.getElementById("start");
const start_screen = document.querySelector(".start_screen");
const table_block_all = document.querySelectorAll(".table_block");
const toggle_switch = document.getElementById("switch");

// Start_Button
start.addEventListener(`click`, ()=>{
    start_screen.classList.remove("show");
})

//Block Status

// Create div on click //getElementsByClassName(table_block)
table_block_all.forEach((stone,index,stone_all)=>{
    stone.addEventListener(`click`,()=>{
        if(stone.innerHTML !="") {
            return;
        }
        
        if(turn===1) {
        stone.innerHTML = `<div class="black_stone"><div>`;
        turn = w_block; 
        }
        else {
        stone.innerHTML = `<div class="white_stone"><div>`;
        turn = b_block; 
        }
        toggle_switch.click(); 
    })
});

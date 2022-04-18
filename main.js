/* Stone conditions */
const b_block = 1;
const w_block = 0;
let turn = b_block;

/* elemnet */
const table_block_all = document.querySelectorAll(".table_block");
const toggle_switch = document.getElementById("switch");
const result_screen = document.querySelector(".result_screen");


/* Stone color Div Element */
const div_b_stone = `<div class="black_stone" id="stone"><div>`;
const div_w_stone = `<div class="white_stone" id="stone"><div>`;

/* Start Button */
const start = document.getElementById("start");
const start_screen = document.querySelector(".start_screen");
start.addEventListener(`click`, ()=>{
    start_screen.classList.remove("show");
})


/* Create div on click */
table_block_all.forEach((stone,index,stone_all)=>{
    stone.addEventListener(`click`, ()=>{
        
        if(count_b_stone+count_w_stone===64){ //End game
            game_result_screen();
        }
        else{ 
            //There is already a stone
            if(stone.innerHTML !="") {
                return;
            }
            //Change the turn
            if(turn===1) {
            stone.innerHTML = `<div class="black_stone" id="stone"><div>`;
            turn = w_block; 
            }
            else {
            stone.innerHTML = `<div class="white_stone" id="stone"><div>`;
            turn = b_block; 
            }
            toggle_switch.click();
        }
    })
});

//Game End Conditions (1. no place to put a stone)
let count_b_stone = document.querySelectorAll(".black_stoen").length;
let count_w_stone = document.querySelectorAll(".white_stoen").length;


//Game End Conditions (2. If stone pass each other once)


//Reset Button
const reset_btn = document.querySelector(".reset_btn");
reset_btn.addEventListener("click", ()=>{
    reset_restart_game();
});

//Reset/Restart_function
function reset_restart_game(){
    let reset_b_stone = document.querySelectorAll(".black_stone");
    let reset_w_stone = document.querySelectorAll(".white_stone");
    reset_b_stone.forEach((reset_b_stone,index,reset_b_stone_all) => {
        reset_b_stone.remove();
    })
    reset_w_stone.forEach((reset_w_stone,index,reset_w_stone_all) => {
        reset_w_stone.remove();
    })
    table_block_all[27].innerHTML = div_w_stone;
    table_block_all[28].innerHTML = div_b_stone;
    table_block_all[35].innerHTML = div_b_stone;
    table_block_all[36].innerHTML = div_w_stone;
    if(turn === 0){
        toggle_switch.click();
    }
    turn = b_block;
}



//Hint Button
const hint_btn = document.querySelector(".hint_btn")
hint_btn.addEventListener(`click`, ()=> {
    
});

//Game end
function game_result_screen() {

}

/* <-- Game Screen --> */

/* Stone conditions */
const WHITE = 0; // WHITE
const BLACK = 1; //BLACK
let turn = BLACK;
let stone_conditions;

/* elemnet */
const table_block_all = document.querySelectorAll(".table_block");
const toggle_switch = document.getElementById("switch");

/* Start Button */
const start = document.getElementById("start");
const start_screen = document.querySelector(".start_screen");
start.addEventListener(`click`, () => {
  start_screen.classList.remove("show");
});

/* Restart Button */
const restart = document.getElementById("restart");
restart.addEventListener(`click`, () => {
  reset_restart_game();
  result_screen.classList.add("show");
});

/* Create div on click */
table_block_all.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.innerHTML != "") {
      return;
    }
    if(turn===1){
      stone_conditions = b_stand;
    } else{
      stone_conditions = w_stand;
    }
    // x,y noshutoku
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;

    // left, right,top, bottom, top-left, top-right, bottom-right, bottom-left,
    rule_check(x, y);
    // 石を置けれるかの敬

    // if OK, ishi wo oku.
    console.log(stone, x, y);

    //Change the turn
    if (turn === 1) {
      stone.innerHTML = `<div class="black_stone" id="stone"><div>`;
      turn = WHITE;
    } else {
      stone.innerHTML = `<div class="white_stone" id="stone"><div>`;
      turn = BLACK;
    }

    toggle_switch.click();
  });
});

//Reset Button
const reset_btn = document.querySelector(".reset_btn");
reset_btn.addEventListener("click", () => {
  reset_restart_game();
});

//Reset/Restart_function
const div_w_stone = `<div class="white_stone" id="stone"><div>`;
const div_b_stone = `<div class="black_stone" id="stone"><div>`;
function reset_restart_game() {
  let reset_b_stone = document.querySelectorAll(".black_stone");
  let reset_w_stone = document.querySelectorAll(".white_stone");
  reset_b_stone.forEach((reset_b_stone, index, reset_b_stone_all) => {
    reset_b_stone.remove();
  });
  reset_w_stone.forEach((reset_w_stone, index, reset_w_stone_all) => {
    reset_w_stone.remove();
  });
  table_block_all[27].innerHTML = div_w_stone;
  table_block_all[28].innerHTML = div_b_stone;
  table_block_all[35].innerHTML = div_b_stone;
  table_block_all[36].innerHTML = div_w_stone;
  if (turn === 0) {
    toggle_switch.click();
  }
  turn = BLACK;
}

//Hint Button
const hint_btn = document.querySelector(".hint_btn");
hint_btn.addEventListener(`click`, () => {});

//Game end
const result_screen = document.getElementById("result_screen");
function game_result_screen() {
  result_screen.classList.remove("show");
}

/* <-- Game rule  --> */
const w_stand = '<td class="table_block"><div class="white_stone"></div></td>';
const b_stand = '<td class="table_block"><div class="black_stone"></div></td>';

function rule_check(x, y) {
  north(x, y);
  south(x, y);
  east(x, y);
  west(x, y);
  north_e(x, y);
  north_w(x, y);
  south_e(x, y);
  south_w(x, y);
}

//Top
function north(x, y) {
  if (y === 0) {
    return;
  } else {
  }
}

//Bottom
function south(x, y) {
  if (y === 7) {
    return;
  } else {
  }
}

//Right
function east(x, y) {
  if (x === 7) {
    return;
  } else {
    
  }
}

//Left
function west(x, y) {
  if (x === 0) {
    return;
  } else {
  }
}

//Top Right
function north_e(x, y) {
  if ((x, y) === (7, 0)) {
    return;
  } else {
  }
}

//Top Left
function north_w(x, y) {
  if ((x, y) === (0, 0)) {
    return;
  } else {
  }
}

//Bottom right
function south_e(x, y) {
  if ((x, y) === (7, 7)) {
    return;
  } else {
  }
}

//Bottom Left
function south_w(x, y) {
  if ((x, y) === (0, 7)) {
    return;
  } else {
  }
}

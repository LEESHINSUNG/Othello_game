/* <-- Game Screen --> */

/* Stone conditions */
const WHITE = 0; // WHITE
const BLACK = 1; //BLACK
let turn = BLACK;
const w_stand = '<td class="table_block"><div class="white_stone"></div></td>';
const b_stand = '<td class="table_block"><div class="black_stone"></div></td>';
let stone_conditions = b_stand;

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

// /* Create div on click */
table_block_all.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.innerHTML != "") {
      return;
    }

    // x,y noshutoku
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;
    

    // left, right,top, bottom, top-left, top-right, bottom-right, bottom-left,

    // Check inside
    const checkInside = (x, y) => {
      const tbody = document.querySelector("tbody");
      const element = tbody.children[y].children[x];
      console.log(element);
    };
    // 石を置けれるかの敬

    //Change the turn
    function change_turn() {
      if (turn === 1) {
        stone.innerHTML = `<div class="black_stone"></div>`;
        turn = WHITE;
        stone_conditions = w_stand;
      } else {
        stone.innerHTML = `<div class="white_stone"></div>`;
        turn = BLACK;
        stone_conditions = b_stand;
      }
      toggle_switch.click();
    }

    // check right
    for (let row = x+1; row<=7; row++) {
      console.log(row,y);
      checkInside(row,y);
    }
  
  // check left
    for (let row = x-1; row >= 0; row--) {
      console.log(row, y);
      checkInside(row, y);
    }
  

  // check top
    for (let col = y-1 ; col>=0 ;col--){
      console.log(x,col);
      checkInside(x,col);
    }

  // check bottom
  for (let col = y+1; col<=7; col++) {
    console.log(x,col);
    checkInside(x,col);
  }

  // check top right
    for (let row = x + 1; row <= 7; row++) {
      for (let col = y - 1; col >= 0; col--) {
        if(x+y===row+col){
          console.log(row, col);
          checkInside(row, col);
        }
      }
    }

  // check bottom left
    for (let row = x - 1; row >= 0; row--) {
      for (let col = y + 1; col <= 7; col++) {
        if(x+y===row+col){
          console.log(row, col);
          checkInside(row, col);
        }
      }
    }

        // check top left
    for (let row = x - 1; row>=0; row--){
      for(let col = y - 1; col >=0; col--){
      if(y-x === col-row) {
          console.log(row, col);
          checkInside(row, col);
        }
      }
    }

  // check bottom right
    for(let row = x + 1; row <= 7; row++){
      for(let col = y+1; col <=7; col++){
        if(y-x === col-row){
          console.log(row, col);
          checkInside(row, col);
        }
      }
    }
  });
});

//Reset Button
const reset_btn = document.querySelector(".reset_btn");
reset_btn.addEventListener("click", () => {
  reset_restart_game();
});

//Reset/Restart_function
const div_w_stone = `<div class="white_stone"></div>`;
const div_b_stone = `<div class="black_stone"></div>`;
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
  stone_conditions = b_stand;
}

//Hint Button
const hint_btn = document.querySelector(".hint_btn");
hint_btn.addEventListener(`click`, () => {});

//Game end
const result_screen = document.getElementById("result_screen");
function game_result_screen() {
  result_screen.classList.remove("show");
}




//  // check right
// function checkRight(x,y) {
//   console.log(`Right x : `,x);
//   console.log(`Right y : `,y);
//   for (let row = x+1; row<=7; row++) {
//     console.log(row,y);
//     checkInside(row,y);
//   }
//   console.log(`Inside row : `,row);
//   console.log(`Inside y : `,y);
// }

// // check left
// function checkLeft(x,y) {
//   for (let row = x-1; row >= 0; row--) {
//     console.log(row, y);
//     checkInside(row, y);
//   }
// }

// // check top
// function checkTop(x,y) {
//   for (let col=y-1 ; col>=0 ;col--){
//     console.log(x,index);
//     checkInside(x,index);
//   }
// }

// // check bottom
// function checkBottom(x,y) {
//   for (let col =y+1; col<=7; col++){
//     console.log(x,index);
//     checkInside(x,index);
//   }
// }

// // check top right
// function checkTopRight(x,y) {
//   for (let row = x + 1; row <= 7; row++) {
//     for (let col = y - 1; col >= 0; col--) {
//       if(x+y===row+col){
//         console.log(row, col);
//         checkInside(row, col);
//       }
//     }
//   }
// }

// // check bottom left
// function checkBottomLeft(x,y) {
//   for (let row = x - 1; row >= 0; row--) {
//     for (let col = y + 1; col <= 7; col++) {
//       if(x+y===row+col){
//         console.log(row, col);
//         checkInside(row, col);
//       }
//     }
//   }
// }

//       // check top left
// function checkTopLeft(x,y) {
//   for (let row = x - 1; row>=0; row--){
//     for(let col = y - 1; col >=0; col--){
//     if(y-x === col-row) {
//         console.log(row, col);
//         checkInside(row, col);
//       }
//     }
//   }
// }

// // check bottom right
// function checkBottomRight(x,y) {
//   for(let row = x + 1; row <= 7; row++){
//     for(let col = y+1; col <=7; col++){
//       if(y-x === col-row){
//         console.log(row, col);
//         checkInside(row, col);
//       }
//     }
//   }
// }
/* <-- Game Screen --> */
//  Stone conditions
const WHITE = 0; // WHITE
const BLACK = 1; //BLACK
let turn = BLACK; // 'black'

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

//Change the turn
function change_turn() {
  if (turn === BLACK) {
    turn = WHITE;
  } else {
    turn = BLACK;
  }
}

function currentColor() {
  return turn === BLACK ? "black" : "white";
}


// /* Create div on click */
table_block_all.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.className!== "table_block") {
      console.log("mushi sareta");
      return;
    }

    // x,y noshutoku
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;
    const tbody = document.querySelector("tbody");
    const putStone = tbody.children[y].children[x];
    console.log(putStone);
    console.log(`click Position : ${x}, ${y}`); // クリックしたポジションのチェック用


    checkRight(x,y);
    checkLeft(x,y);
    checkTop(x,y);
    checkBottom(x,y);
    if(turn === BLACK) {
      putStone.classList.add("black");
      turn = WHITE;
      toggle_switch.click();
    }else{
      putStone.classList.add("white");
      turn = BLACK;
      toggle_switch.click();
    }
    // checkTopRight(x,y);

    // // check right
    // for (let row = x + 1; row <= 7; row++) {
    //   let td = tbody.children[y].children[row];
    //   console.log("rightRoof : ", [row, y]);
    //   if(td.classList.contains(currentColor())){
    //     cehckRight(row,y);
    //     break;
    //   }
    // }

    // function cehckRight(row,y){
    //   for(let row_r = row - 1; row_r > x; row_r--) {
    //   console.log("change color :", [row_r, y]);
    //     let chagnePosition = tbody.children[y].children[row_r];
    //     if (turn === BLACK) {
    //       chagnePosition.classList.remove("white");
    //       chagnePosition.classList.add("black");
    //     } else {
    //       chagnePosition.classList.remove("black");
    //       chagnePosition.classList.add("white");
    //     }
    //   }
    // }

    // // // check left
    // for (let row = x - 1; row >= 0; row--) {
    //   let td = tbody.children[y].children[row];
    //   console.log("leftRoof : ", [row, y]);
    //   if (td.classList.contains(currentColor())) {
    //     console.log("Same color : ", [row, y]);
    //     checkLeft(row,y);
    //     break;
    //   }
    // }
    // function checkLeft(row,y){
    //   for (let row_l = row + 1; row_l < x; row_l++) {
    //     console.log("change color :", [row_l, y]);
    //     let chagnePosition = tbody.children[y].children[row_l];
    //     if (turn === BLACK) {
    //       chagnePosition.classList.remove("white");
    //       chagnePosition.classList.add("black");
    //     } else {
    //       chagnePosition.classList.remove("black");
    //       chagnePosition.classList.add("white");
    //     }
    //   }
    // }
    

    

    // // check top
    // for (let col = y - 1; col >= 0; col--) {
    //   let td = tbody.children[col].children[x];
    //   console.log("Roof : ",[x,col]);
    //   if(td.classList.contains(currentColor())){
    //     console.log("Same color : ", [x, col]);
    //     checkTop(x,col);
    //     break;
    //   }
    // }
    // function checkTop(x,col){
    //   for(let col_t = col+1;col_t < y; col_t++){
    //     console.log("change color :", [x, col_t]);
    //     let chagnePosition = tbody.children[col_t].children[x];
    //     if (turn === BLACK) {
    //       chagnePosition.classList.remove("white");
    //       chagnePosition.classList.add("black");
    //     } else {
    //       chagnePosition.classList.remove("black");
    //       chagnePosition.classList.add("white");
    //     }
    //   }
    // }


    // console.log("PUT")
    // console.log(putStone);
    // if(turn === BLACK){
    //   putStone.classList.add("balck");
    // }else {
    //   putStone.classList.add("white");
    // }
    // console.log("PUT")







    // // check bottom
    // for (let col = y + 1; col <= 7; col++) {
    //   console.log(x, col);
    // }

    // // check top right
    // for (let row = x + 1; row <= 7; row++) {
    //   for (let col = y - 1; col >= 0; col--) {
    //     if (x + y === row + col) {
    //       console.log(row, col);
    //     }
    //   }
    // }

    // // check bottom left
    // for (let row = x - 1; row >= 0; row--) {
    //   for (let col = y + 1; col <= 7; col++) {
    //     if (x + y === row + col) {
    //       console.log(row, col);
    //     }
    //   }
    // }

    // // check top left
    // for (let row = x - 1; row >= 0; row--) {
    //   for (let col = y - 1; col >= 0; col--) {
    //     if (y - x === col - row) {
    //       console.log(row, col);
    //     }
    //   }
    // }

    // // check bottom right
    // for (let row = x + 1; row <= 7; row++) {
    //   for (let col = y + 1; col <= 7; col++) {
    //     if (y - x === col - row) {
    //       console.log(row, col);
    //     }
    //   }
    // }

    // 石を置けれるかの敬
  });
});

function checkRight(x,y){
  if(x===7){
    return;
  }else{
    for(let row = x+1; row<=7; row++){
      const tbody = document.querySelector("tbody");
      let td = tbody.children[y].children[row];
      console.log("Right Roof : ", [row, y]);
      if(td.classList.contains(currentColor())){
        for(row_r = row-1; row_r>x; row_r--){
        console.log("change color :", [row_r, y]);
        let chagnePosition = tbody.children[y].children[row_r];
          if (turn === BLACK) {
            console
            chagnePosition.classList.remove("white");
            chagnePosition.classList.add("black");
          } else {
            chagnePosition.classList.remove("black");
            chagnePosition.classList.add("white");
          }
        }
        break;
      }
    }
  }
  
}

function checkLeft(x,y) {
  for (let row = x - 1; row >= 0; row--){
    const tbody = document.querySelector("tbody");
    let td = tbody.children[y].children[row];
    console.log("Left Roof : ", [row, y]);
    if(td.classList.contains(currentColor())){
      for (let row_l = row + 1; row_l < x; row_l++){
        console.log("change color :", [row_l, y]);
        let chagnePosition = tbody.children[y].children[row_l];
        if (turn === BLACK) {
          chagnePosition.classList.remove("white");
          chagnePosition.classList.add("black");
        } else {
          chagnePosition.classList.remove("black");
          chagnePosition.classList.add("white");
        }
      }
      break;
    }
  }
}

function checkTop(x,y) {
  for (let col = y - 1; col >= 0; col--) {
    const tbody = document.querySelector("tbody");
    let td = tbody.children[col].children[x];
    console.log("Top Roof: ",[x,col]);
    if(td.classList.contains(currentColor())){
      console.log("Same color : ", [x, col]);
      for(let col_t = col+1;col_t < y; col_t++){
        console.log("change color :", [x, col_t]);
        let chagnePosition = tbody.children[col_t].children[x];
        if (turn === BLACK) {
          chagnePosition.classList.remove("white");
          chagnePosition.classList.add("black");
        } else {
          chagnePosition.classList.remove("black");
          chagnePosition.classList.add("white");
        }
      }
      break;
    }
  }
}

function checkBottom(x,y) {
  const tbody = document.querySelector("tbody");
  for(let col = y+1; col <=7; col++) {
    let td = tbody.children[col].children[x];
    console.log("Bottom Roof: ",[x,col]);
    if(td.classList.contains(currentColor())){
      console.log("Same color : ", [x, col]);
      for(let col_b = col-1;col_b > y; col_b--){
        console.log("change color :", [x, col_b]);
        let chagnePosition = tbody.children[col_b].children[x];
        if (turn === BLACK) {
          chagnePosition.classList.remove("white");
          chagnePosition.classList.add("black");
        } else {
          chagnePosition.classList.remove("black");
          chagnePosition.classList.add("white");
        }
      }
      break;
    }
  }
}


function checkTopRight(x,y) {
  const tbody = document.querySelector("tbody");
  for (let row = x + 1; row <= 7; row++) {
    for (let col = y - 1; col >= 0; col--) {
      if (x + y === row + col) {
        let td = tbody.children[col].children[row];
        if(td.classList.contains(currentColor)){
          for(let row_r=row-1; row_r>x; row--){
            for(let col_r=col+1; col_r<y; col_r++){
              if(x+y == row_r+col_r){
                let chagnePosition = tbody.children[col_r].children[row_r];
                if (turn === BLACK) {
                  chagnePosition.classList.remove("white");
                  chagnePosition.classList.add("black");
                } else {
                  chagnePosition.classList.remove("black");
                  chagnePosition.classList.add("white");
                }
              }
            }
          }
        }
      }
    }
  }
}



//Reset Button
const reset_btn = document.querySelector(".reset_btn");
reset_btn.addEventListener("click", () => {
  reset_restart_game();
});

//Reset/Restart_function
function reset_restart_game() {
  const allBlackStone = document.querySelectorAll(".black");
  const allWhiteStone = document.querySelectorAll(".white");
  allBlackStone.forEach((allBlackStone, index, removeAllBlackStone) => {
    allBlackStone.classList.remove("black");
  });
  allWhiteStone.forEach((allWhiteStone, index, removeAllWhiteStone) => {
    allWhiteStone.classList.remove("white");
  });
  table_block_all[27].classList.add("white");
  table_block_all[28].classList.add("black");
  table_block_all[35].classList.add("black");
  table_block_all[36].classList.add("white");
  if(turn === WHITE){
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


/* <-- Game Screen --> */
// Stone Color 石の色
const WHITE = 0; // WHITE
const BLACK = 1; //BLACK
let turn = BLACK; // 'black'

/* Change turn */
const toggle_switch = document.getElementById("switch"); // 誰のターンなのか

function change_turn() {
  if (turn === BLACK) {
    turn = WHITE;
  } else {
    turn = BLACK;
  }
}

/* Gmae table ゲームテーブル */
const table_block_all = document.querySelectorAll(".table_block");



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



function currentColor() {
  return turn === BLACK ? "black" : "white";
}

// /* Create div on click */
table_block_all.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.className !== "table_block") {
      console.log("無視");
      return;
    }

    // x,y noshutoku
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;
    const tbody = document.querySelector("tbody");
    const putStone = tbody.children[y].children[x];
    console.log(`click Position : ${x}, ${y}`); // クリックしたポジションのチェック用

    const Right = checkRight(x, y);
    const Left = checkLeft(x, y);
    const Top = checkTop(x, y);
    const Bottom = checkBottom(x, y);
    const TopRight = checkTopRight(x, y);
    const TopLeft = checkTopLeft(x, y);
    const BottomRight = checkBottomRight(x, y);
    const BottomLeft = checkBottomLeft(x, y);

    //
    if (
      Right == 1 ||
      Left == 1 ||
      Top == 1 ||
      Bottom == 1 ||
      TopRight == 1 ||
      TopLeft == 1 ||
      BottomRight == 1 ||
      BottomLeft == 1
    ) {
      if (turn === BLACK) {
        console.log("Turn was black");
        putStone.classList.add("black");
        turn = WHITE;
        toggle_switch.click();
      } else {
        console.log("Turn was white");
        putStone.classList.add("white");
        turn = BLACK;
        toggle_switch.click();
      }
    }


    // 新しいプレイヤーは何か所に置けれるかを敬さん
    const count = countPlaces()

    if (count == 0) switchPlayer()

  });
});


function countPlaces(){
  const color = currentColor()
  const currentPlayerList = tbody.querySelectorAll(`td.${color}`)
  let count = 0

  for (const td of currentPlayerList) {
    count ++  
  }


  return 5
}


function reverse(td) {
  if (turn === BLACK) {
    td.classList.remove("white");
    td.classList.add("black");
  } else {
    td.classList.remove("black");
    td.classList.add("white");
  }
}

function checkRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x + 1; row <= 7; row++) {
    let td = tbody.children[y].children[row];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (row_r = row - 1; row_r > x; row_r--) {
        let changePosition = tbody.children[y].children[row_r];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    let td = tbody.children[y].children[row];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let row_l = row + 1; row_l < x; row_l++) {
        let changePosition = tbody.children[y].children[row_l];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkTop(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let col = y - 1; col >= 0; col--) {
    let td = tbody.children[col].children[x];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let col_t = col + 1; col_t < y; col_t++) {
        let changePosition = tbody.children[col_t].children[x];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkBottom(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let col = y + 1; col <= 7; col++) {
    let td = tbody.children[col].children[x];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let col_b = col - 1; col_b > y; col_b--) {
        let changePosition = tbody.children[col_b].children[x];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkTopRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x + 1; row <= 7; row++) {
    for (let col = y - 1; col >= 0; col--) {
      if (x + y === row + col) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
          for (let col_r = col + 1; col_r < y; col_r++) {
            for (let row_r = row - 1; row_r > x; row_r--) {
              if (x + y == row_r + col_r) {
                let changePosition = tbody.children[col_r].children[row_r];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
}

function checkBottomLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    for (let col = y + 1; col <= 7; col++) {
      if (x + y === row + col) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
          for (let col_l = col - 1; col_l > y; col_l--) {
            for (let row_l = row + 1; row_l < x; row_l++) {
              if (x + y == row_l + col_l) {
                let changePosition = tbody.children[col_l].children[row_l];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
}

function checkTopLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    for (let col = y - 1; col >= 0; col--) {
      if (y - x === col - row) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
          for (let col_l = col + 1; col_l < y; col_l++) {
            for (let row_l = row + 1; row_l < x; row_l++) {
              if (y - x === col_l - row_l) {
                let changePosition = tbody.children[col_l].children[row_l];
                reverse(changePosition);
              }
            }
          }
          return 1;
        }
      }
    }
  }
}

function checkBottomRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x + 1; row <= 7; row++) {
    for (let col = y + 1; col <= 7; col++) {
      if (y - x === col - row) {
        let td = tbody.children[col].children[row];
        if (td.className == "table_block") return 0;
        if (!td.classList.contains(currentColor())) {
          hasAnyOppositeColor = true;
        }
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false) return 0;
        if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
          for (let col_r = col - 1; col_r > y; col_r--) {
            for (let row_r = row - 1; row_r > x; row_r--) {
              if (col - row === col_r - row_r) {
                let changePosition = tbody.children[col_r].children[row_r];
                reverse(changePosition);
              }
            }
          }
          return 1;
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
  if (turn === WHITE) {
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

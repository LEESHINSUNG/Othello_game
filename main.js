/* <-- Start Scren --> */

// Start Button スタートボタン
function startBtn() {
  const start_screen = document.querySelector(".start_screen");
  start_screen.classList.remove("show");
}

/* <-- Game Screen --> */

/* Gmae table ゲームテーブル */
const gameBoard = document.querySelectorAll("td");
// const table_block_all = document.querySelectorAll(".table_block");

// Stone Color 石の色
const whoIsturn = document.getElementById("switch");
// if(whoIsturn.checked === 1) {
//turn が白
// } else {
// turn が黒
// }

const BLACK = 1; //BLACK
const WHITE = 0; // WHITE
let turn = BLACK; // 'black'

// Turn condition (toggle switch) 誰のターンなのか
const toggle_switch = document.getElementById("switch");

function currentColor() {
  return whoIsturn.checked !== 1  ? "black" : "white";
}
// function currentColor() {
//   return turn === BLACK ? "black" : "white";
// }

// Game score & result
const scoreWhite = document.getElementById("white_score"); // (game screen　ゲームスクリーン)
const scoreBlack = document.getElementById("black_score");
const scoreWhiteResult = document.getElementById("white_score_result"); // (result screen　結果スクリーン)
const scoreBlackResult = document.getElementById("black_score_result");
const winner = document.getElementById("victory_cat");

// Restart Button
function restart() {
  reset_restart_game();
  result_screen.classList.remove("show");
}

// countPlaces(); => hintで使う予定

// Put stone on the table 石を置くためマスをクリック
gameBoard.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.className !== "") {
      alert("もう石があります");
      return;
    }

    // Position of stones (x,y) 石の位置
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;
    const tbody = document.querySelector("tbody");
    const putStone = tbody.children[y].children[x];
    console.log(`click Position : ${x}, ${y}`); // クリックしたポジションのチェック用

    // Reverse color 色を変える（石を裏返す）

    const Right = checkRight(x, y);
    // const Left = checkLeft(x, y);
    // const Top = checkTop(x, y);
    // const Bottom = checkBottom(x, y);
    // const TopRight = checkTopRight(x, y);
    // const TopLeft = checkTopLeft(x, y);
    // const BottomRight = checkBottomRight(x, y);
    // const BottomLeft = checkBottomLeft(x, y);

    if (
      Right == 1 
      // Left == 1 ||
      // Top == 1 ||
      // Bottom == 1 ||
      // TopRight == 1 ||
      // TopLeft == 1 ||
      // BottomRight == 1 ||
      // BottomLeft == 1
    ) {
      if (!whoIsturn.checked) {
        putStone.classList.add("black"); //　黒石を置く
        toggle_switch.click();
      } else {
        putStone.classList.add("white"); // 白石を置く
        toggle_switch.click();
      }
      console.log(whoIsturn.checked);
      // if (turn === BLACK) {
      //   putStone.classList.add("black"); //　黒石を置く
      //   turn = WHITE;
      //   toggle_switch.click();
      // } else {
      //   putStone.classList.add("white"); // 白石を置く
      //   turn = BLACK;
      //   toggle_switch.click();
      // }
    }

    // 色の数を表示（モニタリング）
    socreCheck(tbody);

    // 新しいプレイヤーは何か所に置けれるかを敬さん
    const count = countPlaces();
    return;
    // 自動パス
    if (count === 0) {
      if (turn === BLACK) {
        alert("置く場所がないのでパスします");
        turn = WHITE;
        toggle_switch.click();
        countPlaces();
        if (count == 0) {
          // お互いに1回ずつ自動パスしたらゲーム終了
          alert("お互いに1回ずつパスしましたので終了します");
          game_result_screen(tbody);
          return 0;
        }
      } else {
        alert("置く場所がないのでパスします");
        turn = BLACK;
        toggle_switch.click();
        if (count == 0) {
          alert("お互いに1回ずつパスしましたので終了します");
          game_result_screen(tbody);
          return 0;
        }
      }
      alert("置く場所なし");
    }
  });
});

function socreCheck(tbody) {
  const scoreWhiteCount = tbody.querySelectorAll("td.white");
  const scoreBlackCount = tbody.querySelectorAll("td.black");
  scoreWhite.innerHTML = scoreWhiteCount.length;
  scoreBlack.innerHTML = scoreBlackCount.length;
  scoreWhiteResult.innerHTML = scoreWhiteCount.length;
  scoreBlackResult.innerHTML = scoreBlackCount.length;
}

// マスから位置をとる
function getXY(td) {
  const x = td.cellIndex;
  const y = td.parentElement.rowIndex;
  return [x, y];
}

function countPlaces() {
  const color = currentColor();
  const tbody = document.querySelector("tbody");
  const currentPlayerList = tbody.querySelectorAll(`td.${color}`); // [td, td, td,...]
  let count = 0; // 自動パスの確認変数

  for (const td of currentPlayerList) {
    const [x, y] = getXY(td);

    const CountR = rightCount(x, y);
    const CountL = leftCount(x, y);
    const CountT = topCount(x, y);
    const CountB = bottomCount(x, y);
    const CountTR = topRightCount(x, y);
    const CountTL = topLeftCount(x, y);
    const CountBR = bottomRightCount(x, y);
    const CountBL = bottomLeftCount(x, y);

    if (
      CountR == 1 ||
      CountL == 1 ||
      CountT == 1 ||
      CountB == 1 ||
      CountTR == 1 ||
      CountTL == 1 ||
      CountBR == 1 ||
      CountBL == 1
    ) {
      count++;
    }
  }
  return count;
}

//Reset Button
function resetBtn() {
  reset_restart_game();
}

//Hint Button
function hintBtn() {}

//Game end
const result_screen = document.getElementById("result_screen");

function game_result_screen() {
  const tbody = document.querySelector("tbody");
  const scoreWhiteCount = tbody.querySelectorAll("td.white");
  const scoreBlackCount = tbody.querySelectorAll("td.black");
  socreCheck(tbody);

  if (scoreBlackCount.length > scoreWhiteCount.length) {
    winner.innerHTML = `<img class="catWin" src="img/black-removebg.png">`;
    console.log("BLACK");
  } else if (scoreBlackCount.length < scoreWhiteCount.length) {
    winner.innerHTML = `<img class="catWin" src="img/white-removebg.png">`;
    console.log("WHITE");
  } else {
    alert("Draw");
  }

  result_screen.classList.add("show");
}

//Reverse color
function reverse(td) {
  if (turn === BLACK) {
    td.classList.remove("white");
    td.classList.add("black");
  } else {
    td.classList.remove("black");
    td.classList.add("white");
  }
}

//Reset/Restart_function
function reset_restart_game() {
  const allBlackStone = document.querySelectorAll(".black");
  const allWhiteStone = document.querySelectorAll(".white");
  const tbody = document.querySelector("tbody");
  allBlackStone.forEach((allBlackStone, index, removeAllBlackStone) => {
    allBlackStone.classList.remove("black");
  });
  allWhiteStone.forEach((allWhiteStone, index, removeAllWhiteStone) => {
    allWhiteStone.classList.remove("white");
  });
  gameBoard[27].classList.add("white");
  gameBoard[28].classList.add("black");
  gameBoard[35].classList.add("black");
  gameBoard[36].classList.add("white");
  if (turn === WHITE) {
    toggle_switch.click();
  }
  turn = BLACK;
  socreCheck(tbody);
}

//Check function (reverse color)
function checkRight(x, y) {
  const tbody = document.querySelector("tbody");
  for (let row = x + 1; row <= 7; row++) {
    let td = tbody.children[y].children[row];
    if (td.className === "") return; 
    if (!td.classList.contains(currentColor())) {
      continue; // 同じラインにある石の色を全部変えるのを防ぐため
    } else {
      for (row_r = row - 1; row_r > x; row_r--) {
        let changePosition = tbody.children[y].children[row_r];
        reverse(changePosition); // 色を変える
      }
      return 1;
    }
  }
}
/* function checkRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x + 1; row <= 7; row++) {
    let td = tbody.children[y].children[row];
    if (td.className == "table_block") return 0; // 空きマスだったらreturn
    if (!td.classList.contains(currentColor())) {
      // 今のターンの色と違うのか
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0; // 同じラインにある石の色を全部変えるのを防ぐため
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (row_r = row - 1; row_r > x; row_r--) {
        let changePosition = tbody.children[y].children[row_r];
        reverse(changePosition); // 色を変える
      }
      return 1;
    }
  }
} */

function checkLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let row = x - 1; row >= 0; row--) {
    let td = tbody.children[y].children[row];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
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
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
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
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
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
  for (let index = 1; x + index <= 7 && y - index >= 0; index++) {
    let td = tbody.children[y - index].children[x + index];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let num = 1; x + index - num >= x && y - index + num <= y; num++) {
        let changePosition =
          tbody.children[y - index + num].children[x + index - num];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkBottomLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; x - index >= 0 && y + index <= 7; index++) {
    let td = tbody.children[y + index].children[x - index];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let num = 1; x - index + num <= x && y + index - num >= y; num++) {
        let changePosition =
          tbody.children[y + index - num].children[x - index + num];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkTopLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; x - index >= 0 && y - index >= 0; index++) {
    let td = tbody.children[y - index].children[x - index];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let num = 1; x - index + num <= x && y - index + num <= y; num++) {
        let changePosition =
          tbody.children[y - index + num].children[x - index + num];
        reverse(changePosition);
      }
      return 1;
    }
  }
}

function checkBottomRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; x + index <= 7 && y + index <= 7; index++) {
    let td = tbody.children[y + index].children[x + index];
    if (td.className == "table_block") return 0;
    if (!td.classList.contains(currentColor())) {
      hasAnyOppositeColor = true;
    }
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === false)
      return 0;
    if (td.classList.contains(currentColor()) && hasAnyOppositeColor === true) {
      for (let num = 1; x + index - num >= x && y + index - num >= y; num++) {
        let changePosition =
          tbody.children[y + index - num].children[x + index - num];
        reverse(changePosition);
      }
      return 1;
    }
  }
  return 0;
}

//Count Function
function rightCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; x + index <= 7; index++) {
    if (tbody.children[y].children[x + 1].className == "table_block") return 0; // 空きマスなのか
    let td = tbody.children[y].children[x + index];
    if (td.className == tdXY.className) return 0; // (x,y)の石と同じ色なのか
    if (td.className == "table_block") {
      // 空きマス(置けれるところ)があればreturn
      return 1;
    }
  }
}

function leftCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; x - index >= 0; index++) {
    if (tbody.children[y].children[x - 1].className == "table_block") return 0;
    let td = tbody.children[y].children[x - index];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function topCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; y - index >= 0; index++) {
    if (tbody.children[y - 1].children[x].className == "table_block") return 0;
    let td = tbody.children[y - index].children[x];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function bottomCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; y + index <= 7; index++) {
    if (tbody.children[y + 1].children[x].className == "table_block") return 0;
    let td = tbody.children[y + index].children[x];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function topRightCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; x + index <= 7 && y - index >= 0; index++) {
    if (tbody.children[y - 1].children[x + 1].className == "table_block")
      return 0;
    const td = tbody.children[y - index].children[x + index];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function topLeftCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; y - index >= 0 && x - index >= 0; index++) {
    if (tbody.children[y - 1].children[x - 1].className == "table_block")
      return 0;
    const td = tbody.children[y - index].children[x - index];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function bottomRightCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; x + index <= 7 && y + index <= 7; index++) {
    if (tbody.children[y + 1].children[x + 1].className == "table_block")
      return 0;
    const td = tbody.children[y + index].children[x + index];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

function bottomLeftCount(x, y) {
  const tbody = document.querySelector("tbody");
  const tdXY = tbody.children[y].children[x];
  for (let index = 1; x - index >= 0 && y + index <= 7; index++) {
    if (tbody.children[y + 1].children[x - 1].className == "table_block")
      return 0;
    const td = tbody.children[y + index].children[x - index];
    if (td.className == tdXY.className) return 0;
    if (td.className == "table_block") {
      return 1;
    }
  }
}

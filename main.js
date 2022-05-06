// Start Button スタートボタン
function startBtn() {
  const start_screen = document.querySelector(".start_screen");
  start_screen.classList.remove("show");
}

/* Gmae Board ゲームボード */
const gameBoard = document.querySelectorAll("td");

/**< Stone Color 石の色 >
 * whoIsTurn = BLACK
 * whoIsTurn.checked = WHITE
 */
const whoIsTurn = document.getElementById("switch");

// Turn condition (toggle switch) 誰のターンなのか
const toggle_switch = document.getElementById("switch");

function currentColor() {
  return whoIsTurn.checked === false ? "black" : "white";
}

// Game score & result
const scoreWhite = document.getElementById("white_score"); // (game screen　ゲームスクリーン)
const scoreBlack = document.getElementById("black_score");
const scoreWhiteResult = document.getElementById("white_score_result"); // (result screen　結果スクリーン)
const scoreBlackResult = document.getElementById("black_score_result");
const winnerCat = document.getElementById("victory_cat");
const winnerText = document.getElementsByClassName("result_winner");

// Restart Button
function restartBtn() {
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
    const Left = checkLeft(x, y);
    const Top = checkTop(x, y);
    const Bottom = checkBottom(x, y);
    const TopRight = checkTopRight(x, y);
    const TopLeft = checkTopLeft(x, y);
    const BottomRight = checkBottomRight(x, y);
    const BottomLeft = checkBottomLeft(x, y);
    // checkFunctions = [
    //   checkRight,
    //   checkLeft,
    //   checkTop,
    //   checkBottom,
    //   checkTopRight,
    //   checkTopLeft,
    //   checkBottomRight,
    //   checkBottomLeft,
    // ];
    // const checkResults = checkFunctions.map(fn=> fn(x,y)) // [0,0,0,1,0]
    // checkResults = [
    //   checkRight(x,y),
    //   checkLeft(x,y),
    //   checkTop(x,y),
    //   checkBottom(x,y),
    //   checkTopRight(x,y),
    //   checkTopLeft(x,y),
    //   checkBottomRight(x,y),
    //   checkBottomLeft(x,y),
    // ]; // [0,0,0,1,0]

    if (
      Right === 1 ||
      Left === 1 ||
      Top === 1 ||
      Bottom === 1 ||
      TopRight === 1 ||
      TopLeft === 1 ||
      BottomRight === 1 ||
      BottomLeft === 1
    ) {
      if (!whoIsTurn.checked) {
        putStone.classList.add("black"); //　黒石を置く
        toggle_switch.click();
      } else {
        putStone.classList.add("white"); // 白石を置く
        toggle_switch.click();
      }
    }

    // 色の数を表示（モニタリング）
    scoreCheck(tbody);

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
        if (count === 0) {
          // お互いに1回ずつ自動パスしたらゲーム終了
          alert("お互いに1回ずつパスしましたので終了します");
          game_result_screen(tbody);
          return 0;
        }
      } else {
        alert("置く場所がないのでパスします");
        turn = BLACK;
        toggle_switch.click();
        if (count === 0) {
          alert("お互いに1回ずつパスしましたので終了します");
          game_result_screen(tbody);
          return 0;
        }
      }
      alert("置く場所なし");
    }
  });
});

function scoreCheck(tbody) {
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
      CountR === 1 ||
      CountL === 1 ||
      CountT === 1 ||
      CountB === 1 ||
      CountTR === 1 ||
      CountTL === 1 ||
      CountBR === 1 ||
      CountBL === 1
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
  scoreCheck(tbody);

  if (scoreBlackCount.length > scoreWhiteCount.length) {
    winnerCat.innerHTML = `<img class="catWin" src="img/black-removebg.png">`;
    console.log("BLACK");
  } else if (scoreBlackCount.length < scoreWhiteCount.length) {
    winnerCat.innerHTML = `<img class="catWin" src="img/white-removebg.png">`;
    console.log("WHITE");
  } else {
    alert("Draw");
    winnerText.innerHTML = `<p class="winner">Draw</p>`;
  }

  result_screen.classList.add("show");
}

//Reverse color
function reverse(td) {
  if (!whoIsTurn.checked) {
    td.classList.remove("white");
    td.classList.add("black");
  } else {
    td.classList.remove("black");
    td.classList.add("white");
  }
}

//Reset/Restart_function
function reset_restart_game() {
  const tbody = document.querySelector("tbody");
  gameBoard.forEach((stones, index, removeBlackStone) => {
    stones.classList.remove("black");
    stones.classList.remove("white");
  });
  gameBoard[27].classList.add("white");
  gameBoard[28].classList.add("black");
  gameBoard[35].classList.add("black");
  gameBoard[36].classList.add("white");
  if (whoIsTurn.checked) {
    toggle_switch.click();
  }
  scoreCheck(tbody);
}

//Check function (reverse color)
function checkRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false;
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y].children[x + index];
    if (td) {
      if (!td.className) return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y].children[x + index];
          reverse(changePosition); // 色を変える
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function checkLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y].children[x - index];
    if (td) {
      if (!td.className) return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y].children[x - index];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

/* 

for ..... {
  if hantaino ishiga attara {
    continue
  }
  break , return 

}


*/

function checkTop(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y - index]?.children[x];
    if (td) {
      if (td.className === "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y - index]?.children[x];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function checkBottom(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y + index]?.children[x];
    if (td) {
      if (td.className === "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y + index]?.children[x];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
  console.log("out");
}

function checkTopRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y - index]?.children[x + index];
    if (td) {
      if (td.className === "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y - index]?.children[x + index];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function checkBottomLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y + index]?.children[x - index];
    if (td) {
      if (td.className == "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y + index]?.children[x - index];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function checkTopLeft(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y - index]?.children[x - index];
    if (td) {
      if (td.className === "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y - index]?.children[x - index];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function checkBottomRight(x, y) {
  const tbody = document.querySelector("tbody");
  let hasAnyOppositeColor = false; //　前に違う色があるか
  for (let index = 1; index <= 7; index++) {
    let td = tbody.children[y + index]?.children[x + index];
    if (td) {
      if (td.className === "") return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = tbody.children[y + index]?.children[x + index];
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
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

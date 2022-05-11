const tbody = document.querySelector("tbody");

// Start Button スタートボタン
function startBtn() {
  const start_screen = document.querySelector(".start_screen");
  start_screen.classList.remove("show");
}

/* Gmae Board ゲームボード */
const gameBoard = document.querySelectorAll("td");

/**< Stone Color 石の色 >
 * toggleSwitch = BLACK
 * toggleSwitch.checked = WHITE
 */
const toggleSwitch = document.getElementById("switch");

function currentColor() {
  return document.getElementById("switch").checked ? "white" : "black";
}

function oppositeColor() {
  return document.getElementById("switch").checked ? "black" : "white";
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

// Put stone on the table 石を置くためマスをクリック
gameBoard.forEach((stone, index, stone_all) => {
  stone.addEventListener(`click`, () => {
    if (stone.className === "black" || stone.className === "white") {
      alert("もう石があります");
      return;
    }

    hintReset();

    // Position of stones (x,y) 石の位置
    const x = stone.cellIndex;
    const y = stone.parentElement.rowIndex;

    const putStone = tbody.children[y].children[x];
    console.log(`click Position : ${x}, ${y}`); // クリックしたポジションのチェック用

    // Reverse color 色を変える（石を裏返す）
    const DirectionResultList = [
      checkDirection(x, y, { x: "+", y: "" }), // Right
      checkDirection(x, y, { x: "-", y: "" }), // Left
      checkDirection(x, y, { x: "", y: "-" }), // Top
      checkDirection(x, y, { x: "", y: "+" }), // bottom
      checkDirection(x, y, { x: "+", y: "-" }), // TopRight
      checkDirection(x, y, { x: "-", y: "-" }), // TopLeft
      checkDirection(x, y, { x: "+", y: "+" }), // BottomRight
      checkDirection(x, y, { x: "-", y: "+" }), // BottomLeft
    ];

    if (DirectionResultList.includes(1)) {
      if (!toggleSwitch.checked) {
        putStone.classList.add("black"); //　黒石を置く
        toggleSwitch.click();
      } else {
        putStone.classList.add("white"); // 白石を置く
        toggleSwitch.click();
      }
    }

    // 色の数を表示（モニタリング）
    const score = scoreCheck(tbody);
    if (score === 64) {
      game_result_screen();
      return;
    }
    // 新しいプレイヤーは何か所に置けれるかを敬さん
    const countResult = checkNextMove();
    const set = new Set(countResult);
    const resultList = [...set];
    // 自動パス
    if (resultList.length === 0) {
      if (toggleSwitch.checked === false) {
        alert("黒石を置く場所がないのでパスします。");
        checkDouble();
      } else {
        alert("白石を置く場所がないのでパスします。");
        checkDouble();
      }
    }
  });
});

function checkDouble() {
  toggleSwitch.click();
  const resultList = checkNextMove();
  if (resultList.length === 0) {
    alert("お互いに1回ずつパスしましたので終了します");
    game_result_screen();
  }
}

function scoreCheck(tbody) {
  const scoreWhiteCount = tbody.querySelectorAll("td.white");
  const scoreBlackCount = tbody.querySelectorAll("td.black");
  scoreWhite.innerHTML = scoreWhiteCount.length;
  scoreBlack.innerHTML = scoreBlackCount.length;
  scoreWhiteResult.innerHTML = scoreWhiteCount.length;
  scoreBlackResult.innerHTML = scoreBlackCount.length;
  if (scoreWhiteCount.length + scoreBlackCount.length == 64) {
    return 64;
  }
}

// マスから位置をとる
function getXY(td) {
  const x = td.cellIndex;
  const y = td.parentElement.rowIndex;
  return [x, y];
}

function checkNextMove() {
  // 石を置けれるマス
  const color = currentColor();

  const currentPlayerList = tbody.querySelectorAll(`td.${color}`); // [td, td, td,...]
  // let count = 0; // 自動パスの確認変数
  const resultList = [];

  for (const td of currentPlayerList) {
    const [x, y] = getXY(td);
    const countResult = [
      countDirection(x, y, { x: "+", y: "" }), //Right
      countDirection(x, y, { x: "-", y: "" }), //Left
      countDirection(x, y, { x: "", y: "-" }), //Top
      countDirection(x, y, { x: "", y: "+" }), //Bottom
      countDirection(x, y, { x: "+", y: "-" }), //TopRight
      countDirection(x, y, { x: "-", y: "-" }), //TopLeft
      countDirection(x, y, { x: "+", y: "+" }), //BottomRight
      countDirection(x, y, { x: "-", y: "+" }), //BottomLeft
    ];

    const tdList = countResult.filter((element) => element !== false); // []
    if (tdList.length > 0) {
      resultList.push(...tdList);
    }
  }
  return resultList; // [], [...]
}

//Reset Button
function resetBtn() {
  reset_restart_game();
}

//Hint Button
function hintBtn() {
  const countResult = checkNextMove();
  const set = new Set(countResult);
  const canPutStone = [...set];
  canPutStone.forEach((stone) => {
    stone.classList.add("hint");
  });
}

function hintReset() {
  gameBoard.forEach((hint) => {
    hint.classList.remove("hint");
  });
}

//Game end
const result_screen = document.getElementById("result_screen");

function game_result_screen() {
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
  if (!toggleSwitch.checked) {
    td.classList.remove("white");
    td.classList.add("black");
  } else {
    td.classList.remove("black");
    td.classList.add("white");
  }
}

//Reset/Restart_function
function reset_restart_game() {
  gameBoard.forEach((stones, index, removeBlackStone) => {
    stones.classList.remove("black");
    stones.classList.remove("white");
    stones.classList.remove("hint");
  });
  gameBoard[27].classList.add("white");
  gameBoard[28].classList.add("black");
  gameBoard[35].classList.add("black");
  gameBoard[36].classList.add("white");
  if (toggleSwitch.checked) {
    toggleSwitch.click();
  }
  scoreCheck(tbody);
}

function getTD(x, y, direction, index) {
  let xIndex = null;
  let yIndex = null;
  if (direction.x === "+") {
    xIndex = x + index;
  } else if (direction.x === "-") {
    xIndex = x - index;
  } else xIndex = x;

  if (direction.y === "+") {
    yIndex = y + index;
  } else if (direction.y === "-") {
    yIndex = y - index;
  } else yIndex = y;

  return tbody.children[yIndex]?.children[xIndex];
}

function checkDirection(x, y, direction) {
  let hasAnyOppositeColor = false;
  for (let index = 1; index <= 7; index++) {
    let td = getTD(x, y, direction, index);
    if (td) {
      if (!td.className) return 0;
      if (!td.classList.contains(currentColor())) {
        hasAnyOppositeColor = true;
      } else if (hasAnyOppositeColor === true) {
        for (index; index >= 0; index--) {
          let changePosition = getTD(x, y, direction, index);
          reverse(changePosition);
        }
        return 1;
      } else return 0;
    } else return 0;
  }
}

function countDirection(x, y, direction) {
  let hasAnyOppositePiece = false;
  for (let index = 1; index <= 7; index++) {
    let td = getTD(x, y, direction, index);
    if (td === undefined) return false;
    if (td.classList.contains(currentColor())) return false; // " abs" => "abs"

    if (!td.className) {
      if (hasAnyOppositePiece === true) {
        return td;
      } else {
        return false;
      }
    }
    if (td.classList.contains(oppositeColor())) {
      hasAnyOppositePiece = true;
      continue;
    }
  }
  return false;
}

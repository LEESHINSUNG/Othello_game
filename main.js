/* Gmae Board */
const gameBoard = document.querySelectorAll("td");
const tbody = document.querySelector("tbody");

/* Stone Color */
const toggleSwitch = document.getElementById("switch");
//  toggleSwitch = BLACK
//  toggleSwitch.checked = WHITE

/* Game score & result */
const scoreWhite = document.getElementById("white_score"); // (game screen　ゲームスクリーン)
const scoreBlack = document.getElementById("black_score");
const scoreWhiteResult = document.getElementById("white_score_result"); // (result screen　結果スクリーン)
const scoreBlackResult = document.getElementById("black_score_result");
const winnerCat = document.getElementById("victory_cat");
const winnerText = document.getElementsByClassName("result_winner");

// マスをクリック
gameBoard.forEach((td) => {
  td.addEventListener(`click`, () => {
    const x = td.cellIndex;
    const y = td.parentElement.rowIndex;

    if (td.className === "black" || td.className === "white") {
      alert("もう石があります");
      return;
    }

    if (td.className !== "") {
      hintReset(); // ヒントを消す
    }
    checkReverse(x, y, td); // 石を裏返す

    const score = scoreCheck(tbody); // スコアボード
    if (score === 64) {
      gameResultScreen();
      return;
    }

    const resultArrangement = checkNextMove(); // 置けれるマス
    passFunction(resultArrangement); // 自動パス
  });
});

function currentColor() {
  return document.getElementById("switch").checked ? "white" : "black";
}

function oppositeColor() {
  return document.getElementById("switch").checked ? "black" : "white";
}
// ボタン
function startBtn() {
  const startScreen = document.querySelector(".start_screen");
  const gameScreen = document.querySelector(".game_all_screen");
  startScreen.classList.remove("show");
  gameScreen.classList.add("show");
}

function resetBtn() {
  resetRestartGame();
}

function hintBtn() {
  hintReset();
  const countResult = checkNextMove();
  const set = new Set(countResult); //
  const canPutStone = [...set];
  canPutStone.forEach((td) => {
    td.classList.add("hint");
  });
}

function hintReset() {
  gameBoard.forEach((hint) => {
    hint.classList.remove("hint");
  });
}

function restartBtn() {
  resetRestartGame();
  resultScreen.classList.remove("show");
}

// 自動パス
function passFunction(resultArrangement) {
  if (resultArrangement.length === 0) {
    if (toggleSwitch.checked === false) {
      alert("黒石を置く場所がないのでパスします。");
      doublePass();
    } else {
      alert("白石を置く場所がないのでパスします。");
      doublePass();
    }
  }
}

function doublePass() {
  toggleSwitch.click();
  const resultList = checkNextMove();
  if (resultList.length === 0) {
    alert("お互いに1回ずつパスしましたので終了します");
    gameResultScreen();
  }
}

// スコア
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

function checkReverse(x, y, td) {
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

  if (DirectionResultList.includes(true)) {
    if (!toggleSwitch.checked) {
      td.classList.add("black"); //　黒石を置く
      toggleSwitch.click();
    } else {
      td.classList.add("white"); // 白石を置く
      toggleSwitch.click();
    }
  }
}

function checkNextMove() {
  const color = currentColor(); // 石を置けれるマス
  const currentPlayerList = tbody.querySelectorAll(`td.${color}`); // [td, td, td,...]
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

    const tdList = countResult.filter((element) => element !== false);
    if (tdList.length > 0) {
      resultList.push(...tdList);
    }
  }
  const set = new Set(resultList);
  const resultArrangement = [...set];

  return resultArrangement;
}

//Game end
const resultScreen = document.getElementById("result_screen");

function gameResultScreen() {
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

  resultScreen.classList.add("show");
}

//石を裏返す
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
function resetRestartGame() {
  gameBoard.forEach((td) => {
    td.classList.remove("black");
    td.classList.remove("white");
    td.classList.remove("hint");
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
    if (td === undefined || td.className === "") return false;

    if (td.classList.contains(oppositeColor())) {
      hasAnyOppositeColor = true;
    } else if (hasAnyOppositeColor === true) {
      for (index; index >= 0; index--) {
        let changePosition = getTD(x, y, direction, index);
        reverse(changePosition);
      }
      return true;
    } else return false;
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

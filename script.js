let boxes = document.querySelectorAll(".box");
let info = document.querySelector(".info");
let resetBtn = document.querySelector(".reset");

resetBtn.classList.add("hiddenBtn");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let turn = "X";
let count = 0;

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turn === "X") {
      box.textContent = "X";
      info.textContent = "Turn for 0";
      turn = "0";
    } else {
      box.textContent = "0";
      info.textContent = "Turn for X";
      turn = "X";
    }
    box.disabled = true;
    box.classList.remove("hover");
    resetBtn.classList.remove("hiddenBtn");

    count++;

    let isWinner = checkWinner();
    if (count === 9 && !isWinner) {
      info.textContent = "Ooops! That was a TIE. Try again.";
      stopGame();
      resetBtn.textContent = "New Game";
    }
  });
});

function checkWinner() {
  winPatterns.forEach((pattern) => {
    let position1 = boxes[pattern[0]].textContent;
    let position2 = boxes[pattern[1]].textContent;
    let position3 = boxes[pattern[2]].textContent;

    if (position1 !== "" && position2 !== "" && position3 !== "") {
      if (position1 === position2 && position2 === position3) {
        info.textContent = `Congratulations! ${position1} is the WINNER.`;
        stopGame();
        resetBtn.textContent = "New Game";

        return true;
      }
    }
  });
}

function stopGame() {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = true;
    box.classList.remove("hover");
    box.style.cursor = "not-allowed";
  });
}

resetBtn.addEventListener("click", () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
    box.classList.remove("hover");
    box.style.cursor = "pointer";
  });
  turn = "X";
  info.textContent = "Turn for X";
  resetBtn.textContent = "Reset Game";
  resetBtn.classList.add("hiddenBtn");
  count = 0;
});

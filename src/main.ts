import * as PIXI from "pixi.js";
import gsap from "gsap";
import { Game } from "./game";

const container = document.getElementById("game-container");
const screenWidth = window.innerWidth;
const isMobile = screenWidth < 600;

const ballsPerRow = isMobile ? 6 : 10;
const ballRadius = isMobile ? 12 : 20;

const margin = ballRadius * 0.75;
const canvasWidth = ballsPerRow * (ballRadius * 2 + margin) + margin;
const totalRows = Math.ceil(59 / ballsPerRow);
const canvasHeight = totalRows * (ballRadius * 2 + margin) + margin;

const app = new PIXI.Application({
  width: canvasWidth,
  height: canvasHeight,
  backgroundColor: 0xffffff,
});

//@ts-ignore
container.appendChild(app.view as HTMLCanvasElement);

const game = new Game(app, ballsPerRow, ballRadius);

const luckyDipBtn = document.getElementById("luckyDip") as HTMLButtonElement;
const startBtn = document.getElementById("startGame") as HTMLButtonElement;
const restartBtn = document.getElementById("restartGame") as HTMLButtonElement;
const resultDiv = document.getElementById("result");

function calculateWinnings(matches: number): number {
  switch (matches) {
    case 3: return 50;
    case 4: return 100;
    case 5: return 200;
    case 6: return 500;
    default: return 0;
  }
}

function displayResult(matches: number, prize: number, winningNumbers: number[], selectedNumbers: number[]) {
  const winningNumbersDiv = document.getElementById("winningNumbers");
  const selectedNumbersDiv = document.getElementById("selectedNumbers");
  const resultDiv = document.getElementById("result");

  //@ts-ignore
  winningNumbersDiv.innerHTML = "";
  //@ts-ignore
  selectedNumbersDiv.innerHTML = "";

  winningNumbers.forEach(num => {
    const ball = document.createElement("div");
    ball.className = "result-ball";

    if (selectedNumbers.includes(num)) {
      ball.classList.add("green");
    } else {
      ball.classList.add("orange");
    }

    ball.textContent = num.toString();
    //@ts-ignore
    winningNumbersDiv.appendChild(ball);
  });

  selectedNumbers.forEach(num => {
    const ball = document.createElement("div");
    ball.className = "result-ball";

    if (winningNumbers.includes(num)) {
      ball.classList.add("green");
    } else {
      ball.classList.add("blue");
    }

    ball.textContent = num.toString();
    //@ts-ignore
    selectedNumbersDiv.appendChild(ball);
  });

  //@ts-ignore
  resultDiv.textContent =
    matches < 3
      ? `You matched ${matches} number(s). No prize.`
      : `You matched ${matches} number(s) and won $${prize}!`;
}

luckyDipBtn.addEventListener("click", () => {
  game.luckyDip();
  //@ts-ignore
  resultDiv.textContent = "";
  const winningNumbersDiv = document.getElementById("winningNumbers");
  //@ts-ignore
  winningNumbersDiv.innerHTML = "";

  const balls = game.getBalls();
  balls.forEach(ball => {
    if (ball.isSelected) {
      ball.draw(0x2196f3, 0x1565c0);
    } else {
      ball.draw();
    }
  });
});

startBtn.addEventListener("click", () => {
  const selected = game.getSelectedNumbers();
  if (selected.length !== 6) {
    alert("Please select exactly 6 balls.");
    return;
  }

  const winningNumbers = game.startDraw();

  // for testing the wins
  //const winningNumbers = game.startDrawHigherWinning(6);

  const balls = game.getBalls();

  balls.forEach(ball => {
    if (ball.isSelected) {
      ball.draw(0x2196f3, 0x1565c0);
    } else {
      ball.draw();
    }
  });

  winningNumbers.forEach(num => {
    const ball = balls[num - 1];
    if (selected.includes(num)) {
      ball.draw(0x4caf50, 0x388e3c);
      gsap.to(ball.scale, { x: 1.5, y: 1.5, duration: 0.5, yoyo: true, repeat: 1 });
    } else {
      ball.draw(0xffa726, 0xef6c00);
      gsap.to(ball.scale, { x: 1.2, y: 1.2, duration: 0.5, yoyo: true, repeat: 1 });
    }
  });

  const matched = selected.filter(n => winningNumbers.includes(n)).length;
  const prize = calculateWinnings(matched);

  displayResult(matched, prize, winningNumbers, selected);
});

restartBtn.addEventListener("click", () => {
  game.reset();
  //@ts-ignore
  resultDiv.textContent = "";
});

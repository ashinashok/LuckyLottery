import * as PIXI from "pixi.js";
import { Ball } from "./ball";

export class Game {
  private app: PIXI.Application;
  private balls: Ball[] = [];
  private selectedBalls: Set<number> = new Set();
  private winningBalls: Set<number> = new Set();

  private container: PIXI.Container;
  private ballsPerRow: number;
  private ballRadius: number;

  constructor(app: PIXI.Application, ballsPerRow = 10, ballRadius = 20) {
    this.app = app;
    this.ballsPerRow = ballsPerRow;
    this.ballRadius = ballRadius;

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    this.createBalls();
  }

  public getBalls(): Ball[] {
    return this.balls;
  }

  private createBalls() {
    const margin = this.ballRadius * 0.75;
    const radius = this.ballRadius;
    const ballsPerRow = this.ballsPerRow;
    const startX = radius + margin;
    const startY = radius + margin;

    for (let i = 1; i <= 59; i++) {
      const ball = new Ball(i, radius);
      const row = Math.floor((i - 1) / ballsPerRow);
      const col = (i - 1) % ballsPerRow;
      ball.position.set(
        startX + col * (radius * 2 + margin),
        startY + row * (radius * 2 + margin)
      );
      ball.on("ballClicked", this.handleBallClick.bind(this));
      this.container.addChild(ball);
      this.balls.push(ball);
    }
  }

  private handleBallClick(ball: Ball) {
    if (ball.isSelected) {
      ball.deselect();
      this.selectedBalls.delete(ball.number);
    } else {
      if (this.selectedBalls.size >= 6) return;
      ball.select();
      this.selectedBalls.add(ball.number);
    }
  }

  public luckyDip() {
    this.resetSelection();
    while (this.selectedBalls.size < 6) {
      const num = Math.floor(Math.random() * 59) + 1;
      if (!this.selectedBalls.has(num)) {
        this.selectedBalls.add(num);
        const ball = this.balls[num - 1];
        ball.select();
      }
    }
  }

  private resetSelection() {
    this.selectedBalls.forEach(num => {
      this.balls[num - 1].deselect();
    });
    this.selectedBalls.clear();
  }

  public startDraw(): number[] {
    this.winningBalls.clear();
    while (this.winningBalls.size < 6) {
      this.winningBalls.add(Math.floor(Math.random() * 59) + 1);
    }
    return Array.from(this.winningBalls);
  }

  public startDrawHigherWinning(matchCount: number = 3): number[] {
    this.winningBalls.clear();

    const selectedArray = Array.from(this.selectedBalls);

    const maxMatches = Math.min(matchCount, selectedArray.length, 6);

    const shuffledSelected = selectedArray.sort(() => Math.random() - 0.5);

    for (let i = 0; i < maxMatches; i++) {
      this.winningBalls.add(shuffledSelected[i]);
    }

    while (this.winningBalls.size < 6) {
      const randomNum = Math.floor(Math.random() * 59) + 1;
      if (!this.winningBalls.has(randomNum)) {
        this.winningBalls.add(randomNum);
      }
    }

    return Array.from(this.winningBalls);
  }


  public getSelectedNumbers(): number[] {
    return Array.from(this.selectedBalls).sort((a, b) => a - b);
  }

  public reset() {
    this.selectedBalls.clear();
    this.winningBalls.clear();
    this.balls.forEach(ball => ball.deselect());
  }
}

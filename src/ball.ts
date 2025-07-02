import * as PIXI from "pixi.js";
import gsap from "gsap";

export class Ball extends PIXI.Container {
  public number: number;
  private circle: PIXI.Graphics;
  private label: PIXI.Text;
  public isSelected: boolean = false;

  constructor(number: number, radius = 20) {
    super();
    this.number = number;

    this.circle = new PIXI.Graphics();
    this.draw();
    this.addChild(this.circle);

    this.label = new PIXI.Text(number.toString(), {
      fontSize: 16,
      fill: 0x333333,
      fontWeight: "bold",
      align: "center",
    });
    this.label.anchor.set(0.5);
    this.label.position.set(0, 0);
    this.addChild(this.label);

    this.interactive = true;

    this.on("pointerdown", this.onClick.bind(this));
  }

  public draw(color?: number, border?: number) {
    this.circle.clear();
    this.circle.beginFill(color ?? 0xffffff);
    this.circle.lineStyle(3, border ?? 0x999999);
    this.circle.drawCircle(0, 0, 20);
    this.circle.endFill();
  }


  toggleSelection() {
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.draw(0x2196f3, 0x1565c0);
    } else {
      this.draw();
    }

    this.animateToggle();
  }


  select() {
    this.isSelected = true;
    this.draw(0x2196f3, 0x1565c0);
    this.animateToggle();
  }


  deselect() {
    this.isSelected = false;
    this.draw();
    this.animateToggle();
  }


  private animateToggle() {
    gsap.to(this.scale, { x: 1.1, y: 1.1, duration: 0.2, yoyo: true, repeat: 1 });
  }

  private onClick() {
    this.emit("ballClicked", this);
  }
}

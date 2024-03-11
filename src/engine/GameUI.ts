import { CanvasDimension } from "./config";

export default class GameUI {
    private container: HTMLElement;
    private applesEatenElement: HTMLElement;
    private scoreElement: HTMLElement;
    private speedElement: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.style.width = `200px`;
    this.container.style.display = 'flex';
    this.container.style.justifyContent = 'center';
    this.container.style.position = 'absolute';
    this.container.style.top = '10px';
    this.container.style.left = '700px';
    this.container.style.transform = 'translateX(-50%)';
    document.body.appendChild(this.container);

    this.applesEatenElement = document.createElement('div');
    this.scoreElement = document.createElement('div');
    this.scoreElement.style.paddingLeft = '10px';
    this.speedElement = document.createElement('div');
    this.speedElement.style.paddingLeft = '10px';

    this.applesEatenElement.classList.add('info');
    this.scoreElement.classList.add('info');
    this.speedElement.classList.add('info');

    this.container.appendChild(this.applesEatenElement);
    // this.container.appendChild(this.scoreElement);
    this.container.appendChild(this.speedElement);
  }

  public updateUI(applesEaten: number, score: number, speed: number): void {
    this.applesEatenElement.textContent = `Maçãs: ${applesEaten} `;
    // this.scoreElement.textContent = `Score: ${score}`;
    this.speedElement.textContent = `Speed: ${speed}`;
  }
}

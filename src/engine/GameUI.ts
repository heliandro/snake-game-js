import { Strings } from "./Strings";
import { convertSpeedForUI } from "./utils/utils";

export default class GameUI {
    private container: HTMLElement;
    private applesEatenElement: HTMLElement;
    private speedElement: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.style.width = `200px`;
    this.container.style.display = 'none';
    this.container.style.justifyContent = 'center';
    this.container.style.position = 'absolute';
    this.container.style.top = '10px';
    this.container.style.left = '700px';
    this.container.style.transform = 'translateX(-50%)';
    document.body.appendChild(this.container);

    this.applesEatenElement = document.createElement('div');
    this.speedElement = document.createElement('div');
    this.speedElement.style.paddingLeft = '10px';

    this.applesEatenElement.classList.add('info');
    this.speedElement.classList.add('info');

    this.container.appendChild(this.applesEatenElement);
    this.container.appendChild(this.speedElement);
  }

  public updateUI(applesEaten: number, speed: number): void {
    this.applesEatenElement.textContent = `${Strings.ui.items} ${applesEaten}`;
    this.speedElement.textContent = `${Strings.ui.speed} ${convertSpeedForUI(speed)}`;
  }

  public showUI() {
    this.container.style.display = 'flex';
  }

  public hideUI() {
    this.container.style.display = 'none';
  }
}

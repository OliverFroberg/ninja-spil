import {Container, Sprite} from "pixi.js";

export default class Entity extends Container {
	private _sprite: Sprite | Container | undefined;

	constructor() {
		super();
		this.zIndex = 10
	}

	set sprite(sprite: Sprite | Container) {
		if (this._sprite) {
			this.removeChild(this._sprite);
		}
		this._sprite = sprite;
		this.addChild(this._sprite);
	}

	get sprite(): Sprite | Container | undefined {
		return this._sprite;
	}

	checkCollision(target: Container) {
		const a = this.getBounds()
		const b = target.getBounds()

		return a.x + a.width > b.x &&
			a.x < b.x + b.width &&
			a.y + a.height > b.y &&
			a.y < b.y + b.height
	}
}
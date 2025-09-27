import {Container, Sprite} from "pixi.js";

export default class Entity extends Container {
	private _sprite: Sprite | undefined;

	constructor() {
		super();
		this.zIndex = 10
	}

	set sprite(sprite: Sprite) {
		if (this._sprite) {
			this.removeChild(this._sprite);
		}
		this._sprite = sprite;
		this.addChild(this._sprite);
	}

	get sprite(): Sprite | undefined {
		return this._sprite;
	}
}
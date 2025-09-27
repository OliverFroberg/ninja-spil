import Entity from "./Entity.ts";
import {Application, Ticker} from "pixi.js";

export default class Enemy extends Entity {
	public static enemies: Entity[] = [];

	constructor() {
		super();
	}

	update(time: Ticker) {

	}

	static spawnNewEnemy(app: Application) {
		const enemy = new Enemy(app);
		this.enemies.push(enemy);
	}
}
import Entity from "./Entity.ts";
import {Container, Ticker} from "pixi.js";
import {assets, ninja} from "../main.ts";
import {AtlasAttachmentLoader, SkeletonJson, Spine } from "@esotericsoftware/spine-pixi-v8";
import gsap from "gsap";

export class Enemy extends Entity {
	public static enemies: Enemy[] = [];

	private readonly spine: Spine;

	private readonly direction: number;

	constructor(direction: number) {
		super();
		this.direction = direction;
		this.position.x = (window.innerWidth / 2) * direction;
		this.y = 300;
		this.scale.x = direction

		const spineAtlas = assets.alienSpineAtlas;
		const spineAtlasLoader = new AtlasAttachmentLoader(spineAtlas);
		const spineJsonParser = new SkeletonJson(spineAtlasLoader);
		const spineData = spineJsonParser.readSkeletonData(assets.alienSpineJson);

		this.spine = new Spine(spineData);
		this.spine.state.setAnimation(0, "walk", true)
		this.spine.state.timeScale = 0.8
		this.spine.autoUpdate = true
		this.sprite = this.spine as unknown as Container;
	}

	update(time: Ticker) {
		const movement = this.direction * 1.5 * time.deltaTime;
		this.position.x -= movement;

		if (this.checkCollision(ninja)) {
			if (ninja.attacking) {
				this.kill()
			} else if (ninja.startingAttack) {
				// Do nothing
			} else {
				ninja.damage()
			}
		}
	}

	static createNewEnemy() {
		const direction = Math.random() >= 0.5 ? 1 : -1;
		const enemy = new Enemy(direction);
		this.enemies.push(enemy);
		return enemy;
	}

	kill() {
		const index = Enemy.enemies.indexOf(this);
		Enemy.enemies.splice(index, 1);

		this.spine.state.setAnimation(0, "die", true)
		let enemyDieTimeline = gsap.timeline({
			onComplete: () => {
				this.destroy()
			}
		})
		enemyDieTimeline.to(this, {
			y: 100,
			duration: 0.5,
			ease: "Circ.easeOut",
		})
		enemyDieTimeline.to(this, {
			y: 600,
			duration: 0.5,
			ease: "Circ.easeIn",
		})
	}
}
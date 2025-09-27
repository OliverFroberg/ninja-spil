import gsap from "gsap";
import Entity from "./Entity.ts";
import {AnimatedSprite, Sprite} from "pixi.js";
import {Vector2} from "pixi-spine";
import {assets} from "../main.ts";

/**
 * This entity represents the player character.
 */
export default class Ninja extends Entity {
	private readonly idleSprite: AnimatedSprite;
	private readonly kickSprite: Sprite;

	private declare defaultPosition: Vector2;

	constructor() {
		super();
		this.defaultPosition = new Vector2(0, 200);
		this.position.set(this.defaultPosition.x, this.defaultPosition.y);
		this.zIndex = 2;

		// Idle sprite
		this.idleSprite = new AnimatedSprite(assets.ninja.animations["alien"]);
		if (this.idleSprite) {
			this.idleSprite.anchor.set(0.5);
			this.idleSprite.animationSpeed = 0.5;
			this.idleSprite.loop = true;
			this.idleSprite.play();
			this.sprite = this.idleSprite;
		}

		// Kick sprite
		this.kickSprite = new Sprite(assets.ninjaJump);
		if (this.kickSprite) {
			this.kickSprite.anchor.set(0.5);
		}
	}

	private currentAnimation: gsap.core.Tween | undefined;

	attackAt(x: number, y: number) {
		if (x > this.defaultPosition.x) {
			this.scale.x = -1;
		} else {
			this.scale.x = 1;
		}

		if (this.currentAnimation) {
			this.currentAnimation.kill();
		}

		this.sprite = this.kickSprite;
		this.currentAnimation = gsap.to(this.position, {
			duration: 0.2,
			x: x,
			y: y,
			ease: "Circ.easeOut",

			onComplete: () => {
				this.sprite = this.idleSprite;
				this.currentAnimation = gsap.to(this.position, {
					duration: 0.2,
					x: this.defaultPosition.x,
					y: this.defaultPosition.y,
					ease: "Circ.easeOut",
				});
			},
		});
	}
}
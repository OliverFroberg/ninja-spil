import gsap from "gsap";
import Entity from "./Entity.ts";
import {AnimatedSprite, Point, Sprite} from "pixi.js";
import {assets, stopGame} from "../main.ts";
import {Howl} from "howler";

/**
 * This entity represents the player character.
 */
export default class Ninja extends Entity {
	private readonly idleSprite: AnimatedSprite;
	private readonly kickSprite: Sprite;
	private readonly hurtSprite: Sprite;

	private defaultPosition: Point;
	public doingAttack = false;
	public attacking = false;

	public readonly hitSound: Howl;
	public readonly attackGrunts: Howl[] = [];

	constructor() {
		super();
		this.defaultPosition = new Point(0, 200);
		this.position.set(this.defaultPosition.x, this.defaultPosition.y);
		this.zIndex = 2;

		// Idle sprite
		this.idleSprite = new AnimatedSprite(assets.ninja.animations["alien"]);
		this.idleSprite.anchor.set(0.5);
		this.idleSprite.animationSpeed = 0.5;
		this.idleSprite.loop = true;
		this.idleSprite.play();
		this.sprite = this.idleSprite;

		// Kick sprite
		this.kickSprite = new Sprite(assets.ninjaJump);
		this.kickSprite.anchor.set(0.5);

		this.hurtSprite = new Sprite(assets.ninjaHurt);
		this.hurtSprite.anchor.set(0.5);

		// Setup attack sound
		this.hitSound = new Howl({
			src: ["/assets/sound/effekt_swish.mp3"],
			volume: 0.2,
		});

		// Setup attack grunts
		const soundArray = ["ia1", "ia2"];
		soundArray.forEach(value => {
			this.attackGrunts.push(new Howl({
				src: [`/assets/sound/${value}.mp3`],
				volume: 0.1,
			}));
		});
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
		this.doingAttack = true;

		// Play sounds
		this.hitSound.play();
		this.attackGrunts[Math.floor(Math.random() * this.attackGrunts.length)].play();

		this.currentAnimation = gsap.to(this.position, {
			duration: 0.2,
			x: x,
			y: y,
			ease: "Circ.easeOut",

			onComplete: () => {
				this.sprite = this.idleSprite;
				this.attacking = true;
				this.currentAnimation = gsap.to(this.position, {
					delay: 0.1,
					duration: 0.2,
					x: this.defaultPosition.x,
					y: this.defaultPosition.y,
					ease: "Circ.easeOut",

					onStart: () => {
						this.attacking = false;
					},

					onComplete: () => {
						this.doingAttack = false;
					},
				});
			},
		});
	}

	damage() {
		this.sprite = this.hurtSprite;
		stopGame();
	}
}
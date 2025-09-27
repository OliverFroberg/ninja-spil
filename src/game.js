import {AnimatedSprite, Graphics, Sprite, Texture, Ticker} from "pixi.js"
import Stage from "./Stage"
import gsap from "gsap"
import {Howl} from "howler"
import Enemy from "./Enemy"
import Hittest from "./Hittest"

class Game {
	constructor(assets) {

		this.enemy
		this.ht = new Hittest()

		console.log(assets)

		//** sounds */

		this.hitSound = new Howl({
			src: ["../assets/sound/effekt_swish.mp3"],
			volume: 0.2
		})

		//** sounds */

		let myStage = new Stage()

		this.scene = myStage.scene
		this.scene.sortableChildren = true
		let background = myStage.bg
		this.si = myStage.stageInfo

		const bg = Sprite.from(assets.background)
		background.addChild(bg)

		const ninja = new AnimatedSprite(assets.ninja.animations["alien"])
		ninja.anchor.set(0.5)
		ninja.x = 512
		ninja.y = 768 - 150
		ninja.buttonMode = true
		ninja.zIndex = 2
		ninja.animationSpeed = 0.5
		ninja.play()

		this.scene.addChild(ninja)

		this.hitareaNinja = new Graphics();
		this.hitareaNinja.beginFill(0xDE3249);
		this.hitareaNinja.drawRect(500-150, 550, 300, 200);//x, y, w, h
		this.hitareaNinja.alpha=0.5;
		this.hitareaNinja.endFill();
		this.scene.addChild(this.hitareaNinja);

		//** start screen */

		const play = Sprite.from(assets.play)
		play.anchor.set(0.5)
		play.x = 512
		play.y = 250
		play.eventMode = "static"
		this.scene.addChild(play)

		play.on("pointerdown", (event) => {

			event.stopPropagation()

			this.enemy = new Enemy(assets, this.scene)

			this.si.app.stage.eventMode = "static"

			gsap.to(event.currentTarget, {
				duration: 0.5,
				delay: 0.2,
				y: play.y - 350,
				ease: "Elastic.easeInOut",
			})

			let timerid = setTimeout(() => {
				this.hitSound.play()
			}, 500)

		})

		//**end start screen */

		this.si.app.stage.on("pointerdown", (event) => {

			this.hitSound.play()

			ninja.stop()

			ninja.texture = assets.ninjaJump

			let mXpos = event.global.x

			console.log(mXpos)

			mXpos > this.si.appWidth / 2 ? (ninja.scale.x = -1) : (ninja.scale.x = 1)

			/*    if (mXpos > this.si.appWidth / 2) {
			  ninja.scale.x = -1;

			} else {
			  ninja.scale.x = 1;
			}  */

			let newPosition = event.getLocalPosition(background)

			gsap.to(ninja, {
				duration: 0.2,
				x: newPosition.x - 300,
				y: newPosition.y,
				ease: "Circ.easeOut",

				onComplete: () => {
					gsap.to(ninja, {
						duration: 0.2,
						x: 512,
						y: 768 - 150,
						ease: "Circ.easeOut",
					})

					ninja.play()
				},
			})

			this.SoundArray = ["ia1", "ia2"]

			let getFromSoundArray = this.SoundArray[Math.floor(Math.random() *
				this.SoundArray.length)]
			this.ia = new Howl({
				src: ["./assets/sound/" + getFromSoundArray + ".mp3"],
				volume: 0.1
			})
			this.ia.play()
		})

		let ticker = Ticker.shared
		ticker.add((delta) => {
			console.log("ticker")
			if (this.enemy != undefined) {
				this.enemy.enemies.forEach((_enemy) => {
					if (this.ht.checkme(ninja, _enemy.getChildAt(1))) {
						const currentEnemySpriteSheet = _enemy.getChildAt(0)
						currentEnemySpriteSheet.state.setAnimation(0, "die", true)

						let enemyDieTimeline = gsap.timeline({
							onComplete: () => {
								this.scene.removeChild(_enemy)
							}
						})
						enemyDieTimeline.to(_enemy, {
							y: 300,
							duration: 0.7,
							ease: "Circ.easeOut",
						})
						enemyDieTimeline.to(_enemy, {
							y: 1200,
							duration: 0.5,
							ease: "Circ.easeIn",
						})

						if (_enemy.alive) {
							this.hitSound = new Howl({
								src: ["./assets/sound/effekt_hit.mp3"],
								volume: 0.2,
							})
							this.hitSound.play()
						}

						_enemy.alive = false
					}

					if (this.ht.checkme(this.hitareaNinja, _enemy.getChildAt(1))) {
						const currentEnemySpriteSheetAttack = _enemy.getChildAt(0)
						currentEnemySpriteSheetAttack.state.setAnimation(0, "attack", true)
						console.log("ninja hit");

						let timeToNinjaIsHurt = setTimeout(() => {
							ninja.stop();
							ninja.texture = Texture.from(
								"../assets/images/ninja-hurt.png"
							);
							gsap.to(ninja, {
								duration: 0.7,
								y: 550,
								ease: "Circ.easeOut",
								onComplete: () => {
									ninja.play();
									gsap.to(ninja, {
										duration: 0.4,
										y: 768 - 150,
									});
								},
							});
						}, 300);
						_enemy.alive = false;
						_enemy.attack = false;

						gsap.to(_enemy, {
							duration: 0.7,
							y: 550,
							ease: "Circ.easeOut",
							onComplete: () => {
								gsap.to(_enemy, {
									duration: 0.5,
									y: 768 - 50,
									ease: "Circ.easeOut",
								});
								currentEnemySpriteSheetAttack.state.setAnimation(0,"walk",true);
							}
						});
					}
				})
			}
		})
	} //end constructor
}

export default Game

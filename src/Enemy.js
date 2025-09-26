import gsap from "gsap"
import * as PIXI from "pixi.js"
import "pixi-spine"
import {Spine} from "pixi-spine"
import setRandomInterval from "set-random-interval"

class Enemy {
	constructor(assets, scene) {
		this.settings = {
			startFrom: 0,
			endAt: 0,
			front: 0,
			enemyArray: [],
			enemyDuration: [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 40, 50],
			from: ["left", "right"],
			counter: 0,
		}

		const interval = setRandomInterval(
			() => {
				let getFrom =
					this.settings.from[
						Math.floor(Math.random() * this.settings.from.length)
						]

				console.log(getFrom)

				this.settings.counter++

				if (getFrom == "left") {
					this.settings.startFrom = -400
					this.settings.endAt = 1700
					this.settings.front = -1
				} else {
					this.settings.startFrom = 1700
					this.settings.endAt = -400
					this.settings.front = 1
				}

				console.log(getFrom, this.settings.startFrom, this.settings.endAt)

				this.enemyContainer = new PIXI.Container()
				this.enemyContainer.x = this.settings.startFrom
				this.enemyContainer.data =
					this.settings.enemyDuration[
						Math.floor(Math.random() * this.settings.enemyDuration.length)
						]
				this.enemyContainer.alive = true
				this.enemyContainer.attack = true
				this.enemyContainer.id = this.settings.counter
				this.enemyContainer.y = 768 - 50
				this.enemyContainer.scale.x = this.settings.front
				this.enemyContainer.zIndex = 1
				this.enemyContainer.alive = true
				this.enemyContainer.attack = true
				scene.addChild(this.enemyContainer)
				this.settings.enemyArray.push(this.enemyContainer)

				const animation = new Spine(assets.alienSpine.spineData)
				animation.x = 0
				animation.y = 0

				this.enemyContainer.addChild(animation)

				if (animation.state.hasAnimation("walk")) {
					animation.state.setAnimation(0, "walk", true)
					animation.state.timeScale = 0.8
					animation.autoUpdate = true
				}

				const hitarea = new PIXI.Graphics()
				hitarea.beginFill(0xde3249)
				hitarea.drawRect(-25, -75, 50, 50)
				hitarea.alpha = 1
				hitarea.endFill()
				this.enemyContainer.addChild(hitarea)

				gsap.to(this.enemyContainer, {
					duration: this.enemyContainer.data,
					x: this.settings.endAt,
					ease: "Power0.easeNone",
					onComplete: () => {
						scene.removeChild(this.settings.enemyArray[0])
						this.settings.enemyArray.shift()
					}
				})
			},
			1000,
			5000
		) //end randominterval
	}

	get enemies() {
		return this.settings.enemyArray
	}
}

export default Enemy

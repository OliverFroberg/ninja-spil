import Stage from "./stage.js"
import {Sprite} from "pixi.js"

export default class Game {
	constructor(assets) {
		let myStage = new Stage()
		this.scene = myStage.scene
		this.scene.sortableChildren = true
		let background = myStage.bg
		this.si = myStage.stageInfo

		const bg = Sprite.from(assets.background)
		background.addChild(bg)
	}
}
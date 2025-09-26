import {Application, Container} from "pixi.js"

export default class Stage {
	constructor() {
		this.targetWidth = 1700
		this.targetHeight = 900
		this.targetCenter = 1024

		this.appWidth = window.innerWidth
		this.appHeight = window.innerHeight

		this.scaleFactor = this.appWidth / this.appHeight

		this.app = new Application()
		globalThis.__PIXI_APP_INIT__ = this.app
		document.body.appendChild(this.app.canvas)

		this.bg = new Container()
		this.bg.x = this.appWidth / 2
		this.bg.y = this.appHeight / 2
		this.bg.pivot.x = this.targetWidth * 0.5
		this.bg.pivot.y = this.targetHeight * 0.5
		this.bg.eventMode = "static"
		this.app.stage.addChild(this.bg)
		this.bg.getBounds()
		this.bg.scale.x = this.bg.scale.y = this.scaleFactor
		this.bg.scale.y = this.bg.scale.x = this.appHeight / this.targetHeight

		this.scene = new Container()
		this.scene.x = this.appWidth / 2
		this.scene.y = 0
		this.scene.pivot.x = this.targetCenter * 0.5
		this.app.stage.addChild(this.scene)
		this.scene.getBounds()

		this.scene.scale.x = this.scene.scale.y = this.scaleFactor
		this.scene.scale.y = this.scene.scale.x = this.appHeight / this.targetHeight

		this.app.renderer.resize(this.appWidth, this.appHeight)
	}

	get stageInfo() {
		return {
			appWidth: this.appWidth,
			appHeight: this.appHeight,
			targetWidth: this.targetWidth,
			targetHeight: this.targetHeight,
			scaleFactor: this.scaleFactor,
			app: this.app,
		}
	}
}
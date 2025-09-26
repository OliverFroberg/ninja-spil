import Game from "./Game"
import {Assets} from "pixi.js"
import "../css/style.scss"

Assets.addBundle("ninjas", {
	ninja: "../assets/spritesheet/ninjarack.json",
	ninjaJump: "../assets/images/ninja-jump.png",
	ninjaHurt: "../assets/images/ninja-hurt.png",
	background: "./assets/images/background.jpg",
	play: "../assets/images/play.png",
	alienSpine: "../assets/spritesheet/alien-spine/alienboss.json"
});

(async () => {
	const assets = await Assets.loadBundle("ninjas")
	if (assets) new Game(assets)
})()

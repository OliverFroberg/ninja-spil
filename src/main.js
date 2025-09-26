import {Assets} from "pixi.js"
import Game from "./game.js"

Assets.addBundle("ninjas", {
	ninja: "../public/spritesheet/ninjarack.json",
	ninjaJump: "../public/images/ninja-jump.png",
	ninjaHurt: "../public/images/ninja-hurt.png",
	background: "../public/images/background.jpg",
	play: "../public/images/play.png",
	alienSpine: "../public/spritesheet/alien-spine/alienboss.json",
})

(async () => {
	const assets = await Assets.loadBundle("ninjas")
	if (assets) new Game(assets);
})()
import {Application, Assets, Container, Sprite, Ticker} from "pixi.js";
import Ninja from "./entities/Ninja.ts";
import gsap from "gsap";
import {Enemy} from "./entities/Enemy.ts";

Assets.addBundle("ninjas", {
	ninja: "/assets/spritesheet/ninjarack.json",
	ninjaJump: "/assets/images/ninja-jump.png",
	ninjaHurt: "/assets/images/ninja-hurt.png",
	background: "/assets/images/background.jpg",
	play: "/assets/images/play.png",
	alienSpineJson: "/assets/spritesheet/alien-spine/alienboss.json",
	alienSpineAtlas: "/assets/spritesheet/alien-spine/alienboss.atlas",
});

export let assets: any;
export let scene: Container;
export let ninja: Ninja;

let enemyTicker: Ticker;
let enemySpawnerInterval: number;

(async () => {
	//========================== Initialize Application ==========================

	const app = new Application();

	await app.init({background: "#1099bb", resizeTo: window});
	// @ts-ignore DEBUGGING
	globalThis.__PIXI_APP__ = app;

	// Append the application canvas to the document body
	document.getElementById("pixi-container")!.appendChild(app.canvas);

	assets = await Assets.loadBundle("ninjas");


	//========================== Create Environment ==========================

	const background = Sprite.from(assets.background);
	background.label = "background";
	background.position.set(app.screen.width / 2, app.screen.height / 2);
	background.pivot.set(background.width / 2, background.height / 2);
	const scaleFactor = window.innerHeight / background.height;
	background.scale.set(scaleFactor);
	background.eventMode = "static";
	app.stage.addChild(background);

	scene = new Container();
	scene.label = "scene";
	scene.position.set(app.screen.width / 2, app.screen.height / 2);
	scene.scale.set(scaleFactor);
	scene.zIndex = 1;
	app.stage.addChild(scene);


	//========================== Create Entities ==========================

	// Create Ninja Entity (The Player)
	ninja = new Ninja();
	scene.addChild(ninja);


	//========================== Start Screen ==========================

	const play = Sprite.from(assets.play);
	play.anchor.set(0.5);
	play.position.set(0, -250);
	play.eventMode = "static";
	scene.addChild(play);


	//========================== Begin game ==========================

	play.on("pointerup", event => {
		// Plays hit sound when play button goes away
		setTimeout(() => {
			ninja.hitSound.play()
		}, 500)

		// Makes the play button unclickable after being clicked
		event.currentTarget.eventMode = "passive"
		// Animate play button out of screen
		gsap.to(event.currentTarget, {
			duration: 0.5,
			delay: 0.2,
			y: play.y - 350,
			ease: "Elastic.easeInOut",
		});

		// Click attack
		background.on("pointerdown", event => {
			const position = event.getLocalPosition(background);
			ninja.attackAt(position.x - background.pivot.x, position.y - background.pivot.y);
		});

		// Enemy updater
		enemyTicker = app.ticker.add((time) => {
			Enemy.enemies.forEach(enemy => {
				enemy.update(time);
			})
		});

		// Enemy spawner
		let lastSpawnDelay = 3000 // Starting delay
		function startSpawningEnemies() {
			scene.addChild(Enemy.createNewEnemy())
			enemySpawnerInterval = setTimeout(() => {
				lastSpawnDelay = Math.max(lastSpawnDelay * 0.975, 100)
				startSpawningEnemies()
			}, lastSpawnDelay);
		}
		startSpawningEnemies()
	});
})();

export function stopGame() {
	enemyTicker.stop();
	clearInterval(enemySpawnerInterval)
}
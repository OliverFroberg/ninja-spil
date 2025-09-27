import {Application, Assets, Container, Point, Sprite} from "pixi.js";
import Ninja from "./entities/Ninja.ts";
import gsap from "gsap";

Assets.addBundle("ninjas", {
	ninja: "/assets/spritesheet/ninjarack.json",
	ninjaJump: "/assets/images/ninja-jump.png",
	ninjaHurt: "/assets/images/ninja-hurt.png",
	background: "/assets/images/background.jpg",
	play: "/assets/images/play.png",
	alienSpine: "/assets/spritesheet/alien-spine/alienboss.json",
});

export let assets: any;
export let scene: Container;

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

	scene = new Container();
	scene.label = "scene";
	scene.position.set(app.screen.width / 2, app.screen.height / 2);
	scene.zIndex = 1;
	app.stage.addChild(scene);

	const background = Sprite.from(assets.background);
	background.label = "background";
	background.position.set(app.screen.width / 2, app.screen.height / 2);
	background.pivot.set(background.width / 2, background.height / 2);
	const originalRatio = background.width / background.height;
	background.width = app.screen.height * originalRatio;
	background.height = app.screen.height;
	background.eventMode = "static";
	app.stage.addChild(background);


	//========================== Create Entities ==========================

	// Create Ninja Entity (The Player)
	const ninja = new Ninja();
	scene.addChild(ninja);


	//========================== Start Screen ==========================

	const play = Sprite.from(assets["play"]);
	play.anchor.set(0.5);
	play.position.set(0, -250);
	play.eventMode = "static";
	scene.addChild(play);


	//========================== Begin game ==========================

	play.on("pointerup", event => {
		// Animate play button out of screen
		gsap.to(event.currentTarget, {
			duration: 0.5,
			delay: 0.2,
			y: play.y - 350,
			ease: "Elastic.easeInOut",
		});

		// Click attack
		app.canvas.addEventListener("pointerdown", (event) => {
			const rect = app.canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;

			ninja.attackAt(x - scene.x, y - scene.y);
		});
		// background.on("pointerdown", event => {
		// 	let newPosition = event.getLocalPosition(background);
		// 	newPosition = new Point(newPosition.x - background.pivot.x, newPosition.y - background.pivot.y)
		// 	console.log(newPosition);
		// 	ninja.attackAt(newPosition.x, newPosition.y);
		// });

		app.ticker.add((time) => {
		});
	});
})();
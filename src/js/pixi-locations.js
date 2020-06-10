import snowStorm from './particles-data/snow-storm';
import snow from './particles-data/snow';
import randomParticles from './particles-data/randome-particles';
import stars from './particles-data/stars';
import shootingStars from './particles-data/shooting-stars';
import eagleParticle from './particles-data/eagle';
import fogParticle from './particles-data/fog';
import { Vec2d } from './vector2d'

const canvas = document.getElementById('view');
let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
let _w = (iOS) ? screen.availWidth : window.innerWidth;
let _h = (iOS) ? screen.availHeight + 4 : window.innerHeight + 4;
const amplitude = 20;
const allImagesArray = [];
let displacementFilter = null;
let displacementSprite = null;
let app;
let loadedFiles = 0;
window.activeLocation = 0;
window.locationsAlphaArray = [];

// Arrays of Location
const locationDesignItems = [];
const locationWheatItems = [];
const locationSpringItems = [];
const locationNoteItems = [];
const locationVertexItems = [];
const locationHomeItems = [];
const locationEndItems = [];
// const locationEndItem = [];

$(function () {
	$('.main-slide').each(function () {
		app = new PIXI.Application({
			view: canvas,
			width: _w,
			height: _h,
			resolution: window.devicePixelRatio,
			legacy: true,
			transparent: true,
			autoResize: true,
			autoDetectRenderer: true
		});

		app.loader
			.add(`${__app.TEMPLATE_URI}/images/design/sky.jpg`) // Design nature // index 0
			.add(`${__app.TEMPLATE_URI}/images/design/mont.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/midl.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/tree.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/bott.png`) // Design nature END // index 4
			.add(`${__app.TEMPLATE_URI}/images/wheat/wsky.png`) // Wheat  // index 5
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle_back.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle_front.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfront.png`) // Wheat END // index 9
			.add(`${__app.TEMPLATE_URI}/images/spring/ssky.jpg`) // Spring // index 10
			.add(`${__app.TEMPLATE_URI}/images/spring/smont.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/shill.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/swater.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/sbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/sfog.png`) // Spring END // index 15
			.add(`${__app.TEMPLATE_URI}/images/note/nsky.jpg`) // Note // index 16
			.add(`${__app.TEMPLATE_URI}/images/note/nmont.png`)
			.add(`${__app.TEMPLATE_URI}/images/note/nhill.png`)
			.add(`${__app.TEMPLATE_URI}/images/note/nbott.png`) // Note END // index 19
			.add(`${__app.TEMPLATE_URI}/images/vertex/vsky.jpg`) // Vertex // index 20
			.add(`${__app.TEMPLATE_URI}/images/vertex/vmont.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vfog.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vsnow.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vfrozen.png`) // Vertex // index 25
			.add(`${__app.TEMPLATE_URI}/images/home/hmont.jpg`) // Home // index 26
			.add(`${__app.TEMPLATE_URI}/images/home/hcity.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hfog.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hmanson.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hlight.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hsun.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hgrass.png`) // Home End // index 33
			.add(`${__app.TEMPLATE_URI}/images/filter.png`) // DMap // index 34
			.add(`${__app.TEMPLATE_URI}/images/end/end.jpg`) // End // index 35
			.add(`${__app.TEMPLATE_URI}/images/wave_d.png`) // DMapWave // index 36
			.on('progress', loadingEnd)
			.load(handleLoadComplete);
	});
});

window.addEventListener('resize', resize);

function resize() {
	_w = (iOS) ? screen.availWidth : window.innerWidth;
	_h = (iOS) ? screen.availHeight + 4 : window.innerHeight + 4;
	app.renderer.resize(_w, _h);

	for (let image of allImagesArray) {
		resizeImages(image, app);
	}

	resizeImages(locationNoteItems[2], app, true);
}

window.resizeImages = function(image, renderer, isSmall) {
	isSmall = isSmall || false;
	_w = (iOS) ? screen.availWidth : window.innerWidth;
	_h = (iOS) ? screen.availHeight + 4 : window.innerHeight + 4;

	let winProp = _w / _h;
	let imageProp = 2320 / 1305;
	let height = 30;
	let width = 80;

	if (winProp > imageProp) {
		image.width = _w + (isSmall ? 0 : width);
		image.height = (_w / imageProp) - (isSmall ? 60 : height);
	} else {
		image.height = _h + (isSmall ? 0 : height);
		image.width = (_h * imageProp) + (isSmall ? 0 : width);
	}
	image.anchor.set(0.5);
	image.position.set(renderer.renderer.screen.width/2, renderer.renderer.screen.height/2);
};

function handleLoadComplete(loader, resources) {
	let resKeys = Object.keys(resources);

	// all textures
	let natureDesign = [
		new PIXI.Sprite(resources[resKeys[0]].texture),
		new PIXI.Sprite(resources[resKeys[1]].texture),
		new PIXI.Sprite(resources[resKeys[2]].texture),
		new PIXI.Sprite(resources[resKeys[3]].texture),
		new PIXI.Sprite(resources[resKeys[4]].texture)
	];

	let wheat = [
		new PIXI.Sprite(resources[resKeys[5]].texture),
		new PIXI.Sprite(resources[resKeys[6]].texture),
		new PIXI.Sprite(resources[resKeys[7]].texture),
		new PIXI.Sprite(resources[resKeys[8]].texture),
		new PIXI.Sprite(resources[resKeys[9]].texture),
	];

	let spring = [
		new PIXI.Sprite(resources[resKeys[10]].texture),
		new PIXI.Sprite(resources[resKeys[11]].texture),
		new PIXI.Sprite(resources[resKeys[12]].texture),
		new PIXI.Sprite(resources[resKeys[13]].texture),
		new PIXI.Sprite(resources[resKeys[14]].texture),
		new PIXI.Sprite(resources[resKeys[15]].texture)
	];

	let note = [
		new PIXI.Sprite(resources[resKeys[16]].texture),
		new PIXI.Sprite(resources[resKeys[17]].texture),
		new PIXI.Sprite(resources[resKeys[18]].texture),
		new PIXI.Sprite(resources[resKeys[19]].texture)
	];

	let vertex = [
		new PIXI.Sprite(resources[resKeys[20]].texture),
		new PIXI.Sprite(resources[resKeys[21]].texture),
		new PIXI.Sprite(resources[resKeys[22]].texture),
		new PIXI.Sprite(resources[resKeys[23]].texture),
		new PIXI.Sprite(resources[resKeys[24]].texture),
		new PIXI.Sprite(resources[resKeys[25]].texture)
	];

	let home = [
		new PIXI.Sprite(resources[resKeys[26]].texture),
		new PIXI.Sprite(resources[resKeys[27]].texture),
		new PIXI.Sprite(resources[resKeys[28]].texture),
		new PIXI.Sprite(resources[resKeys[29]].texture),
		new PIXI.Sprite(resources[resKeys[30]].texture),
		new PIXI.Sprite(resources[resKeys[31]].texture),
		new PIXI.Sprite(resources[resKeys[32]].texture),
		new PIXI.Sprite(resources[resKeys[33]].texture),
	];

	let end = [
		new PIXI.Sprite(resources[resKeys[35]].texture)
	];

	// let end2 = [
	// 	new PIXI.Sprite(resources[resKeys[35]].texture)
	// ];

	createLoaction(home, locationHomeItems, app, locationsAlphaArray); // Location Home
	createLoaction(wheat, locationWheatItems, app, locationsAlphaArray); // Location Wheat
	createLoaction(spring, locationSpringItems, app, locationsAlphaArray); // Location Spring
	createLoaction(note, locationNoteItems, app, locationsAlphaArray); // Location Note
	createLoaction(natureDesign, locationDesignItems, app, locationsAlphaArray); // Location Design
	createLoaction(vertex, locationVertexItems, app, locationsAlphaArray); // Location Vertex
	createLoaction(end, locationEndItems, app, locationsAlphaArray); // Location End
	// createLoaction(end2, locationEndItem, app, locationsAlphaArray); // Location End

	natureDesign = null;
	wheat = null;
	spring = null;
	note = null;
	vertex = null;
	home = null;
	end = null;

	//Effects

	//Displacement
	displacementSprite = PIXI.Sprite.from(resources[resKeys[34]].texture);
	displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	displacementSprite.anchor.set(0.5);
	displacementSprite.position.set(app.renderer.screen.width/2, app.renderer.screen.height/2);
	displacementSprite.renderable = false;

	displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);
	displacementFilter.autoFit = true;
	displacementFilter.scale.set(0);
	displacementSprite.scale.x = 0.8;

	app.stage.filters = [displacementFilter];
	app.stage.addChild(displacementSprite);
	//Displacement End

	//Particles
	let snowOne = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/snow_blured.png`);
	let snowTwo = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/snow_blured-2.png`);
	let smoke = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/smoke.png`);
	let star = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/light.png`);
	let shootingStar = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/shooting_star.png`);
	let fog = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/fog.png`);

	let emitterDesign = new Emitter(
		locationsAlphaArray[4],
		[snowOne],
		snow
	);

	let emitterVertex = new Emitter(
		locationsAlphaArray[5],
		[snowTwo,smoke],
		snowStorm
	);

	let emitterWheat = new Emitter(
		locationsAlphaArray[1],
		[smoke],
		randomParticles
	);

	let emitterEnd = new Emitter(
		locationsAlphaArray[6],
		[star],
		stars
	);

	let emitterEndShoot = new Emitter(
		locationsAlphaArray[6],
		[shootingStar],
		shootingStars
	);

	let emitterEagle = new Emitter(
		locationsAlphaArray[0].children[2],
		[
			{
				framerate: 30,
				loop: true,
				textures: [
					`${__app.TEMPLATE_URI}/images/birds/birds1.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds2.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds3.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds4.png`
				]
			},
			{
				framerate: 30,
				loop: true,
				textures: [
					`${__app.TEMPLATE_URI}/images/birds/birds_t4.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t3.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t2.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t1.png`,
				]
			}
		],
		eagleParticle
	);

	let emitterEagleSpring = new Emitter(
		locationsAlphaArray[2].children[1],
		[
			{
				framerate: 24,
				loop: true,
				textures: [
					`${__app.TEMPLATE_URI}/images/birds/birds1.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds2.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds3.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds4.png`
				]
			},
			{
				framerate: 24,
				loop: true,
				textures: [
					`${__app.TEMPLATE_URI}/images/birds/birds_t4.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t3.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t2.png`,
					`${__app.TEMPLATE_URI}/images/birds/birds_t1.png`,
				]
			}
		],
		eagleParticle
	);

	let emitterFog = new Emitter(
		locationsAlphaArray[3].children[1],
		[fog],
		fogParticle
	);

	emitterDesign.emit = true;
	emitterWheat.emit = true;
	emitterVertex.emit = true;
	emitterEnd.emit = true;
	emitterEndShoot.emit = true;
	emitterEagle.emit = true;
	emitterEagleSpring.emit = true;
	emitterFog.emit = true;

	emitterEagle.particleConstructor = AnimatedParticle;
	emitterEagleSpring.particleConstructor = AnimatedParticle;

	const effectsArray = [emitterEagle, emitterWheat, emitterEagleSpring, false, emitterDesign, emitterVertex, emitterEnd];

	const waveDisplacement = PIXI.Sprite.from(resources[resKeys[36]].texture);
	const waveDisplacementFilter = new PIXI.filters.DisplacementFilter(waveDisplacement);
	waveDisplacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	waveDisplacement.scale.set(0.8);
	waveDisplacementFilter.autoFit = true;
	waveDisplacementFilter.scale.set(20);

	locationSpringItems[3].addChild(waveDisplacement);
	locationSpringItems[3].filters = [waveDisplacementFilter];

	let wind = new Vec2d(0.2, 0.2);

	setInterval(() => {
		let direction = Math.random() / 50;
		wind = wind.rotate(direction);
	}, 500);

	let elapsed = Date.now();
	const update = function(){
		requestAnimationFrame(update);

		let now = Date.now();
		effectsArray[activeLocation] ? effectsArray[activeLocation].update((now - elapsed) * 0.001): effectsArray[activeLocation];

		if (activeLocation === 2) {
			waveDisplacement.x += wind.x;
			waveDisplacement.y += wind.y;
		}

		if (activeLocation === 3) {
			emitterFog.update((now - elapsed) * 0.001);
		}

		if (activeLocation === 6) {
			emitterEndShoot.update((now - elapsed) * 0.001);
		}

		elapsed = now;
	};

	update();
	//Particles End

	//Wheat Rotation
	for (let i = 1; i < 4; i++) {
		if (i !== 2) {
			TweenMax.fromTo(locationWheatItems[i].children[0].skew, 5, {
					x: -0.02,
				},
				{
					x: 0.02,
					repeat: -1,
					repeatDelay: 1,
					yoyo: true,
					ease: Power1.easeInOut,
					immediateRender:false
				});
		}
	}

	//Wheat Rotation End

	// adding event listener for mouse move
	window.addEventListener('mousemove',(e) => {
		let w = app.renderer.screen.width/2;
		let h = app.renderer.screen.height/2;

		parallaxHome(w, h, e);
		parallaxDesign(w, h, e);
		parallaxSpring(w, h, e);
		parallaxNote(w, h, e);
		parallaxVertex(w, h, e);
		parallaxWheat(w, h, e);
	});
}

function loadingEnd(loader, resource) {
	let loading = Math.ceil(++loadedFiles * 100 / Object.keys(loader.resources).length);
	$('.loader__number').text(loading);
	if (loading === 100) {
		setTimeout(function () {
			loaderAnimation.play();
		},500);
	}
}

window.changeLocationContainer = function (activeLocationIndex) {
	filterReverce();
	const displacementAnim = {
		x: 0,
		spriteX: app.renderer.screen.width/2
	};

	const changeLocationAnim = new TimelineMax();
	changeLocationAnim
		.to( displacementAnim, 1.5, {
			x: 150,
			spriteX: 500,
			intensity: 4,
			ease: Power4.easeIn,
			onUpdate: function () {
				displacementFilter.scale.x = displacementAnim.x;
				displacementSprite.x = displacementAnim.spriteX;
			},
			onstart: function () {
				locationsAlphaArray.map(function(item, i) {
					if(activeLocationIndex === i) {
						TweenMax.to(item, 1, {delay:1, alpha: 1, ease: Power4.easeInOut });
					} else {
						TweenMax.to(item, 1, {delay:1, alpha: 0, ease: Power4.easeInOut });
					}
				})
			},
			onComplete: function () {
				changeLocationAnim.reverse();
			}
		});
	activeLocation = activeLocationIndex;
};

function filterReverce() {
	const displacementAnim2 = {
		intensity: null
	} ;

	displacementAnim2.intensity = displacementFilter.scale.x;
	TweenMax.to(displacementAnim2, 1, {
		intensity: 0,
		ease: Power4.easeOut,
		onUpdate: function e() {
			displacementFilter.scale.x = displacementAnim2.intensity;
		}
	});

}

window.createLoaction = function(spriteArray, locationItemsArray, renderer, alphaArray) {
	let locationContainer = new PIXI.Container();

	for (let item of spriteArray) {
		const itemContainer = new PIXI.Container();
		resizeImages(item, renderer);
		allImagesArray.push(item);

		itemContainer.addChild(item);
		locationContainer.addChild(itemContainer);
		locationItemsArray.push(itemContainer);
	}

	alphaArray.push(locationContainer);
	locationContainer.alpha = alphaArray.length === 1 ? 1 : 0;

	// position container and elements
	locationContainer.position.set(0);

	// add container to stage
	renderer.stage.addChild(locationContainer);
};

function parallaxDesign(w, h, e) {
	TweenMax.to(locationDesignItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 5),
		y: (h - e.clientY) / (amplitude + 5),
		ease: Circ.easeOut
	});
	TweenMax.to(locationDesignItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 10),
		y: (h - e.clientY) / (amplitude + 10),
		ease: Circ.easeOut
	});
	TweenMax.to(locationDesignItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationDesignItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 90),
		y: (h - e.clientY) / (amplitude + 90),
		ease: Circ.easeOut
	});
	TweenMax.to(locationDesignItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 110),
		y: (h - e.clientY) / (amplitude + 110),
		ease: Circ.easeOut
	});
}

function parallaxSpring(w, h, e) {
	TweenMax.to(locationSpringItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 10),
		y: (h - e.clientY) / (amplitude + 10),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[2], 0.3, {
		y: (h - e.clientY) / (amplitude + 25),
		x: (w - e.clientX) / (amplitude + 25),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 5),
		y: (h - e.clientY) / (amplitude + 5),
		ease: Circ.easeOut
	});
}

function parallaxNote(w, h, e) {
	TweenMax.to(locationNoteItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 10),
		y: (h - e.clientY) / (amplitude + 10),
		ease: Circ.easeOut
	});
	TweenMax.to(locationNoteItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 17),
		y: (h - e.clientY) / (amplitude + 17),
		ease: Circ.easeOut
	});
	TweenMax.to(locationNoteItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 37),
		y: (h - e.clientY) / (amplitude + 37),
		ease: Circ.easeOut
	});
	TweenMax.to(locationNoteItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 55),
		y: (h - e.clientY) / (amplitude + 55),
		ease: Circ.easeOut
	});
}

function parallaxVertex(w, h, e) {
	TweenMax.to(locationVertexItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 10),
		y: (h - e.clientY) / (amplitude + 10),
		ease: Circ.easeOut
	});
	TweenMax.to(locationVertexItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 17),
		y: (h - e.clientY) / (amplitude + 17),
		ease: Circ.easeOut
	});
	TweenMax.to(locationVertexItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 37),
		y: (h - e.clientY) / (amplitude + 37),
		ease: Circ.easeOut
	});
	TweenMax.to(locationVertexItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 55),
		y: (h - e.clientY) / (amplitude + 55),
		ease: Circ.easeOut
	});
	TweenMax.to(locationVertexItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 60),
		y: (h - e.clientY) / (amplitude + 60),
		ease: Circ.easeOut
	});
	TweenMax.to(locationVertexItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 70),
		y: (h - e.clientY) / (amplitude + 70),
		ease: Circ.easeOut
	});
}

function parallaxHome(w, h, e) {
	TweenMax.to(locationHomeItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 15),
		y: (h - e.clientY) / (amplitude + 15),
		ease: Circ.easeOut
	});
	TweenMax.to(locationHomeItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationHomeItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 30),
		y: (h - e.clientY) / (amplitude + 30),
		ease: Circ.easeOut
	});
	TweenMax.to(locationHomeItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 40),
		y: (h - e.clientY) / (amplitude + 40),
		ease: Circ.easeOut
	});
	TweenMax.to(locationHomeItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 80),
		y: (h - e.clientY) / (amplitude + 80),
		ease: Circ.easeOut
	});
}

function parallaxWheat(w, h, e) {
	TweenMax.to(locationWheatItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 15),
		y: (h - e.clientY) / (amplitude + 15),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 35),
		y: (h - e.clientY) / (amplitude + 35),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 40),
		y: (h - e.clientY) / (amplitude + 40),
		ease: Circ.easeOut
	});
}

window.setInitialLocation = function() {
	let slideText;
	const currentTitleAnim = new TimelineMax({paused: true});
	const slide = document.querySelectorAll('.section')[initialIndex].getElementsByClassName('js-title');
	const slideFade = document.querySelectorAll('.section')[initialIndex].getElementsByClassName('js-fade');
	if (slide.length) slideText = new SplitText(slide, {type:"chars, lines"});
	activeLocation = initialIndex;

	if (slide.length) {
		currentTitleAnim
			.set(slideText.lines, {overflow: "hidden"})
			.staggerFromTo(slideText.chars, 1, {yPercent: -115},{yPercent: 0,ease: Power1.easeIn}, .015, 0)
			.from(slideFade, 1, {yPercent: -10, opacity: 0,ease: Power4.easeIn}, '-=1.5');
	}
	else {
		currentTitleAnim
			.from(slideFade, 1, {yPercent: -10, opacity: 0,ease: Power4.easeIn});
	}

	$('.main-slide').css('opacity', 1);

	currentTitleAnim.play();

	locationsAlphaArray.map(function(item, i) {
		if(initialIndex === i) {
			TweenMax.to(item, 0.5, { alpha: 1, ease: Power4.easeInOut });
		} else {
			TweenMax.to(item, 1.5, { alpha: 0, ease: Power4.easeInOut });
		}
	});

	swiper.slideTo(initialIndex, 0);
};

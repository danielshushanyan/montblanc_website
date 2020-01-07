import snowStorm from './particles-data/snow-storm';
import snow from './particles-data/snow';
import randomeParticles from './particles-data/randome-particles';

const canvas = document.getElementById('view');
let _w = window.innerWidth;
let _h = window.innerHeight + 4;
const amplitude = 20;
const allImagesArray = [];
let displacementFilter = null;
let displacementSprite = null;
let frameCondition = false;
let displacementFrame = null;
let app;
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
		PIXI.LoaderResource.setExtensionLoadType('gif', PIXI.LoaderResource.LOAD_TYPE.XHR);
		PIXI.LoaderResource.setExtensionXhrType('gif', PIXI.LoaderResource.XHR_RESPONSE_TYPE.BUFFER);
		app.loader
			.add(`${__app.TEMPLATE_URI}/images/design/sky.jpg`) // Design nature // index 0
			.add(`${__app.TEMPLATE_URI}/images/design/mont.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/midl.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/tree.png`)
			.add(`${__app.TEMPLATE_URI}/images/design/bott.png`) // Design nature END // index 4
			.add(`${__app.TEMPLATE_URI}/images/wheat/wsky.png`) // Wheat  // index 5
			.add(`${__app.TEMPLATE_URI}/images/wheat/wwheat.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wwheat_front.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle_back.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wbottle_front.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfront_left_b.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfront_left_f.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfront_right_b.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfront_right_f.png`)
			.add(`${__app.TEMPLATE_URI}/images/wheat/wfog.png`) // Wheat END // index 15
			.add(`${__app.TEMPLATE_URI}/images/spring/ssky.jpg`) // Spring // index 16
			.add(`${__app.TEMPLATE_URI}/images/spring/smont.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/shill.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/swater.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/sbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/spring/sfog.png`) // Spring END // index 22
			.add(`${__app.TEMPLATE_URI}/images/note/nsky.jpg`) // Note // index 23
			.add(`${__app.TEMPLATE_URI}/images/note/nmont.png`)
			.add(`${__app.TEMPLATE_URI}/images/note/nhill.png`)
			.add(`${__app.TEMPLATE_URI}/images/note/nbott.png`) // Note END // index 26
			.add(`${__app.TEMPLATE_URI}/images/vertex/vsky.jpg`) // Vertex // index 27
			.add(`${__app.TEMPLATE_URI}/images/vertex/vmont.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vfog.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vsnow.png`)
			.add(`${__app.TEMPLATE_URI}/images/vertex/vfrozen.png`) // Vertex // index 32
			.add(`${__app.TEMPLATE_URI}/images/home/hmont.jpg`) // Home // index 33
			.add(`${__app.TEMPLATE_URI}/images/home/hcity.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hfog.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hmanson.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hbott.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hlight.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hsun.png`)
			.add(`${__app.TEMPLATE_URI}/images/home/hgrass.png`) // Home End // index 41
			.add(`${__app.TEMPLATE_URI}/images/filter.png`) // DMap // index 31
			.add(`${__app.TEMPLATE_URI}/images/end/end.jpg`) // End // index 33
			.add(`${__app.TEMPLATE_URI}/images/wave_d.png`) // DMapWave // index 34
			.add(`${__app.TEMPLATE_URI}/images/birds.json`) // Birds // index 34
			.load(handleLoadComplete);
	});
});

window.addEventListener('resize', resize);

function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);

	for (let image of allImagesArray) {
		resizeImages(image, app);
	}

	for (let i = 2; i < 11; i++) {
		if (i !== 4) {
			locationWheatItems[i].children[0].position.set(app.renderer.screen.width, app.renderer.screen.height/1.2);
			locationWheatItems[i].children[0].pivot.set(locationWheatItems[i].children[0].width/1.9, locationWheatItems[i].children[0].height/2.4);
		}
	}
}

window.resizeImages = function(image, renderer) {
	let winProp = $(window).width() / $(window).height();
	let imageProp = 2320 / 1305;

	if (winProp > imageProp) {
		image.width = $(window).width() + 100;
		image.height = ($(window).width() / imageProp) - 50;
	} else {
		image.height = $(window).height() + 100;
		image.width = ($(window).height() * imageProp) - 50;
	}

	image.anchor.set(0.5);
	image.position.set(renderer.renderer.screen.width/2, renderer.renderer.screen.height/2);
};

function handleLoadComplete(loader, resources) {
	$('.header').removeClass('header--loader');
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
		new PIXI.Sprite(resources[resKeys[10]].texture),
		new PIXI.Sprite(resources[resKeys[11]].texture),
		new PIXI.Sprite(resources[resKeys[12]].texture),
		new PIXI.Sprite(resources[resKeys[13]].texture),
		new PIXI.Sprite(resources[resKeys[14]].texture),
		new PIXI.Sprite(resources[resKeys[15]].texture),
	];

	let spring = [
		new PIXI.Sprite(resources[resKeys[16]].texture),
		new PIXI.Sprite(resources[resKeys[17]].texture),
		new PIXI.Sprite(resources[resKeys[18]].texture),
		new PIXI.Sprite(resources[resKeys[19]].texture),
		new PIXI.Sprite(resources[resKeys[20]].texture),
		new PIXI.Sprite(resources[resKeys[21]].texture)
	];

	let note = [
		new PIXI.Sprite(resources[resKeys[22]].texture),
		new PIXI.Sprite(resources[resKeys[23]].texture),
		new PIXI.Sprite(resources[resKeys[24]].texture),
		new PIXI.Sprite(resources[resKeys[25]].texture)
	];

	let vertex = [
		new PIXI.Sprite(resources[resKeys[26]].texture),
		new PIXI.Sprite(resources[resKeys[27]].texture),
		new PIXI.Sprite(resources[resKeys[28]].texture),
		new PIXI.Sprite(resources[resKeys[29]].texture),
		new PIXI.Sprite(resources[resKeys[30]].texture),
		new PIXI.Sprite(resources[resKeys[31]].texture)
	];

	let home = [
		new PIXI.Sprite(resources[resKeys[32]].texture),
		new PIXI.Sprite(resources[resKeys[33]].texture),
		new PIXI.Sprite(resources[resKeys[34]].texture),
		new PIXI.Sprite(resources[resKeys[35]].texture),
		new PIXI.Sprite(resources[resKeys[36]].texture),
		new PIXI.Sprite(resources[resKeys[37]].texture),
		new PIXI.Sprite(resources[resKeys[38]].texture),
		new PIXI.Sprite(resources[resKeys[39]].texture),
	];

	let end = [
		new PIXI.Sprite(resources[resKeys[41]].texture)
	];

	createLoaction(home, locationHomeItems, app, locationsAlphaArray); // Location Home
	createLoaction(wheat, locationWheatItems, app, locationsAlphaArray); // Location Wheat
	createLoaction(spring, locationSpringItems, app, locationsAlphaArray); // Location Spring
	createLoaction(note, locationNoteItems, app, locationsAlphaArray); // Location Note
	createLoaction(natureDesign, locationDesignItems, app, locationsAlphaArray); // Location Design
	createLoaction(vertex, locationVertexItems, app, locationsAlphaArray); // Location Vertex
	createLoaction(end, locationEndItems, app, locationsAlphaArray); // Location End

	natureDesign = null;
	wheat = null;
	spring = null;
	note = null;
	vertex = null;
	home = null;
	end = null;

	//Effects
	//Birds
	let sheet = resources[resKeys[43]].spritesheet;
	let birdAnim = new PIXI.AnimatedSprite(sheet.animations['farme']);
	let birdSpring = new PIXI.AnimatedSprite(sheet.animations['farme']);
	let birdContainer = new PIXI.Container();
	let birdContainerSpring = new PIXI.Container();

	birdAnim.animationSpeed = 0.333333333;
	birdSpring.animationSpeed = 0.333333333;
	birdAnim.scale.set(1);
	birdAnim.skew.set(0, 3);
	birdSpring.scale.set(1, 0.8);
	birdSpring.skew.set(0, 3);
	birdAnim.position.set(app.renderer.screen.width/1.5, app.renderer.screen.height/6);
	birdSpring.position.set(app.renderer.screen.width/3, app.renderer.screen.height/7);
	birdAnim.play();
	birdSpring.play();
	birdContainer.addChild(birdAnim);
	birdContainerSpring.addChild(birdSpring);

	locationsAlphaArray[0].addChildAt(birdContainer, 2);
	locationsAlphaArray[2].addChildAt(birdContainerSpring, 2);
	locationHomeItems.splice(2, 0, birdContainer);
	locationSpringItems.splice(2, 0, birdContainerSpring);
	//Birds End

	//Displacement
	displacementSprite = PIXI.Sprite.from(resources[resKeys[40]].texture);
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
	let snowOne = PIXI.Texture.from('../images/snow_blured.png');
	let snowTwo = PIXI.Texture.from('../images/snow_blured-2.png');
	let smoke = PIXI.Texture.from('../images/smoke.png');

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
		randomeParticles
	);

	const effectsArray = [false ,emitterWheat, false, false,emitterDesign, emitterVertex, false];

	const waveDisplacement = PIXI.Sprite.from(resources[resKeys[42]].texture);
	const waveDisplacementFilter = new PIXI.filters.DisplacementFilter(waveDisplacement);
	waveDisplacement.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	waveDisplacement.scale.set(0.8);
	waveDisplacementFilter.autoFit = true;
	waveDisplacementFilter.scale.set(20);

	locationSpringItems[4].addChild(waveDisplacement);
	locationSpringItems[4].filters = [waveDisplacementFilter];

	class Vec2d {
		constructor(x, y) {
			this.x = x || 0;
			this.y = y || 0;
		}

		rotate(radians) {
			let ca = Math.cos(radians);
			let sa = Math.sin(radians);
			return new Vec2d(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
		}
	}

	let wind = new Vec2d(0.2, 0.2);

	setInterval(() => {
		let direction = Math.random() / 50;
		wind = wind.rotate(direction);
	}, 500);

	app.ticker.add(function () {
		waveDisplacement.x += wind.x;
		waveDisplacement.y += wind.y;
	});

	let elapsed = Date.now();
	const update = function(){

		requestAnimationFrame(update);

		let now = Date.now();
		effectsArray[activeLocation] ? effectsArray[activeLocation].update((now - elapsed) * 0.001): effectsArray[activeLocation];
		elapsed = now;
	};
	emitterDesign.emit = true;
	emitterWheat.emit = true;
	emitterVertex.emit = true;
	update();
	//Particles End

	//Wheat Rotation
	for (let i = 2; i < 11; i++) {
		console.log(i);
		if (i !== 4) {
			locationWheatItems[i].children[0].position.set(app.renderer.screen.width, app.renderer.screen.height/1.2);
			locationWheatItems[i].children[0].pivot.set(locationWheatItems[i].children[0].width/1.9, locationWheatItems[i].children[0].height/2.4);
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
		let RAF;

		if (RAF) {
			window.cancelAnimationFrame(RAF);
		}

		RAF = window.requestAnimationFrame(() => {
			let w = app.renderer.screen.width/2;
			let h = app.renderer.screen.height/2;

			parallaxHome(w, h, e);
			parallaxDesign(w, h, e);
			parallaxSpring(w, h, e);
			parallaxNote(w, h, e);
			parallaxVertex(w, h, e);
			parallaxWheat(w, h, e);

		})
	});

	setTimeout(function () {
		$('.loader').fadeOut('100');
	},2000);
	setInitialLocation();
}

function requestFrame() {
	if (frameCondition) {
		displacementFrame = window.requestAnimationFrame(requestFrame);
	}
}

window.changeLocationContainer = function (activeLocationIndex) {
	activeLocation = activeLocationIndex;
	filterReverce();
	const displacementAnim = {
		x: 0,
		spriteX: app.renderer.screen.width/2
	};

	frameCondition = true;
	requestFrame();

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

	changeLocationAnim.eventCallback('onComplete', function () {
		frameCondition = false;
		window.cancelAnimationFrame(displacementFrame);
	})
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
		x: (w - e.clientX) / (amplitude + 30),
		y: (h - e.clientY) / (amplitude + 30),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 30),
		y: (h - e.clientY) / (amplitude + 30),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[2], 0.3, {
		y: (h - e.clientY) / (amplitude + 10),
		x: (w - e.clientX) / (amplitude + 10),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 25),
		y: (h - e.clientY) / (amplitude + 25),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[6], 0.3, {
		x: (w - e.clientX) / (amplitude + 90),
		y: (h - e.clientY) / (amplitude + 90),
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
	TweenMax.to(locationHomeItems[2], 0.3, {
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
	TweenMax.to(locationWheatItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 80),
		y: (h - e.clientY) / (amplitude + 80),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[6], 0.3, {
		x: (w - e.clientX) / (amplitude + 90),
		y: (h - e.clientY) / (amplitude + 90),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[7], 0.3, {
		x: (w - e.clientX) / (amplitude + 90),
		y: (h - e.clientY) / (amplitude + 90),
		ease: Circ.easeOut
	});
	TweenMax.to(locationWheatItems[8], 0.3, {
		x: (w - e.clientX) / (amplitude + 90),
		y: (h - e.clientY) / (amplitude + 90),
		ease: Circ.easeOut
	});
}

function setInitialLocation() {
	const currentTitleAnim = new TimelineMax({paused: true});
	const slide = document.querySelectorAll('.section')[initialIndex].getElementsByClassName('js-title');
	const slideFade = document.querySelectorAll('.section')[initialIndex].getElementsByClassName('js-fade');
	const slideText = new SplitText(slide, {type:"chars, lines"});

	currentTitleAnim
		.set(slideText.lines, {overflow: "hidden"})
		.staggerFromTo(slideText.chars, 1, {yPercent: -115},{yPercent: 0,ease: Power1.easeIn}, .015, 0)
		.from(slideFade, 1, {yPercent: -10, opacity: 0,ease: Power4.easeIn}, '-=1.5');

	$('.header').addClass('header--top');
	$('.hide').removeClass('hide');
	$('.main-slide').css('opacity', 1);

	currentTitleAnim.play();
	changeLocationContainer(initialIndex);
}

const canvas = document.getElementById('view');
let _w = window.innerWidth;
let _h = window.innerHeight + 4;
const amplitude = 20;
const allImagesArray = [];
window.locationsAlphaArray = [];
let displacementFilter = null;
let displacementSprite = null;
let frameCondition = false;
let displacementFrame = null;
let app;

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

		app.loader
			.add('../images/design/sky.jpg') // Design nature // index 0
			.add('../images/design/mont.png')
			.add('../images/design/midl.png')
			.add('../images/design/tree.png')
			.add('../images/design/bott.png') // Design nature END // index 4
			.add('../images/wheat/bg.jpg') // Wheat END // index 5
			.add('../images/spring/ssky.jpg') // Spring // index 6
			.add('../images/spring/smont.png')
			.add('../images/spring/sbirds.png')
			.add('../images/spring/shill.png')
			.add('../images/spring/swater.png')
			.add('../images/spring/sbott.png')
			.add('../images/spring/sfog.png') // Spring END // index 12
			.add('../images/note/nsky.jpg') // Note // index 13
			.add('../images/note/nmont.png')
			.add('../images/note/nhill.png')
			.add('../images/note/nbott.png') // Note END // index 16
			.add('../images/vertex/vsky.jpg') // Vertex // index 17
			.add('../images/vertex/vmont.png')
			.add('../images/vertex/vbott.png')
			.add('../images/vertex/vfog.png')
			.add('../images/vertex/vsnow.png')
			.add('../images/vertex/vfrozen.png') // Vertex // index 22
			.add('../images/home/hmont.jpg') // Home // index 23
			.add('../images/home/hcity.png')
			.add('../images/home/hbird.png')
			.add('../images/home/hfog.png')
			.add('../images/home/hmanson.png')
			.add('../images/home/hbott.png')
			.add('../images/home/hlight.png')
			.add('../images/home/hsun.png')
			.add('../images/home/hgrass.png') // Home End // index 31
			.add('../images/filter.png') // DMap // index 31
			.add('../images/end/end.jpg') // DMap // index 33
			.load(handleLoadComplete);
	});
});

window.addEventListener('resize', resize);

function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);

	for (let image of allImagesArray) {
		resizeImages(image, app);
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
		new PIXI.Sprite(resources[resKeys[5]].texture)
	];

	let spring = [
		new PIXI.Sprite(resources[resKeys[6]].texture),
		new PIXI.Sprite(resources[resKeys[7]].texture),
		new PIXI.Sprite(resources[resKeys[8]].texture),
		new PIXI.Sprite(resources[resKeys[9]].texture),
		new PIXI.Sprite(resources[resKeys[10]].texture),
		new PIXI.Sprite(resources[resKeys[11]].texture),
		new PIXI.Sprite(resources[resKeys[12]].texture)
	];

	let note = [
		new PIXI.Sprite(resources[resKeys[13]].texture),
		new PIXI.Sprite(resources[resKeys[14]].texture),
		new PIXI.Sprite(resources[resKeys[15]].texture),
		new PIXI.Sprite(resources[resKeys[16]].texture)
	];

	let vertex = [
		new PIXI.Sprite(resources[resKeys[17]].texture),
		new PIXI.Sprite(resources[resKeys[18]].texture),
		new PIXI.Sprite(resources[resKeys[19]].texture),
		new PIXI.Sprite(resources[resKeys[20]].texture),
		new PIXI.Sprite(resources[resKeys[21]].texture),
		new PIXI.Sprite(resources[resKeys[22]].texture)
	];

	let home = [
		new PIXI.Sprite(resources[resKeys[23]].texture),
		new PIXI.Sprite(resources[resKeys[24]].texture),
		new PIXI.Sprite(resources[resKeys[25]].texture),
		new PIXI.Sprite(resources[resKeys[26]].texture),
		new PIXI.Sprite(resources[resKeys[27]].texture),
		new PIXI.Sprite(resources[resKeys[28]].texture),
		new PIXI.Sprite(resources[resKeys[29]].texture),
		new PIXI.Sprite(resources[resKeys[30]].texture),
		new PIXI.Sprite(resources[resKeys[31]].texture)
	];

	let end = [
		new PIXI.Sprite(resources[resKeys[33]].texture)
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

	displacementSprite = PIXI.Sprite.from(resources[resKeys[32]].texture);
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
		x: (w - e.clientX) / (amplitude + 15),
		y: (h - e.clientY) / (amplitude + 15),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 35),
		y: (h - e.clientY) / (amplitude + 35),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[4], 0.3, {
		x: (w - e.clientX) / (amplitude + 40),
		y: (h - e.clientY) / (amplitude + 40),
		ease: Circ.easeOut
	});
	TweenMax.to(locationSpringItems[5], 0.3, {
		x: (w - e.clientX) / (amplitude + 80),
		y: (h - e.clientY) / (amplitude + 80),
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

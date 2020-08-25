import clouds from "./particles-data/clouds";

const canvas = document.getElementById('intro');
let app;
let _w = window.innerWidth;
let _h = window.innerHeight + 4;
const alphaArray = [];
const locationAgeItems = [];
const amplitude = 20;

$(function () {
	$('.age').each(function () {
		window.allImagesArray = [];
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
			.add(`${__app.TEMPLATE_URI}/images/age/asky.jpg?v=${__app.TEMPLATE_VERSION}`)
			.add(`${__app.TEMPLATE_URI}/images/age/amont.png?v=${__app.TEMPLATE_VERSION}`)
			.add(`${__app.TEMPLATE_URI}/images/age/ahill.png?v=${__app.TEMPLATE_VERSION}`)
			.add(`${__app.TEMPLATE_URI}/images/age/agrass.png?v=${__app.TEMPLATE_VERSION}`)
			.add(`${__app.TEMPLATE_URI}/images/filter.png?v=${__app.TEMPLATE_VERSION}`)
			.load(handleLoadComplete);

		window.addEventListener('resize', resize);
	});

	$('.js-age').on('click', function () {
		let myDate = new Date();
		myDate.setMonth(myDate.getMonth() + 12);
		document.cookie = `age=true;expires=${myDate};domain=${window.location.hostname};path=/`;
		$(location).attr('href', `http://${window.location.host}/`)
	});
});

function resize() {
	app.renderer.resize(window.innerWidth, window.innerHeight);

	for (let image of allImagesArray) {
		resizeImages(image, app);
	}
}

function handleLoadComplete(loader, resources) {
	$('.age').fadeIn();
	let resKeys = Object.keys(resources);

	let age = [
		new PIXI.Sprite(resources[resKeys[0]].texture),
		new PIXI.Sprite(resources[resKeys[1]].texture),
		new PIXI.Sprite(resources[resKeys[2]].texture),
		new PIXI.Sprite(resources[resKeys[3]].texture)
	];

	createLoaction(age, locationAgeItems, app, alphaArray);

	age = null;

	let cloud1 = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/age/cloud_1.png?v=${__app.TEMPLATE_VERSION}`);
	let cloud2 = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/age/cloud_2.png?v=${__app.TEMPLATE_VERSION}`);
	let cloud3 = PIXI.Texture.from(`${__app.TEMPLATE_URI}/images/age/cloud_3.png?v=${__app.TEMPLATE_VERSION}`);

	let emitterCloud = new Emitter(
		locationAgeItems[0],
		[cloud1,cloud2,cloud3],
		clouds
	);

	let elapsed = Date.now();
	const update = function(){

		requestAnimationFrame(update);

		let now = Date.now();

		emitterCloud.update((now - elapsed) * 0.001);
		elapsed = now;
	};
	emitterCloud.emit = true;
	update();

	window.addEventListener('mousemove',(e) => {
		let w = app.renderer.screen.width/2;
		let h = app.renderer.screen.height/2;

		parallaxAge(w, h, e);
	});
}

function parallaxAge(w, h, e) {
	TweenMax.to(locationAgeItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 20),
		y: (h - e.clientY) / (amplitude + 20),
		ease: Circ.easeOut
	});
	TweenMax.to(locationAgeItems[1], 0.3, {
		x: (w - e.clientX) / (amplitude + 17),
		y: (h - e.clientY) / (amplitude + 17),
		ease: Circ.easeOut
	});
	TweenMax.to(locationAgeItems[2], 0.3, {
		x: (w - e.clientX) / (amplitude + 37),
		y: (h - e.clientY) / (amplitude + 37),
		ease: Circ.easeOut
	});
	TweenMax.to(locationAgeItems[3], 0.3, {
		x: (w - e.clientX) / (amplitude + 37),
		y: (h - e.clientY) / (amplitude + 37),
		ease: Circ.easeOut
	});
}

const canvas = document.getElementById('intro');
let app;
let _w = window.innerWidth;
let _h = window.innerHeight + 4;
const alphaArray = [];
const locationAgeItems = [];
const amplitude = 20;
let displacementFilter = null;
let displacementSprite = null;
let frameCondition = false;
let displacementFrame = null;

$(function () {
	$('.age').each(function () {
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
			.add('../images/age/asky.jpg')
			.add('../images/age/amont.png')
			.add('../images/age/ahill.png')
			.add('../images/age/agrass.png')
			.add('../images/filter.png')
			.load(handleLoadComplete);
	});

	$('.js-age').on('click', function () {
		let myDate = new Date();
		myDate.setMonth(myDate.getMonth() + 12);
		document.cookie = `age=true;expires=${myDate};domain=${window.location.hostname};path=/`;
		$(location).attr('href', `http://${window.location.host}/main`)
	});
});



window.addEventListener('resize', resize);

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

	displacementSprite = PIXI.Sprite.from(resources[resKeys[4]].texture);
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

	window.addEventListener('mousemove',(e) => {
		let RAF;

		if (RAF) {
			window.cancelAnimationFrame(RAF);
		}

		RAF = window.requestAnimationFrame(() => {
			let w = app.renderer.screen.width/2;
			let h = app.renderer.screen.height/2;

			parallaxAge(w, h, e);
		})
	});
}

function changeLocation(activeLocationIndex) {
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
}

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

function parallaxAge(w, h, e) {
	TweenMax.to(locationAgeItems[0], 0.3, {
		x: (w - e.clientX) / (amplitude + 10),
		y: (h - e.clientY) / (amplitude + 10),
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
		x: (w - e.clientX) / (amplitude + 55),
		y: (h - e.clientY) / (amplitude + 55),
		ease: Circ.easeOut
	});
}

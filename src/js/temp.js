var Jello = function () {
	// Cached variables that can be used and changed in all the functions in the class
	function Jello() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, Jello);

		this.defaults = {};
		this.options = options;
		this.canvasHolder = document.getElementById("jello-container");
		this.imgWidth = 1920;
		this.imgHeight = 960;
		this.imgRatio = this.imgHeight / this.imgWidth;
		this.winWidth = window.innerWidth;
		this.bgArray = [];
		this.bgSpriteArray = [];
		this.renderer = window.PIXI.autoDetectRenderer(this.winWidth, this.winWidth * this.imgRatio);
		this.stage = new window.PIXI.Container();
		this.imgContainer = new window.PIXI.Container();
		this.imageCounter = 0;
		this.displacementSprite = window.PIXI.Sprite.fromImage("/assets/images/codes/jello/dmap-clouds-01.jpg");
		this.displacementFilter = new window.PIXI.filters.DisplacementFilter(this.displacementSprite);
		this.currentMap = {};
		this.mapCounter = 0;
		this.mapArray = [];
		this.raf = this.animateFilters.bind(this);
		this.isDistorted = true;
		this.isTransitioning = false;
		this.initialize();
	}

	_createClass(Jello, [{
		key: "initialize",
		value: function initialize() {
			this.defaults = {
				transition: 1,
				speed: 0.5,
				dispScale: 200,
				dispX: true,
				dispY: true,
				count: 0
			};
			this.update();
			// An array of images for background (.jpg)
			// They"ll transition in the order listed below
			this.bgArray.push("image-1", "image-2", "image-3", "image-4", "image-5", "image-6", "image-7");
			// An array of displacement maps
			// They"ll transition in the order below with the included settings
			this.mapArray.push({
				image: "dmap-clouds-01.jpg",
				speed: 0.5,
				scale: 200
			}, {
				image: "dmap-glass-01.jpg",
				speed: 0.3,
				scale: 200
			});
			this.backgroundFill();
			this.buildStage();
			this.createBackgrounds();
			this.createFilters();
			this.animateFilters();
			this.eventListener();
			this.renderer.view.setAttribute("class", "jello-canvas");
			this.canvasHolder.appendChild(this.renderer.view);
		}

		// define animations and call this.raf

	}, {
		key: "animateFilters",
		value: function animateFilters() {
			this.displacementFilter.scale.x = this.settings.dispX ? this.settings.transition * this.settings.dispScale : 0;
			this.displacementFilter.scale.y = this.settings.dispY ? this.settings.transition * (this.settings.dispScale + 10) : 0;
			this.displacementSprite.x = Math.sin(this.settings.count * 0.15) * 200;
			this.displacementSprite.y = Math.cos(this.settings.count * 0.13) * 200;
			this.displacementSprite.rotation = this.settings.count * 0.06;
			this.settings.count += 0.05 * this.settings.speed;
			this.renderer.render(this.stage);
			window.requestAnimationFrame(this.raf);
		}

		// canvas built to fill width of window

	}, {
		key: "backgroundFill",
		value: function backgroundFill() {
			this.renderer.view.setAttribute("style", "height:auto;width:110%;margin-left:-5%;");
		}

		// main container for animation

	}, {
		key: "buildStage",
		value: function buildStage() {
			this.imgContainer.position.x = this.imgWidth / 2;
			this.imgContainer.position.y = this.imgHeight / 2;
			this.stage.scale.x = this.stage.scale.y = this.winWidth / this.imgWidth;
			this.stage.interactive = true;
			this.stage.addChild(this.imgContainer);
		}

		// cycle through this.bgArray and change images with crossfade

	}, {
		key: "changeImage",
		value: function changeImage() {
			var _this = this;

			if (this.imageCounter < this.bgArray.length - 1) {
				this.imageCounter++;
			} else {
				this.imageCounter = 0;
			}
			this.bgSpriteArray.map(function (sprite, i) {
				if (i === _this.imageCounter) {
					window.TweenLite.to(sprite, 1, { alpha: 1, ease: window.Power2.easeInOut });
				} else {
					window.TweenLite.to(sprite, 1, { alpha: 0, ease: window.Power2.easeInOut });
				}
			});
		}

		// cycle through this.mapArray and change displacement maps

	}, {
		key: "changeMap",
		value: function changeMap() {
			if (this.mapCounter < this.mapArray.length - 1) {
				this.mapCounter++;
			} else {
				this.mapCounter = 0;
			}
			this.currentMap = this.mapArray[this.mapCounter];
			this.displacementSprite = window.PIXI.Sprite.fromImage("/assets/images/codes/jello/" + this.currentMap.image);
			this.displacementFilter = new window.PIXI.filters.DisplacementFilter(this.displacementSprite);
			this.createFilters();
		}

		// preload all backgrounds for quick transitions

	}, {
		key: "createBackgrounds",
		value: function createBackgrounds() {
			var _this2 = this;

			this.bgArray.map(function (image) {
				var bg = window.PIXI.Sprite.fromImage("/assets/images/codes/jello/" + image + ".jpg");

				// Set image anchor to the center of the image
				bg.anchor.x = 0.5;
				bg.anchor.y = 0.5;
				_this2.imgContainer.addChild(bg);
				_this2.bgSpriteArray.push(bg);
				// set first image alpha to 1, all else to 0
				bg.alpha = _this2.bgSpriteArray.length === 1 ? 1 : 0;
			});
		}

		// distortion filters added to stage

	}, {
		key: "createFilters",
		value: function createFilters() {
			this.stage.addChild(this.displacementSprite);
			this.displacementFilter.scale.x = this.displacementFilter.scale.y = this.winWidth / this.imgWidth;
			this.imgContainer.filters = [this.displacementFilter];
		}

		// function changes the distortion level to a specific amount

	}, {
		key: "distortionLevel",
		value: function distortionLevel(amt) {
			var _this3 = this;

			if (!this.isTransitioning) {
				this.isTransitioning = true;
				window.TweenLite.to(this.settings, 1, {
					transition: amt,
					speed: this.currentMap.speed,
					dispScale: this.currentMap.scale,
					ease: window.Power2.easeInOut,
					onComplete: function onComplete() {
						_this3.isTransitioning = false;
					}
				});
			}
		}

		// click events

	}, {
		key: "eventListener",
		value: function eventListener() {
			var _this4 = this;

			var changeImageBtn = document.getElementsByClassName("js-change-image")[0];
			var changeDistortionBtn = document.getElementsByClassName("js-change-distortion")[0];
			var toggleDistorionBtn = document.getElementsByClassName("js-toggle-distortion")[0];

			changeImageBtn.onclick = function () {
				_this4.changeImage();
			};
			changeDistortionBtn.onclick = function () {
				_this4.changeMap();
			};
			toggleDistorionBtn.onclick = function () {
				_this4.toggleDistortion();
			};
		}

		// turn the distortion on and off using the options.transistion variable

	}, {
		key: "toggleDistortion",
		value: function toggleDistortion() {
			if (this.isDistorted) {
				this.distortionLevel(0);
				this.isDistorted = false;
			} else {
				this.distortionLevel(1);
				this.isDistorted = true;
			}
		}

		// Object.assign overwrites defaults with options to create settings

	}, {
		key: "update",
		value: function update() {
			this.settings = Object.assign({}, this.defaults, this.options);
		}

		// ============ TEAR DOWN =============== //

	}, {
		key: "tearDown",
		value: function tearDown() {
			window.cancelAnimationFrame(this.raf);
			this.settings = {};
			this.bgArray = [];
			this.bgSpriteArray = [];
		}
	}]);

	return Jello;
}();

$(function () {
	let locker = true;
	window.swiper = undefined;
	const screenWidth = $(window).width();
	const counterAnimation = new TimelineMax({paused: true});
	const newChars = '123456789';
	const infinityPath = 'M26.9856 0.959999C29.279 0.959999 31.239 1.77333 32.8656 3.4C34.4923 5 35.3056 6.93333 35.3056 9.2C35.3056 11.44 34.479 13.3867 32.8256 15.04C31.199 16.6667 29.2256 17.48 26.9056 17.48C25.3856 17.48 23.999 17.08 22.7456 16.28C21.519 15.48 19.9856 14.1467 18.1456 12.28C16.2256 14.2 14.6256 15.5467 13.3456 16.32C12.0123 17.0933 10.6256 17.48 9.18563 17.48C6.91896 17.48 4.97229 16.6667 3.34563 15.04C1.74563 13.3867 0.945625 11.4533 0.945625 9.24C0.945625 6.97333 1.75896 5.02667 3.38563 3.4C5.01229 1.77333 6.98563 0.959999 9.30563 0.959999C10.6656 0.959999 11.999 1.33333 13.3056 2.08C14.639 2.8 16.2523 4.09333 18.1456 5.96C20.039 4.12 21.639 2.82667 22.9456 2.08C24.2523 1.33333 25.599 0.959999 26.9856 0.959999ZM9.22563 12.92C9.99896 12.92 10.8123 12.64 11.6656 12.08C12.519 11.52 13.639 10.5467 15.0256 9.16C13.6123 7.8 12.5056 6.86667 11.7056 6.36C10.9323 5.85333 10.1856 5.6 9.46563 5.6C8.42563 5.6 7.54563 5.97333 6.82563 6.72C6.10563 7.44 5.74563 8.30667 5.74563 9.32C5.74563 10.3333 6.07896 11.1867 6.74563 11.88C7.41229 12.5733 8.23896 12.92 9.22563 12.92ZM26.7056 12.92C27.7456 12.92 28.639 12.56 29.3856 11.84C30.1323 11.12 30.5056 10.24 30.5056 9.2C30.5056 8.18667 30.1456 7.33333 29.4256 6.64C28.7056 5.94667 27.8256 5.6 26.7856 5.6C25.9323 5.6 25.119 5.85333 24.3456 6.36C23.5723 6.86667 22.5323 7.77333 21.2256 9.08C22.799 10.7067 23.9056 11.7333 24.5456 12.16C25.2923 12.6667 26.0123 12.92 26.7056 12.92Z';
	window.lockLocationsTransition = true;
	window.prevIndex = null;
	MorphSVGPlugin.convertToPath("path");

	const slideOne = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/1_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/1_slide.webm`],
		volume: 0,
		loop: true
	});

	const slideTwo = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/2_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/2_slide.webm`],
		volume: 0,
		loop: true
	});

	const slideThree = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/3_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/3_slide.webm`],
		volume: 0,
		loop: true
	});

	const slideFour = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/4-5_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/4-5_slide.webm`],
		volume: 0,
		loop: true
	});

	const slideFive = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/4-5_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/4-5_slide.webm`],
		volume: 0,
		loop: true
	});

	const slideSix = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/6_slide.mp3`,`${__app.TEMPLATE_URI}/sounds/6_slide.webm`],
		volume: 0,
		loop: true
	});

	window.soundArray = [slideOne,slideTwo,slideThree,slideFour,slideFive,slideSix];

	counterAnimation
		.set('.counter-circle', {transformOrigin: 'center center'})
		.append('homeland')
		.to('.counter-circle', 1,{x: 0, y: 0, ease: Circ.easeInOut})
		.to('.count__num', 1,{scrambleText:{text:'24', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('wheat')
		.to('.counter-circle', 1,{x: 8, y: -3})
		.to('.count__num', 1,{scrambleText:{text:'65', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('spring')
		.to('.counter-circle', 1,{x: 15, y: -7})
		.to('.count__num', 1,{scrambleText:{text:'74', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('alps')
		.to('.counter-circle', 1,{x: 33, y: -20})
		.to('.count__num', 1,{scrambleText:{text:'1252', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('design')
		.to('.counter-circle', 1,{x: 49, y: -34})
		.to('.count__num', 1,{scrambleText:{text:'3842', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('vertex')
		.to('.counter-circle', 1,{x: 71, y: -49})
		.to('.count__num', 1,{scrambleText:{text:'4810', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('story')
		.to('.counter-circle', 1,{x: 71, y: -49})
		.to('.count__num', 1,{scrambleText:{text:'4810', chars: newChars, revealDelay:0.2, speed:0.5}},'-=1')
		.append('infinity')
		.to('.counter-circle', 0.5,{opacity: 0, ease: Circ.easeInOut})
		.to('.count__num', 0.5,{opacity: 0, ease: Circ.easeInOut},'-=0.5')
		.to('.counter-mont-left', 1,{
			opacity: 0,
			morphSVG:{
				shape: infinityPath,
				shapeIndex: 1
			},
			x: 100,
			y: 31,
			ease: Circ.easeInOut
		},'-=0.5')
		.to('.counter', 1,{x: 69, y: 1, ease: Circ.easeInOut},'-=1')
		.to('.counter-mont-right', 1,{
			morphSVG:{
				shape: infinityPath,
				shapeIndex: 1
			},
			opacity: 1,
			fill: '#fff',
			x: 100,
			y: 31,
			ease: Circ.easeInOut
		},'-=1')
		.append('end');

	function initSwiper() {
		if(screenWidth >= 768 && swiper === undefined) {
			initSlider();

		} else if (screenWidth <= 767) {
			jQuery('.swiper-wrapper').removeAttr('style');
			jQuery('.swiper-slide').removeAttr('style');
			$('.swiper-wrapper').removeClass('swiper-wrapper');
			$('.swiper-slide').removeClass('swiper-slide');
			if(swiper !== undefined) swiper.destroy();
			swiper = undefined;
		}
	}

	initSwiper();

	$(window).on('resize', function(){
		initSwiper();
	});


	$('.main-slide').each(function () {
		$(window).on('mousewheel DOMMouseScroll keydown', function(e){
			if(lockLocationsTransition) {
				if ((e.originalEvent.wheelDelta < 0 || e.originalEvent.detail > 0 || e.keyCode === 40) && screenWidth >= 768) {
					if(!locker) {
						return false
					}
					if (swiper.slides.length > swiper.realIndex + 1) {
						locker = false;
						pageContentAnimation(swiper.realIndex, swiper.realIndex+1);
						changeLocationContainer(swiper.realIndex + 1);
					}
				}
				else if (screenWidth >= 768 && (e.keyCode === 38 || e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0)) {
					if(!locker) {
						return false
					}
					if (swiper.realIndex > 0) {
						locker = false;
						pageContentAnimation(swiper.realIndex, swiper.realIndex-1);
						changeLocationContainer(swiper.realIndex - 1);
					}
				}
			}
		});

		$('.pointer__arr--bottom').on('click',function () {
			if(!locker || swiper.realIndex === 6) return false;
			locker = false;
			pageContentAnimation(swiper.realIndex, swiper.realIndex+1);
			changeLocationContainer(swiper.realIndex + 1);
		});

		$('.pointer__arr--top').on('click',function () {
			if(!locker || swiper.realIndex === 0) return false;
			locker = false;
			pageContentAnimation(swiper.realIndex, swiper.realIndex-1);
			changeLocationContainer(swiper.realIndex - 1);
		});
	});

	// initialising slider and setting active slider depending on location hash
	function initSlider() {
		window.initialIndex = null;
		switch (location.hash) {
			case '#homeland':
				window.initialIndex = 0;
				break;
			case '#wheat':
				window.initialIndex = 1;
				break;
			case '#spring':
				window.initialIndex = 2;
				break;
			case '#alps':
				window.initialIndex = 3;
				break;
			case '#design':
				window.initialIndex = 4;
				break;
			case '#vertex':
				window.initialIndex = 5;
				break;
			case '#yourStory':
				window.initialIndex = 6;
				break;
			default:
				window.initialIndex = 0;
		}

		swiper = new Swiper('.main-slide', {
			effect: 'fade',
			slidesPerView: 1,
			touchRatio: 0,
			initialSlide: window.initialIndex,
			on: {
				slideChangeTransitionStart: function () {
					setTimeout(function () {
						locker = true;
					},1500);
					changePointerArrows(this.slides.length, this.realIndex);

					if(soundIsMuted) {
						for(let [index,sound] of soundArray.entries()) {
							if (index === this.realIndex) {
								sound.play();
								sound.fade(0,0.25,500);
							} else {
								sound.fade(0.25,0,500);
								setTimeout(function () {
									sound.stop();
								},500)
							}
						}

					}
					setLocation(this.realIndex);
				},
				init: function () {
					setLocation(this.realIndex);
					changePointerArrows(this.slides.length, this.realIndex);
				}
			}
		});
	}

	//set location hash depending on the slider index
	function setLocation(index) {
		if (prevIndex === null) prevIndex = index;

		setMenuActiveClass(index);

		switch (index) {
			case 0: {

				TweenMax.fromTo(counterAnimation, 2, {
					time: counterAnimation.getLabelTime('spring')
				}, {
					time: counterAnimation.getLabelTime('wheat'),
					ease:Power4.easeOut
				});

				location.hash = '#homeland';
				prevIndex = index;
			} break;
			case 1: {
				headerMountainAnimationTimer('wheat', 'spring', 'alps', index, 2);

				location.hash = '#wheat';
				prevIndex = index;
			} break;
			case 2: {

				headerMountainAnimationTimer('spring', 'alps', 'design', index, 2);

				location.hash = '#spring';
				prevIndex = index;
			} break;
			case 3: {

				headerMountainAnimationTimer('alps', 'design', 'vertex', index, 2);

				location.hash = '#alps';
				prevIndex = index;
			} break;
			case 4: {

				headerMountainAnimationTimer('design', 'vertex', 'story', index, 2);

				location.hash = '#design';
				prevIndex = index;
			} break;
			case 5: {

				headerMountainAnimationTimer('vertex', 'story', 'end', index, 3);

				location.hash = '#vertex';
				prevIndex = index;
			} break;
			case 6: {

				TweenMax.fromTo(counterAnimation, 1.5, {
					time: counterAnimation.getLabelTime('infinity')
				}, {
					time: counterAnimation.getLabelTime('end')
				});

				location.hash = '#yourStory';
				prevIndex = index;
			} break;
			default: {
				location.hash = '';
				prevIndex = null;
			}
		}
	}


	function headerMountainAnimationTimer(fromBottom, destination, fromTop, index, time) {
		const fromSmall = counterAnimation.getLabelTime(fromBottom);
		const toDesign = counterAnimation.getLabelTime(destination);
		const fromBig = counterAnimation.getLabelTime(fromTop);

		TweenMax.fromTo(counterAnimation, time, {
			time: prevIndex > index ? fromBig : fromSmall
		}, {
			time: toDesign
		});
	}


	function changePointerArrows (slideCount, index) {
		const top = $('.pointer__arr--top');
		const bottom = $('.pointer__arr--bottom');

		if (index === 0 ) {
			top.css({
				'opacity':'0.2',
				'cursor':'not-allowed'
			});
			bottom.css('opacity', '1');
		} else if (slideCount === index + 1) {
			bottom.css({
				'opacity':'0.2',
				'cursor':'not-allowed'
			});
			top.css('opacity', '1');
		} else {
			bottom.css('opacity', '1');
			top.css('opacity', '1');
		}
	}

	window.pageContentAnimation = function(index, nextIndex) {
		const currentTitleAnim = new TimelineMax({paused: true});
		const nextTitleAnim = new TimelineMax({paused: true});
		const slide = document.querySelectorAll('.section')[index].getElementsByClassName('js-title');
		const slideFade = document.querySelectorAll('.section')[index].getElementsByClassName('js-fade');
		const nextSlide = document.querySelectorAll('.section')[nextIndex].getElementsByClassName('js-title');
		const nextSlideFade = document.querySelectorAll('.section')[nextIndex].getElementsByClassName('js-fade');
		const slideText = new SplitText(slide, {type:"chars, lines"});
		const nextSlideText = new SplitText(nextSlide, {type:"chars, lines"});

		currentTitleAnim.play();

		nextTitleAnim
			.set(nextSlideText.lines, {overflow: "hidden"})
			.staggerFrom(nextSlideText.chars, 1, {yPercent: -115,ease: Power1.easeIn}, .010, 0)
			.from(nextSlideFade, 1, {yPercent: -10, opacity: 0,ease: Power4.easeIn}, '-=1');

		currentTitleAnim
			.set(slideText.lines, {overflow: "hidden"})
			.staggerTo(slideText.chars, 1, {yPercent: -115,ease: Power1.easeOut}, .010, 0)
			.to(slideFade, 1, {yPercent: -10, opacity: 0,ease: Power4.easeOut}, '-=1');

		currentTitleAnim.eventCallback("onComplete", function () {
			currentTitleAnim.progress(0).pause();
			nextTitleAnim.play();

			swiper.slideTo(nextIndex, 0);
		});
		$('.js-dropdown-box').fadeOut();
	};

	function setMenuActiveClass(index) {
		$('.header__nav-link').removeClass('header__nav-link--active');
		$(`[data-index='${index}']`).addClass('header__nav-link--active')
	}

	$('.header__logo-icon').on('click', function () {
		pageContentAnimation(swiper.realIndex, 0);
		changeLocationContainer(0);
	})

});



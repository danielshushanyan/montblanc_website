$(function () {
	const timeLineMenu = new TimelineMax({paused: true});
	const selectItem = new TimelineMax({paused: true});
	const menu = $('.header__nav').innerWidth();
	let windowWidth = $(window).width();
	let backdropSize = windowWidth <= 1025 ? 500: 800;
	let backDrop = -(100 - (backdropSize/menu)*100);
	let index = prevIndex;
	let locker = true;
	let selectFromMenu = false;

	timeLineMenu
		.set('.header__nav-bg',{transformOrigin:'0 0'})
		.to('.header__nav',0.1,{xPercent:'100%'})
		.fromTo('.header__nav-bg',0.7,{xPercent: '-100%'},{xPercent:'0',ease: Circ.easeInOut})
		.from('.menu-slide',0.7,{opacity: 0, ease: Circ.easeInOut},'-=0.5')
		.to('.header__nav-blur',0.7,{backdropFilter: 'blur(5px)', ease: Circ.easeInOut},'-=0.7')
		.to('.header__nav-bg',0.7,{xPercent: backDrop, ease: Circ.easeInOut,onReverseComplete: backDropRevereDone})
		.staggerTo('.action__path',0.7,{opacity: 1, ease: Power4.easeOut, stagger:{amount:0.3, from: 'center'}}, 0.1, '-=0.7')
		.staggerFromTo('.action__close-line', 0.3, {drawSVG: 0}, {drawSVG: '100%'},0.1,'-=1.5')
		.staggerFrom('.action__line', 0.4,{opacity: 0, ease: Power4.easeOut},0.1,'-=1.5')
		.staggerFrom('.header__nav-item', 0.6,
			{
				xPercent: 10,
				opacity: 0,
				ease: Power4.easeOut,
				stagger: {
					from: 'center',
					amount: 0.3,
					grid: 'auto'
				}
			},
			0.1
			,'-=1.5');

	$('.header__menu').on('click', function () {
		timeLineMenu.play();
		menuSlide.slideTo(prevIndex, 0);
	});

	$('.js-close').on('click', function () {
		selectFromMenu = false;
		timeLineMenu.reverse();
	});

	const menuSlide = new Swiper('.menu-slide', {
		slidesPerView: 2.5,
		centeredSlides: true,
		direction: 'vertical',
		spaceBetween: 120,
		touchRatio: 0
	});

	$('.header__nav-link').on('mouseenter', function () {
		const index = $(this).data('index');

		if(locker) {
			menuSlide.slideTo(index, 300);
		}
	}).on('click',function (e) {
		selectFromMenu = true;
		locker = false;
		e.preventDefault();
		index = $(this).data('index');
		activeLocation = index;

		selectItem
			.to('.menu-slide-item img',1,{opacity: 0, ease: Power4.easeInOut})
			.to('.menu-slide-item.swiper-slide-active img', 1, {
				opacity: 1,
				ease: Power1.easeOut,
			},'-=1');

		selectItem.play();
	});

	selectItem.eventCallback('onComplete', function () {
		timeLineMenu.reverse();
	});

	function backDropRevereDone() {
		if(!selectFromMenu) return false;
		locker = true;
		let slideText;
		const currentTitleAnim = new TimelineMax({paused: true});
		const slide = document.querySelectorAll('.section')[index].getElementsByClassName('js-title');
		const slideFade = document.querySelectorAll('.section')[index].getElementsByClassName('js-fade');
		if (slide.length) slideText = new SplitText(slide, {type:"chars, lines"});

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


		currentTitleAnim.play();

		selectItem.progress(0).clear();

		locationsAlphaArray.map(function(item, i) {
			if(index === i) {
				TweenMax.to(item, 1.5, { alpha: 1, ease: Power4.easeInOut });
			} else {
				TweenMax.to(item, 1.5, { alpha: 0, ease: Power4.easeInOut });
			}
		});

		swiper.slideTo(index, 300);
	}

});

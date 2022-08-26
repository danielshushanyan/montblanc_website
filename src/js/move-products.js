$(function () {
	if ($('.product__slide').length === 2) {
		let limited;
		const slideText = new SplitText($('.product__title'), {type:"chars, lines"});

		let firstSlide = $('.product__slide--one');
		let left = null;

		setTimeout(function () {
			prodAnimation();
		},1000);

		$('.js-product').on('click', function () {
			limited.reversed() ? limited.play() : limited.reverse();
		});

		$(window).resize(function () {
			limited.reverse();
			limited.eventCallback('onReverseComplete',function () {
				TweenMax.set('.js-clean', {clearProps:"all",onComplete: function () {
						limited.kill();
						prodAnimation();
					}});
			})
		});

		function prodAnimation() {
			left = firstSlide.offset().left + firstSlide.innerWidth() + 95;
			limited = new TimelineMax({paused: true,reversed:true})
				.to('.product__slide--one', 1, {x: `-${left}px`,ease: Power1.easeInOut})
				.to('.product__slide--pro', 1, {left: '50%',ease: Power1.easeInOut},'-=1')
				.to('.product__bg', 1, {xPercent: -15,ease: Power1.easeInOut},'-=1')
				.to('.product__button', .5, {opacity: 0,ease: Power1.easeInOut},'-=1')
				.to('.product__slide--one .product__item', .5, {opacity: .3,ease: Power1.easeInOut},'-=0.5')
				.to('.product__slide--pro .product__item', .5, {opacity: 1,ease: Power1.easeInOut},'-=0.5')
				.to('.product__button--reverse', .5, {opacity: 1,ease: Power1.easeInOut},'-=0.3')
				.staggerFromTo(slideText.chars, 1, {opacity: 0},{opacity: .3,ease: Power1.easeIn,stagger:{amount: 0.5, from: 'end'}}, .015, 0)
				.staggerFromTo(slideText.lines, 1, {y: -50},{y: 0,ease: Power1.easeOut}, .2,'-=1.5');
		}
	}
});

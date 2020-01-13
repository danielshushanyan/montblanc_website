$(function () {
	MorphSVGPlugin.convertToPath("path");
	let tlOne = new TimelineMax({paused: true});

	tlOne.to('.js-menu-line-one', 0.3, {
		morphSVG:{
			shape: $('.straight-one'),
			shapeIndex: 1,
		},
		strokeWidth: 4,
		ease: Circ.easeInOut
	}).to('.js-menu-line-two', 0.3, {
		morphSVG:{
			shape: $('.straight-two'),
			shapeIndex: 1,
		},
		strokeWidth: 4,
		ease: Circ.easeInOut
	},'-=0.3');

	$('.header__menu').mouseenter(function() {
		tlOne.play();
	}).mouseleave(function() {
		tlOne.reverse();
	})
});

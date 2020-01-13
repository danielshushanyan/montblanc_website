$(function () {
	//	hover sound
	const sound = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/hover.mp3`,`${__app.TEMPLATE_URI}/sounds/hover.webm`,`${__app.TEMPLATE_URI}/sounds/hover.wav`],
		volume: 0.5,
		mobileAutoEnable: true
	});

	$('.hover-s').on('mouseenter', function () {
		sound.play();
	});

	// background Sound

	const bg = new Howl({
		src: [`${__app.TEMPLATE_URI}/sounds/bg.mp3`,`${__app.TEMPLATE_URI}/sounds/bg.webm`],
		volume: 0.25,
		loop: true
	});
	let bgFadeState = true;
	window.soundIsMuted = bgFadeState;

	bg.play();

	$('.footer__sound').on('click', function () {
		bg.fade(bgFadeState ?0.25:0,bgFadeState?0:0.25,500);
		if(!soundIsMuted) soundArray[prevIndex].play();
		soundArray[prevIndex].fade(bgFadeState ?0.25:0,bgFadeState?0:0.25,500);
		bgFadeState = !bgFadeState;
		soundIsMuted = bgFadeState;
	});
});

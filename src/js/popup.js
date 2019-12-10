$(function () {
	let $popupOpenBtn = $('.js-popup-btn');
	let $popupCloseBtn = $('.js-popup-close');
	let scrollPosition;


	$popupOpenBtn.click(function(){
		let id = $(this).data('href');
		$(id).css("display", "flex").hide().fadeIn();
		scrollPosition = $(window).scrollTop();
		window.scrollTo(0, 0);
		if(id === '#video') {
			$(id).find('.content__icon').click();
		}

		id = null;
		return false
	});

	$popupCloseBtn.click(function(){
		$(this).parents('.popup').fadeOut();
		$(window).scrollTop(scrollPosition);
		scrollPosition = undefined;

		if (window.videoPlaing) {
			window.videoPlaing.pause();
			window.videoPlaing.currentTime = 0;
		}
	});
});

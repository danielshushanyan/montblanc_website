$(function () {
	let state = true;

	$('body').on('click',function (e) {
		let target = $(e.target).parent().is('svg') ? $(e.target).parent().parent():$(e.target).parent();

		if (!target.is('.js-dropdown')) {
			state = true;
			$('.js-dropdown-box').fadeOut();
			TweenMax.to($('.js-dropdown').find('.cross'), 0.5,{rotation: 0, transformOrigin: '50% 50%', ease: Circ.easeInOut});
		}
	});

	$('.js-dropdown').on('click', function () {
		$(this).siblings('.js-dropdown-box').fadeToggle();

		if(state){
			state = false;
			TweenMax.to($(this).find('.cross'), 0.5,{rotation: 45, transformOrigin: '50% 50%', ease: Circ.easeInOut});
		} else {
			state = true;
			TweenMax.to($(this).find('.cross'), 0.5,{rotation: 0, transformOrigin: '50% 50%', ease: Circ.easeInOut});
		}
	});
});

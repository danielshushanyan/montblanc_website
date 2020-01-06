$(function () {
	let state = true;
	$('.js-dropdown').on('click', function () {
		$(this).siblings('.js-dropdown-box').fadeToggle();

		if(state){
			state = false;
			TweenMax.to($(this).find('.cross'), 0.5,{rotation: 45, transformOrigin: '50% 50%', ease: Circ.easeInOut});
		} else {
			state = true;
			TweenMax.to($(this).find('.cross'), 0.5,{rotation: 0, transformOrigin: '50% 50%', ease: Circ.easeInOut});
		}
	})
});

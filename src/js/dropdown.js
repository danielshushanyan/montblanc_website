$(function () {
	$('.js-dropdown').on('click', function () {
		$(this).siblings('.js-dropdown-box').fadeToggle();
	})
});

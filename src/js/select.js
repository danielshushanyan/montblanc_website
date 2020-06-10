$(window).on('load',function () {
	const $select = $('.js-select');

	$select.select2({
		dropdownAutoWidth : true,
		containerCssClass: 'select',
		dropdownCssClass: 'no-input'
	});

	window.select = $select;
});

$(function () {
	$('.loader__number').each(function () {
		$(this).prop('loader__number',0).animate({
			Counter: 100
		}, {
			duration: 2000,
			easing: 'swing',
			step: function (now) {
				let rounded = Math.round(now);
				if(
					(rounded >= 2 && rounded <= 17) ||
					(rounded >= 38 && rounded <= 67) ||
					(rounded >= 80 && rounded <= 93) ||
					rounded === 100
				) {
					$(this).text(Math.ceil(now));
				}
			}
		});
	});
});

$(function () {
	const quantityOfSlideImages = $('.content__bottle-img img').length;
	let index = 1;
	let clicked = false;
	let lastPoint = window.innerWidth / 2;
	let isLocked = true;
	let windowWidth = $(window).innerWidth();

	$('#bottle').mousemove(function (e) {
		if(clicked && windowWidth > 1024){
			if(lastPoint > e.clientX && isLocked) {
				index = index === quantityOfSlideImages ? 1 : index + 1;
				lockMovment();
				setCurrentImage(index);
			} else if (lastPoint < e.clientX && isLocked) {
				index = index === 1 ? 4 : index - 1;
				lockMovment();
				setCurrentImage(index);
			}
		}
		lastPoint = e.clientX;
	}).mousedown(function(e) {
		if (e.which === 1 && windowWidth > 1024) {
			clicked = true;

			$('.content__bottle-descr').fadeOut();
		}
	}).mouseup(function (e) {
		if (e.which === 1 && windowWidth > 1024) {
			clicked = false;
			$(`.content__bottle-descr[data-slide-text='${index}']`).fadeIn();
		}
	});

	$('.js-drag').swipe({
		swipe: function (event, direction) {
			if (direction === 'left') {
				index = index === 1 ? 4 : index - 1;
				lockMovment();
				setCurrentImage(index);
			}
			else if (direction === 'right') {
				index = index === quantityOfSlideImages ? 1 : index + 1;
				lockMovment();
				setCurrentImage(index);
			}
			$('.content__bottle-descr').fadeOut();
			$(`.content__bottle-descr[data-slide-text='${index}']`).fadeIn();
		},
		threshold:0
	});

	function setCurrentImage(index) {
		$('.content__bottle-img img').css('opacity', 0);
		$(`img[data-slide-index='${index}']`).css('opacity', 1);
	}

	function lockMovment() {
		isLocked = !isLocked;
		setTimeout(function () {
			isLocked = !isLocked;
		}, 600);
	}

	setCurrentImage(1);
});

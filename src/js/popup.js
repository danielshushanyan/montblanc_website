$(function () {
	let $popupOpenBtn = $('.js-popup-btn');
	let $popupCloseBtn = $('.js-popup-close');
	const $wrapper = $('.js-wrapper');
	let scrollPosition;
	let inProgress = false;
	let first = false;
	let animationDirection = null;
	const locations = [
		'#homeland',
		'#wheat',
		'#spring',
		'#alps',
		'#design',
		'#vertex',
		'#yourStory'
	];

	if (!!location.hash && !locations.includes(location.hash)) {
		openPopup();
	}

	$popupOpenBtn.click(function(){
		let id = $(this).data('href');
		if (activeLocation=== 5) {
			window.emitterVertex.emit = false;
		}

		if(id === '#video'){
			$(id).find('.content__icon').click();
		} else if (id === '#cocktail') {
			let url = $(this).data('url');
			location.hash = url;
			getCocktail(url);
		}

		$(id).addClass('js-popup-opened');
		scrollPosition = $(window).scrollTop();
		window.scrollTo(0, 0);

		lockLocationsTransition = false;
		id = null;
		return false
	});

	$popupCloseBtn.click(function(){
		$(this).parents('.popup').removeClass('js-popup-opened');
		$(window).scrollTop(scrollPosition);
		scrollPosition = undefined;


		if (activeLocation=== 5) {
			window.emitterVertex.emit = true;

			$('#cocktail .content__item--left').empty();
			location.hash = '#vertex';
		}

		if (window.videoPlaing) {
			window.videoPlaing.pause();
			window.videoPlaing.currentTime = 0;
		}
		lockLocationsTransition = true;
	});

	function openCocktail(cocktailName) {
		if (activeLocation === 5) {
			window.emitterVertex.emit = false;
		}

		window.initialIndex = 5;
		location.hash = '#vertex';

		$('#cocktail').addClass('js-popup-opened');
		getCocktail(cocktailName);

		lockLocationsTransition = true;
		return false
	}

	window.openCocktail = openCocktail;

	function getCocktail(url) {
		$.ajax({
			url: url,
			type: "GET",
			beforeSend: function () {
				inProgress = true;
			},
			success: function(data) {
				if ($(data).length !== 0) {
					const changeSlide = new TimelineMax({paused: true});
					$wrapper.append($(data));
					activeButtons($(data));
					changeSlide
						.from(
							$('.content:nth-child(2)').find('.content__item--left'),
							0.6,
							{
								yPercent: animationDirection ? -100: 100,
								opacity: 0,
								ease: Power4.easeInOut
						})
						.from(
							$('.content:nth-child(2)').find('.content__item--right'),
							0.6,
							{
								yPercent: animationDirection ? 100: -100,
								opacity: 0,
								ease: Power4.easeInOut
							},
							'-=0.6'
						);

					changeSlide.play();

					changeSlide.eventCallback('onComplete', function () {
						if(first) {
							$wrapper.find('.content:nth-child(1)').remove();
						}
						first = true;
					});
					inProgress = false;
				}
			}
		});
	}

	// Change cocktail
	$(document).on('click', '.popup__nav-item--prev', function () {
		const url = $('#cocktail .content').data('url-prev');
		animationDirection = false;
		location.hash = url;
		if (url !== '') getCocktail(url);
	});

	$(document).on('click', '.popup__nav-item--next', function () {
		const url = $('#cocktail .content').data('url-next');
		animationDirection = true;
		location.hash = url;
		if (url !== '') getCocktail(url);
	});

	function activeButtons(content) {
		let next = content.data('url-next');
		let prev = content.data('url-prev');

		if (next === '') {
			$('.popup__nav-item--prev').addClass('popup__nav-item--active');
			$('.popup__nav-item--next').removeClass('popup__nav-item--active');
		} else if (prev === '') {
			$('.popup__nav-item--prev').removeClass('popup__nav-item--active');
			$('.popup__nav-item--next').addClass('popup__nav-item--active');
		} else if (next === '' && prev === '') {
			$('.popup__nav-item--prev').removeClass('popup__nav-item--active');
			$('.popup__nav-item--next').removeClass('popup__nav-item--active');
		} else {
			$('.popup__nav-item--prev').addClass('popup__nav-item--active');
			$('.popup__nav-item--next').addClass('popup__nav-item--active');
		}
	}

});

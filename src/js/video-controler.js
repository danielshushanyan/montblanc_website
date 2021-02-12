$(function () {
	const videoControls = () => {
		$('video').each(function (i) {
			let	video = document.querySelectorAll('video')[i],
				timeline = document.querySelectorAll('.content__video-bar')[i],
				timelineProgress = document.querySelectorAll('.content__video-progress')[i],
				drag = document.querySelectorAll('.content__video-drag')[i];

			// Toggle Play / Pause
			$(this).siblings('.content__icon').on('click', function () {
				$(this).fadeToggle('500');
				$(this).parent().find('.content__video-bg').fadeOut('500');
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
				window.videoPlaing = video;
			});

			$(this).on('click', function () {
				$(this).siblings('.content__icon').fadeToggle('500');
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
				window.videoPlaing = video;
			});

			$(this).siblings('.content__video-bg').on('click',function () {
				$(this).fadeToggle('500');
				$(this).parent().find('.content__icon').fadeOut('500');
				if (video.paused) {
					video.play();
				} else {
					video.pause();
				}
				window.videoPlaing = video;
			});


			// on interaction with video controls
			video.onplay = function() {
				TweenMax.ticker.addEventListener('tick', vidUpdate);
			};
			video.onpause = function() {
				TweenMax.ticker.removeEventListener('tick', vidUpdate);
			};
			video.onended = function() {
				TweenMax.ticker.removeEventListener('tick', vidUpdate);
			};

			// Sync the timeline with the video duration
			function vidUpdate() {
				TweenMax.set(timelineProgress, {
					scaleX: (video.currentTime / video.duration).toFixed(5)
				});
				TweenMax.set(drag, {
					x: (video.currentTime / video.duration * timeline.offsetWidth).toFixed(4)
				});
			}

			// Make the timeline draggable
			Draggable.create(drag, {
				type: 'x',
				trigger: timeline,
				bounds: timeline,
				onPress: function(e) {
					video.currentTime = this.x / this.maxX * video.duration;
					TweenMax.set(this.target, {
						x: this.pointerX - timeline.getBoundingClientRect().left
					});
					this.update();
					let progress = this.x / timeline.offsetWidth;
					TweenMax.set(timelineProgress, {
						scaleX: progress
					});
				},
				onDrag: function() {
					video.currentTime = this.x / this.maxX * video.duration;
					let progress = this.x / timeline.offsetWidth;
					TweenMax.set(timelineProgress, {
						scaleX: progress
					});
				},
				onRelease: function(e) {
					e.preventDefault();
				}
			});
		})
	};
	videoControls();
	window.videoControls = videoControls;
});

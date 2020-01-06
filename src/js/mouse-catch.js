let catchContainers = document.querySelectorAll('.js-catch');
let moveTrg = true;

function move( trg, pos ) {

	if( !moveTrg ) return;

	moveTrg = false;

	let follower = trg.querySelector('.js-follower');
	let folowerBox = trg.getBoundingClientRect();

	TweenMax.to(follower, 0.3, {
		x: pos.x - folowerBox.width / 2,
		y: pos.y - folowerBox.height / 2,
		ease: Power4.easeOut
	})
}

function onMouseMove( e ) {
	move( this, {x: e.offsetX, y: e.offsetY } )
}


function onMouseLeave( e ) {
	const trg = this.querySelector('.js-follower');

	TweenMax.to( trg, 0.5, {
		x: 0,
		y: 0,
		ease: Back.easeOut
	} )
}


function init() {
	TweenMax.ticker.addEventListener("tick", function() { moveTrg = true } );

	for (let item of catchContainers) {
		item.addEventListener('mousemove', onMouseMove);

		item.addEventListener('mouseleave', onMouseLeave);
	}
}


document.addEventListener("DOMContentLoaded", function(event) {
	window.onload = function() {
		TweenMax.set('.follower', {
			xPercent: -50,
			yPercent: -50
		});

		init();
	};
});



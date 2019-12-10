class Cursor {
	constructor() {
		this.initCursor();
		this.initHovers();
	}

	initCursor() {
		const { Back } = window;
		this.outerCursor = document.querySelector(".circle-cursor--outer");
		this.innerCursor = document.querySelector(".circle-cursor--inner");
		this.outerCursorBox = this.outerCursor.getBoundingClientRect();
		this.outerCursorSpeed = 0;
		this.easing = Back.easeOut.config(1.7);
		this.clientX = -100;
		this.clientY = -100;
		this.showCursor = false;

		const unveilCursor = () => {
			TweenMax.set(this.innerCursor, {
				x: this.clientX,
				y: this.clientY
			});
			TweenMax.set(this.outerCursor, {
				x: this.clientX - this.outerCursorBox.width / 2,
				y: this.clientY - this.outerCursorBox.height / 2
			});
			setTimeout(() => {
				this.outerCursorSpeed = 0.5;
			}, 100);
			this.showCursor = true;
		};
		document.addEventListener("mousemove", unveilCursor);

		document.addEventListener("mousemove", e => {
			this.clientX = e.clientX;
			this.clientY = e.clientY;
		});

		const render = () => {
			TweenMax.to(this.innerCursor, this.outerCursorSpeed, {
				x: this.clientX,
				y: this.clientY
			});
			if (!this.isStuck) {
				TweenMax.to(this.outerCursor, this.outerCursorSpeed, {
					x: this.clientX - this.outerCursorBox.width / 2,
					y: this.clientY - this.outerCursorBox.height / 2
				});
			}
			if (this.showCursor) {
				document.removeEventListener("mousemove", unveilCursor);
			}
			requestAnimationFrame(render);
		};
		requestAnimationFrame(render);
	}

	initHovers() {

		const handleMouseEnter = e => {
			this.outerCursorSpeed = 0;
			this.isStuck = true;
			const target = e.currentTarget;
			const box = target.getBoundingClientRect();
			this.outerCursorOriginals = {
				width: this.outerCursorBox.width,
				height: this.outerCursorBox.height
			};

			TweenMax.to(this.outerCursor, 0.2, {
				x: box.left,
				y: box.top,
				width: box.width,
				height: box.height,
				opacity: 1,
				scale: 1,
				borderColor: "#fff"
			});

			TweenMax.set(this.innerCursor, {
				scale: 0
			});

		};

		const handleMouseLeave = () => {
			this.outerCursorSpeed = 0.2;
			this.isStuck = false;
			TweenMax.to(this.outerCursor, 0.2, {
				width: this.outerCursorOriginals.width,
				height: this.outerCursorOriginals.height,
				opacity: 0,
				borderColor: "#ffffff"
			});

			TweenMax.set(this.innerCursor, {
				scale: 1
			});
		};

		const linkItems = document.querySelectorAll(".js-square");
		linkItems.forEach(item => {
			item.addEventListener("mouseenter", handleMouseEnter);
			item.addEventListener("mouseleave", handleMouseLeave);
		});

		const mainNavMouseEnter = () => {
			this.outerCursorSpeed = 0.2;
			TweenMax.to(this.innerCursor, 0.2,{
				scale: 0,
			});
		};

		const mainNavMouseLeave = () => {
			this.outerCursorSpeed = 0.2;
			TweenMax.to(this.innerCursor, 0.5,{
				scale: 1,
				ease: Back.easeOut.config(1)
			});
		};

		const mainNavLinks = $(".js-link");
		mainNavLinks.each(function () {
			$(document).on("mouseenter", '.js-link', mainNavMouseEnter);
			$(document).on("mouseleave", '.js-link', mainNavMouseLeave);
		});

		//
		//	white
		//

		const hoverWhite = TweenMax.to(this.outerCursor, 0.3, {
			backgroundColor: "#fff",
			ease: this.easing,
			paused: true,
			opacity: 0.5,
			borderColor: '#fff',
			xPercent: -50 - 15,
			yPercent: -50 - 15
		});

		const hoverWhiteEnter = () => {
			this.outerCursorSpeed = 0;
			TweenMax.to(this.innerCursor, 0.3,{
				opacity: 0,
				scale: 0.5
			});
			hoverWhite.play();
		};

		const hoverWhiteLeave = () => {
			this.outerCursorSpeed = 0.2;
			hoverWhite.reverse();
			const self = this;
			hoverWhite.eventCallback('onReverseComplete',function () {
				TweenMax.to(self.innerCursor, 0.4,{
					opacity: 1,
					scale: 1
				});
			});
		};

		const hoverWhiteLinks = $(".js-link-white");
		hoverWhiteLinks.each(function () {
			$(document).on("mouseenter", '.js-link-white', hoverWhiteEnter);
			$(document).on("mouseleave", '.js-link-white', hoverWhiteLeave);
		});

		//
		// nav links
		//

		const nav = TweenMax.to(this.outerCursor, 0.3, {
			ease: this.easing,
			paused: true,
			opacity: 1,
			scale: 1,
			xPercent: -50 - 20,
			yPercent: -50 - 20
		});

		const navEnter = () => {
			this.outerCursorSpeed = 0;
			TweenMax.to(this.innerCursor, 0.3,{
				opacity: 0,
				scale: 0.5
			});
			nav.play();
		};

		const navLeave = () => {
			this.outerCursorSpeed = 0.2;
			nav.reverse();
			const self = this;
			nav.eventCallback('onReverseComplete',function () {
				TweenMax.to(self.innerCursor, 0.4,{
					opacity: 1,
					scale: 1
				});
			});

		};

		const navLinks = $(".js-link-nav");
		navLinks.each(function () {
			$(document).on("mouseenter", '.js-link-nav', navEnter);
			$(document).on("mouseleave", '.js-link-nav', navLeave);
		});
	}
}

export default Cursor;

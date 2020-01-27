export class Vec2d {
	constructor(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	rotate(radians) {
		let ca = Math.cos(radians);
		let sa = Math.sin(radians);
		return new Vec2d(ca * this.x - sa * this.y, sa * this.x + ca * this.y);
	}
}

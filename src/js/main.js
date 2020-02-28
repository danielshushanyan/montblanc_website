import Cursor from './cursor'
import './vendor/swipe';
import './pixi-locations';
import './intro';
import './loader';
import './sounds';
import './slider';
import './popup';
import './dropdown';
import './menu';
import './header';
import './video-controler';
import './mouse-catch';
import './360image';
import './move-products';

$(function () {
	if(window.innerWidth > 1024) new Cursor();
	$('.circle-cursor--inner').css('z-index','11000');
	$('.circle-cursor--outer').css('z-index','12000');
	$('.circle-cursor--drag').css('z-index','12000');
});

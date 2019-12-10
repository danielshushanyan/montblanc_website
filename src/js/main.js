import Cursor from './cursor'
import './pixi-locations';
import './intro';
import './loader';
import './temp-slider';
import './popup';
import './dropdown';
import './menu';
import './header';
import './video-controler';

$(function () {
	if(window.innerWidth > 1024) new Cursor();
	$('.circle-cursor--inner').css('z-index','11000');
	$('.circle-cursor--outer').css('z-index','12000');
});

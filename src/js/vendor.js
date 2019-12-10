import 'babel-polyfill';
import Swiper from 'swiper';
import * as PIXI from 'pixi.js'
import {TweenMax, TimelineMax, Power1, Power4, Expo, Back, Circ, Draggable, CSSPlugin, Bounce} from "gsap/all";
// import ScrollMagic from 'scrollmagic';
// import 'scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js';
import './vendor/MorphSVGPlugin.min';
import './vendor/DrawSVGPlugin.min';
import './vendor/ScrambleTextPlugin.min';
import './vendor/SplitText.min';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';

const plugins = [DrawSVGPlugin, Draggable, CSSPlugin, SplitText, MorphSVGPlugin];

window.$ = $;
window.jQuery = $;
window.Swiper = Swiper;
window.PIXI = PIXI;
window.TweenMax = TweenMax;
window.TimelineMax = TimelineMax;
// window.ScrollMagic = ScrollMagic;
window.Expo = Expo;
window.Power1 = Power1;
window.Power4 = Power4;
window.Back = Back;
window.Circ = Circ;
window.Bounce = Bounce;
window.DrawSVGPlugin = DrawSVGPlugin;
window.MorphSVGPlugin = MorphSVGPlugin;
window.SplitText = SplitText;
window.Draggable = Draggable;
window.plugins = plugins;


window.$W = $(window);
window.$D = $(document);
window.$H = $('html');
window.$B = $('body');

svg4everybody();

// TODO: Decide to delete plugin or create page for old browsers
// import 'ninelines-ua-parser';

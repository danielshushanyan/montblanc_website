import 'babel-polyfill';
import svg4everybody from 'svg4everybody';
import $ from 'jquery';

window.$ = $;
window.jQuery = $;
window.$W = $(window);
window.$D = $(document);
window.$H = $('html');
window.$B = $('body');

svg4everybody();
import 'ninelines-ua-parser';

// ------- Скрипты плагинов ----------
// import tippy from 'tippy.js';
import MatchHeight from 'matchheight';

require('lazysizes');
require('./plugins/popup/popup');

// eslint-disable-next-line no-undef
window.globalPopup = new Popup();
window.MatchHeight = MatchHeight;

// ------- Базовые Скрипты ----------
require('./users/phone-mask');
require('./users/form');

// ------- Компонентные Скрипты ----------
function importAll(r) {
	r.keys().forEach((key) => r(key));
}

importAll(require.context('../components/', true, /\.js$/));

// --------- Пользовательские скрипты без компонента -----------
// tippy('[data-tippy-content]');

MatchHeight.init();

const isFunction = (functionToCheck) => functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';

const windowResizeAxisX = (callback) => {
	if (isFunction(callback)) {
		let resizeId;
		let oldWidth = window.innerWidth;

		window.addEventListener('resize', () => {
			clearTimeout(resizeId);

			resizeId = setTimeout(() => {
				if (oldWidth !== window.innerWidth) {
					callback();
					oldWidth = window.innerWidth;
				}
			}, 200);
		});
	}
};

const setScrollBarWidthCssVariable = () => {
	const set = () => {
		document.documentElement.style.setProperty(
			'--scrollbar-width',
			`${window.innerWidth - document.body.clientWidth}px`,
		);
	};

	set();

	windowResizeAxisX(set);
};

setScrollBarWidthCssVariable();

const setViewportHeightCssVariable = () => {
	const set = () => {
		const vh = window.innerHeight * 0.01;

		document.documentElement.style.setProperty('--vh', `${vh}px`);
	};

	set();

	window.addEventListener('resize', set);
};

setViewportHeightCssVariable();

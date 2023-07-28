const body = document.querySelector('body');
const menuToggleBtn = document.querySelector('.js-hamburger');
const menu = document.querySelector('.js-mobile-menu');

if (menuToggleBtn && menu) {
	menuToggleBtn.addEventListener('click', () => {
		body.classList.toggle('mobile-menu-opened');
		menuToggleBtn.classList.toggle('active');
		menu.classList.toggle('active');
	});
}

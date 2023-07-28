const isMob = () => window.matchMedia('(max-width:768px)').matches;
const links = document.querySelectorAll('.js-scroll-smoth');

[].forEach.call(links, (link) => {
	link.addEventListener('click', function (e) {
		e.preventDefault();

		const el = document.querySelector(this.getAttribute('href'));

		if (el) {
			window.scroll({
				behavior: 'smooth',
				top: isMob() ? el.offsetTop - 40 : el.offsetTop, // 40 is height of mobile header
			});
		}
	});
});

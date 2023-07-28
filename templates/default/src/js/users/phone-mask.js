import Inputmask from 'inputmask';

const runInitInputMask = () => {
	const elements = document.querySelectorAll('.js-phone-mask');

	if (elements.length) {
		const im = new Inputmask('+7 999 999-99-99', {
			clearIncomplete: true,
		});

		im.mask(elements);
	}
};

runInitInputMask();

// Called after popup showed
document.addEventListener('popup:shown', () => {
	runInitInputMask();
});

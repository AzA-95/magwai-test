// ВНИМАНИЕ!!! Код написан по спешке поэтому его надо отрефакторить и доработать до ума :)
const checkField = function checkField(field) {
	let errorMessage = null;

	if (field.validity.valid === false) {
		if (field.value) {
			errorMessage = 'Заполните корректно поле';
		} else {
			errorMessage = 'Нужно заполнить это поле';
		}
	}

	return errorMessage;
};

const errorTemplate = function errorTemplate(errorText) {
	return `<div class="error js-error">${errorText}</div>`;
};

const clearErrors = function clearErrors(form) {
	const errors = form.querySelectorAll('.js-error');

	errors.forEach((error) => {
		error.remove();
	});
};

const addError = function addError(field, errorMessage) {
	const errorDiv = errorTemplate(errorMessage);
	field.insertAdjacentHTML('afterend', errorDiv);
};

const checkForm = function checkForm(form) {
	const hasErrors = !form.checkValidity();

	if (hasErrors) {
		const fields = form.querySelectorAll('input[required], textarea[required]');
		clearErrors(form);

		fields.forEach((field) => {
			const errorMessage = checkField(field);

			if (errorMessage !== null) {
				addError(field, errorMessage);
			}
		});
	}

	return !hasErrors;
};

document.addEventListener('popup:shown', () => {
	// Тут по хорошему надо выбирать все формы, но из-за спешки и так как страница тестовая и форма находится только в попае оставил так
	const form = document.querySelector('.js-validate-form');

	if (!form) return;

	const fields = form.querySelectorAll('input[required], textarea[required]');

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		if (checkForm(form) !== false) {
			alert('Сообщение отрпавлено');

			// eslint-disable-next-line no-undef
			globalPopup.close();
		}
	});

	fields.forEach((field) => {
		field.addEventListener('focus', (e) => {
			const nextEl = e.target.nextElementSibling;

			if (nextEl && nextEl.classList.contains('js-error')) {
				nextEl.remove();
			}
		});

		field.addEventListener('blur', () => {
			const errorMessage = checkField(field);

			if (errorMessage !== null) {
				addError(field, errorMessage);
			}
		});
	});
});

/**
 * todo:
 * add validation for multiple answers
 * @param {element} form
 * @returns {Boolean} - error
 * @returns {element} - element
 */
export const validateWholeQuiz = (form) => {
	const allRadio = new Set();

	form.querySelectorAll('input[type="radio"]').forEach((field) => {
		const name = field.getAttribute('name');
		allRadio.add(name);
	});

	console.log(allRadio);

	let element;
	const hasError = Array.from(allRadio).some((name) => {
		const radioElement = form.querySelectorAll(`input[name="${name}"]`);
		const hasChecked = Array.from(radioElement).some((elem) => elem.checked);

		if (!hasChecked) {
			element = radioElement[0];
			return true;
		}
	});

	return {
		error: hasError,
		element
	};
};

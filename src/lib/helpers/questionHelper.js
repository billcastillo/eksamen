import { generateShortUUID, getRandomSetFromArray, randomizeArrayValues } from '$lib/helpers/utils';
import { capitalCities, countryAndCapitals } from '$lib/data/capitals';

const _helpers = {
	checkDuplicateAnswer: (list, num, text = '') => {
		if (!text) {
			return list;
		}

		list.add(text);

		if (list.size < num) {
			while (list.size < num) {
				const randomIndex = Math.floor(Math.random() * capitalCities.length);
				list.add(capitalCities[randomIndex]);
			}
		}

		return list;
	}
};

export const generateCapitalAnswers = (capitalObj, num = 4) => {
	// Create list of answers
	let randomAnswers = getRandomSetFromArray(capitalCities, num - 1);

	// Add correct answer to the list
	randomAnswers = Array.from(_helpers.checkDuplicateAnswer(randomAnswers, num, capitalObj.capital));

	// Randomize order of array
	randomAnswers = randomizeArrayValues(randomAnswers);

	const answerList = randomAnswers.map((answer) => {
		return {
			id: generateShortUUID(),
			type: 'radio',
			label: answer,
			value: answer,
			isAnswer: answer === capitalObj.capital
		};
	});

	return answerList;
};

/**
 *
 * @param {Number} num
 * @returns {Array}
 */
export const generateCapitalQuestions = (num = 10) => {
	const randomQuestions = Array.from(getRandomSetFromArray(countryAndCapitals, num));

	const questionList = randomQuestions.map((question) => {
		return {
			name: `What is the capital of <u>${question.country}</u>?`,
			answers: generateCapitalAnswers(question, 4),
			id: generateShortUUID()
		};
	});

	return questionList;
};

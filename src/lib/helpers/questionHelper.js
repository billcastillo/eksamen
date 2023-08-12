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

/**
 * To add:
 * - move this to its own file in $lib
 * - categories
 * - addAnswer function
 * - removeAnswer function
 * - updateName
 */
export class Quiz {
	constructor(config = {}) {
		this.created = new Date().getTime();
		this.id = crypto.randomUUID();

		this.name = config.name ?? 'Sample Quiz';
		this.description = config.description ?? '';
		this.questions = config.questions ?? [];
	}

	static getQuestion(id) {
		return this.questions.find((question) => question.id === id);
	}

	addQuestion(question = {}) {
		this.questions = [...this.questions, question];
	}

	removeQuestion(id = '') {
		this.questions = this.questions.filter((question) => question.id !== id);
	}

	updateAnswers(questionId, answers = []) {
		const question = this.getQuestion(questionId);
		question.answers = answers;
	}

	// todo find multiple answers
	isCorrectAnswer(questionId, answerId) {
		const question = this.questions.filter((question) => question.id === questionId);
		const correctAnswerId = question.answers.find((answer) => answer.isAnswer)?.id;
		return answerId === correctAnswerId;
	}
}

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

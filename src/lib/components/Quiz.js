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
		this.allowSkip = config.allowSkip ?? true;
		this.displayPerQuestion = config.displayPerQuestion ?? true;
	}

	static getQuestion(id) {
		return this.questions.find((question) => question.id === id);
	}

	get isCompleted() {
		return this.isCompleted;
	}

	set isCompleted(isCompleted) {
		this.isCompleted = isCompleted;
	}

	// get allowSkip() {
	// 	return this.allowSkip;
	// }

	// set allowSkip(allowSkip) {
	// 	this.allowSkip = allowSkip;
	// }

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

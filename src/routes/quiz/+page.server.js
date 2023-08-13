import { generateCapitalQuestions } from '$lib/helpers/questionHelper';
import { Quiz } from '$lib/components/Quiz';
import * as db from '$lib/server/localDatabase.js';

export async function load({ cookies, params }) {
	const id = cookies.get('userid');

	// Generate new sample quiz
	const sampleQuiz = new Quiz({
		name: 'Capitals of the world',
		questions: await generateCapitalQuestions(3),
		displayPerQuestion: false
	});

	if (!id) {
		const newUserid = crypto.randomUUID();
		cookies.set('userid', newUserid, { path: '/' });

		db.initializeUser(newUserid);
		db.generateSampleQuiz(newUserid, sampleQuiz);
	} else {
		const quizzes = db.getQuiz(id);
		console.log('quizzes: ', quizzes);
	}

	return {
		quiz: JSON.stringify(sampleQuiz)
	};
}

export const actions = {
	submitQuestionnaire: async ({ request }) => {
		console.log('request: ', request);
		const data = await request.formData();
		console.log('data: ', data);

		return {
			yeah: 'ok'
		};
	}
};

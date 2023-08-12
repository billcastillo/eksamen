import { Quiz, generateCapitalQuestions } from '$lib/helpers/questionHelper';

export async function load({ params }) {
	const newQuiz = new Quiz({
		name: 'Capitals of the world',
		questions: await generateCapitalQuestions(3)
	});

	return {
		quiz: JSON.stringify(newQuiz)
	};
}

export const actions = {
	submitQuestionnaire: async ({ request }) => {
		console.log('request: ', request);
		const data = await request.formData();
		console.log('data: ', data);

		return {
			'yeah': 'ok'
		}
	}
};

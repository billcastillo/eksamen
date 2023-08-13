const db = new Map();

export function initializeUser(userid) {
	db.set(userid, {
		quizList: new Map()
	});
}

export function generateSampleQuiz(userid, quiz) {
	const userData = db.get(userid);

	// create sample quiz
	const quizList = userData.quizList;
	console.log('quizList: ', quizList);
	quizList.set(quiz.id, quiz);
	console.log('generateSampleQuiz: ', userData);
}

export function getQuiz(userid, quizId = '') {
	if (db.get(userid)) {
		const userData = db.get(userid);

		if (userData.quizList.size > 0) {
			const quizList = userData.quizList;
			return quizId ? quizList.get(quizId) : null;
		}
	}

	return null;
}

export function createQuiz(userid, quiz) {
	const userData = db.get(userid);
	const quizList = userData.quizList;
	quizList.set(quiz.id, quiz);
	console.log('createQuiz: ', userData);
}

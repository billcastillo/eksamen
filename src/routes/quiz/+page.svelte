<script>
	import { validateWholeQuiz } from '$lib/helpers/quizHelper.js';
	import RadioGroup from '$lib/components/RadioGroup.svelte';

	export let data;

	// const quiz = JSON.parse(data.quiz);
	// https://www.tailwind-variants.org/docs/introduction
	$: quiz = JSON.parse(data.quiz);

	function submitQuiz(e) {
		const ACTION_URL = e.target.action;
		const formData = new FormData(e.target);

		const data = {};
		for (let field of formData) {
			const [key, value] = field;
			data[key] = value;
		}

		const { error, element } = validateWholeQuiz(e.target);

		// to add: highlight no answers
		if (error) {
			element.scrollIntoView({
				behavior: 'smooth'
			});

			return;
		}

		fetch(ACTION_URL, {
			method: 'POST',
			body: JSON.stringify({ quiz: data }),
			headers: {
				'Content-Type': 'application/json'
			}
		})
			.then((data) => data.json())
			.then((data) => {
				console.log('response:', data);
			});
	}
</script>

<!-- <pre>{JSON.stringify(quiz)}</pre> -->

<div class="container mx-auto quiz-container">
	<h1 class="mb-8 text-4xl">{quiz.name}</h1>

	<form method="POST" action="/quiz/submit" on:submit|preventDefault={submitQuiz}>
		<div class="form-group questions-container">
			<input type="hidden" name="quiz_id" value={quiz.id} />
			{#each quiz.questions as question (question.id)}
				<div class="mb-8 question-item">
					<h3 class="mb-2 text-2xl">{@html question.name}</h3>

					<div class="answers-container">
						<RadioGroup list={question.answers} name={question.id} />
					</div>
				</div>
			{/each}
		</div>

		<button class="btn variant-filled" type="submit">Submit</button>
	</form>
</div>

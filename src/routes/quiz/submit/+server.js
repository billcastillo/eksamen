import { json } from '@sveltejs/kit';

// To add;
// check correct answers
export async function POST({ request, cookies }) {
	const { quiz } = await request.json();

	return json({ data: { quiz, success: true } }, { status: 201 });
}

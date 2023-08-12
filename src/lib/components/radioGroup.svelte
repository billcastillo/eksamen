<script>
	import { sampleAnswers } from '$lib/data/sampleQuestionData';
	import { generateShortUUID } from '$lib/helpers/utils';
	export let list = sampleAnswers;
	export let name = generateShortUUID();
</script>

<div class="space-y-2">
	{#each list as item (item.id)}
		<label class="flex items-center space-x-2 text-xl">
			<input class="radio bg-black" type="radio" {name} value={item.value} />
			<p>{item.label}</p>
		</label>
	{/each}
</div>

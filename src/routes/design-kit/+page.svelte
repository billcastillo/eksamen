<script>
	import RadioGroup from '$lib/components/RadioGroup.svelte';
</script>

<h1 class="mb-8 text-4xl font-intra">Design kit</h1>

<RadioGroup />

<div class="space-y-2">
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" checked />
		<p>Option 1</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<p>Option 2</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<p>Option 3</p>
	</label>
</div>

<!-- 
  Resources:
  - https://daisyui.com/components/checkbox/
  - https://www.skeleton.dev/components/tabs
  - utils: https://www.skeleton.dev/utilities/toasts
  https://chasingcode.dev/blog/svelte-persist-state-to-localstorage/
  

 -->

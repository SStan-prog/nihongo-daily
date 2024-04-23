<script lang="ts">
  import type { PageData, ActionData } from './$types.js';

  export let data: PageData;
  export let form: ActionData;

  import Quiz from '$lib/components/quiz/quiz.svelte';

  console.log(form);
</script>

<Quiz {data} formRes={form} />

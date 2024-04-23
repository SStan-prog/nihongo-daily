<script lang="ts">
  import SuperDebug, {
    type Infer,
    type SuperValidated,
    superForm,
  } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast } from 'svelte-sonner';
  import { browser } from '$app/environment';
  import { quizSchema } from '../../../routes/quiz/schema';
  import type { QuizSchema } from '../../../routes/quiz/schema';

  import { FormButton } from '$lib/components/ui/form';

  import QuestionCard from './questions/question-card.svelte';

  export let data: any;
  export let formRes: any;

  // QUIZ SETTING
  let questions = data?.questions;

  let formD: SuperValidated<Infer<QuizSchema>> = data?.formRes;

  // FORM LOGIC

  const form = superForm(formD, {
    validators: zodClient(quizSchema),
  });
  const { form: formData, enhance } = form;

  console.log(formRes);
</script>

<div class="flex flex-col items-center py-20">
  {#if formRes?.form.valid}
    <p>{formRes?.form.data.question_1}</p>
  {/if}

  <form method="POST" class="max-w-2xl" use:enhance>
    <div class="flex flex-col gap-4">
      {#each questions as question, index}
        <QuestionCard {question} {form} {formData} questionIndex={index + 1} />
      {/each}
    </div>

    <div class="flex justify-center my-4">
      <FormButton class="w-full">Submit</FormButton>
    </div>

    {#if browser}
      <SuperDebug data={$formData} />
    {/if}
  </form>
</div>

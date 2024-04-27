<script lang="ts">
  import SuperDebug, {
    type Infer,
    type SuperValidated,
    superForm,
  } from 'sveltekit-superforms';
  import { zodClient } from 'sveltekit-superforms/adapters';
  import { toast, Toaster } from 'svelte-sonner';
  import { browser } from '$app/environment';
  import { quizSchema } from '../../../routes/quiz/schema';
  import type { QuizSchema } from '../../../routes/quiz/schema';

  import { FormButton } from '$lib/components/ui/form';
  import { Button } from '$lib/components/ui/button';

  import QuestionCard from './questions/question-card.svelte';
  import ResultsDialog from './results/results-dialog.svelte';

  export let data: any;
  export let formRes: any;

  // QUIZ SETTING
  let questions = data?.questions;

  let formD: SuperValidated<Infer<QuizSchema>> = data?.formRes;

  // FORM LOGIC
  const form = superForm(formD, {
    validators: zodClient(quizSchema),
    // resetForm: false,
  });
  const { form: formData, enhance } = form;

  $: console.log(form);

  function resetForm() {
    form.reset();
    testOver = false;
  }

  // Results LOGIC
  let testOver = false;
  let score: number = 0;

  const correctAnswers = questions.map((question: any) => {
    return question.yomi;
  });

  function calculateScore(answers: string[], correctAnswers: string[]) {
    let numberOfCorrectAnswers = 0;
    for (let i = 0; i < answers.length; i++) {
      if (answers[i] === correctAnswers[i]) {
        numberOfCorrectAnswers++;
      }
    }
    return numberOfCorrectAnswers;
  }

  $: if (formRes?.form?.posted && formRes?.form.valid) {
    testOver = true;
    score = calculateScore(formRes?.form.data.questions, correctAnswers);
  }
</script>

<div class="flex flex-col items-center w-full py-20 px-2.5">
  <form method="POST" id="quiz-form" class="w-full max-w-2xl" use:enhance>
    <div class="flex flex-col gap-4">
      {#each questions as question, index}
        <QuestionCard {question} {form} {formData} questionIndex={index} />
      {/each}
    </div>

    <div class="flex justify-center my-4">
      <FormButton class="w-full">Finish Quiz</FormButton>
    </div>
  </form>

  <ResultsDialog {formRes} {questions} {testOver} {score}>
    <Button slot="restart" variant="secondary" on:click={resetForm}
      >Try Again</Button
    >
  </ResultsDialog>
</div>

<script lang="ts">
  import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
  } from '$lib/components/ui/card';

  import {
    FormFieldset,
    FormControl,
    FormLabel,
    FormFieldErrors,
  } from '$lib/components/ui/form';

  import {
    RadioGroup,
    RadioGroupInput,
    RadioGroupItem,
  } from '$lib/components/ui/radio-group';

  import { Skeleton } from '$lib/components/ui/skeleton';

  export let question: any;
  export let form: any;
  export let formData: any;
  export let questionIndex: number;
</script>

<Card class="w-full max-w-2xl">
  <CardHeader>
    <CardTitle>
      {question?.kanji}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <FormFieldset {form} name={`questions`}>
      <RadioGroup
        bind:value={$formData.questions[questionIndex]}
        class="flex flex-col space-y-4"
      >
        {#each question.answers as answer, i}
          <FormControl let:attrs>
            <div class="flex space-x-2">
              <RadioGroupItem value={answer} {...attrs} />
              <FormLabel>{answer}</FormLabel>
            </div>
          </FormControl>
        {/each}

        <RadioGroupInput name={`questions`} />
      </RadioGroup>
      <FormFieldErrors />
    </FormFieldset>
  </CardContent>
  <CardFooter class="flex items-center px-6 py-3 text-gray-400 border-t ">
    {question?.meaning ? question?.meaning : ''}
  </CardFooter>
</Card>

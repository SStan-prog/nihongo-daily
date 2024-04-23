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

  //ANSWER RANDOMIZE LOGIC
  const shuffleAnswers = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  let answers = shuffleAnswers([
    ...Object.values(question?.incorrect_answers),
    question.yomi,
  ]);
</script>

<Card class="min-w-[600px]">
  <CardHeader>
    <CardTitle>
      {question?.kanji}
    </CardTitle>
  </CardHeader>
  <CardContent>
    <FormFieldset {form} name={`question_${questionIndex}`}>
      <RadioGroup
        bind:value={$formData[`question_${questionIndex}`]}
        class="flex flex-col space-y-4"
      >
        {#each answers as answer, i}
          <FormControl let:attrs>
            <div class="flex space-x-2">
              <RadioGroupItem value={answer} {...attrs} />
              <FormLabel>{answer}</FormLabel>
            </div>
          </FormControl>
        {/each}
        <RadioGroupInput name={`question_${questionIndex}`} />
      </RadioGroup>
      <FormFieldErrors />
    </FormFieldset>
  </CardContent>
  <CardFooter class="flex items-center px-6 py-3 text-gray-400 border-t ">
    {question?.meaning ? question?.meaning : ''}
  </CardFooter>
</Card>

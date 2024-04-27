import questions from '../../data/vocab.json'
import type { PageServerLoad, Actions } from "./$types.js";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { quizSchema } from './schema';
import { zod } from "sveltekit-superforms/adapters";


export const load: PageServerLoad = async() => {
    function getRandomInt(min:number, max:number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    
      function selectRandomQuestions(array: any[]) {
        let selectedQuestions = [];
        while (selectedQuestions.length < 2) {
          let randomIndex = getRandomInt(0, array.length - 1);
          selectedQuestions.push(array[randomIndex]);
        }
        return selectedQuestions;
      }

       //ANSWER RANDOMIZE LOGIC
        const shuffleAnswers = (answers: string[]) => {
            for (let i = answers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [answers[i], answers[j]] = [answers[j], answers[i]];
            }

            return answers;
        };

   
        questions.data.forEach((question) => {
            let answers = [...Object.values(question.incorrect_answers), question.yomi];
            question['answers'] = shuffleAnswers(answers)
        })

	return {
        formRes: await superValidate(zod(quizSchema)),
		questions: selectRandomQuestions(questions.data)
	};
}

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(quizSchema));
      if(form.valid){
        return { form };
      }
    },
  };
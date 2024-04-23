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
        while (selectedQuestions.length < 1) {
          let randomIndex = getRandomInt(0, array.length - 1);
          selectedQuestions.push(array[randomIndex]);
        }
        return selectedQuestions;
      }

	return {
        formRes: await superValidate(zod(quizSchema)),
		questions: selectRandomQuestions(questions.data)
	};
}

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(quizSchema));

      return{
        form
      }

    //   if(form.valid){

    //     const answers = form.data;
    //     console.log(answers)
    //     return { answers };
    //   }
    },
  };
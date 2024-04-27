import { z } from "zod";

export const questionSchmea =  z.string().min(1, {message: 'Please select one answer.'})


export const quizSchema = z.object({
 questions: questionSchmea.array().min(1)
})


 export type QuizSchema = typeof quizSchema;
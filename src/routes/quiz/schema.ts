import { z } from "zod";

export const quizSchema = z.object({
    question_1: z.string().min(1, {message: 'Please select one answer.'}),
    // question_2: z.string(),
    // question_3: z.string(),
    // question_4: z.string(),
    // question_5: z.string(),
  });


 export type QuizSchema = typeof quizSchema;
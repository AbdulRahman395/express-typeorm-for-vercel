import { z } from "zod";

export const createToDoTask = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters long'),
    description: z.string().min(3, 'Description must be at least 3 characters long').optional(),
})

export const updateTodoTask = createToDoTask.partial()
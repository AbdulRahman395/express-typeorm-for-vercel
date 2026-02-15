import { z } from 'zod';

export const userRegistrationSchema = z.object({
    name: z.string()
        .min(2, { message: 'Name must be at least 2 characters long' })
        .max(50, { message: 'Name cannot exceed 50 characters' })
        .trim(),

    email: z.string()
        .email({ message: 'Please provide a valid email address' })
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' })
});

export const userLoginSchema = z.object({
    email: z.string()
        .email({ message: 'Please provide a valid email address' })
        .toLowerCase()
        .trim(),

    password: z.string()
        .min(1, { message: 'Password is required' })
});

export type UserRegistrationInput = z.infer<typeof userRegistrationSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
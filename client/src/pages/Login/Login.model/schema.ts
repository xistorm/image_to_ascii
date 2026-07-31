import { z } from 'zod';

export const loginSchema = z.object({
    login: z
        .string()
        .min(6, { error: 'Логин слишком короткий' })
        .max(20, { error: 'Логин слишком длинный' }),
    password: z
        .string()
        .min(6, { error: 'Пароль слишком короткий' })
        .max(20, { error: 'Пароль слишком длинный' }),
    remember: z
        .boolean()
        .optional(),
});

export type LoginFormSchema = z.infer<typeof loginSchema>;

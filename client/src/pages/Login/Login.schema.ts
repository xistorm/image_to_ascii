import { z } from 'zod';

import { type LoginRequestSchema } from '@/entities/user/api';

export const loginFormSchema = z
    .object({
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
    })
    .transform<LoginRequestSchema>((form) => ({
        login: form.login,
        password: form.password,
    }));

export type LoginFormSchema = z.infer<typeof loginFormSchema>;

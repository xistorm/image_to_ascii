import { z } from 'zod';
import { v4 as uuid } from 'uuid';

import type { SignupRequestSchema } from '@/entities/user/api';

export const registrationFormSchema = z
    .object({
        login: z
            .string()
            .min(6, { error: 'Логин слишком короткий' })
            .max(20, { error: 'Логин слишком длинный' }),
        email: z
            .email({ error: 'Некорректный адрес электронной почты' }),
        password: z
            .string()
            .min(6, { error: 'Пароль слишком короткий' })
            .max(20, { error: 'Пароль слишком длинный' }),
        repeat_password: z
            .string(),
        agreement: z
            .literal(true, { error: 'Обязательное соглашение' }),
    })
    .refine(
        (data) => data.password === data.repeat_password,
        { path: ['repeat_password'], error: 'Пароли не совпадают' },
    )
    .transform<SignupRequestSchema>(form => ({
        id: uuid(),
        login: form.login,
        password: form.password,
        email: form.email,
    }));

export type RegistrationFormSchema = z.infer<typeof registrationFormSchema>;

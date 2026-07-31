import { z } from 'zod';

export const registrationSchema = z
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
    );

export type RegistrationFormSchema = z.infer<typeof registrationSchema>;

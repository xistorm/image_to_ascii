import { z } from 'zod';

import { userModel } from '../model';

import { api } from '@/shared/api';

export const signupRequestSchema = z
    .object({
        id: z
            .uuidv4(),
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
    });

export type SignupRequestSchema = z.input<typeof signupRequestSchema>;

export const signupRequest = async (data: SignupRequestSchema) => {
    return await api({
        url: '/signup',
        method: 'PUT',
        inputSchema: signupRequestSchema,
        outputSchema: userModel,
        data,
    });
};

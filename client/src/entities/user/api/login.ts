import { z } from 'zod';

import { userModel } from '../model';

import { api } from '@/shared/api';

export const loginRequestSchema = z.object({
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

export type LoginRequestSchema = z.infer<typeof loginRequestSchema>;

export const loginRequest = async (data: LoginRequestSchema) => {
    return await api({
        url: '/login',
        method: 'POST',
        schema: userModel,
        data,
    });
};

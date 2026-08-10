import { z } from 'zod';

import { userModel } from '../model';

import { api } from '@/shared/api';

export const loginRequestSchema = z
    .object({
        login: z
            .string()
            .min(6, { error: 'Логин слишком короткий' })
            .max(20, { error: 'Логин слишком длинный' }),
        password: z
            .string()
            .min(6, { error: 'Пароль слишком короткий' })
            .max(20, { error: 'Пароль слишком длинный' }),
    });

export type LoginRequestSchema = z.input<typeof loginRequestSchema>;

export const loginRequest = async (data: LoginRequestSchema) => {
    return await api({
        url: '/login',
        method: 'POST',
        inputSchema: loginRequestSchema,
        outputSchema: userModel,
        data,
    });
};

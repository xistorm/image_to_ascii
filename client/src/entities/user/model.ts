import { z } from 'zod';

export const userDto = z
    .object({
        token: z
            .string(),
        user: z
            .object({
                id: z
                    .string(),
                login: z
                    .string(),
                password: z
                    .string(),
                avatar: z
                    .string()
                    .optional()
                    .nullable(),
            }),
    });

export const userModel = userDto
    .transform(dto => ({
        id: dto.user.id,
        login: dto.user.login,
        password: dto.user.password,
        avatar: dto.user.avatar || undefined,
        token: dto.token,
    }));

export type UserDto = z.infer<typeof userDto>;
export type UserModel = z.infer<typeof userModel>;

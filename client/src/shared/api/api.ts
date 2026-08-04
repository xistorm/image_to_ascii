import { z } from 'zod';

import { apiClient } from './client';

interface ApiParams<
    TOutput extends z.Schema = z.ZodNever,
    TInput extends Record<string, unknown> = Record<string, unknown>,
> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    schema: TOutput;
    data?: TInput;
    params?: Record<string, unknown>;
}

export const api = async <
    TOutput extends z.Schema = z.ZodNever,
    TInput extends Record<string, unknown> = Record<string, unknown>,
>({
    url,
    method = 'GET',
    schema,
    data,
    params,
}: ApiParams<TOutput, TInput>): Promise<z.infer<TOutput>> => {
    const response = await apiClient(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        data,
        params,
    });

    return schema.parse(response.data);
};

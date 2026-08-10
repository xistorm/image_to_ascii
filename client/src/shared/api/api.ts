import { z } from 'zod';

import { apiClient } from './client';

interface ApiParams<
    TOutput extends z.Schema = z.ZodNever,
    TInput extends z.Schema = z.ZodNever,
> {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    inputSchema: TInput;
    outputSchema: TOutput;
    data?: z.input<TInput>;
    params?: Record<string, unknown>;
}

export const api = async <
    TOutput extends z.Schema = z.ZodNever,
    TInput extends z.Schema = z.ZodNever,
>({
    url,
    method = 'GET',
    inputSchema,
    outputSchema,
    data,
    params,
}: ApiParams<TOutput, TInput>): Promise<z.infer<TOutput>> => {
    const input = inputSchema.parse(data);

    const response = await apiClient(url, {
        method,
        data: input,
        params,
    });

    return outputSchema.parse(response.data);
};

import { QueryClient } from '@tanstack/react-query';
import * as axios from 'axios';
import { z } from 'zod';

const {
    VITE_API_PROTOCOL,
    VITE_API_HOST,
    VITE_API_BASE_ROUTE,
    VITE_API_PORT,
} = import.meta.env;

const apiClient = axios.create({
    baseURL: `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}/${VITE_API_BASE_ROUTE}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

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
        headers: {},
        data,
        params,
    });

    return schema.parse(response.data);
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
        },
    },
});

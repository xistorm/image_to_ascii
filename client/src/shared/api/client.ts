import { type AxiosError, create } from 'axios';

import { authMiddleware, unauthorizedMiddleware } from './middlewares';

const {
    VITE_API_PROTOCOL,
    VITE_API_HOST,
    VITE_API_BASE_ROUTE,
    VITE_API_PORT,
} = import.meta.env;

interface ApiErrorResponse {
    code: string;
    message: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export const apiClient = create({
    baseURL: `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}/${VITE_API_BASE_ROUTE}`,
    withCredentials: true,
});

apiClient.interceptors.request.use(authMiddleware);
apiClient.interceptors.response.use(unauthorizedMiddleware);

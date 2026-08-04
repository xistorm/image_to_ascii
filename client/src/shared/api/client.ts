import * as axios from 'axios';

import { authMiddleware, unauthorizedMiddleware } from './middlewares';

const {
    VITE_API_PROTOCOL,
    VITE_API_HOST,
    VITE_API_BASE_ROUTE,
    VITE_API_PORT,
} = import.meta.env;

export const apiClient = axios.create({
    baseURL: `${VITE_API_PROTOCOL}://${VITE_API_HOST}:${VITE_API_PORT}/${VITE_API_BASE_ROUTE}`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(authMiddleware);
apiClient.interceptors.response.use(unauthorizedMiddleware);

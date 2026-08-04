import type { InternalAxiosRequestConfig } from 'axios';
import { getAuthToken } from '@/shared/storage';

export const authMiddleware = (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    config.headers.Authorization = `Bearer ${token}`;

    return config;
};

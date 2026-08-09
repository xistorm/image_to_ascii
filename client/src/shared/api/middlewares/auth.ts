import type { InternalAxiosRequestConfig } from 'axios';
import { authStorage } from '@/shared/storage';

export const authMiddleware = (config: InternalAxiosRequestConfig) => {
    const token = authStorage.get();
    config.headers.Authorization = `Bearer ${token}`;

    return config;
};

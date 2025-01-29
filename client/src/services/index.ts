import { authApi } from '@/services/auth/authApi';

export const apiReducer = {
	[authApi.reducerPath]: authApi.reducer,
};

export const apiMiddleware = [
	authApi.middleware,
];

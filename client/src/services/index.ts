import { baseApi } from '@services/api/api';

export const apiReducer = {
	[baseApi.reducerPath]: baseApi.reducer,
};

export const apiMiddleware = [
	baseApi.middleware,
];

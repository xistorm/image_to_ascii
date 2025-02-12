import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { TAG_TYPE } from '@services/api/constants';
import { getToken } from '@shared/utils';


const API_PROTOCOL = import.meta.env.VITE_API_PROTOCOL || 'http';
const API_HOST = import.meta.env.VITE_API_HOST || 'localhost';
const API_PORT = import.meta.env.VITE_API_PORT || 8000;
const API_BASE_ROUTE = import.meta.env.VITE_API_BASE_ROUTE || '';

const baseQuery = fetchBaseQuery({
	baseUrl: `${API_PROTOCOL}://${API_HOST}:${API_PORT}/${API_BASE_ROUTE}`,
	prepareHeaders: (headers) => {
		const token = getToken();
		if (token) {
			headers.set('Authorization', `Bearer ${token}`);
		}

		return headers;
	},
});

export const baseApi = createApi({
	baseQuery,
	endpoints: () => ({}),
	tagTypes: [TAG_TYPE.AUTH, TAG_TYPE.FILE],
});

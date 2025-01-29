import { baseApi } from '../api/api';
import { LoginRequest, LoginResponse, User } from './types';
import { TAG_TYPE } from '@services/api/constants';


export const authApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		authorize: builder.query<User, void>({
			query: () => ({
				url: 'auth/',
				method: 'GET',
			}),
			providesTags: [TAG_TYPE.AUTH],
		}),
		login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: 'auth/login',
				method: 'POST',
				body: credentials,
			}),
			invalidatesTags: [TAG_TYPE.AUTH],
		}),
	}),
});

export const { useAuthorizeQuery, useLoginMutation } = authApi;

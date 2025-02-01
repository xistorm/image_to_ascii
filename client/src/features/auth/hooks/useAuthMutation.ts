import { useNavigate } from 'react-router-dom';
import { useForm } from '@shared/hooks';
import { AuthResponse } from '@services/auth/types';
import { useEffect } from 'react';
import { setToken } from '@shared/utils';
import {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
	FetchBaseQueryMeta,
	TypedUseMutation,
} from '@reduxjs/toolkit/query/react';
import { useDispatch } from 'react-redux';
import { login } from '@features/auth/slice';


type UseQuery = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, object, FetchBaseQueryMeta>
type UseMutation<T extends object> = TypedUseMutation<AuthResponse, T, UseQuery>;

export const useAuthMutation = <T extends object>(initialValue: T, useMutation: UseMutation<T>) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [sendRequest, { data, error }] = useMutation();
	const [, handleChange, handleSubmit] = useForm<T>(initialValue, sendRequest);

	useEffect(() => {
		if (data) {
			setToken(data.token);
			dispatch(login(data.user));
			navigate('/');
		}
	}, [data, error]);

	return [handleChange, handleSubmit, { data, error }] as const;
};

import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import type { UserModel } from './model';
import {
    authorizeRequest,
    loginRequest,
    type LoginRequestSchema,
    signupRequest,
    type SignupRequestSchema,
} from './api';

import type { ApiError } from '@/shared/api';

type UseAuthorizeQueryOptions = UseQueryOptions<UserModel, ApiError>;
export const authorizeQueryOptions: UseAuthorizeQueryOptions = {
    queryKey: ['user', 'authorize'],
    queryFn: authorizeRequest,
    retry: false,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
};

type UseLoginMutationOptions = UseMutationOptions<UserModel, ApiError, LoginRequestSchema>;
export const loginMutationOptions: UseLoginMutationOptions = {
    mutationKey: ['user', 'login'],
    mutationFn: loginRequest,
};

type UseSignupMutationOptions = UseMutationOptions<UserModel, ApiError, SignupRequestSchema>;
export const signupMutationOptions: UseSignupMutationOptions = {
    mutationKey: ['user', 'signup'],
    mutationFn: signupRequest,
};

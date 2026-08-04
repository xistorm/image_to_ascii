import type { DefaultError, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import {
    authorizeRequest,
    loginRequest,
    type LoginRequestSchema,
    signupRequest,
    type SignupRequestSchema,
} from '@/entities/user/api';
import type { UserModel } from '@/entities/user/model';

export const getAuthorizeQueryOptions = () => ({
    queryKey: ['user', 'authorize'],
    queryFn: authorizeRequest,
    retry: false,
    staleTime: 24 * 60 * 60 * 1000,
    refetchOnWindowFocus: false,
} satisfies UseQueryOptions);

export const getLoginQueryOptions = () => ({
    mutationKey: ['user', 'login'],
    mutationFn: loginRequest,
} satisfies UseMutationOptions<UserModel, DefaultError, LoginRequestSchema>);

export const getSignupQueryOptions = () => ({
    mutationKey: ['user', 'signup'],
    mutationFn: signupRequest,
} satisfies UseMutationOptions<UserModel, DefaultError, SignupRequestSchema>);

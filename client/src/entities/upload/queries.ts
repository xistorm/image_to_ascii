import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { type AddUploadRequest, addUploadRequest, getUploadRequest, getUploadsRequest } from './api';
import type { UploadModel } from './model';

import type { ApiError } from '@/shared/api';


type UseGetUploadsQueryOptions = UseQueryOptions<UploadModel[], ApiError>;
export const getUploadsQueryOptions: UseGetUploadsQueryOptions = {
    queryKey: ['upload', 'list'],
    queryFn: getUploadsRequest,
};

type UseGetUploadQueryOptions = UseQueryOptions<UploadModel, ApiError>;
export const getUploadQueryOptions = (id: string): UseGetUploadQueryOptions => ({
    queryKey: ['upload'],
    queryFn: () => getUploadRequest(id),
});

type UseAddUploadMutationOptions = UseMutationOptions<UploadModel, ApiError, AddUploadRequest>;
export const addUploadMutationOptions: UseAddUploadMutationOptions = {
    mutationKey: ['upload'],
    mutationFn: addUploadRequest,
};

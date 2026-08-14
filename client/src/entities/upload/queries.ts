import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';

import { type AddUploadRequest, addUploadRequest, getUploadRequest, getUploadsRequest } from './api';
import type { UploadModel } from './model';

import type { ApiError } from '@/shared/api';

const REFETCH_TIMEOUT = 2 * 1_000; // 2 seconds

const isPendingRequest = (data?: UploadModel) => {
    return data?.status === 'pending';
};

const refetchUpload = (
    data: UploadModel | UploadModel[] | undefined,
    error: ApiError | null,
) => {
    const parsedData = Array.isArray(data) ? data : [data];
    const hasPendingRequest = parsedData?.some(isPendingRequest);
    if (hasPendingRequest && !error) {
        return REFETCH_TIMEOUT;
    }

    return false;
};

type UseGetUploadsQueryOptions = UseQueryOptions<UploadModel[], ApiError>;
export const getUploadsQueryOptions: UseGetUploadsQueryOptions = {
    queryKey: ['upload', 'list'],
    queryFn: getUploadsRequest,
    refetchInterval: ({
        state: {
            data,
            error,
        },
    }) => refetchUpload(data, error),
};

type UseGetUploadQueryOptions = UseQueryOptions<UploadModel, ApiError>;
export const getUploadQueryOptions = (id: string): UseGetUploadQueryOptions => ({
    queryKey: ['upload'],
    queryFn: () => getUploadRequest(id),
    refetchInterval: ({
        state: {
            data,
            error,
        },
    }) => refetchUpload(data, error),
});

type UseAddUploadMutationOptions = UseMutationOptions<UploadModel, ApiError, AddUploadRequest>;
export const addUploadMutationOptions: UseAddUploadMutationOptions = {
    mutationKey: ['upload'],
    mutationFn: addUploadRequest,
};

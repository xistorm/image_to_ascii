import { baseApi } from '../api/api';
import { ConvertedImage, Image, UploadRequest, UploadResponse } from './types';
import { TAG_TYPE } from '@services/api/constants';


export const imageApi = baseApi.injectEndpoints({
	endpoints: (builder) => ({
		convert: builder.mutation<ConvertedImage, Image>({
			query: (data) => ({
				url: 'images/convert',
				method: 'POST',
				body: data,
			}),
		}),
		upload: builder.mutation<UploadResponse, UploadRequest>({
			query: (data) => ({
				url: 'images/upload',
				method: 'POST',
				body: data,
			}),
			invalidatesTags: [TAG_TYPE.FILE],
		}),
	}),
});

export const { useConvertMutation, useUploadMutation } = imageApi;

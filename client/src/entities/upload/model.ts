import { z } from 'zod';

import { base64ToImageSrc } from '@/shared/utils';

export const uploadStatus = z
    .union([
        z.literal('pending'),
        z.literal('success'),
        z.literal('error'),
    ]);

export const uploadDto = z
    .object({
        id: z
            .string(),
        status: uploadStatus,
        created_at: z
            .iso
            .datetime({ offset: true }),
        user_id: z
            .string(),
        file: z.object({
            id: z.string(),
            name: z.string(),
            type: z.string(),
            data: z.string(),
        }),
        parameter: z.object({
            id: z.string(),
            char_width: z.number(),
            char_height: z.number(),
        }),
        generation: z
            .array(
                z.object({
                    id: z.string(),
                    index: z.number(),
                    content: z.string(),
                }),
            )
            .nullable(),
    });

export const uploadModel = uploadDto
    .transform((dto) => ({
        id: dto.id,
        status: dto.status,
        date: new Date(dto.created_at),
        name: dto.file.name,
        type: dto.file.type,
        url: base64ToImageSrc(dto.file.data, dto.file.type),
        params: {
            charWidth: dto.parameter.char_width,
            charHeight: dto.parameter.char_height,
        },
        generation: dto.generation?.map((generation) => ({
            id: generation.id,
            index: generation.index,
            content: generation.content,
        })) ?? [],
    }));

export type UploadStatus = z.infer<typeof uploadStatus>
export type UploadModel = z.infer<typeof uploadModel>;
export type UploadParams = UploadModel['params'];
export type UploadGeneration = UploadModel['generation'][number];

import { z } from 'zod';

import { buildBase64Src } from '@/shared/utils';

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
        date: dto.created_at,
        name: dto.file.name,
        type: dto.file.type,
        url: buildBase64Src(dto.file.data, dto.file.type),
        generation: dto.generation?.map((generation) => ({
            id: generation.id,
            index: generation.index,
            content: generation.content,
        })) ?? [],
    }));

export type UploadStatus = z.infer<typeof uploadStatus>
export type UploadModel = z.infer<typeof uploadModel>;
export type UploadGeneration = UploadModel['generation'][number];

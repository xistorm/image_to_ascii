import { z } from 'zod';

export const uploadStatus = z
    .union([
        z.literal('pending'),
        z.literal('success'),
        z.literal('error'),
    ]);

export const fileKind = z
    .union([
        z.literal('original'),
        z.literal('ascii'),
    ]);

export const fileTheme = z
    .union([
        z.literal('common'),
        z.literal('light'),
        z.literal('dark'),
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
        files: z.array(
            z.object({
                id: z.string(),
                name: z.string(),
                mime_type: z.string(),
                url: z.string(),
                kind: fileKind,
                theme: fileTheme,
            }),
        ),
        parameter: z.object({
            id: z.string(),
            quality: z.number(),
        }),
    });

export const uploadModel = uploadDto
    .transform((dto) => ({
        id: dto.id,
        status: dto.status,
        date: new Date(dto.created_at),
        params: {
            charWidth: dto.parameter.char_width,
            charHeight: dto.parameter.char_height,
        },
        files: dto.files,
    }));

export type UploadStatus = z.infer<typeof uploadStatus>
export type UploadModel = z.infer<typeof uploadModel>;
export type FileKind = z.infer<typeof fileKind>;
export type FileTheme = z.infer<typeof fileTheme>;
export type UploadParams = UploadModel['params'];
export type UploadImage = UploadModel['files'][number];

import { z } from 'zod';

export const statusSchema = z
    .union([
        z.literal('pending'),
        z.literal('success'),
        z.literal('error'),
    ]);

export const uploadSchema = z
    .object({
        id: z
            .string(),
        name: z
            .string(),
        date: z
            .date(),
        status: statusSchema,
        url: z
            .url(),
    });

export type UploadStatus = z.infer<typeof statusSchema>;

export type UploadModel = z.infer<typeof uploadSchema>;

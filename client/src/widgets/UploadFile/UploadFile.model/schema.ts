import type { Accept } from 'react-dropzone';
import { z } from 'zod';

import { validateFileType } from '@/shared/utils';

interface GetUploadFileSchemaParams {
    accept?: Accept;
    minSize?: number;
    maxSize?: number;
}

const getFileSchema = ({
    accept,
    minSize = Number.NEGATIVE_INFINITY,
    maxSize = Number.POSITIVE_INFINITY,
}: GetUploadFileSchemaParams) => z
    .optional(
        z
            .file()
            .refine(
                (file) => validateFileType(file, accept),
                { error: 'Недопустимый формат файла' },
            )
            .min(
                minSize,
                { error: 'Файл слишком маленький' },
            )
            .max(
                maxSize,
                { error: 'Файл слишком большой' },
            ),
    );

export const getUploadFileSchema = (props: GetUploadFileSchemaParams) => z
    .object({
        file: z
            .instanceof(FileList)
            .refine(
                (files) => files.length < 2,
                { error: 'Недопустимое количество файлов' },
            )
            .transform(
                (files, ctx) => {
                    const fileSchema = getFileSchema(props);
                    const result = fileSchema.safeParse(files[0]);

                    if (result.success) {
                        return result.data;
                    }

                    result.error.issues.forEach((issue) => {
                        ctx.addIssue({
                            code: 'custom',
                            input: issue.input,
                            message: issue.message,
                        });
                    });

                    return z.NEVER;
                },
            ),
    });

export type UploadFileSchemaInput = z.input<ReturnType<typeof getUploadFileSchema>>;
export type UploadFileSchema = z.infer<ReturnType<typeof getUploadFileSchema>>;

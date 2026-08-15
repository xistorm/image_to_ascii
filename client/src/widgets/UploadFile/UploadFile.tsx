import { type FC, useCallback } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import { useFileForm } from './UploadFile.hooks';
import { getRestrictions } from './UploadFile.utils/getRestrictions';
import { UploadFilePreview } from './-Preview';
import { UploadFileDropZone } from './-DropZone';
import type { UploadFileSchema } from './UploadFile.model';
import type { IUploadFileProps } from './UploadFile.typings';
import styles from './UploadFile.module.css';
import { addUploadMutationOptions, type UploadModel } from '@/entities/upload';

import { Form } from '@/shared/components/Form';
import { cn } from '@/shared/utils';
import { useFormApiError } from '@/shared/components/Form/Form.hooks';

const cnUploadFile = cn(styles);

export const UploadFile: FC<IUploadFileProps> = ({
    accept,
    maxSize,
}) => {
    const navigate = useNavigate();
    const { mutate } = useMutation(addUploadMutationOptions);

    const {
        control,
        file,
        error,
        handleSubmit,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useFileForm({ accept, maxSize });

    const onError = useFormApiError(control);
    const onSuccess = useCallback(async (data: UploadModel) => {
        await navigate({
            to: '/uploads/$uploadId',
            params: {
                uploadId: data.id,
            },
        });
    }, [navigate]);

    const onSubmit = useCallback<SubmitHandler<UploadFileSchema>>(async (data) => {
        mutate(data, {
            onError,
            onSuccess,
        });
    }, [mutate, onSuccess, onError]);

    const renderContent = useCallback(() => {
        if (file && !error) {
            return (
                <UploadFilePreview
                    file={file}
                    control={control}
                    inputProps={getInputProps()}
                />
            );
        }

        return (
            <UploadFileDropZone
                control={control}
                inputProps={getInputProps()}
                restrictions={getRestrictions({ accept, maxSize })}
            />
        );
    }, [
        accept,
        maxSize,
        file,
        error,
        control,
        getInputProps,
    ]);

    return (
        <Form
            className={cnUploadFile('UploadFile', [], { active: isDragActive, error: Boolean(error) })}
            onSubmit={handleSubmit(onSubmit)}
            {...getRootProps()}
        >
            {renderContent()}
        </Form>
    );
};

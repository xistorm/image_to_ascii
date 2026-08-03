import { type FC, useCallback } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { useNavigate } from '@tanstack/react-router';

import { uploadAction, type UploadFileSchema } from './UploadFile.model';
import { useFileForm } from './UploadFile.hooks';
import { getRestrictions } from './UploadFile.utils/getRestrictions';
import { UploadFilePreview } from './-Preview';
import { UploadFileDropZone } from './-DropZone';
import type { IUploadFileProps } from './UploadFile.typings';
import styles from './UploadFile.module.css';

import { Form } from '@/shared/ui/components';
import { cn } from '@/shared/utils';

const cnUploadFile = cn(styles);

export const UploadFile: FC<IUploadFileProps> = ({
    accept,
    maxSize,
}) => {
    const {
        control,
        file,
        error,
        handleSubmit,
        getRootProps,
        getInputProps,
        isDragActive,
    } = useFileForm({ accept, maxSize });

    const navigate = useNavigate();

    const onSubmit = useCallback<SubmitHandler<UploadFileSchema>>(async (data) => {
        await uploadAction(data);
        await navigate({ to: '/create' });
    }, [navigate]);

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

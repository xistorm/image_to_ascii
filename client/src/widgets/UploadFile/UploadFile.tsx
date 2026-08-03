import { Form } from '@/shared/ui/components';
import { cn } from '@/shared/utils';
import { UploadFilePreview } from '@/widgets/UploadFile/-Preview';
import { getRestrictions } from '@/widgets/UploadFile/UploadFile.utils/getRestrictions';
import { useNavigate } from '@tanstack/react-router';
import { type FC, useCallback } from 'react';
import { type SubmitHandler } from 'react-hook-form';
import { UploadFileDropZone } from './-DropZone';
import { useFileForm } from './UploadFile.hooks';
import { uploadAction, type UploadFileSchema } from './UploadFile.model';

import styles from './UploadFile.module.css';
import type { IUploadFileProps } from './UploadFile.typings';

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
    }, []);

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
    }, [file]);

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

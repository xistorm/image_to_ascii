import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FileRejection, useDropzone } from 'react-dropzone';

import type { IUploadFileProps } from '../UploadFile.typings';
import { getUploadFileSchema } from '../UploadFile.model';
import { rejectionsToError } from '../UploadFile.utils';

export const useFileForm = ({
    accept,
    maxSize,
}: IUploadFileProps) => {
    const schema = getUploadFileSchema({ accept, maxSize });

    const {
        control,
        watch,
        setValue,
        setError,
        handleSubmit,
        clearErrors,
        formState,
    } = useForm({
        mode: 'onChange',
        resolver: zodResolver(schema),
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const file = watch('file')?.[0];
    const error = formState.errors.file;

    const onDropAccepted = useCallback((files: File[]) => {
        clearErrors();

        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        setValue('file', dataTransfer.files);
    }, [clearErrors, setValue]);

    const onDropRejected = useCallback((rejections: FileRejection[]) => {
        const error = rejectionsToError(rejections);
        setError('file', error);
    }, [setError]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxSize,
        noClick: true,
        multiple: false,
        onDropAccepted,
        onDropRejected,
    });

    return {
        control,
        watch,
        file,
        error,
        handleSubmit,
        getRootProps,
        getInputProps,
        isDragActive,
    };
};

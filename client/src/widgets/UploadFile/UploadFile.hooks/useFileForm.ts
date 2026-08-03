import type { IUploadFileProps } from '@/widgets';
import { getUploadFileSchema } from '@/widgets/UploadFile/UploadFile.model';
import { rejectionsToError } from '@/widgets/UploadFile/UploadFile.utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback } from 'react';
import { type FileRejection, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';

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
    const file = watch('file')?.[0];
    const error = formState.errors.file;

    const onDropAccepted = useCallback((files: File[]) => {
        clearErrors();

        const dataTransfer = new DataTransfer();
        files.forEach(file => dataTransfer.items.add(file));
        setValue('file', dataTransfer.files);
    }, []);

    const onDropRejected = useCallback((rejections: FileRejection[]) => {
        const error = rejectionsToError(rejections);
        setError('file', error);
    }, []);

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
        file,
        error,
        handleSubmit,
        getRootProps,
        getInputProps,
        isDragActive,
    };
};

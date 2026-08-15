import { type FC, type MouseEventHandler, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useMutation } from '@tanstack/react-query';

import type { IDeleteUploadButtonProps } from './DeleteUploadButton.typings';

import { deleteUploadMutationOptions } from '@/entities/upload';
import TrashIcon from '@/shared/assets/icons/trash.svg?react';
import { Button } from '@/shared/components/Button';

export const DeleteUploadButton: FC<IDeleteUploadButtonProps> = ({
    className,
    uploadId,
    text,
}) => {
    const navigate = useNavigate();
    const { mutate } = useMutation(deleteUploadMutationOptions);

    const onDeleteClick = useCallback<MouseEventHandler<HTMLButtonElement>>(async (event) => {
        event.stopPropagation();
        mutate(uploadId);
        await navigate({ to: '/uploads' });
    }, [uploadId, mutate, navigate]);

    return (
        <Button
            className={className}
            view="dangerous"
            onClick={onDeleteClick}
        >
            <TrashIcon width={16} height={16}/>
            {text}
        </Button>
    );
};

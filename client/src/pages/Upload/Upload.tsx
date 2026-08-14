import type { FC } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from '@tanstack/react-router';

import styles from './Upload.module.css';
import { getUploadQueryOptions } from '@/entities/upload';

import { cn } from '@/shared/utils';

const cnUpload = cn(styles);

export const Upload: FC = () => {
    const { uploadId } = useParams({ from: '/_logged/uploads/$uploadId' });
    const { data } = useQuery(getUploadQueryOptions(uploadId));

    console.log(data);

    return (
        <div className={cnUpload('Upload')}></div>
    );
};

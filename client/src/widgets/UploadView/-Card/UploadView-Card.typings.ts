import type { PropsWithChildren } from 'react';

export interface IUploadViewCardProps extends PropsWithChildren {
    title: string;
    onCopy?: VoidFunction;
}

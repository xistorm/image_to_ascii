import type { PropsWithChildren } from 'react';

export interface ISpoilerProps extends PropsWithChildren {
    className?: string;
    title: string;
    isOpenedDefault?: boolean;
}

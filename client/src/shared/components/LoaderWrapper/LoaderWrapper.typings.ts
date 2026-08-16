import type { PropsWithChildren } from 'react';

import type { LoaderSize } from '@/shared/components/Loader';

export interface ILoaderWrapperProps extends PropsWithChildren {
    className?: string;
    isLoading?: boolean;
    size?: LoaderSize;
}

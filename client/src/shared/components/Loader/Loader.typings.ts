import type { HTMLAttributes } from 'react';

export type LoaderSize = 's' | 'm' | 'l' | 'xl'

export interface ILoaderProps extends HTMLAttributes<HTMLDivElement> {
    size?: LoaderSize;
}

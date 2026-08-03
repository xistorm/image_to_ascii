import type { FC } from 'react';
import { Link as LinkBase } from '@tanstack/react-router';

import type { ILinkProps } from './Link.typings';
import styles from './Link.module.css';

import { cn } from '@/shared/utils';

const cnLink = cn(styles);

export const Link: FC<ILinkProps> = ({
    className,
    ...rest
}) => {
    return (
        <LinkBase className={cnLink('Link', [className])} {...rest} />
    );
};

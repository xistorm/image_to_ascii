import { cn } from '@/shared/utils';
import { Link as LinkBase } from '@tanstack/react-router';
import type { FC } from 'react';

import styles from './Link.module.css';
import type { ILinkProps } from './Link.typings';

const cnLink = cn(styles);

export const Link: FC<ILinkProps> = ({
    className,
    ...rest
}) => {
    return (
        <LinkBase className={cnLink('Link', [className])} {...rest} />
    );
};

import type { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

import type { IErrorProps } from './Error.typings';
import styles from './Error.module.css';

import { cn } from '@/shared/utils';

const cnError = cn(styles);

export const Error: FC<IErrorProps> = ({
    className,
    name,
    errors = {},
}) => {
    return (
        <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => (
                <span className={cnError('Error', [className])}>{message}</span>
            )}
        />
    );
};

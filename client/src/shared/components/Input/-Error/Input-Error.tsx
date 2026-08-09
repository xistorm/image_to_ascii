import type { FC } from 'react';
import { ErrorMessage } from '@hookform/error-message';

import styles from './Input-Error.module.css';
import type { IInputErrorProps } from './Input-Error.typings';

import { cn } from '@/shared/utils';

const cnInputError = cn(styles);

export const InputError: FC<IInputErrorProps> = ({
    name,
    errors = {},
}) => {
    return (
        <ErrorMessage
            name={name}
            errors={errors}
            render={({ message }) => <span className={cnInputError('Input-Error')}>{message}</span>}
        />
    );
};

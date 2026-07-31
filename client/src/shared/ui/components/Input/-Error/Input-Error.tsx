import { cn } from '@/shared/utils';
import { ErrorMessage } from '@hookform/error-message';
import type { FC } from 'react';

import styles from './Input-Error.module.css';
import type { IInputErrorProps } from './Input-Error.typings';

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

import { type FC } from 'react';

import type { IFormProps } from './Form.typings';
import styles from './Form.module.css';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnForm = cn(styles);

export const Form: FC<IFormProps> = ({
    className,
    ref,
    errors = {},
    children,
    ...rest
}) => {
    return (
        <form
            className={cnForm('Form', [className])}
            ref={ref}
            noValidate
            {...rest}
        >
            <Error name="form" errors={errors}/>
            {children}
        </form>
    );
};

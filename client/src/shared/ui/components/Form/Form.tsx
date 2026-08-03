import { cn } from '@/shared/utils';
import { forwardRef } from 'react';

import styles from './Form.module.css';
import type { IFormProps } from './Form.typings';

const cnForm = cn(styles);

export const Form = forwardRef<HTMLFormElement, IFormProps>(({
    className,
    ...rest
}, ref) => {
    return (
        <form
            className={cnForm('Form', [className])}
            ref={ref}
            noValidate
            {...rest}
        />
    );
});

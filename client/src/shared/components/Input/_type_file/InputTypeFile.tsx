import { forwardRef } from 'react';

import { InputError } from '../-Error';
import styles from './InputTypeFile.module.css';
import type { IInputTypeFileProps } from './InputTypeFile.typings';

import { cn } from '@/shared/utils';

const cnInputTypeFile = cn(styles);

export const InputTypeFile = forwardRef<HTMLInputElement, IInputTypeFileProps>(({
    className,
    type,
    id,
    name,
    errors = {},
    required,
    disabled,
    children,
    ...rest
}, ref) => {
    return (
        <div className={cnInputTypeFile('Input', [className], { type, required, disabled })}>
            {children && <label
                className={cnInputTypeFile('Input-Label')}
                htmlFor={id}
            >
                {children}
            </label>}
            <input
                className={cnInputTypeFile('Input-Field')}
                ref={ref}
                type={type}
                id={id}
                name={name}
                required={required}
                disabled={disabled}
                {...rest}
            />
            <InputError name={name} errors={errors}/>
        </div>
    );
});

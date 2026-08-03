import { forwardRef } from 'react';

import { InputError } from '../-Error';
import styles from './Input_type_text.module.css';
import type { IInputTypeTextProps } from './Input_type_text.typings';

import { cn } from '@/shared/utils';

const cnInputTypeText = cn(styles);

export const InputTypeText = forwardRef<HTMLInputElement, IInputTypeTextProps>(({
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
        <div className={cnInputTypeText('Input', [className], { type, required, disabled })}>
            {children && <label
                className={cnInputTypeText('Input-Label')}
                htmlFor={id}
            >{children}</label>}
            <input
                className={cnInputTypeText('Input-Field')}
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

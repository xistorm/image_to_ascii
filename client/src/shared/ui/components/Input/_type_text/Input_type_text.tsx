import { cn } from '@/shared/utils';
import { forwardRef } from 'react';

import { InputError } from '../-Error';
import styles from './Input_type_text.module.css';
import type { IInputTypeTextProps } from './Input_type_text.typings';

const cnInputTypeText = cn(styles);

export const InputTypeText = forwardRef<HTMLInputElement, IInputTypeTextProps>(({
    className,
    type,
    name,
    errors = {},
    required,
    disabled,
    children,
    ...rest
}, forwardRef) => {
    return (
        <div className={cnInputTypeText('Input', [className], { type, required, disabled })}>
            {children && <label
                className={cnInputTypeText('Input-Label')}
                htmlFor={name}
            >{children}</label>}
            <input
                className={cnInputTypeText('Input-Field')}
                ref={forwardRef}
                type={type}
                name={name}
                required={required}
                disabled={disabled}
                {...rest}
            />
            <InputError name={name} errors={errors}/>
        </div>
    );
});

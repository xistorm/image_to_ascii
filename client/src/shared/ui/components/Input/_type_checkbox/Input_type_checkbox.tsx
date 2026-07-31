import type { IInputTypeCheckboxProps } from '@/shared/ui/components/Input/_type_checkbox/Input_type_checkbox.typings';
import { cn } from '@/shared/utils';
import { forwardRef } from 'react';
import { InputError } from '../-Error';

import styles from './Input_type_checkbox.module.css';

const cnInputTypeCheckbox = cn(styles);

export const InputTypeCheckbox = forwardRef<HTMLInputElement, IInputTypeCheckboxProps>(({
    className,
    type,
    name,
    required,
    disabled,
    children,
    errors,
    ...rest
}, forwardRef) => {
    return (
        <div className={cnInputTypeCheckbox('Input', [className], { type, required, disabled })}>
            <div className={cnInputTypeCheckbox('Input-Wrapper')}>
                <input
                    className={cnInputTypeCheckbox('Input-Field')}
                    ref={forwardRef}
                    type={type}
                    name={name}
                    required={required}
                    disabled={disabled}
                    {...rest}
                />
                {children && <label
                    className={cnInputTypeCheckbox('Input-Label')}
                    htmlFor={name}
                >{children}</label>}
            </div>
            <InputError name={name} errors={errors}/>
        </div>
    );
});

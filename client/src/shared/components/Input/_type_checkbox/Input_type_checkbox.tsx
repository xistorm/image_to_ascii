import { type FC } from 'react';

import type { IInputTypeCheckboxProps } from './Input_type_checkbox.typings';
import styles from './Input_type_checkbox.module.css';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypeCheckbox = cn(styles);

export const InputTypeCheckbox: FC<IInputTypeCheckboxProps> = ({
    className,
    ref,
    type,
    id,
    name,
    required,
    disabled,
    children,
    errors,
    ...rest
}) => {
    return (
        <div className={cnInputTypeCheckbox('Input', [className], { type, required, disabled })}>
            <div className={cnInputTypeCheckbox('Input-Wrapper')}>
                <input
                    className={cnInputTypeCheckbox('Input-Field')}
                    ref={ref}
                    type={type}
                    id={id}
                    name={name}
                    required={required}
                    disabled={disabled}
                    {...rest}
                />
                {children && <label
                    className={cnInputTypeCheckbox('Input-Label')}
                    htmlFor={id}
                >{children}</label>}
            </div>
            <Error name={name} errors={errors}/>
        </div>
    );
};

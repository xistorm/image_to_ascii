import type { FC } from 'react';

import styles from './Input_type_range.module.css';
import type { IInputTypeRangeProps } from './Input_type_range.typings';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypeRange = cn(styles);

export const InputTypeRange: FC<IInputTypeRangeProps> = ({
    className,
    ref,
    type,
    id,
    name,
    errors = {},
    required,
    disabled,
    children,
    ...rest
}) => {
    return (
        <div className={cnInputTypeRange('Input', [className], { type, required, disabled })}>
            {children && <label
                className={cnInputTypeRange('Input-Label')}
                htmlFor={id}
            >{children}</label>}
            <input
                className={cnInputTypeRange('Input-Field')}
                ref={ref}
                type={type}
                id={id}
                name={name}
                required={required}
                disabled={disabled}
                {...rest}
            />
            <Error name={name} errors={errors}/>
        </div>
    );
};

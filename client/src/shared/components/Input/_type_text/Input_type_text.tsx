import { type FC } from 'react';

import styles from './Input_type_text.module.css';
import type { IInputTypeTextProps } from './Input_type_text.typings';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypeText = cn(styles);

export const InputTypeText: FC<IInputTypeTextProps> = ({
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
            <Error name={name} errors={errors}/>
        </div>
    );
};

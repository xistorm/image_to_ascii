import { type FC } from 'react';

import type { IInputTypeFileProps } from './InputTypeFile.typings';
import styles from './InputTypeFile.module.css';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypeFile = cn(styles);

export const InputTypeFile: FC<IInputTypeFileProps> = ({
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
            <Error name={name} errors={errors}/>
        </div>
    );
};

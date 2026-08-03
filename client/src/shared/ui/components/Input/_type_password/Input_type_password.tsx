import { cn } from '@/shared/utils';
import { forwardRef, useCallback, useState } from 'react';
import { InputError } from '../-Error';

import HiddenIcon from '../Input.assets/hidden.svg?react';
import ShownIcon from '../Input.assets/shown.svg?react';
import styles from './Input_type_password.module.css';
import type { IInputTypePasswordProps } from './Input_type_password.typings';

const cnInputTypePassword = cn(styles);

export const InputTypePassword = forwardRef<HTMLInputElement, IInputTypePasswordProps>(({
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
    const [calculatedType, setCalculatedPassword] = useState<'password' | 'text'>(type);

    const Icon = (() => {
        switch (calculatedType) {
            case 'password':
                return HiddenIcon;
            case 'text':
                return ShownIcon;
        }
    })();

    const onClick = useCallback(() => {
        setCalculatedPassword(currentType => currentType === 'password' ? 'text' : 'password');
    }, []);

    return (
        <div className={cnInputTypePassword('Input', [className], { type, required, disabled })}>
            {children && <label
                className={cnInputTypePassword('Input-Label')}
                htmlFor={id}
            >{children}</label>}
            <div className={cnInputTypePassword('Input-Wrapper')}>
                <input
                    className={cnInputTypePassword('Input-Field')}
                    ref={ref}
                    type={calculatedType}
                    id={id}
                    name={name}
                    required={required}
                    disabled={disabled}
                    {...rest}
                />
                <Icon className={cnInputTypePassword('Input-Icon')} onClick={onClick}/>
            </div>
            <InputError name={name} errors={errors}/>
        </div>
    );
});

import { type FC, useCallback, useState } from 'react';

import HiddenIcon from '../Input.assets/hidden.svg?react';
import ShownIcon from '../Input.assets/shown.svg?react';
import type { IInputTypePasswordProps } from './Input_type_password.typings';
import styles from './Input_type_password.module.css';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypePassword = cn(styles);

export const InputTypePassword: FC<IInputTypePasswordProps> = ({
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
            <Error name={name} errors={errors}/>
        </div>
    );
};

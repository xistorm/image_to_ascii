import { cn } from '@/shared/utils';
import { type FC, type FormEventHandler, useCallback, useState } from 'react';
import { usePasswordInput } from '../Form.hooks';
import { FormInputIcon } from './-Icon';

import styles from './Form-Input.module.css';
import type { IFormInputProps } from './Form-Input.typings';

const cnFormInput = cn(styles);

export const FormInput: FC<IFormInputProps> = ({
    className,
    id,
    name,
    type,
    label,
    defaultValue,
    placeholder,
    required,
    disabled,
    onChange,
}) => {
    const { calculatedType, togglePasswordVisibility } = usePasswordInput(type);

    const [error, setError] = useState<string | undefined>(undefined);
    const errored = Boolean(error);

    const onInvalid = useCallback<FormEventHandler<HTMLInputElement>>(event => {
        setError(event.currentTarget.validationMessage);
    }, []);

    return (
        <div className={cnFormInput('Input', [className], { type, required, disabled, errored })}>
            {label && <label
                className={cnFormInput('Input-Label')}
                htmlFor={name}
            >{label}</label>}
            <div className={cnFormInput('Input-FieldWrapper')}>
                <input
                    className={cnFormInput('Input-Field')}
                    id={id}
                    name={name}
                    type={calculatedType}
                    defaultValue={defaultValue}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    onChange={onChange}
                    onInvalid={onInvalid}
                />
                <FormInputIcon
                    className={cnFormInput('Input-Icon')}
                    type={type}
                    currentType={calculatedType}
                    onClick={togglePasswordVisibility}
                />
            </div>
            {error && <span className={cnFormInput('Input-Error')}>{error}</span>}
        </div>
    );
};

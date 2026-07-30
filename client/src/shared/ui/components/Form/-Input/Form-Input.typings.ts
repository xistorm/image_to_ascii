import type { ChangeEventHandler, HTMLInputTypeAttribute } from 'react';

export interface IFormInputProps {
    className?: string;
    id: string;
    name: string;
    type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password'>;
    label?: string;
    required?: boolean;
    disabled?: boolean;
    defaultValue?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
}

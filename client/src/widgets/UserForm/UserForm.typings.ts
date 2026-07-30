import type { HTMLInputTypeAttribute } from 'react';

export interface IUserFormRedirectProps {
    description: string;
    text: string;
    to: string;
}

export interface IUserFormItemsProps {
    id: string;
    name: string;
    type: Extract<HTMLInputTypeAttribute, 'text' | 'email' | 'password'>;
    label?: string;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: string;
    placeholder?: string;
}

export interface IUserFormProps {
    title: string;
    description: string;
    items: IUserFormItemsProps[];
    submit: string;
    redirect: IUserFormRedirectProps;
}

export type IUserFormState = {
    test: string;
}

import { Logo } from '@/features';
import { Button, Form, FormInput, NavLink, useForm } from '@/shared/ui/components';
import { cn } from '@/shared/utils';
import { type FC, type FormEventHandler, useCallback } from 'react';

import styles from './UserForm.module.css';
import type { IUserFormProps, IUserFormState } from './UserForm.typings';

const cnUserForm = cn(styles);

export const UserForm: FC<IUserFormProps> = ({
    title,
    description,
    items,
    submit,
    redirect,
}) => {
    const { formState, onChange } = useForm<IUserFormState>();

    const onSubmit = useCallback<FormEventHandler>((e) => {
        e.preventDefault();
        console.log(formState);
    }, [formState]);

    return (
        <div className={cnUserForm('UserForm')}>
            <div className={cnUserForm('UserForm-Meta')}>
                <Logo/>
                <div className={cnUserForm('UserForm-Info')}>
                    <span className={cnUserForm('UserForm-Title')}>{title}</span>
                    <span className={cnUserForm('UserForm-Description')}>{description}</span>
                </div>
            </div>

            <Form onSubmit={onSubmit}>
                {items.map(item => (
                    <FormInput
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        type={item.type}
                        label={item.label}
                        placeholder={item.placeholder}
                        defaultValue={item.defaultValue}
                        required={item.required}
                        disabled={item.disabled}
                        onChange={onChange}
                    />
                ))}
                <Button
                    type="submit"
                    text={submit}
                />
            </Form>

            <div className={cnUserForm('UserForm-Redirect')}>
                <span className={cnUserForm('UserForm-RedirectDescription')}>{redirect.description}</span>
                <NavLink
                    className={cnUserForm('UserForm-RedirectLink')}
                    to={redirect.to}
                    text={redirect.text}
                />
            </div>
        </div>
    );
};

import { Logo } from '@/features';
import { Form, Link } from '@/shared/ui/components';
import { cn } from '@/shared/utils';
import { type FieldValues } from 'react-hook-form';

import styles from './AuthForm.module.css';
import type { IAuthFormProps } from './AuthForm.typings';

const cnUserForm = cn(styles);

export const AuthForm = <TSchema extends FieldValues, >({
    title,
    description,
    form,
    onSubmit,
    redirect,
    children,
}: IAuthFormProps<TSchema>) => {
    return (
        <div className={cnUserForm('AuthForm')}>
            <div className={cnUserForm('AuthForm-Meta')}>
                <Logo/>
                <div className={cnUserForm('AuthForm-Info')}>
                    <span className={cnUserForm('AuthForm-Title')}>{title}</span>
                    <span className={cnUserForm('AuthForm-Description')}>{description}</span>
                </div>
            </div>

            <Form form={form} onSubmit={onSubmit}>
                {children}
            </Form>

            <span className={cnUserForm('AuthForm-Redirect')}>
                {redirect.description} <Link to={redirect.to}>{redirect.text}</Link>
            </span>
        </div>
    );
};

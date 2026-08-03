import type { FC } from 'react';

import styles from './AuthForm.module.css';
import type { IAuthFormProps } from './AuthForm.typings';

import { Logo } from '@/features/Logo';
import { Form, Link } from '@/shared/ui/components';
import { cn } from '@/shared/utils';

const cnUserForm = cn(styles);

export const AuthForm: FC<IAuthFormProps> = ({
    title,
    description,
    redirect,
    ...form
}) => {
    return (
        <div className={cnUserForm('AuthForm')}>
            <div className={cnUserForm('AuthForm-Meta')}>
                <Logo/>
                <div className={cnUserForm('AuthForm-Info')}>
                    <span className={cnUserForm('AuthForm-Title')}>{title}</span>
                    <span className={cnUserForm('AuthForm-Description')}>{description}</span>
                </div>
            </div>

            <Form {...form} />

            <span className={cnUserForm('AuthForm-Redirect')}>
                {redirect.description} <Link to={redirect.to}>{redirect.text}</Link>
            </span>
        </div>
    );
};

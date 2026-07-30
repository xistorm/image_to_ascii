import { UserForm } from '@/widgets';
import type { FC } from 'react';

export const Login: FC = () => {
    return (
        <UserForm
            title="Добро пожаловать"
            description="Войдите в свой терминал, чтобы конвертировать фотографии в ASCII-арт и управлять результатами."
            items={[
                {
                    id: 'login',
                    name: 'login',
                    type: 'text',
                    label: 'Логин',
                    required: true,
                    placeholder: 'user-login',
                },
                {
                    id: 'password',
                    name: 'password',
                    type: 'password',
                    label: 'Пароль',
                    required: true,
                    placeholder: 'password',
                },
            ]}
            submit="Войти"
            redirect={{
                description: 'Нет аккаунта?',
                text: 'Зарегистрироваться',
                to: '/registration',
            }}
        />
    );
};

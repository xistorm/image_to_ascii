import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useStore } from '@nanostores/react';

import { $isAuthenticated } from '@/entities/user';

export const useAuthorization = () => {
    const navigate = useNavigate();

    const isAuthenticated = useStore($isAuthenticated);

    useEffect(() => {
        navigate({
            to: isAuthenticated ? '/uploads' : '/login',
            replace: true,
        });
    }, [isAuthenticated, navigate]);
};

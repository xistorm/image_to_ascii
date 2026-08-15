import { useEffect, useRef } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { useStore } from '@nanostores/react';

import { $isAuthenticated } from '@/entities/user';

export const useAuthorization = () => {
    const { isLoading } = useRouterState();
    const isLoadingRef = useRef(isLoading);

    const navigate = useNavigate();

    const isAuthenticated = useStore($isAuthenticated);

    useEffect(() => {
        isLoadingRef.current = isLoading;
    }, [isLoading]);

    useEffect(() => {
        if (isLoadingRef.current) {
            return;
        }

        navigate({
            to: isAuthenticated ? '/uploads' : '/login',
            replace: true,
        });
    }, [isAuthenticated, navigate]);
};

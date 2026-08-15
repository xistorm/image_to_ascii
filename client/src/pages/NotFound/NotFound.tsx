import type { FC } from 'react';
import { Navigate } from '@tanstack/react-router';

export const NotFound: FC = () => {
    return (
        <Navigate to="/" replace/>
    );
};

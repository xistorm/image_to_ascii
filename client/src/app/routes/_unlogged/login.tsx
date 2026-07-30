import { Login } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unlogged/login')({
    component: Login,
});

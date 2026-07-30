import { Registration } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_unlogged/registration')({
    component: Registration,
});

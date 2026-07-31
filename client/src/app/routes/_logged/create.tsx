import { Create } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged/create')({
    component: Create,
});

import { createFileRoute } from '@tanstack/react-router';
import { Uploads } from '@/pages/Uploads';

export const Route = createFileRoute('/_logged/uploads/')({
    component: Uploads,
});

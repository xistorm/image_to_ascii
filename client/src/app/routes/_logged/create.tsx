import { createFileRoute } from '@tanstack/react-router';

import { Create } from '@/pages/Create';

export const Route = createFileRoute('/_logged/create')({
    component: Create,
});

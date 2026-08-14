import { createFileRoute } from '@tanstack/react-router';

import { Gallery } from '@/pages/Gallery';

export const Route = createFileRoute('/_logged/gallery')({
    component: Gallery,
});

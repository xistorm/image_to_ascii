import { createFileRoute } from '@tanstack/react-router';

import { Gallery } from '@/pages/Gallery';
import { getUploadsQueryOptions } from '@/entities/upload';

export const Route = createFileRoute('/_logged/gallery')({
    loader: ({ context }) => context.queryClient.ensureQueryData(getUploadsQueryOptions),
    component: Gallery,
});

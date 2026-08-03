import { getFilesQueryOptions } from '@/entities/upload';
import { Gallery } from '@/pages';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_logged/gallery')({
    loader: ({ context }) => context.queryClient.ensureQueryData(getFilesQueryOptions()),
    component: Gallery,
});

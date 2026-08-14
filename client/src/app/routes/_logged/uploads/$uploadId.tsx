import { createFileRoute } from '@tanstack/react-router';

import { Upload } from '@/pages/Upload/Upload';

export const Route = createFileRoute('/_logged/uploads/$uploadId')({
    component: Upload,
});

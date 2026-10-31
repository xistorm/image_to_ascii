import { createFileRoute } from '@tanstack/react-router';
import { rootRedirect } from '@/app/actions';

export const Route = createFileRoute('/')({
    beforeLoad: rootRedirect,
});

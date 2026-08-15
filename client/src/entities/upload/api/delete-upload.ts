import { z } from 'zod';

import { api } from '@/shared/api';

export const deleteUploadRequest = async (id: string) => {
    return await api({
        url: `/uploads/${id}`,
        method: 'DELETE',
        inputSchema: z.undefined(),
        outputSchema: z.undefined(),
    });
};

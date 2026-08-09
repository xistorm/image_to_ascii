import type { UploadStatus } from '@/entities/upload';

export const getUploadStatusText = (status: UploadStatus): string => {
    switch (status) {
        case 'pending':
            return 'Конвертация...';
        case 'success':
            return 'ASCII готов';
        case 'error':
            return 'Ошибка';
    }
};

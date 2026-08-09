import { useCallback, useEffect, useRef } from 'react';
import type { VoidFunction } from '@/shared/utils';

export interface OutsideClickProps {
    cb: VoidFunction;
    disable?: boolean;
}

export const useOutsideClick = ({
    cb,
    disable = false,
}: OutsideClickProps) => {
    const ref = useRef<HTMLElement | null>(null);

    const handleOutsideClick = useCallback((event: MouseEvent | TouchEvent) => {
        if (disable) {
            return;
        }

        if (ref.current && !ref.current.contains(event.target as Node)) {
            event.stopPropagation();
            cb();
        }
    }, [cb, disable]);

    useEffect(() => {
        document.addEventListener('click', handleOutsideClick, true);

        return () => {
            document.removeEventListener('click', handleOutsideClick, true);
        };
    }, [handleOutsideClick]);

    return ref;
};

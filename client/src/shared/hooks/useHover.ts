import { useCallback, useEffect, useRef, useState } from 'react';
import { noop } from '@/shared/utils';

export interface IUseHoverParams {
    onHover?: VoidFunction;
    onHoverEnd?: VoidFunction;
}

export const useHover = <T extends HTMLElement = HTMLElement>({
    onHover = noop,
    onHoverEnd = noop,
}: IUseHoverParams = {}) => {
    const hoverRef = useRef<T>(null);
    const [isHovered, setIsHovered] = useState(false);

    const onMouseEnter = useCallback(() => {
        setIsHovered(true);
        onHover();
    }, [onHover]);

    const onMouseLeave = useCallback(() => {
        setIsHovered(false);
        onHoverEnd();
    }, [onHoverEnd]);

    useEffect(() => {
        const element = hoverRef.current;
        if (!element) {
            return;
        }

        element.addEventListener('mouseenter', onMouseEnter);
        element.addEventListener('mouseleave', onMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', onMouseEnter);
            element.removeEventListener('mouseleave', onMouseLeave);
        };
    }, [hoverRef, onMouseEnter, onMouseLeave]);

    return {
        hoverRef,
        isHovered,
    };
};

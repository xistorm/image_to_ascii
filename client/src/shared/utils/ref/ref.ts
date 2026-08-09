import type { RefObject } from 'react';

export const bindRef = <TElement extends (HTMLElement | null)>(
    ref: RefObject<HTMLElement | null>,
) => {
    return (element: TElement) => {
        ref.current = element;
    };
};

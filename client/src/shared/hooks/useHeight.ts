import { useEffect, useRef, useState } from 'react';

export const useHeight = <T extends HTMLElement = HTMLElement>() => {
    const heightRef = useRef<T>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const element = heightRef.current;
        if (!element) {
            return;
        }

        const observer = new ResizeObserver(() => {
            setHeight(element.clientHeight);
        });
        observer.observe(element, { box: 'border-box' });

        return () => observer.disconnect();
    }, [heightRef]);

    return {
        heightRef,
        height,
    };
};

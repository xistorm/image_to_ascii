import { type FC } from 'react';

import type { IPopupProps } from './Popup.typings';
import styles from './Popup.module.css';

import { bindRef, cn, noop } from '@/shared/utils';
import { useOutsideClick } from '@/shared/hooks';

const cnPopup = cn(styles);

export const Popup: FC<IPopupProps> = ({
    className,
    isOpened,
    direction = 'bottom',
    onOutsideClick = noop,
    children,
}) => {
    const ref = useOutsideClick({
        cb: onOutsideClick,
        disable: !isOpened,
    });

    if (!isOpened) {
        return null;
    }

    return (
        <div
            className={cnPopup('Popup', [className], { direction })}
            ref={bindRef(ref)}
        >
            {children}
        </div>
    );
};

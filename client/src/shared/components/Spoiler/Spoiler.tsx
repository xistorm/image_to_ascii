import type { FC } from 'react';
import type { ISpoilerProps } from '@/shared/components/Spoiler/Spoiler.typings';
import { cn } from '@/shared/utils';

import styles from './Spoiler.module.css';
import { useHeight, useToggle } from '@/shared/hooks';
import ChevronIcon from '@/shared/assets/icons/chevron.svg?react';

const cnSpoiler = cn(styles);

export const Spoiler: FC<ISpoilerProps> = ({
    className,
    title,
    isOpenedDefault,
    children,
}) => {
    const { isOpened, toggleIsOpened } = useToggle(isOpenedDefault);
    const { heightRef, height } = useHeight<HTMLDivElement>();

    return (
        <div
            className={cnSpoiler('Spoiler', [className], { active: isOpened })}
            style={{
                '--spoiler-content-height': `${height}px`,
            }}
        >
            <div className={cnSpoiler('Spoiler-Header')} onClick={toggleIsOpened}>
                <span className={cnSpoiler('Spoiler-Title')}>{title}</span>
                <ChevronIcon className={cnSpoiler('Spoiler-Icon')}/>
            </div>
            <div className={cnSpoiler('Spoiler-Content')}>
                <div className={cnSpoiler('Spoiler-ContentWrapper')} ref={heightRef}>
                    {children}
                </div>
            </div>
        </div>
    );
};

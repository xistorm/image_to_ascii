import type { FC } from 'react';

import styles from './HeroPanel.module.css';

import { cn } from '@/shared/utils';

const cnHeroPanel = cn(styles);

export const HeroPanel: FC = () => {
    return (
        <div className={cnHeroPanel('HeroPanel')}>
            <div className={cnHeroPanel('HeroPanel-Label')}>
                <span className={cnHeroPanel('HeroPanel-LabelDot')}/>
                <span className={cnHeroPanel('HeroPanel-LabelText')}>AI PHOTO ENGINE v2.4</span>
            </div>
            <div className={cnHeroPanel('HeroPanel-Info')}>
                <span className={cnHeroPanel('HeroPanel-Title')}>Превращайте фотографии в ASCII-арт</span>
                <span className={cnHeroPanel('HeroPanel-Description')}>Конвертируйте изображения в ASCII-арт с точностью до символа — для терминалов, шрифтов и визуальных экспериментов.</span>
            </div>
        </div>
    );
};

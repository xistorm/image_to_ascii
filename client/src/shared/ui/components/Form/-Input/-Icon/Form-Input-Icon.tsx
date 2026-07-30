import { cn } from '@/shared/utils';
import { type FC, useMemo } from 'react';
import HiddenIcon from '../../Form.assets/hidden.svg?react';
import ShowIcon from '../../Form.assets/shown.svg?react';

import styles from './Form-Input-Icon.module.css';
import type { IFormInputIconProps } from './Form-Input-Icon.typings';

const cnFormInputIcon = cn(styles);

export const FormInputIcon: FC<IFormInputIconProps> = ({
    className,
    type,
    currentType,
    onClick,
}) => {
    const InputIcon = useMemo(() => {
        if (type !== 'password') {
            return null;
        }

        switch (currentType) {
            case 'password':
                return HiddenIcon;
            case 'text':
                return ShowIcon;
            default:
                return null;
        }
    }, [type, currentType]);

    return (
        InputIcon && <InputIcon
            className={cnFormInputIcon('Icon', [className])}
            onClick={onClick}
        />
    );
};

import { type FC, useCallback, useRef, useState } from 'react';

import type { ICopyButtonProps } from './CopyButton.typings';
import styles from './CopyButton.module.css';

import CheckIcon from '@/shared/assets/icons/check.svg?react';
import CopyIcon from '@/shared/assets/icons/copy.svg?react';
import { Button } from '@/shared/components/Button';
import { cn } from '@/shared/utils';

const cnCopyButton = cn(styles);

export const CopyButton: FC<ICopyButtonProps> = ({
    onCopy,
}) => {
    const timeoutRef = useRef<number>(0);
    const [copied, setCopied] = useState(false);

    const Icon = copied ? CheckIcon : CopyIcon;
    const text = copied ? 'Скопировано' : 'Скопировать';

    const clearTimeoutRef = useCallback(() => {
        if (!timeoutRef.current) {
            return;
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = 0;
    }, []);

    const onClick = useCallback(() => {
        onCopy();
        setCopied(true);
        if (timeoutRef.current) {
            clearTimeoutRef();
        }
        timeoutRef.current = setTimeout(() => {
            setCopied(false);
            clearTimeoutRef();
        }, 2000);
    }, [onCopy, setCopied, clearTimeoutRef]);

    return (
        <Button view="none" onClick={onClick}>
            <Icon className={cnCopyButton('CopyButton-Icon')}/> {text}
        </Button>
    );
};

import { type FC } from 'react';

import type { IInputTypeChoiceProps } from './Input_type_choice.typings';
import styles from './Input_type_choice.module.css';

import { Error } from '@/shared/components/Error';
import { cn } from '@/shared/utils';

const cnInputTypeChoice = cn(styles);

export const InputTypeChoice: FC<IInputTypeChoiceProps> = ({
    className,
    ref,
    type,
    id,
    name,
    disabled,
    children,
    errors,
    ...rest
}) => {
    return (
        <div className={cnInputTypeChoice('Input', [className], { type, disabled })}>
            <div className={cnInputTypeChoice('Input-Wrapper')}>
                <input
                    className={cnInputTypeChoice('Input-Field')}
                    ref={ref}
                    type="radio"
                    id={id}
                    name={name}
                    disabled={disabled}
                    {...rest}
                />
                {children && <label
                    className={cnInputTypeChoice('Input-Label')}
                    htmlFor={id}
                >{children}</label>}
            </div>
            <Error name={name} errors={errors}/>
        </div>
    );
};

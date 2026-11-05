import { type FC, useEffect } from 'react';

import type { IUploadFileSettingsProps } from './UploadFile-Settings.typings';
import style from './UploadFile-Settings.module.css';
import { ALPHABET_OPTIONS } from '@/widgets/UploadFile/-Settings/UploadFile-Settings.const';

import { cn } from '@/shared/utils';
import { Input } from '@/shared/components/Input';

const cnUploadFileSettings = cn(style);

export const UploadFileSettings: FC<IUploadFileSettingsProps> = ({
    control,
    watch,
    setValue,
}) => {
    const alphabetPreset = watch('alphabet_preset');

    useEffect(() => {
        setValue('alphabet', alphabetPreset);
    }, [setValue, alphabetPreset]);

    return (
        <div className={cnUploadFileSettings('UploadFileSettings')}>
            <Input
                {...control.register('quality')}
                type="range"
                min={10}
                max={100}
                defaultValue={60}
            >Качество</Input>

            <span className={cnUploadFileSettings('UploadFileSettings-Title')}>Наборы символов</span>
            <div className={cnUploadFileSettings('UploadFileSettings-Alphabet')}>
                {ALPHABET_OPTIONS.map((option) => (
                    <Input
                        type="choice"
                        {...control.register('alphabet_preset')}
                        id={option.id}
                        value={option.value}
                        defaultChecked={option.checked}
                    >{option.title}</Input>
                ))}
                <Input
                    {...control.register('alphabet')}
                    type="text"
                    required
                    minLength={2}
                />
            </div>
        </div>
    );
};

import type { IInputTypeCheckboxProps } from './_type_checkbox';
import type { IInputTypeFileProps } from './_type_file';
import type { IInputTypePasswordProps } from './_type_password';
import type { IInputTypeTextProps } from './_type_text';
import type { IInputTypeRangeProps } from '@/shared/components/Input/_type_range/Input_type_range.typings';

export type IInputProps =
    IInputTypeTextProps |
    IInputTypePasswordProps |
    IInputTypeCheckboxProps |
    IInputTypeFileProps |
    IInputTypeRangeProps;

import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypeRangeProps extends IInputBaseProps, IErrorProps {
    type: 'range';
    min?: number;
    max?: number;
    step?: number;
    defaultValue?: number;
}

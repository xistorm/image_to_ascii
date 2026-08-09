import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypeCheckboxProps extends IInputBaseProps, IErrorProps {
    type: 'checkbox';
}

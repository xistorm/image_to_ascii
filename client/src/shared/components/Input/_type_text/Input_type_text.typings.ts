import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypeTextProps extends IInputBaseProps, IErrorProps {
    type: 'text' | 'email';
}

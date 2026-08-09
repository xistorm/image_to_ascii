import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypePasswordProps extends IInputBaseProps, IErrorProps {
    type: 'password';
}

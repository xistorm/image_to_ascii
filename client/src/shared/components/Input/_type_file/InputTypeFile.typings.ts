import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypeFileProps extends IInputBaseProps, IErrorProps {
    type: 'file';
}

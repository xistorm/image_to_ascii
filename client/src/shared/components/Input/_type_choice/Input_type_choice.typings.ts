import type { IInputBaseProps } from '../-Base';

import type { IErrorProps } from '@/shared/components/Error';

export interface IInputTypeChoiceProps extends IInputBaseProps, IErrorProps {
    type: 'choice';
}

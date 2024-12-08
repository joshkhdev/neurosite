import { NsAppearance, NsColor, NsIcon, NsSize } from '../../common/types';

export interface NsButtonOptions {
  size: NsSize | undefined;
  color: NsColor | undefined;
  appearance: NsAppearance;
  icon: NsIcon | undefined;
  loading: boolean | undefined;
}

export const NsButtonDefaultOptions: NsButtonOptions = {
  size: undefined,
  color: 'primary',
  appearance: 'normal',
  icon: undefined,
  loading: undefined,
} as const;

export type ButtonSize = 'xs' | 's' | 'm' | 'l';

export type ButtonAppearance =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'destructive'
  | 'outline'
  | 'flat';

export type ButtonIcon = {
  iconStart: string;
  borderRadius?: number;
};

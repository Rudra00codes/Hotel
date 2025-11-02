// Common types for UI components

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type Variant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
export type Color = 'blue' | 'green' | 'yellow' | 'red' | 'purple' | 'gray' | 'indigo';

export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

export interface SizeProps {
  size?: Size;
}

export interface VariantProps {
  variant?: Variant;
}

export interface ColorProps {
  color?: Color;
}

export interface DisabledProps {
  disabled?: boolean;
}

export interface LoadingProps {
  loading?: boolean;
}

// Common component prop combinations
export type BaseProps = BaseComponentProps;
export type SizedProps = BaseComponentProps & SizeProps;
export type VariantSizedProps = BaseComponentProps & VariantProps & SizeProps;
export type ColorSizedProps = BaseComponentProps & ColorProps & SizeProps;
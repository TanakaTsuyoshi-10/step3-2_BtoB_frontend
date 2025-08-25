import { forwardRef } from 'react';
import { Button, ButtonProps } from '../base/Button';

export interface AdminButtonProps extends Omit<ButtonProps, 'platform'> {}

export const AdminButton = forwardRef<HTMLButtonElement, AdminButtonProps>((props, ref) => {
  return <Button ref={ref} platform="admin" {...props} />;
});

AdminButton.displayName = 'AdminButton';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '../base/Button';

export interface MobileButtonProps extends Omit<ButtonProps, 'platform'> {}

export const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>((props, ref) => {
  return <Button ref={ref} platform="mobile" {...props} />;
});

MobileButton.displayName = 'MobileButton';
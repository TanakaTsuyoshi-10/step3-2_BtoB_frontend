import React from 'react';

export interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

export interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
}

export interface DialogHeaderProps {
  children: React.ReactNode;
}

export interface DialogTitleProps {
  children: React.ReactNode;
}

export interface DialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80">
      <div 
        className="fixed inset-0"
        onClick={() => onOpenChange && onOpenChange(false)}
      />
      <div className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 bg-white p-6 shadow-lg duration-200 rounded-lg">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ className, children }: DialogContentProps) => {
  return <div className={className}>{children}</div>;
};

const DialogHeader = ({ children }: DialogHeaderProps) => {
  return <div className="flex flex-col space-y-1.5 text-center sm:text-left">{children}</div>;
};

const DialogTitle = ({ children }: DialogTitleProps) => {
  return <h2 className="text-lg font-semibold leading-none tracking-tight">{children}</h2>;
};

const DialogTrigger = ({ asChild, children }: DialogTriggerProps) => {
  return <>{children}</>;
};

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger };
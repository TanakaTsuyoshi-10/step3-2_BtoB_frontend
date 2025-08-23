import React from 'react';
import { cn } from '@lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

interface SelectValueProps {
  placeholder?: string;
}

interface SelectContentProps {
  children: React.ReactNode;
}

interface SelectItemProps {
  value: string;
  children: React.ReactNode;
}

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
}>({});

export const Select: React.FC<SelectProps> = ({ value, onValueChange, children }) => {
  const [internalValue, setInternalValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);
  
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = value !== undefined ? onValueChange : setInternalValue;

  return (
    <SelectContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <div className="relative">
        {React.Children.map(children, child =>
          React.isValidElement(child) && child.type === SelectTrigger
            ? React.cloneElement(child as React.ReactElement<any>, { onClick: () => setIsOpen(!isOpen) })
            : child
        )}
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            {React.Children.map(children, child =>
              React.isValidElement(child) && child.type === SelectContent
                ? React.cloneElement(child as React.ReactElement<any>, { onClose: () => setIsOpen(false) })
                : null
            )}
          </>
        )}
      </div>
    </SelectContext.Provider>
  );
};

export const SelectTrigger: React.FC<SelectTriggerProps & { onClick?: () => void }> = ({ 
  className, 
  children, 
  onClick 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-10 w-full items-center justify-between rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
};

export const SelectValue: React.FC<SelectValueProps> = ({ placeholder }) => {
  const { value } = React.useContext(SelectContext);
  return <span>{value || placeholder}</span>;
};

export const SelectContent: React.FC<SelectContentProps & { onClose?: () => void }> = ({ 
  children, 
  onClose 
}) => {
  const { onValueChange } = React.useContext(SelectContext);
  
  const handleItemClick = (value: string) => {
    onValueChange?.(value);
    onClose?.();
  };

  return (
    <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
      <div className="p-1">
        {React.Children.map(children, child =>
          React.isValidElement(child) && child.type === SelectItem
            ? React.cloneElement(child as React.ReactElement<any>, { onClick: () => handleItemClick(child.props.value) })
            : child
        )}
      </div>
    </div>
  );
};

export const SelectItem: React.FC<SelectItemProps & { onClick?: () => void }> = ({ 
  value, 
  children, 
  onClick 
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-gray-100 focus:bg-gray-100"
    >
      {children}
    </button>
  );
};
import type { ComponentPropsWithoutRef } from 'react';
import { cn } from '../utils';

export type InputProps = {
  theme?: 'light' | 'dark';
} & ComponentPropsWithoutRef<'input'>;

export function Input({ theme, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        className,
        'py-1 px-2 rounded shadow',
        theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-gray-700 text-white border-gray-600',
        'border focus:outline-none focus:ring-2 focus:ring-blue-500'
      )}
      {...props}
    />
  );
}

import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  ref?: React.Ref<HTMLInputElement>;
  clearable?: boolean;
  value?: string;
  onClear?: () => void;
};

const Input = ({
  className = '',
  clearable = false,
  onClear,
  value,
  ref,
  ...props
}: InputProps) => {
  const hasClearBtn = clearable && !!value && !!onClear;
  return (
    <div className="relative w-full">
      {hasClearBtn && (
        <button
          type="button"
          aria-label="Clear input"
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400 hover:text-gray-300 focus:outline-none"
          tabIndex={0}
          onClick={onClear}
        >
          &#10005;
        </button>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${hasClearBtn ? 'pr-10' : ''} ${className}`}
        value={value}
        {...props}
      />
    </div>
  );
};

export default Input;

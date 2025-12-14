import React from 'react';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  onClick, 
  disabled = false,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-zen font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-zen-accent focus:ring-opacity-20 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    default: 'bg-zen-bg border border-zen-border text-zen-text hover:bg-zen-accentLight hover:border-zen-accent hover:text-zen-accent',
    primary: 'bg-zen-accent text-white border border-zen-accent hover:bg-opacity-90 hover:border-opacity-90',
    ghost: 'bg-transparent border border-transparent text-zen-text hover:bg-zen-accentLight hover:border-zen-accent/30'
  };
  
  const sizeClasses = {
    small: 'px-2 py-1 text-sm h-8',
    default: 'px-4 py-2 text-sm h-10',
    large: 'px-6 py-3 text-base h-12'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

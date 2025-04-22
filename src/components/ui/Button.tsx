import React from 'react';
import { theme } from '../../styles/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = `
    font-family: ${theme.typography.fontFamily};
    font-weight: ${theme.typography.weights.semibold};
    border-radius: ${theme.borderRadius.full};
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    ${fullWidth ? 'width: 100%;' : ''}
  `;

  const variantStyles = {
    primary: `
      background-color: ${theme.colors.primary};
      color: white;
      border: none;
      &:hover {
        background-color: #0062cc;
      }
    `,
    secondary: `
      background-color: ${theme.colors.secondary};
      color: white;
      border: none;
      &:hover {
        background-color: #4a48c0;
      }
    `,
    outline: `
      background-color: transparent;
      color: ${theme.colors.primary};
      border: 1px solid ${theme.colors.primary};
      &:hover {
        background-color: rgba(0, 122, 255, 0.1);
      }
    `,
  };

  const sizeStyles = {
    sm: `
      padding: ${theme.spacing.xs} ${theme.spacing.md};
      font-size: ${theme.typography.sizes.sm};
    `,
    md: `
      padding: ${theme.spacing.sm} ${theme.spacing.lg};
      font-size: ${theme.typography.sizes.base};
    `,
    lg: `
      padding: ${theme.spacing.md} ${theme.spacing.xl};
      font-size: ${theme.typography.sizes.lg};
    `,
  };

  return (
    <button
      className={className}
      style={Object.assign({}, baseStyles, variantStyles[variant], sizeStyles[size])}
      {...props}
    >
      {children}
    </button>
  );
}; 
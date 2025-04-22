import React from 'react';
import { theme } from '../../styles/theme';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        backgroundColor: theme.colors.background.primary,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.lg,
        boxShadow: theme.shadows.sm,
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: onClick ? 'pointer' : 'default',
        ':hover': onClick ? {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows.md,
        } : {},
      }}
    >
      {children}
    </div>
  );
};

interface CardHeaderProps {
  title: string;
  subtitle?: string;
}

export const CardHeader: React.FC<CardHeaderProps> = ({ title, subtitle }) => {
  return (
    <div style={{ marginBottom: theme.spacing.md }}>
      <h3 style={{
        fontSize: theme.typography.sizes.lg,
        fontWeight: theme.typography.weights.semibold,
        color: theme.colors.text.primary,
        margin: 0,
      }}>
        {title}
      </h3>
      {subtitle && (
        <p style={{
          fontSize: theme.typography.sizes.sm,
          color: theme.colors.text.tertiary,
          margin: `${theme.spacing.xs} 0 0 0`,
        }}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({ children }) => {
  return (
    <div style={{
      color: theme.colors.text.secondary,
      fontSize: theme.typography.sizes.base,
    }}>
      {children}
    </div>
  );
}; 
import React from 'react';
import { Card, CardHeader, CardContent } from './ui/Card';
import { theme } from '../styles/theme';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  time: string;
}

interface WeatherDisplayProps {
  data: WeatherData;
}

export const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '0 auto',
      padding: theme.spacing.lg,
      backgroundColor: theme.colors.background,
      minHeight: '100vh',
    }}>
      <Card>
        <CardHeader
          title={data.location}
          subtitle={data.time}
        />
        <CardContent>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: theme.spacing.lg,
          }}>
            <div style={{
              fontSize: theme.typography.sizes['3xl'],
              fontWeight: theme.typography.weights.bold,
            }}>
              {data.temperature}°C
            </div>
            <div style={{
              fontSize: theme.typography.sizes.lg,
              color: theme.colors.text.secondary,
            }}>
              {data.condition}
            </div>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: theme.spacing.md,
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background,
              borderRadius: theme.borderRadius.sm,
            }}>
              <span style={{
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.text.tertiary,
              }}>
                Humidity
              </span>
              <span style={{
                fontSize: theme.typography.sizes.xl,
                fontWeight: theme.typography.weights.semibold,
              }}>
                {data.humidity}%
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: theme.spacing.md,
              backgroundColor: theme.colors.background,
              borderRadius: theme.borderRadius.sm,
            }}>
              <span style={{
                fontSize: theme.typography.sizes.sm,
                color: theme.colors.text.tertiary,
              }}>
                Wind
              </span>
              <span style={{
                fontSize: theme.typography.sizes.xl,
                fontWeight: theme.typography.weights.semibold,
              }}>
                {data.windSpeed} km/h
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 
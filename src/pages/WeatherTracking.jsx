import React from 'react';
import { demoWeatherData } from '../data/demoData';
import { Cloud, Droplets, Wind, Thermometer } from 'lucide-react';

const WeatherTracking = () => {
    const { current, forecast } = demoWeatherData;

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Weather Tracking</h1>

            <div style={styles.currentWeather}>
                <h2>Current Conditions</h2>
                <div style={styles.currentGrid}>
                    <div style={styles.weatherCard}>
                        <Thermometer size={32} />
                        <div style={styles.weatherValue}>{current.temperature}°C</div>
                        <div style={styles.weatherLabel}>Temperature</div>
                    </div>
                    <div style={styles.weatherCard}>
                        <Droplets size={32} />
                        <div style={styles.weatherValue}>{current.humidity}%</div>
                        <div style={styles.weatherLabel}>Humidity</div>
                    </div>
                    <div style={styles.weatherCard}>
                        <Cloud size={32} />
                        <div style={styles.weatherValue}>{current.rainfall}mm</div>
                        <div style={styles.weatherLabel}>Rainfall</div>
                    </div>
                    <div style={styles.weatherCard}>
                        <Wind size={32} />
                        <div style={styles.weatherValue}>{current.windSpeed} km/h</div>
                        <div style={styles.weatherLabel}>Wind Speed</div>
                    </div>
                </div>
            </div>

            <div style={styles.forecast}>
                <h2>5-Day Forecast</h2>
                <div style={styles.forecastGrid}>
                    {forecast.map((day, idx) => (
                        <div key={idx} style={styles.forecastCard}>
                            <h3>{day.day}</h3>
                            <div style={styles.forecastTemp}>{day.temperature}°C</div>
                            <div style={styles.forecastRain}>💧 {day.rainfall}mm</div>
                            <div style={styles.forecastCondition}>{day.condition}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' },
    currentWeather: { marginBottom: '3rem' },
    currentGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' },
    weatherCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' },
    weatherValue: { fontSize: '2rem', fontWeight: 700, margin: '1rem 0 0.5rem' },
    weatherLabel: { fontSize: '0.875rem', color: 'var(--color-text-secondary)' },
    forecast: {},
    forecastGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginTop: '1.5rem' },
    forecastCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', textAlign: 'center' },
    forecastTemp: { fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' },
    forecastRain: { fontSize: '0.875rem', color: 'var(--color-info)', marginBottom: '0.5rem' },
    forecastCondition: { fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
};

export default WeatherTracking;

import React, { useState } from 'react';
import {
    Cloud, Search, Filter, MoreVertical,
    Wind, Droplets, Thermometer, Sun
} from 'lucide-react';

const WeatherManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const forecasts = [
        { id: 1, location: 'Colombo', condition: 'Heavy Rain', temp: '28°C', humidity: '85%', wind: '15 km/h', alert: 'Flood Watch' },
        { id: 2, location: 'Kandy', condition: 'Cloudy', temp: '24°C', humidity: '75%', wind: '10 km/h', alert: 'None' },
        { id: 3, location: 'Jaffna', condition: 'Sunny', temp: '32°C', humidity: '60%', wind: '20 km/h', alert: 'Heat Advisory' },
        { id: 4, location: 'Galle', condition: 'Stormy', temp: '27°C', humidity: '90%', wind: '45 km/h', alert: 'Gale Warning' },
    ];

    const getAlertBadge = (alert) => {
        if (alert === 'None') {
            return <span style={{ color: 'var(--color-text-muted)' }}>None</span>;
        }
        return (
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: 'rgba(220, 38, 38, 0.1)',
                color: '#dc2626',
            }}>
                {alert}
            </span>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Weather Tracking</h2>
                    <p style={styles.subtitle}>Monitor weather conditions and issue alerts</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.primaryButton}>
                        <Cloud size={18} />
                        <span>Update Forecast</span>
                    </button>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search locations..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Condition</th>
                            <th style={styles.th}>Temperature</th>
                            <th style={styles.th}>Humidity</th>
                            <th style={styles.th}>Wind Speed</th>
                            <th style={styles.th}>Active Alerts</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forecasts.map(forecast => (
                            <tr key={forecast.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <span style={{ fontWeight: '500' }}>{forecast.location}</span>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Cloud size={18} style={{ color: 'var(--color-text-secondary)' }} />
                                        {forecast.condition}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Thermometer size={14} style={{ color: 'var(--color-text-muted)' }} />
                                        {forecast.temp}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Droplets size={14} style={{ color: 'var(--color-text-muted)' }} />
                                        {forecast.humidity}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Wind size={14} style={{ color: 'var(--color-text-muted)' }} />
                                        {forecast.wind}
                                    </div>
                                </td>
                                <td style={styles.td}>{getAlertBadge(forecast.alert)}</td>
                                <td style={styles.td}>
                                    <button style={styles.actionButton}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },
    headerActions: {
        display: 'flex',
        gap: '1rem',
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        gap: '1rem',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        flex: 1,
        maxWidth: '400px',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        width: '100%',
        outline: 'none',
    },
    tableContainer: {
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '1rem 1.5rem',
        textAlign: 'left',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid var(--glass-border)',
        backgroundColor: 'var(--color-bg-tertiary)',
    },
    tr: {
        borderBottom: '1px solid var(--glass-border)',
        transition: 'background-color 0.2s',
    },
    td: {
        padding: '1rem 1.5rem',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
    },
    actionButton: {
        padding: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default WeatherManagement;

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoAlerts, districts } from '../data/demoData';
import AlertCard from '../components/AlertCard';
import { Filter } from 'lucide-react';

const AlertSystem = () => {
    const { t } = useLanguage();
    const [selectedDistrict, setSelectedDistrict] = useState('all');
    const [selectedSeverity, setSelectedSeverity] = useState('all');

    const filteredAlerts = demoAlerts.filter(alert => {
        const districtMatch = selectedDistrict === 'all' || alert.district === selectedDistrict;
        const severityMatch = selectedSeverity === 'all' || alert.severity === selectedSeverity;
        return districtMatch && severityMatch;
    });

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('alerts.title')}</h1>

            {/* Filters */}
            <div style={styles.filters}>
                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>
                        <Filter size={16} />
                        {t('alerts.filterByDistrict')}
                    </label>
                    <select
                        value={selectedDistrict}
                        onChange={(e) => setSelectedDistrict(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">{t('alerts.allDistricts')}</option>
                        {districts.map(district => (
                            <option key={district} value={district}>{district}</option>
                        ))}
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>
                        <Filter size={16} />
                        {t('alerts.severity')}
                    </label>
                    <select
                        value={selectedSeverity}
                        onChange={(e) => setSelectedSeverity(e.target.value)}
                        className="form-select"
                    >
                        <option value="all">All Severities</option>
                        <option value="emergency">Emergency</option>
                        <option value="warning">Warning</option>
                        <option value="info">Info</option>
                    </select>
                </div>
            </div>

            {/* Alerts List */}
            <div style={styles.alertsList}>
                {filteredAlerts.length > 0 ? (
                    filteredAlerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))
                ) : (
                    <div style={styles.noAlerts}>
                        <p>{t('alerts.noAlerts')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: '2rem 0',
        minHeight: 'calc(100vh - 200px)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '2rem',
    },
    filters: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
    },
    filterGroup: {
        flex: '1 1 250px',
    },
    filterLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
    },
    alertsList: {
        marginTop: '2rem',
    },
    noAlerts: {
        textAlign: 'center',
        padding: '3rem',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
    },
};

export default AlertSystem;

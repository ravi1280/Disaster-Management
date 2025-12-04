import React from 'react';
import { demoResources, demoWeatherData } from '../data/demoData';
import { Activity, AlertCircle, Hospital } from 'lucide-react';

const HealthSupport = () => {
    const hospitals = demoResources.filter(r => r.type === 'hospital');
    const diseaseAlerts = [
        { disease: 'Dengue', risk: 'High', areas: 'Colombo, Gampaha', prevention: 'Eliminate stagnant water, use mosquito repellent' },
        { disease: 'Leptospirosis', risk: 'Moderate', areas: 'Ratnapura, Kalutara', prevention: 'Avoid flood water, wear protective boots' }
    ];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Health & Medical Support</h1>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}><AlertCircle size={24} /> Disease Outbreak Warnings</h2>
                <div style={styles.grid}>
                    {diseaseAlerts.map((alert, idx) => (
                        <div key={idx} style={styles.alertCard}>
                            <h3>{alert.disease}</h3>
                            <p><strong>Risk Level:</strong> <span style={{ color: alert.risk === 'High' ? 'var(--color-emergency)' : 'var(--color-warning)' }}>{alert.risk}</span></p>
                            <p><strong>Affected Areas:</strong> {alert.areas}</p>
                            <p><strong>Prevention:</strong> {alert.prevention}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}><Hospital size={24} /> Nearby Medical Facilities</h2>
                <div style={styles.grid}>
                    {hospitals.map(hospital => (
                        <div key={hospital.id} style={styles.card}>
                            <h3>{hospital.name}</h3>
                            <p>📍 {hospital.address}</p>
                            <p>📞 {hospital.phone}</p>
                            {hospital.available24x7 && <span style={styles.badge}>24/7 Available</span>}
                            <a href={`tel:${hospital.phone}`} className="btn btn-primary btn-sm mt-2">Call Now</a>
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
    section: { marginBottom: '3rem' },
    sectionTitle: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    alertCard: { background: 'rgba(220, 38, 38, 0.1)', border: '1px solid var(--color-emergency)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    badge: { display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--color-safe)', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }
};

export default HealthSupport;

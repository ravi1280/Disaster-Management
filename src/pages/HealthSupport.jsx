import React from 'react';
import { demoResources } from '../data/demoData';
import { Activity, AlertCircle, Hospital, Phone, MapPin, Clock } from 'lucide-react';

const HealthSupport = () => {
    const hospitals = demoResources.filter(r => r.type === 'hospital');
    const diseaseAlerts = [
        {
            disease: 'Dengue',
            risk: 'High',
            areas: 'Colombo, Gampaha',
            prevention: 'Eliminate stagnant water, use mosquito repellent',
            symptoms: 'High fever, severe headache, pain behind eyes, joint pain'
        },
        {
            disease: 'Leptospirosis',
            risk: 'Moderate',
            areas: 'Ratnapura, Kalutara',
            prevention: 'Avoid flood water, wear protective boots',
            symptoms: 'Fever, muscle pain, headache, vomiting, red eyes'
        }
    ];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Health & Medical Support</h1>
            <p style={styles.subtitle}>Emergency medical services and health alerts</p>

            {/* Emergency Hotlines */}
            <div style={styles.emergencySection}>
                <h2 style={styles.emergencySectionTitle}>🚨 Emergency Hotlines</h2>
                <div style={styles.hotlinesGrid}>
                    <a href="tel:1990" style={styles.hotlineCard}>
                        <div style={styles.hotlineIcon}>📞</div>
                        <div>
                            <div style={styles.hotlineLabel}>Ambulance Service</div>
                            <div style={styles.hotlineNumber}>1990</div>
                        </div>
                    </a>
                    <a href="tel:110" style={styles.hotlineCard}>
                        <div style={styles.hotlineIcon}>🚑</div>
                        <div>
                            <div style={styles.hotlineLabel}>Emergency Services</div>
                            <div style={styles.hotlineNumber}>110</div>
                        </div>
                    </a>
                    <a href="tel:071-1071071" style={styles.hotlineCard}>
                        <div style={styles.hotlineIcon}>☎️</div>
                        <div>
                            <div style={styles.hotlineLabel}>Health Helpline</div>
                            <div style={styles.hotlineNumber}>071-1071071</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Disease Alerts */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <AlertCircle size={24} />
                    Disease Outbreak Warnings
                </h2>
                <div style={styles.grid}>
                    {diseaseAlerts.map((alert, idx) => (
                        <div key={idx} style={styles.alertCard}>
                            <div style={styles.alertHeader}>
                                <h3 style={styles.alertDisease}>{alert.disease}</h3>
                                <span style={{
                                    ...styles.riskBadge,
                                    background: alert.risk === 'High' ? 'var(--color-emergency)' : 'var(--color-warning)'
                                }}>
                                    {alert.risk} Risk
                                </span>
                            </div>

                            <div style={styles.alertSection}>
                                <strong>📍 Affected Areas:</strong>
                                <p style={styles.alertText}>{alert.areas}</p>
                            </div>

                            <div style={styles.alertSection}>
                                <strong>🩺 Symptoms:</strong>
                                <p style={styles.alertText}>{alert.symptoms}</p>
                            </div>

                            <div style={styles.alertSection}>
                                <strong>🛡️ Prevention:</strong>
                                <p style={styles.alertText}>{alert.prevention}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Medical Facilities */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <Hospital size={24} />
                    Nearby Medical Facilities
                </h2>
                <div style={styles.grid}>
                    {hospitals.map(hospital => (
                        <div key={hospital.id} style={styles.hospitalCard}>
                            <div style={styles.hospitalHeader}>
                                <h3 style={styles.hospitalName}>{hospital.name}</h3>
                                {hospital.available24x7 && (
                                    <span style={styles.availableBadge}>
                                        <Clock size={14} />
                                        24/7
                                    </span>
                                )}
                            </div>

                            <div style={styles.hospitalInfo}>
                                <div style={styles.infoRow}>
                                    <MapPin size={16} color="var(--color-text-secondary)" />
                                    <span>{hospital.address}</span>
                                </div>
                                <div style={styles.infoRow}>
                                    <Phone size={16} color="var(--color-text-secondary)" />
                                    <span>{hospital.phone}</span>
                                </div>
                            </div>

                            <a
                                href={`tel:${hospital.phone}`}
                                style={styles.callButton}
                            >
                                <Phone size={18} />
                                Call Now
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: '2rem 0',
        minHeight: 'calc(100vh - 200px)'
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem'
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '1.125rem',
        marginBottom: '2rem'
    },
    emergencySection: {
        marginBottom: '3rem',
        padding: '2rem',
        background: 'rgba(220, 38, 38, 0.1)',
        border: '2px solid var(--color-emergency)',
        borderRadius: 'var(--radius-xl)'
    },
    emergencySectionTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
        textAlign: 'center'
    },
    hotlinesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem'
    },
    hotlineCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '2px solid var(--color-emergency)',
        borderRadius: 'var(--radius-lg)',
        textDecoration: 'none',
        transition: 'all var(--transition-normal)',
        cursor: 'pointer'
    },
    hotlineIcon: {
        fontSize: '2rem'
    },
    hotlineLabel: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.25rem'
    },
    hotlineNumber: {
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--color-emergency)'
    },
    section: {
        marginBottom: '3rem'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '1.5rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '1.5rem'
    },
    alertCard: {
        background: 'rgba(220, 38, 38, 0.05)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'all var(--transition-normal)'
    },
    alertHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        gap: '1rem'
    },
    alertDisease: {
        fontSize: '1.25rem',
        fontWeight: 700,
        margin: 0
    },
    riskBadge: {
        padding: '0.375rem 0.875rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'white',
        whiteSpace: 'nowrap'
    },
    alertSection: {
        marginBottom: '1rem'
    },
    alertText: {
        margin: '0.25rem 0 0 0',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem',
        lineHeight: 1.5
    },
    hospitalCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'all var(--transition-normal)',
        display: 'flex',
        flexDirection: 'column'
    },
    hospitalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        gap: '1rem'
    },
    hospitalName: {
        fontSize: '1.125rem',
        fontWeight: 700,
        margin: 0,
        flex: 1
    },
    availableBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.375rem',
        padding: '0.375rem 0.75rem',
        background: 'var(--color-safe)',
        color: 'white',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        whiteSpace: 'nowrap'
    },
    hospitalInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        marginBottom: '1.25rem'
    },
    infoRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)'
    },
    callButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        padding: '0.875rem 1.5rem',
        background: 'var(--gradient-emergency)',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        textDecoration: 'none',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-md)',
        marginTop: 'auto'
    }
};

export default HealthSupport;

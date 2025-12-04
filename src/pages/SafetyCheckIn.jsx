import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoSafetyCheckins, demoMissingPersons } from '../data/demoData';
import { CheckCircle, MapPin, Clock, Users, AlertCircle } from 'lucide-react';

const SafetyCheckIn = () => {
    const { t } = useLanguage();
    const [isSafe, setIsSafe] = useState(false);
    const [location, setLocation] = useState('');

    const handleMarkSafe = () => {
        setIsSafe(true);
        // In a real app, this would send data to backend
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('safety.title')}</h1>

            {/* Mark Safe Section */}
            <div style={styles.markSafeCard}>
                {!isSafe ? (
                    <>
                        <h2 style={styles.cardTitle}>{t('safety.markSafe')}</h2>
                        <p style={styles.cardText}>Let your family and friends know you're safe</p>
                        <div className="form-group">
                            <label className="form-label">{t('safety.shareLocation')}</label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Enter your current location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-success btn-lg" onClick={handleMarkSafe}>
                            <CheckCircle size={20} />
                            {t('safety.markSafe')}
                        </button>
                    </>
                ) : (
                    <div style={styles.safeStatus}>
                        <CheckCircle size={48} color="var(--color-safe)" />
                        <h2>{t('safety.youAreSafe')}</h2>
                        <p>{t('safety.lastUpdated')}: {new Date().toLocaleString()}</p>
                    </div>
                )}
            </div>

            {/* Family & Friends Status */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <Users size={24} />
                    {t('safety.familyStatus')}
                </h2>
                <div style={styles.statusGrid}>
                    {demoSafetyCheckins.map(person => (
                        <div key={person.id} style={styles.statusCard}>
                            <div style={styles.statusHeader}>
                                <div>
                                    <h3 style={styles.personName}>{person.name}</h3>
                                    <p style={styles.personRelation}>{person.relation}</p>
                                </div>
                                <div style={{
                                    ...styles.statusBadge,
                                    background: person.status === 'safe' ? 'var(--color-safe)' : 'var(--color-warning)'
                                }}>
                                    {person.status === 'safe' ? '✓ Safe' : '? Unknown'}
                                </div>
                            </div>
                            <div style={styles.statusInfo}>
                                <div style={styles.infoItem}>
                                    <MapPin size={16} />
                                    <span>{person.location}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <Clock size={16} />
                                    <span>{new Date(person.lastUpdate).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Missing Persons */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <AlertCircle size={24} />
                    {t('safety.reportMissing')}
                </h2>
                <div style={styles.missingGrid}>
                    {demoMissingPersons.map(person => (
                        <div key={person.id} style={styles.missingCard}>
                            <h3>{person.name}</h3>
                            <p><strong>Age:</strong> {person.age}</p>
                            <p><strong>Last Seen:</strong> {person.lastSeen}</p>
                            <p><strong>Description:</strong> {person.description}</p>
                            <p><strong>Contact:</strong> {person.contactPerson} - {person.contactNumber}</p>
                            <p style={styles.reportedTime}>Reported {new Date(person.reportedAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary mt-3">Report Missing Person</button>
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
    markSafeCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '3rem',
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
    },
    cardText: {
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
    },
    safeStatus: {
        textAlign: 'center',
        padding: '2rem',
    },
    section: {
        marginBottom: '3rem',
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
    },
    statusGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
    },
    statusCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
    },
    statusHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    personName: {
        fontSize: '1.125rem',
        fontWeight: 600,
        margin: 0,
    },
    personRelation: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: 0,
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'white',
    },
    statusInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    missingGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
    },
    missingCard: {
        background: 'rgba(220, 38, 38, 0.1)',
        border: '1px solid var(--color-emergency)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
    },
    reportedTime: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        marginTop: '0.5rem',
    },
};

export default SafetyCheckIn;

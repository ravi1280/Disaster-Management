import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import MapComponent from '../components/MapComponent';
import { demoMapMarkers, demoHelpRequests } from '../data/demoData';

const DisasterMap = () => {
    const { t } = useLanguage();

    // Convert help requests to markers
    const helpMarkers = demoHelpRequests.map(req => ({
        id: `help-${req.id}`,
        coordinates: req.coordinates,
        name: req.type.toUpperCase() + ' Request',
        description: req.description,
        contact: req.contactNumber,
        color: req.priority === 'urgent' ? '#dc2626' : '#f59e0b'
    }));

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('nav.map')}</h1>
            <p style={styles.subtitle}>
                View affected areas, safe zones, evacuation centers, and help requests in real-time
            </p>

            {/* Legend */}
            <div style={styles.legend}>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, background: '#dc2626' }}></div>
                    <span>Danger Zones</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, background: '#10b981' }}></div>
                    <span>Safe Zones / Evacuation Centers</span>
                </div>
                <div style={styles.legendItem}>
                    <div style={{ ...styles.legendDot, background: '#f59e0b' }}></div>
                    <span>Help Requests</span>
                </div>
            </div>

            {/* Map */}
            <MapComponent
                center={[7.8731, 80.7718]}
                zoom={8}
                dangerZones={demoMapMarkers.dangerZones}
                safeZones={demoMapMarkers.safeZones}
                markers={helpMarkers}
            />

            {/* Evacuation Centers Info */}
            <div style={styles.centersSection}>
                <h2 style={styles.sectionTitle}>Evacuation Centers</h2>
                <div style={styles.centersGrid}>
                    {demoMapMarkers.evacuationCenters.map(center => (
                        <div key={center.id} style={styles.centerCard}>
                            <h3 style={styles.centerName}>{center.name}</h3>
                            <div style={styles.capacityBar}>
                                <div style={{
                                    ...styles.capacityFill,
                                    width: `${(center.currentOccupancy / center.capacity) * 100}%`,
                                    background: (center.currentOccupancy / center.capacity) > 0.8
                                        ? 'var(--color-emergency)'
                                        : 'var(--color-safe)'
                                }}>
                                </div>
                            </div>
                            <p style={styles.capacityText}>
                                {center.currentOccupancy} / {center.capacity} occupied
                            </p>
                            <div style={styles.facilities}>
                                {center.facilities.map((facility, idx) => (
                                    <span key={idx} style={styles.facilityBadge}>{facility}</span>
                                ))}
                            </div>
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
        minHeight: 'calc(100vh - 200px)',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '1.125rem',
        marginBottom: '2rem',
    },
    legend: {
        display: 'flex',
        gap: '2rem',
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-md)',
        flexWrap: 'wrap',
    },
    legendItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
    },
    legendDot: {
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        border: '2px solid white',
    },
    centersSection: {
        marginTop: '3rem',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
    },
    centersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    centerCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
    },
    centerName: {
        fontSize: '1.125rem',
        fontWeight: 600,
        marginBottom: '1rem',
    },
    capacityBar: {
        width: '100%',
        height: '8px',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '9999px',
        overflow: 'hidden',
        marginBottom: '0.5rem',
    },
    capacityFill: {
        height: '100%',
        transition: 'width var(--transition-normal)',
    },
    capacityText: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1rem',
    },
    facilities: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem',
    },
    facilityBadge: {
        padding: '0.25rem 0.75rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
    },
};

export default DisasterMap;

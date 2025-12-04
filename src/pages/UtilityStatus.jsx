import React from 'react';
import { demoUtilityStatus } from '../data/demoData';
import { Zap, Droplet, Wifi } from 'lucide-react';

const UtilityStatus = () => {
    const getIcon = (service) => {
        switch (service) {
            case 'Electricity': return <Zap size={24} />;
            case 'Water Supply': return <Droplet size={24} />;
            case 'Internet': return <Wifi size={24} />;
            default: return <Zap size={24} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'operational': return 'var(--color-safe)';
            case 'partial': return 'var(--color-warning)';
            case 'down': return 'var(--color-emergency)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Utility Status Tracker</h1>
            <p style={styles.subtitle}>Track electricity, water supply, and internet restoration</p>

            <div style={styles.grid}>
                {demoUtilityStatus.map((utility, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconContainer}>{getIcon(utility.service)}</div>
                            <div style={styles.headerContent}>
                                <h3>{utility.service}</h3>
                                <p>{utility.district}</p>
                            </div>
                        </div>
                        <div style={{ ...styles.statusBadge, background: getStatusColor(utility.status) }}>
                            {utility.status.toUpperCase()}
                        </div>
                        {utility.affectedAreas.length > 0 && (
                            <p style={styles.affected}><strong>Affected:</strong> {utility.affectedAreas.join(', ')}</p>
                        )}
                        {utility.eta && (
                            <p style={styles.eta}>⏰ Estimated restoration: {utility.eta}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    cardHeader: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    iconContainer: { width: '48px', height: '48px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)' },
    headerContent: { flex: 1 },
    statusBadge: { display: 'inline-block', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', fontWeight: 700, color: 'white', marginBottom: '1rem' },
    affected: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' },
    eta: { fontSize: '0.875rem', color: 'var(--color-text-muted)' }
};

export default UtilityStatus;

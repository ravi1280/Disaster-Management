import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MultiHazardSupport = () => {
    const hazards = [
        { name: 'Floods', icon: '🌊', safety: 'Move to higher ground, avoid walking through flood water, turn off utilities' },
        { name: 'Landslides', icon: '⛰️', safety: 'Evacuate immediately, watch for warning signs, avoid steep slopes' },
        { name: 'Cyclones', icon: '🌀', safety: 'Stay indoors, secure loose objects, stock up on essentials' },
        { name: 'Droughts', icon: '☀️', safety: 'Conserve water, follow rationing guidelines, store emergency water' },
        { name: 'Earthquakes', icon: '🏚️', safety: 'Drop, Cover, Hold On. Stay away from windows and heavy furniture' }
    ];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Multi-Hazard Support</h1>
            <p style={styles.subtitle}>Safety guidelines for different types of disasters</p>

            <div style={styles.grid}>
                {hazards.map((hazard, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.hazardIcon}>{hazard.icon}</div>
                        <h3>{hazard.name}</h3>
                        <p style={styles.safety}><strong>Safety Guidelines:</strong> {hazard.safety}</p>
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
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem', textAlign: 'center' },
    hazardIcon: { fontSize: '4rem', marginBottom: '1rem' },
    safety: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', textAlign: 'left', marginTop: '1rem' }
};

export default MultiHazardSupport;

import React from 'react';
import { demoLostFound } from '../data/demoData';

const LostAndFound = () => {
    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Lost & Found</h1>
            <div style={styles.grid}>
                {demoLostFound.map(item => (
                    <div key={item.id} style={styles.card}>
                        <div style={{ ...styles.typeBadge, background: item.type === 'lost' ? 'var(--color-emergency)' : 'var(--color-safe)' }}>
                            {item.type.toUpperCase()}
                        </div>
                        <h3>{item.item}</h3>
                        {item.name && <p><strong>Name:</strong> {item.name}</p>}
                        <p><strong>Location:</strong> {item.location}</p>
                        <p><strong>Contact:</strong> {item.contactNumber}</p>
                        <p style={styles.time}>{new Date(item.reportedAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary mt-3">Report Lost/Found Item</button>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', position: 'relative' },
    typeBadge: { position: 'absolute', top: '1rem', right: '1rem', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: 'white' },
    time: { fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }
};

export default LostAndFound;

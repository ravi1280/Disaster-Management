import React from 'react';
import { demoDonations } from '../data/demoData';
import { DollarSign, Heart } from 'lucide-react';

const DonationSystem = () => {
    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Donation System</h1>
            <p style={styles.subtitle}>Support verified disaster relief efforts</p>

            <div style={styles.grid}>
                {demoDonations.map(donation => (
                    <div key={donation.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <h3>{donation.need}</h3>
                            {donation.verified && <span style={styles.verifiedBadge}>✓ Verified</span>}
                        </div>
                        <p style={styles.district}>📍 {donation.district}</p>
                        <div style={styles.progressBar}>
                            <div style={{ ...styles.progressFill, width: `${(donation.collected / donation.required) * 100}%` }}></div>
                        </div>
                        <p style={styles.progressText}>
                            LKR {donation.collected.toLocaleString()} / {donation.required.toLocaleString()}
                        </p>
                        <button className="btn btn-success" style={{ width: '100%', marginTop: '1rem' }}>
                            <Heart size={18} />
                            Donate Now
                        </button>
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
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
    verifiedBadge: { padding: '0.25rem 0.75rem', background: 'var(--color-safe)', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 },
    district: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' },
    progressBar: { width: '100%', height: '12px', background: 'var(--color-bg-tertiary)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.5rem' },
    progressFill: { height: '100%', background: 'var(--gradient-safe)', transition: 'width var(--transition-normal)' },
    progressText: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 }
};

export default DonationSystem;

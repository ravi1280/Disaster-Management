import React from 'react';
import { BookOpen, CheckSquare, Users, AlertTriangle } from 'lucide-react';

const Preparedness = () => {
    const guides = [
        { title: 'Flood Preparedness', icon: <AlertTriangle />, content: 'Move to higher ground, avoid walking through flood water, keep emergency supplies ready.' },
        { title: 'Landslide Safety', icon: <AlertTriangle />, content: 'Watch for warning signs, evacuate immediately if ground cracks appear, avoid steep slopes during heavy rain.' },
        { title: 'Cyclone Preparation', icon: <AlertTriangle />, content: 'Secure loose objects, stock up on essentials, stay indoors during the storm.' },
        { title: 'Earthquake Safety', icon: <AlertTriangle />, content: 'Drop, Cover, Hold On. Stay away from windows and heavy furniture.' }
    ];

    const kitItems = ['Water (3-day supply)', 'Non-perishable food', 'First aid kit', 'Flashlight & batteries', 'Radio', 'Medications', 'Important documents', 'Cash', 'Phone charger'];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Disaster Preparedness</h1>
            <p style={styles.subtitle}>Be prepared before disaster strikes</p>

            <div style={styles.grid}>
                {guides.map((guide, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.iconContainer}>{guide.icon}</div>
                        <h3>{guide.title}</h3>
                        <p>{guide.content}</p>
                    </div>
                ))}
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}><CheckSquare size={24} /> Emergency Kit Checklist</h2>
                <div style={styles.checklist}>
                    {kitItems.map((item, idx) => (
                        <div key={idx} style={styles.checklistItem}>
                            <input type="checkbox" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    iconContainer: { width: '48px', height: '48px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-warning)', marginBottom: '1rem' },
    section: { marginTop: '3rem' },
    sectionTitle: { display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' },
    checklist: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' },
    checklistItem: { display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 0', borderBottom: '1px solid var(--glass-border)' }
};

export default Preparedness;

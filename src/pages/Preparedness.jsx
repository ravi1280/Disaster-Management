import React, { useState, useEffect } from 'react';
import { BookOpen, CheckSquare, Users, AlertTriangle, Check } from 'lucide-react';

const Preparedness = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const guides = [
        { title: 'Flood Preparedness', icon: <AlertTriangle />, content: 'Move to higher ground, avoid walking through flood water, keep emergency supplies ready.' },
        { title: 'Landslide Safety', icon: <AlertTriangle />, content: 'Watch for warning signs, evacuate immediately if ground cracks appear, avoid steep slopes during heavy rain.' },
        { title: 'Cyclone Preparation', icon: <AlertTriangle />, content: 'Secure loose objects, stock up on essentials, stay indoors during the storm.' },
        { title: 'Earthquake Safety', icon: <AlertTriangle />, content: 'Drop, Cover, Hold On. Stay away from windows and heavy furniture.' }
    ];

    const kitItems = [
        'Water (3-day supply)',
        'Non-perishable food',
        'First aid kit',
        'Flashlight & batteries',
        'Radio',
        'Medications',
        'Important documents',
        'Cash',
        'Phone charger',
        'Whistle',
        'Dust masks',
        'Plastic sheeting & duct tape',
        'Moist towelettes',
        'Wrench or pliers',
        'Manual can opener'
    ];

    // Load checked items from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('emergencyKitChecklist');
        if (saved) {
            setCheckedItems(JSON.parse(saved));
        }
    }, []);

    // Save to localStorage whenever checkedItems changes
    useEffect(() => {
        localStorage.setItem('emergencyKitChecklist', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleItem = (index) => {
        setCheckedItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;
    const totalItems = kitItems.length;
    const progress = (checkedCount / totalItems) * 100;

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
                <div style={styles.checklistHeader}>
                    <h2 style={styles.sectionTitle}>
                        <CheckSquare size={24} />
                        Emergency Kit Checklist
                    </h2>
                    <div style={styles.progressInfo}>
                        <span style={styles.progressText}>
                            {checkedCount} of {totalItems} items
                        </span>
                        <div style={styles.progressBar}>
                            <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
                        </div>
                    </div>
                </div>

                <div style={styles.checklist}>
                    {kitItems.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                ...styles.checklistItem,
                                ...(checkedItems[idx] ? styles.checklistItemChecked : {})
                            }}
                            onClick={() => toggleItem(idx)}
                        >
                            <div style={{
                                ...styles.customCheckbox,
                                ...(checkedItems[idx] ? styles.customCheckboxChecked : {})
                            }}>
                                {checkedItems[idx] && <Check size={18} strokeWidth={3} />}
                            </div>
                            <span style={{
                                ...styles.itemText,
                                ...(checkedItems[idx] ? styles.itemTextChecked : {})
                            }}>
                                {item}
                            </span>
                        </div>
                    ))}
                </div>

                {checkedCount === totalItems && (
                    <div style={styles.completionMessage}>
                        <Check size={24} />
                        Great job! Your emergency kit is complete!
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
    },
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'all var(--transition-normal)'
    },
    iconContainer: {
        width: '48px',
        height: '48px',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-warning)',
        marginBottom: '1rem'
    },
    section: { marginTop: '3rem' },
    checklistHeader: {
        marginBottom: '1.5rem'
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '1rem'
    },
    progressInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    progressText: {
        fontSize: '0.95rem',
        color: 'var(--color-text-secondary)',
        fontWeight: 600
    },
    progressBar: {
        width: '100%',
        height: '8px',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '9999px',
        overflow: 'hidden'
    },
    progressFill: {
        height: '100%',
        background: 'var(--gradient-safe)',
        transition: 'width 0.5s ease-out',
        borderRadius: '9999px'
    },
    checklist: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        display: 'grid',
        gap: '0.5rem'
    },
    checklistItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        transition: 'all var(--transition-fast)',
        background: 'transparent'
    },
    checklistItemChecked: {
        background: 'rgba(16, 185, 129, 0.1)'
    },
    customCheckbox: {
        width: '24px',
        height: '24px',
        minWidth: '24px',
        border: '2px solid var(--color-text-muted)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all var(--transition-fast)',
        background: 'transparent'
    },
    customCheckboxChecked: {
        background: 'var(--color-safe)',
        borderColor: 'var(--color-safe)',
        color: 'white'
    },
    itemText: {
        fontSize: '1rem',
        color: 'var(--color-text)',
        transition: 'all var(--transition-fast)',
        userSelect: 'none'
    },
    itemTextChecked: {
        color: 'var(--color-text-secondary)',
        textDecoration: 'line-through'
    },
    completionMessage: {
        marginTop: '1.5rem',
        padding: '1.25rem',
        background: 'rgba(16, 185, 129, 0.2)',
        border: '2px solid var(--color-safe)',
        borderRadius: 'var(--radius-lg)',
        color: 'var(--color-safe)',
        fontSize: '1.125rem',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.75rem',
        animation: 'fadeIn 0.5s ease-out'
    }
};

export default Preparedness;

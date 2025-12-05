import React from 'react';
import ContactsManager from '../components/ContactsManager';

const ContactsPage = () => {
    // Sample initial contacts (in a real app, this would come from backend/database)
    const sampleContacts = [
        { id: 1, name: 'Mother - Anura Perera', phone: '+94 77 123 4567', email: 'anura@example.com', relation: 'Family' },
        { id: 2, name: 'Father - Sunil Perera', phone: '+94 71 234 5678', email: 'sunil@example.com', relation: 'Family' },
        { id: 3, name: 'Sister - Nisha Perera', phone: '+94 76 345 6789', email: 'nisha@example.com', relation: 'Family' },
        { id: 4, name: 'Best Friend - Kamal Silva', phone: '+94 75 456 7890', email: 'kamal@example.com', relation: 'Friend' },
        { id: 5, name: 'Colleague - Priya Fernando', phone: '+94 77 567 8901', email: 'priya@example.com', relation: 'Work' },
    ];

    const handleContactsChange = (updatedContacts) => {
        console.log('Contacts updated:', updatedContacts);
        // In a real app, you would save this to backend/localStorage here
    };

    return (
        <div className="container" style={styles.page}>
            <div style={styles.header}>
                <h1 style={styles.title}>Emergency Contacts</h1>
                <p style={styles.subtitle}>
                    Manage your emergency contacts who will be notified during safety check-ins
                </p>
            </div>

            <div style={styles.infoCard}>
                <h3 style={styles.infoTitle}>Why Add Emergency Contacts?</h3>
                <ul style={styles.infoList}>
                    <li>✅ Quickly notify loved ones during emergencies</li>
                    <li>✅ Share your safety status with one click</li>
                    <li>✅ Let family know your location during disasters</li>
                    <li>✅ Receive support and help when needed</li>
                </ul>
            </div>

            <ContactsManager
                initialContacts={sampleContacts}
                onContactsChange={handleContactsChange}
            />
        </div>
    );
};

const styles = {
    page: {
        padding: '2rem 0',
        minHeight: 'calc(100vh - 200px)',
    },
    header: {
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
    },
    subtitle: {
        fontSize: '1.125rem',
        color: 'var(--color-text-secondary)',
    },
    infoCard: {
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '2rem',
    },
    infoTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1rem',
    },
    infoList: {
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '0.75rem',
    },
};

export default ContactsPage;

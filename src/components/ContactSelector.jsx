import React from 'react';
import { CheckCircle, Users } from 'lucide-react';

const ContactSelector = ({ contacts, selectedContacts, onContactToggle, label = "Select Contacts to Notify" }) => {
    return (
        <div style={styles.container}>
            <label style={styles.label}>
                <Users size={20} />
                {label} {selectedContacts.length > 0 && `(${selectedContacts.length} selected)`}
            </label>
            <div style={styles.contactsGrid}>
                {contacts.map(contact => (
                    <div
                        key={contact.id}
                        style={{
                            ...styles.contactCard,
                            ...(selectedContacts.includes(contact.id) ? styles.contactCardSelected : {})
                        }}
                        onClick={() => onContactToggle(contact.id)}
                    >
                        <div style={{
                            ...styles.contactCheckbox,
                            ...(selectedContacts.includes(contact.id) ? styles.checkboxSelected : {})
                        }}>
                            {selectedContacts.includes(contact.id) && (
                                <CheckCircle size={20} color="white" />
                            )}
                        </div>
                        <div style={styles.contactInfo}>
                            <div style={styles.contactName}>{contact.name}</div>
                            <div style={styles.contactPhone}>{contact.phone}</div>
                            <span style={styles.contactBadge}>{contact.relation}</span>
                        </div>
                    </div>
                ))}
            </div>
            {contacts.length === 0 && (
                <div style={styles.emptyState}>
                    <Users size={48} color="var(--color-text-muted)" />
                    <p>No contacts available. Add contacts to your profile.</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        marginBottom: '2rem',
    },
    label: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--color-text-primary)',
    },
    contactsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
    },
    contactCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '2px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--glass-bg)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    contactCardSelected: {
        borderColor: 'var(--color-primary)',
        background: 'rgba(59, 130, 246, 0.1)',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
    },
    contactCheckbox: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.3s ease',
        background: 'transparent',
    },
    checkboxSelected: {
        background: 'var(--color-primary)',
        borderColor: 'var(--color-primary)',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '0.25rem',
    },
    contactPhone: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
    },
    contactBadge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--color-text-muted)',
    },
};

export default ContactSelector;

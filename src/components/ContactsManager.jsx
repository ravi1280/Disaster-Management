import React, { useState } from 'react';
import { UserPlus, Edit, Trash2, Phone, Mail, User, X } from 'lucide-react';

const ContactsManager = ({ initialContacts = [], onContactsChange }) => {
    const [contacts, setContacts] = useState(initialContacts);
    const [showForm, setShowForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        relation: 'Family',
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingContact) {
            // Update existing contact
            const updatedContacts = contacts.map(contact =>
                contact.id === editingContact.id
                    ? { ...contact, ...formData }
                    : contact
            );
            setContacts(updatedContacts);
            if (onContactsChange) onContactsChange(updatedContacts);
        } else {
            // Add new contact
            const newContact = {
                id: Date.now(),
                ...formData,
            };
            const updatedContacts = [...contacts, newContact];
            setContacts(updatedContacts);
            if (onContactsChange) onContactsChange(updatedContacts);
        }

        // Reset form
        setFormData({ name: '', phone: '', email: '', relation: 'Family' });
        setEditingContact(null);
        setShowForm(false);
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setFormData({
            name: contact.name,
            phone: contact.phone,
            email: contact.email || '',
            relation: contact.relation,
        });
        setShowForm(true);
    };

    const handleDelete = (contactId) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            const updatedContacts = contacts.filter(c => c.id !== contactId);
            setContacts(updatedContacts);
            if (onContactsChange) onContactsChange(updatedContacts);
        }
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingContact(null);
        setFormData({ name: '', phone: '', email: '', relation: 'Family' });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Emergency Contacts</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                    disabled={showForm}
                >
                    <UserPlus size={20} />
                    Add Contact
                </button>
            </div>

            {showForm && (
                <div style={styles.formCard}>
                    <h3 style={styles.formTitle}>
                        {editingContact ? 'Edit Contact' : 'Add New Contact'}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div style={styles.formGrid}>
                            <div className="form-group">
                                <label className="form-label">Full Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number *</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-input"
                                    placeholder="+94 77 123 4567"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email (Optional)</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-input"
                                    placeholder="contact@example.com"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Relation *</label>
                                <select
                                    name="relation"
                                    className="form-select"
                                    value={formData.relation}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="Family">Family</option>
                                    <option value="Friend">Friend</option>
                                    <option value="Work">Work</option>
                                    <option value="Neighbor">Neighbor</option>
                                    <option value="Emergency">Emergency Service</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>

                        <div style={styles.formActions}>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingContact ? 'Update Contact' : 'Add Contact'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div style={styles.contactsList}>
                {contacts.length === 0 ? (
                    <div style={styles.emptyState}>
                        <User size={48} color="var(--color-text-muted)" />
                        <p>No emergency contacts added yet.</p>
                        <p style={styles.emptyStateHint}>
                            Add contacts to receive safety notifications during emergencies.
                        </p>
                    </div>
                ) : (
                    <div style={styles.contactsGrid}>
                        {contacts.map(contact => (
                            <div key={contact.id} style={styles.contactCard}>
                                <div style={styles.contactHeader}>
                                    <div style={styles.contactAvatar}>
                                        <User size={24} />
                                    </div>
                                    <div style={styles.contactActions}>
                                        <button
                                            style={styles.iconButton}
                                            onClick={() => handleEdit(contact)}
                                            title="Edit contact"
                                        >
                                            <Edit size={18} />
                                        </button>
                                        <button
                                            style={{ ...styles.iconButton, ...styles.deleteButton }}
                                            onClick={() => handleDelete(contact.id)}
                                            title="Delete contact"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div style={styles.contactBody}>
                                    <h3 style={styles.contactName}>{contact.name}</h3>
                                    <span style={styles.relationBadge}>{contact.relation}</span>
                                    
                                    <div style={styles.contactDetails}>
                                        <div style={styles.contactDetail}>
                                            <Phone size={16} />
                                            <span>{contact.phone}</span>
                                        </div>
                                        {contact.email && (
                                            <div style={styles.contactDetail}>
                                                <Mail size={16} />
                                                <span>{contact.email}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem 0',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: 700,
        margin: 0,
    },
    formCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '2rem',
    },
    formTitle: {
        fontSize: '1.25rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '1.5rem',
    },
    formActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    contactsList: {
        minHeight: '200px',
    },
    contactsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem',
    },
    contactCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    },
    contactHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    contactAvatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'var(--color-primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    iconButton: {
        background: 'transparent',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.5rem',
        cursor: 'pointer',
        color: 'var(--color-text-secondary)',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteButton: {
        color: 'var(--color-emergency)',
        borderColor: 'var(--color-emergency)',
    },
    contactBody: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    contactName: {
        fontSize: '1.125rem',
        fontWeight: 600,
        margin: 0,
    },
    relationBadge: {
        display: 'inline-block',
        width: 'fit-content',
        padding: '0.25rem 0.75rem',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
    },
    contactDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '0.5rem',
    },
    contactDetail: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    emptyState: {
        textAlign: 'center',
        padding: '4rem 2rem',
        color: 'var(--color-text-muted)',
    },
    emptyStateHint: {
        fontSize: '0.875rem',
        marginTop: '0.5rem',
    },
};

export default ContactsManager;

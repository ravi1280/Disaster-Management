import React, { useState } from 'react';
import {
    Package, Search, Filter, MoreVertical,
    CheckCircle, User, Calendar, MapPin
} from 'lucide-react';

const LostFoundManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('lost'); // 'lost' or 'found'

    // Mock data
    const items = [
        { id: 1, type: 'Lost', item: 'Black Backpack', description: 'Contains documents and clothes', location: 'Galle Bus Stand', contact: '0771234567', status: 'Open', date: '2024-05-15' },
        { id: 2, type: 'Found', item: 'Child ID Card', description: 'Name: A. Perera', location: 'Relief Camp A', contact: 'Camp Admin', status: 'Matched', date: '2024-05-14' },
        { id: 3, type: 'Lost', item: 'Golden Retriever', description: 'Wearing red collar', location: 'Kandy Town', contact: '0712223333', status: 'Open', date: '2024-05-14' },
        { id: 4, type: 'Found', item: 'Wallet', description: 'Brown leather, no ID', location: 'Colombo Fort', contact: 'Police Station', status: 'Open', date: '2024-05-13' },
    ];

    const getStatusBadge = (status) => {
        const styles = {
            'Matched': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'Open': { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
            'Closed': { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
        };
        const style = styles[status] || styles['Open'];

        return (
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: style.bg,
                color: style.color,
            }}>
                {status}
            </span>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Lost & Found Management</h2>
                    <p style={styles.subtitle}>Help reunite people with lost items and loved ones</p>
                </div>
                <div style={styles.headerActions}>
                    <div style={styles.toggleGroup}>
                        <button
                            style={{ ...styles.toggleButton, ...(activeTab === 'lost' ? styles.toggleActive : {}) }}
                            onClick={() => setActiveTab('lost')}
                        >
                            Lost Items
                        </button>
                        <button
                            style={{ ...styles.toggleButton, ...(activeTab === 'found' ? styles.toggleActive : {}) }}
                            onClick={() => setActiveTab('found')}
                        >
                            Found Items
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search items..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button style={styles.filterButton}>
                    <Filter size={18} />
                    <span>Filter</span>
                </button>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Item Details</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Contact</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.filter(i => i.type.toLowerCase() === activeTab).map(item => (
                            <tr key={item.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.itemCell}>
                                        <div style={styles.itemIcon}>
                                            <Package size={18} />
                                        </div>
                                        <div>
                                            <div style={styles.itemTitle}>{item.item}</div>
                                            <div style={styles.itemDesc}>{item.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                        <MapPin size={14} />
                                        {item.location}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={14} />
                                        {item.contact}
                                    </div>
                                </td>
                                <td style={styles.td}>{getStatusBadge(item.status)}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-muted)' }}>
                                        <Calendar size={14} />
                                        {item.date}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button style={styles.iconButtonSuccess} title="Mark as Matched">
                                            <CheckCircle size={18} />
                                        </button>
                                        <button style={styles.actionButton}>
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },
    headerActions: {
        display: 'flex',
        gap: '1rem',
    },
    toggleGroup: {
        display: 'flex',
        backgroundColor: 'var(--color-bg-tertiary)',
        padding: '0.25rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    toggleButton: {
        padding: '0.5rem 1rem',
        border: 'none',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'all 0.2s',
    },
    toggleActive: {
        backgroundColor: 'var(--color-bg)',
        color: 'var(--color-text)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        gap: '1rem',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        flex: 1,
        maxWidth: '400px',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        width: '100%',
        outline: 'none',
    },
    filterButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        cursor: 'pointer',
    },
    tableContainer: {
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '1rem 1.5rem',
        textAlign: 'left',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        borderBottom: '1px solid var(--glass-border)',
        backgroundColor: 'var(--color-bg-tertiary)',
    },
    tr: {
        borderBottom: '1px solid var(--glass-border)',
        transition: 'background-color 0.2s',
    },
    td: {
        padding: '1rem 1.5rem',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
    },
    itemCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    itemIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemTitle: {
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    itemDesc: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
    },
    actions: {
        display: 'flex',
        gap: '0.5rem',
    },
    actionButton: {
        padding: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtonSuccess: {
        padding: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: '#10b981',
        cursor: 'pointer',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default LostFoundManagement;

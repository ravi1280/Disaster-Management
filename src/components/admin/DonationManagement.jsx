import React, { useState } from 'react';
import {
    DollarSign, Search, Filter, MoreVertical,
    TrendingUp, CreditCard, Download, CheckCircle, Plus, Calendar, X
} from 'lucide-react';

const DonationManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);

    // Mock data
    const [donations, setDonations] = useState([
        { id: 1, donor: 'John Smith', amount: '5,000', currency: 'LKR', campaign: 'Flood Relief', date: '2024-05-15', status: 'Completed', method: 'Credit Card' },
        { id: 2, donor: 'Tech Corp Ltd', amount: '100,000', currency: 'LKR', campaign: 'School Rebuilding', date: '2024-05-14', status: 'Completed', method: 'Bank Transfer' },
        { id: 3, donor: 'Anonymous', amount: '2,500', currency: 'LKR', campaign: 'Medical Supplies', date: '2024-05-14', status: 'Pending', method: 'Online' },
        { id: 4, donor: 'Sarah Jones', amount: '10,000', currency: 'LKR', campaign: 'Flood Relief', date: '2024-05-13', status: 'Completed', method: 'PayPal' },
        { id: 5, donor: 'Community Group A', amount: '50,000', currency: 'LKR', campaign: 'Dry Rations', date: '2024-05-12', status: 'Processing', method: 'Bank Transfer' },
    ]);

    const getStatusBadge = (status) => {
        const styles = {
            'Completed': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'Pending': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            'Processing': { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
        };
        const style = styles[status] || styles['Pending'];

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

    const handleExportReport = () => {
        alert('Generating and downloading donation report...');
    };

    const handleCreateEvent = (e) => {
        e.preventDefault();
        alert('Donation event created successfully!');
        setShowCreateEventModal(false);
    };

    // Filter logic
    const filteredDonations = donations.filter(donation => {
        const matchesSearch =
            donation.donor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            donation.campaign.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || donation.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Donation System</h2>
                    <p style={styles.subtitle}>Track funds and manage donation campaigns</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.primaryButton} onClick={() => setShowCreateEventModal(true)}>
                        <Plus size={18} />
                        <span>Create Event</span>
                    </button>
                    <button style={styles.secondaryButton} onClick={handleExportReport}>
                        <Download size={18} />
                        <span>Export Report</span>
                    </button>
                </div>
            </div>

            {/* Financial Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <DollarSign size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>LKR 4.5M</div>
                        <div style={styles.statLabel}>Total Raised</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>LKR 125K</div>
                        <div style={styles.statLabel}>This Week</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>1,234</div>
                        <div style={styles.statLabel}>Total Donors</div>
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search donations..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.filters}>
                    <select
                        style={styles.select}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Donor</th>
                            <th style={styles.th}>Amount</th>
                            <th style={styles.th}>Campaign</th>
                            <th style={styles.th}>Method</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredDonations.map(donation => (
                            <tr key={donation.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <span style={{ fontWeight: '500' }}>{donation.donor}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{ fontWeight: '600', color: 'var(--color-text)' }}>
                                        {donation.currency} {donation.amount}
                                    </span>
                                </td>
                                <td style={styles.td}>{donation.campaign}</td>
                                <td style={styles.td}>{donation.method}</td>
                                <td style={styles.td}>{getStatusBadge(donation.status)}</td>
                                <td style={styles.td}>{donation.date}</td>
                                <td style={styles.td}>
                                    <button style={styles.actionButton}>
                                        <MoreVertical size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Create Event Modal */}
            {showCreateEventModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Create Donation Event</h3>
                            <button style={styles.closeButton} onClick={() => setShowCreateEventModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleCreateEvent}>
                            <div style={styles.modalBody}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Event Title</label>
                                    <input type="text" style={styles.input} placeholder="e.g. Flood Relief Fund 2024" required />
                                </div>
                                <div style={styles.formRow}>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>Target Amount (LKR)</label>
                                        <input type="number" style={styles.input} placeholder="1,000,000" required />
                                    </div>
                                    <div style={styles.formGroup}>
                                        <label style={styles.label}>End Date</label>
                                        <input type="date" style={styles.input} required />
                                    </div>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Description</label>
                                    <textarea style={styles.textarea} rows="4" placeholder="Describe the purpose of this fundraising event..." required></textarea>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Beneficiary</label>
                                    <input type="text" style={styles.input} placeholder="Organization or Community Name" required />
                                </div>
                            </div>
                            <div style={styles.modalFooter}>
                                <button type="button" style={styles.cancelButton} onClick={() => setShowCreateEventModal(false)}>Cancel</button>
                                <button type="submit" style={styles.submitButton}>Create Event</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    secondaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
    },
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    statValue: {
        fontSize: '1.5rem',
        fontWeight: '700',
        color: 'var(--color-text)',
    },
    statLabel: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
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
    filters: {
        display: 'flex',
        gap: '1rem',
    },
    select: {
        padding: '0.75rem 1rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
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
    // Modal Styles
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(4px)',
    },
    modalContent: {
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        width: '100%',
        maxWidth: '500px',
        boxShadow: 'var(--shadow-xl)',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid var(--glass-border)',
    },
    modalTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--color-text)',
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: 'var(--radius-sm)',
    },
    modalBody: {
        padding: '1.5rem',
    },
    formGroup: {
        marginBottom: '1.25rem',
    },
    formRow: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--color-text-secondary)',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
        resize: 'vertical',
    },
    modalFooter: {
        padding: '1.5rem',
        borderTop: '1px solid var(--glass-border)',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    submitButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    }
};

export default DonationManagement;

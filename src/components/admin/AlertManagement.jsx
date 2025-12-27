import React, { useState } from 'react';
import {
    Bell, Search, Plus, Filter, MoreVertical,
    AlertTriangle, CheckCircle, Clock, MapPin, X, Save
} from 'lucide-react';

const AlertManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        type: 'Flood',
        severity: 'medium',
        location: '',
        description: '',
        affected: ''
    });

    // Mock data
    const alerts = [
        { id: 1, title: 'Flash Flood Warning', type: 'Flood', severity: 'critical', location: 'Colombo District', time: '10 mins ago', status: 'active', affected: '2500+' },
        { id: 2, title: 'Landslide Risk', type: 'Landslide', severity: 'high', location: 'Kandy - Peradeniya', time: '1 hour ago', status: 'active', affected: '500+' },
        { id: 3, title: 'Heavy Rain Forecast', type: 'Weather', severity: 'medium', location: 'Western Province', time: '3 hours ago', status: 'monitoring', affected: '10000+' },
        { id: 4, title: 'Minor Tremor', type: 'Earthquake', severity: 'low', location: 'Hambantota', time: '5 hours ago', status: 'resolved', affected: 'None' },
        { id: 5, title: 'Coastal Wind Warning', type: 'Wind', severity: 'medium', location: 'Galle Coast', time: '6 hours ago', status: 'active', affected: 'Fishermen' },
    ];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return 'var(--color-danger)'; // Red
            case 'high': return 'var(--color-warning)'; // Orange
            case 'medium': return 'var(--color-info)'; // Blue
            case 'low': return 'var(--color-success)'; // Green
            default: return 'var(--color-text-muted)';
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            active: { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            monitoring: { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
            resolved: { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
        };
        const style = styles[status] || styles.resolved;

        return (
            <span style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: style.bg,
                color: style.color,
                textTransform: 'capitalize'
            }}>
                {status}
            </span>
        );
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        setShowCreateModal(false);
        // Reset form
        setFormData({
            title: '',
            type: 'Flood',
            severity: 'medium',
            location: '',
            description: '',
            affected: ''
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Alert Management</h2>
                    <p style={styles.subtitle}>Create and manage disaster alerts and warnings</p>
                </div>
                <button style={styles.primaryButton} onClick={() => setShowCreateModal(true)}>
                    <Plus size={18} />
                    <span>Create Alert</span>
                </button>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search alerts..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.filters}>
                    <button style={styles.filterButton}>
                        <Filter size={18} />
                        <span>Filter</span>
                    </button>
                    <select
                        style={styles.select}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="monitoring">Monitoring</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Alert Details</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Severity</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Affected Area</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.map(alert => (
                            <tr key={alert.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.alertCell}>
                                        <div style={styles.alertIcon}>
                                            <Bell size={18} />
                                        </div>
                                        <div>
                                            <div style={styles.alertTitle}>{alert.title}</div>
                                            <div style={styles.alertTime}>
                                                <Clock size={12} />
                                                {alert.time}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>{alert.type}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: getSeverityColor(alert.severity)
                                        }} />
                                        <span style={{ textTransform: 'capitalize' }}>{alert.severity}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{getStatusBadge(alert.status)}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                        <MapPin size={14} />
                                        {alert.location}
                                    </div>
                                </td>
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

            {/* Create Alert Modal */}
            {showCreateModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Create New Alert</h3>
                            <button style={styles.closeButton} onClick={() => setShowCreateModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Alert Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g., Flash Flood Warning"
                                    required
                                />
                            </div>

                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Alert Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        style={styles.selectInput}
                                    >
                                        <option value="Flood">Flood</option>
                                        <option value="Landslide">Landslide</option>
                                        <option value="Weather">Weather</option>
                                        <option value="Earthquake">Earthquake</option>
                                        <option value="Wind">Wind</option>
                                        <option value="Fire">Fire</option>
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Severity Level</label>
                                    <select
                                        name="severity"
                                        value={formData.severity}
                                        onChange={handleInputChange}
                                        style={styles.selectInput}
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Location</label>
                                <div style={styles.inputIconWrapper}>
                                    <MapPin size={18} style={styles.inputIcon} />
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        style={{ ...styles.input, paddingLeft: '2.5rem' }}
                                        placeholder="Enter affected location"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    style={styles.textarea}
                                    placeholder="Detailed description of the alert..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Estimated Affected Population</label>
                                <input
                                    type="text"
                                    name="affected"
                                    value={formData.affected}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g., 500+ families"
                                />
                            </div>

                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    <Save size={18} />
                                    Publish Alert
                                </button>
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
        transition: 'background-color 0.2s',
    },
    controls: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '1.5rem',
        gap: '1rem',
        flexWrap: 'wrap',
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
    alertCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    alertIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    alertTitle: {
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    alertTime: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
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
        maxWidth: '600px',
        maxHeight: '90vh',
        overflowY: 'auto',
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
        ':hover': {
            backgroundColor: 'var(--color-bg-tertiary)',
        }
    },
    form: {
        padding: '1.5rem',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    row: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '1rem',
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
        fontSize: '0.875rem',
    },
    selectInput: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        outline: 'none',
        fontSize: '0.875rem',
        resize: 'vertical',
        minHeight: '100px',
    },
    inputIconWrapper: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-text-muted)',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    cancelButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        fontWeight: '500',
    },
    submitButton: {
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
    }
};

export default AlertManagement;

import React, { useState } from 'react';
import {
    Activity, Search, Filter, MoreVertical,
    Stethoscope, Bed, Truck, AlertCircle, Edit2, Eye, X
} from 'lucide-react';

const HealthMedicalManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [showUpdateModal, setShowUpdateModal] = useState(false);

    // Mock data
    const [facilities, setFacilities] = useState([
        { id: 1, name: 'National Hospital Colombo', type: 'Hospital', capacity: '95%', ambulances: 5, status: 'High Load', doctors: 45, beds: 500 },
        { id: 2, name: 'Kandy General Hospital', type: 'Hospital', capacity: '70%', ambulances: 3, status: 'Normal', doctors: 30, beds: 350 },
        { id: 3, name: 'Galle Field Clinic', type: 'Clinic', capacity: '40%', ambulances: 1, status: 'Normal', doctors: 5, beds: 20 },
        { id: 4, name: 'Jaffna Emergency Unit', type: 'Emergency', capacity: '85%', ambulances: 2, status: 'High Load', doctors: 12, beds: 50 },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Normal': return '#10b981';
            case 'High Load': return '#f59e0b';
            case 'Critical': return '#dc2626';
            default: return '#64748b';
        }
    };

    const handleUpdateStatus = (facility) => {
        setSelectedFacility(facility);
        setShowUpdateModal(true);
    };

    const saveStatusUpdate = (newStatus, newCapacity) => {
        setFacilities(facilities.map(fac =>
            fac.id === selectedFacility.id ? { ...fac, status: newStatus, capacity: newCapacity } : fac
        ));
        setShowUpdateModal(false);
        setSelectedFacility(null);
    };

    // Filter logic
    const filteredFacilities = facilities.filter(facility => {
        const matchesSearch = facility.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'all' || facility.type === filterType;
        return matchesSearch && matchesType;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Health & Medical Support</h2>
                    <p style={styles.subtitle}>Monitor hospital capacity and medical resources</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.primaryButton} onClick={() => alert('Global status update feature coming soon!')}>
                        <Activity size={18} />
                        <span>Update Global Status</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <Bed size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>85%</div>
                        <div style={styles.statLabel}>Avg. Occupancy</div>
                    </div>
                </div>
                <div style={{ ...styles.statCard, border: '1px solid #f59e0b' }}>
                    <div style={{ ...styles.statIcon, background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <Truck size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>12</div>
                        <div style={styles.statLabel}>Ambulances Active</div>
                    </div>
                </div>
                <div style={styles.statCard}>
                    <div style={{ ...styles.statIcon, background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                        <Stethoscope size={24} />
                    </div>
                    <div>
                        <div style={styles.statValue}>150+</div>
                        <div style={styles.statLabel}>Doctors Available</div>
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search facilities..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.filters}>
                    <select
                        style={styles.select}
                        value={filterType}
                        onChange={(e) => setFilterType(e.target.value)}
                    >
                        <option value="all">All Types</option>
                        <option value="Hospital">Hospital</option>
                        <option value="Clinic">Clinic</option>
                        <option value="Emergency">Emergency Unit</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Facility Name</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Capacity</th>
                            <th style={styles.th}>Ambulances</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFacilities.map(facility => (
                            <tr key={facility.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.facilityCell}>
                                        <div style={styles.facilityIcon}>
                                            <Activity size={18} />
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{facility.name}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{facility.type}</td>
                                <td style={styles.td}>
                                    <div style={styles.capacityBar}>
                                        <div
                                            style={{
                                                ...styles.capacityFill,
                                                width: facility.capacity,
                                                backgroundColor: parseInt(facility.capacity) > 80 ? '#dc2626' : '#10b981'
                                            }}
                                        />
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{facility.capacity} Full</span>
                                </td>
                                <td style={styles.td}>{facility.ambulances} Available</td>
                                <td style={styles.td}>
                                    <span style={{
                                        color: getStatusColor(facility.status),
                                        fontWeight: '600'
                                    }}>
                                        {facility.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            style={styles.actionButton}
                                            onClick={() => handleUpdateStatus(facility)}
                                            title="Update Status"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                        <button style={styles.actionButton} title="View Details">
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Update Status Modal */}
            {showUpdateModal && selectedFacility && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Update Facility Status</h3>
                            <button style={styles.closeButton} onClick={() => setShowUpdateModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <p style={styles.modalSubtitle}>Updating status for: <strong>{selectedFacility.name}</strong></p>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Current Status</label>
                                <select
                                    style={styles.input}
                                    defaultValue={selectedFacility.status}
                                    id="statusSelect"
                                >
                                    <option value="Normal">Normal</option>
                                    <option value="High Load">High Load</option>
                                    <option value="Critical">Critical</option>
                                </select>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Current Capacity (%)</label>
                                <input
                                    type="text"
                                    style={styles.input}
                                    defaultValue={selectedFacility.capacity}
                                    id="capacityInput"
                                />
                            </div>
                        </div>
                        <div style={styles.modalFooter}>
                            <button style={styles.cancelButton} onClick={() => setShowUpdateModal(false)}>Cancel</button>
                            <button
                                style={styles.saveButton}
                                onClick={() => {
                                    const newStatus = document.getElementById('statusSelect').value;
                                    const newCapacity = document.getElementById('capacityInput').value;
                                    saveStatusUpdate(newStatus, newCapacity);
                                }}
                            >
                                Save Changes
                            </button>
                        </div>
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
    facilityCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    facilityIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    capacityBar: {
        width: '100px',
        height: '6px',
        backgroundColor: 'var(--color-bg-tertiary)',
        borderRadius: '3px',
        marginBottom: '0.25rem',
        overflow: 'hidden',
    },
    capacityFill: {
        height: '100%',
        borderRadius: '3px',
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
    modalSubtitle: {
        marginBottom: '1.5rem',
        color: 'var(--color-text-secondary)',
    },
    formGroup: {
        marginBottom: '1.5rem',
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
    saveButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    }
};

export default HealthMedicalManagement;

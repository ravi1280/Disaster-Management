import React, { useState } from 'react';
import {
    Map, Search, Plus, Filter, MoreVertical,
    MapPin, Layers, Navigation, Globe, X, Save
} from 'lucide-react';

const DisasterMapManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Hazard Zone',
        latitude: '',
        longitude: '',
        status: 'Active',
        description: ''
    });

    // Mock data
    const mapMarkers = [
        { id: 1, name: 'Colombo Flood Zone', type: 'Hazard Zone', coordinates: '6.9271° N, 79.8612° E', status: 'Active', updated: '2 hours ago' },
        { id: 2, name: 'Kandy Landslide Area', type: 'Danger Zone', coordinates: '7.2906° N, 80.6337° E', status: 'Active', updated: '1 day ago' },
        { id: 3, name: 'Galle Shelter 1', type: 'Safe Zone', coordinates: '6.0535° N, 80.2210° E', status: 'Open', updated: '5 hours ago' },
        { id: 4, name: 'Jaffna Relief Center', type: 'Resource Hub', coordinates: '9.6615° N, 80.0255° E', status: 'Open', updated: '30 mins ago' },
        { id: 5, name: 'Trinco Coastal Watch', type: 'Monitoring Point', coordinates: '8.5874° N, 81.2152° E', status: 'Active', updated: '10 mins ago' },
    ];

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
            name: '',
            type: 'Hazard Zone',
            latitude: '',
            longitude: '',
            status: 'Active',
            description: ''
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Disaster Map Management</h2>
                    <p style={styles.subtitle}>Manage map markers, zones, and geographical data</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.secondaryButton}>
                        <Layers size={18} />
                        <span>Manage Layers</span>
                    </button>
                    <button style={styles.primaryButton} onClick={() => setShowCreateModal(true)}>
                        <Plus size={18} />
                        <span>Add Marker</span>
                    </button>
                </div>
            </div>

            <div style={styles.mapPreview}>
                <div style={styles.mapPlaceholder}>
                    <Globe size={48} style={{ opacity: 0.5, marginBottom: '1rem' }} />
                    <span>Interactive Map Preview</span>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search markers..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.filters}>
                    <button style={styles.filterButton}>
                        <Filter size={18} />
                        <span>Filter Type</span>
                    </button>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Marker Name</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Coordinates</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Last Updated</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mapMarkers.map(marker => (
                            <tr key={marker.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.markerCell}>
                                        <div style={styles.markerIcon}>
                                            <MapPin size={18} />
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{marker.name}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{marker.type}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'monospace' }}>
                                        <Navigation size={14} />
                                        {marker.coordinates}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: '600',
                                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                                        color: '#3b82f6'
                                    }}>
                                        {marker.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{marker.updated}</td>
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

            {/* Add Marker Modal */}
            {showCreateModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Add New Map Marker</h3>
                            <button style={styles.closeButton} onClick={() => setShowCreateModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Marker Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g., Colombo Flood Shelter"
                                    required
                                />
                            </div>

                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Marker Type</label>
                                    <select
                                        name="type"
                                        value={formData.type}
                                        onChange={handleInputChange}
                                        style={styles.selectInput}
                                    >
                                        <option value="Hazard Zone">Hazard Zone</option>
                                        <option value="Safe Zone">Safe Zone</option>
                                        <option value="Resource Hub">Resource Hub</option>
                                        <option value="Medical Center">Medical Center</option>
                                        <option value="Monitoring Point">Monitoring Point</option>
                                    </select>
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Status</label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        style={styles.selectInput}
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Open">Open</option>
                                        <option value="Closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Latitude</label>
                                    <input
                                        type="text"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="e.g., 6.9271"
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Longitude</label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="e.g., 79.8612"
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
                                    placeholder="Additional details about this location..."
                                    rows={3}
                                />
                            </div>

                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={() => setShowCreateModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    <Save size={18} />
                                    Save Marker
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
    mapPreview: {
        height: '200px',
        backgroundColor: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--color-text-secondary)',
    },
    mapPlaceholder: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    markerCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    markerIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        color: '#3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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

export default DisasterMapManagement;

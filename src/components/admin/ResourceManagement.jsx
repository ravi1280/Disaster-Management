import React, { useState } from 'react';
import {
    Building2, Search, Plus, Filter, MoreVertical,
    Package, RefreshCw, AlertTriangle, CheckCircle, X, Save
} from 'lucide-react';

const ResourceManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: 'Food',
        quantity: '',
        unit: 'Packs',
        location: '',
        status: 'Available'
    });

    // Mock data
    const [resources, setResources] = useState([
        { id: 1, name: 'Emergency Food Packs', category: 'Food', quantity: 5000, unit: 'Packs', location: 'Colombo Warehouse', status: 'Available', lastUpdated: '2 hours ago' },
        { id: 2, name: 'Bottled Water (1L)', category: 'Water', quantity: 1200, unit: 'Bottles', location: 'Galle Distribution Center', status: 'Low Stock', lastUpdated: '5 hours ago' },
        { id: 3, name: 'Medical Kits (Type A)', category: 'Medical', quantity: 300, unit: 'Kits', location: 'Kandy Hospital', status: 'Available', lastUpdated: '1 day ago' },
        { id: 4, name: 'Tents (4-Person)', category: 'Shelter', quantity: 50, unit: 'Units', location: 'Ratnapura Camp', status: 'Critical Low', lastUpdated: '30 mins ago' },
        { id: 5, name: 'Blankets', category: 'Shelter', quantity: 2000, unit: 'Pcs', location: 'Jaffna Center', status: 'Available', lastUpdated: '3 hours ago' },
    ]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Available': return '#10b981';
            case 'Low Stock': return '#f59e0b';
            case 'Critical Low': return '#dc2626';
            default: return '#64748b';
        }
    };

    const handleSync = () => {
        setIsSyncing(true);
        // Simulate API call
        setTimeout(() => {
            setIsSyncing(false);
            alert('Inventory synced successfully!');
        }, 2000);
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
        const newResource = {
            id: resources.length + 1,
            ...formData,
            lastUpdated: 'Just now'
        };
        setResources([newResource, ...resources]);
        setShowAddModal(false);
        setFormData({
            name: '',
            category: 'Food',
            quantity: '',
            unit: 'Packs',
            location: '',
            status: 'Available'
        });
    };

    // Filter logic
    const filteredResources = resources.filter(resource => {
        const matchesSearch =
            resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            resource.location.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;

        return matchesSearch && matchesCategory;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Resource Management</h2>
                    <p style={styles.subtitle}>Track inventory, supplies, and logistics</p>
                </div>
                <div style={styles.headerActions}>
                    <button
                        style={{ ...styles.secondaryButton, opacity: isSyncing ? 0.7 : 1 }}
                        onClick={handleSync}
                        disabled={isSyncing}
                    >
                        <RefreshCw size={18} className={isSyncing ? 'spin' : ''} />
                        <span>{isSyncing ? 'Syncing...' : 'Sync Inventory'}</span>
                    </button>
                    <button style={styles.primaryButton} onClick={() => setShowAddModal(true)}>
                        <Plus size={18} />
                        <span>Add Resource</span>
                    </button>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search resources..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div style={styles.filters}>
                    <select
                        style={styles.select}
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        <option value="Food">Food</option>
                        <option value="Water">Water</option>
                        <option value="Medical">Medical</option>
                        <option value="Shelter">Shelter</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Resource Name</th>
                            <th style={styles.th}>Category</th>
                            <th style={styles.th}>Quantity</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Last Updated</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredResources.map(resource => (
                            <tr key={resource.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.resourceCell}>
                                        <div style={styles.resourceIcon}>
                                            <Package size={18} />
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{resource.name}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{resource.category}</td>
                                <td style={styles.td}>
                                    <span style={{ fontWeight: '600' }}>{resource.quantity}</span> {resource.unit}
                                </td>
                                <td style={styles.td}>{resource.location}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(resource.status)
                                        }} />
                                        <span style={{ color: getStatusColor(resource.status), fontWeight: '500' }}>
                                            {resource.status}
                                        </span>
                                    </div>
                                </td>
                                <td style={styles.td}>{resource.lastUpdated}</td>
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

            {/* Add Resource Modal */}
            {showAddModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Add New Resource</h3>
                            <button style={styles.closeButton} onClick={() => setShowAddModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} style={styles.form}>
                            <div style={styles.formGroup}>
                                <label style={styles.label}>Resource Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g., Emergency Food Packs"
                                    required
                                />
                            </div>

                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Category</label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        style={styles.selectInput}
                                    >
                                        <option value="Food">Food</option>
                                        <option value="Water">Water</option>
                                        <option value="Medical">Medical</option>
                                        <option value="Shelter">Shelter</option>
                                        <option value="Other">Other</option>
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
                                        <option value="Available">Available</option>
                                        <option value="Low Stock">Low Stock</option>
                                        <option value="Critical Low">Critical Low</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>
                            </div>

                            <div style={styles.row}>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Quantity</label>
                                    <input
                                        type="number"
                                        name="quantity"
                                        value={formData.quantity}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="e.g., 5000"
                                        required
                                    />
                                </div>
                                <div style={styles.formGroup}>
                                    <label style={styles.label}>Unit</label>
                                    <input
                                        type="text"
                                        name="unit"
                                        value={formData.unit}
                                        onChange={handleInputChange}
                                        style={styles.input}
                                        placeholder="e.g., Packs, Liters"
                                        required
                                    />
                                </div>
                            </div>

                            <div style={styles.formGroup}>
                                <label style={styles.label}>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    style={styles.input}
                                    placeholder="e.g., Colombo Warehouse"
                                    required
                                />
                            </div>

                            <div style={styles.modalActions}>
                                <button type="button" style={styles.cancelButton} onClick={() => setShowAddModal(false)}>
                                    Cancel
                                </button>
                                <button type="submit" style={styles.submitButton}>
                                    <Save size={18} />
                                    Save Resource
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <style>{`
                .spin {
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
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
        transition: 'opacity 0.2s',
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
    resourceCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    resourceIcon: {
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

export default ResourceManagement;

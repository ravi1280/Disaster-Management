import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { demoLostFound } from '../data/demoData';

const LostAndFound = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [filterCategory, setFilterCategory] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [userItems, setUserItems] = useState([]);
    const [formData, setFormData] = useState({
        type: 'lost',
        category: 'documents',
        item: '',
        description: '',
        location: '',
        contactNumber: user?.phone || ''
    });

    // Load user's items from localStorage
    useEffect(() => {
        if (user) {
            const stored = localStorage.getItem(`lostFound_${user.id}`);
            if (stored) {
                setUserItems(JSON.parse(stored));
            }
        }
    }, [user]);

    // Combine demo data with user's items
    const allItems = [...demoLostFound, ...userItems];

    // Filter items
    const filteredItems = allItems.filter(item => {
        const matchesTab = activeTab === 'all' || (activeTab === 'my' && item.userId === user?.id);
        const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
        const matchesType = filterType === 'all' || item.type === filterType;
        const matchesSearch = searchQuery === '' ||
            item.item.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

        return matchesTab && matchesCategory && matchesType && matchesSearch;
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newItem = {
            id: Date.now(),
            ...formData,
            userId: user.id,
            name: user.fullName,
            reportedAt: new Date()
        };

        const updatedItems = [...userItems, newItem];
        setUserItems(updatedItems);
        localStorage.setItem(`lostFound_${user.id}`, JSON.stringify(updatedItems));

        // Reset form
        setFormData({
            type: 'lost',
            category: 'documents',
            item: '',
            description: '',
            location: '',
            contactNumber: user?.phone || ''
        });
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'documents': return '📄';
            case 'pet': return '🐾';
            case 'personal': return '👜';
            default: return '📦';
        }
    };

    return (
        <div className="container" style={styles.page}>
            <h1>Lost & Found</h1>
            <p>Help reunite people with their belongings and pets during disasters</p>

            {/* Tabs */}
            <div style={styles.tabs}>
                <button
                    style={{ ...styles.tabBtn, ...(activeTab === 'all' ? styles.tabBtnActive : {}) }}
                    onClick={() => setActiveTab('all')}
                >
                    All Items ({allItems.length})
                </button>
                <button
                    style={{ ...styles.tabBtn, ...(activeTab === 'my' ? styles.tabBtnActive : {}) }}
                    onClick={() => setActiveTab('my')}
                >
                    My Items ({userItems.length})
                </button>
            </div>

            {/* Filters and Search */}
            <div style={styles.filtersSection}>
                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Type:</label>
                    <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="form-select" style={styles.filterInput}>
                        <option value="all">All</option>
                        <option value="lost">Lost</option>
                        <option value="found">Found</option>
                    </select>
                </div>

                <div style={styles.filterGroup}>
                    <label style={styles.filterLabel}>Category:</label>
                    <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)} className="form-select" style={styles.filterInput}>
                        <option value="all">All Categories</option>
                        <option value="documents">Documents</option>
                        <option value="pet">Pets</option>
                        <option value="personal">Personal Items</option>
                    </select>
                </div>

                <div style={{ ...styles.filterGroup, flex: 1, minWidth: '250px' }}>
                    <input
                        type="text"
                        placeholder="Search items, location..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="form-input"
                        style={{ width: '100%' }}
                    />
                </div>

                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    + Report Item
                </button>
            </div>

            {/* Items Grid */}
            <div style={styles.grid}>
                {filteredItems.length === 0 ? (
                    <div style={styles.noItems}>
                        <p>No items found matching your criteria</p>
                    </div>
                ) : (
                    filteredItems.map(item => (
                        <div key={item.id} style={styles.card}>
                            <div style={{ ...styles.typeBadge, background: item.type === 'lost' ? 'var(--color-emergency)' : 'var(--color-safe)' }}>
                                {item.type === 'lost' ? '🔍 LOST' : '✅ FOUND'}
                            </div>

                            <div style={styles.categoryIcon}>
                                {getCategoryIcon(item.category)}
                            </div>

                            <h3>{item.item}</h3>

                            {item.name && (
                                <p style={styles.itemName}>
                                    <strong>Reported by:</strong> {item.name}
                                </p>
                            )}

                            {item.description && (
                                <p style={styles.itemDescription}>{item.description}</p>
                            )}

                            <p style={styles.itemInfo}>
                                <strong>📍 Location:</strong> {item.location}
                            </p>

                            <p style={styles.itemInfo}>
                                <strong>📞 Contact:</strong> {item.contactNumber}
                            </p>

                            <p style={styles.time}>
                                {new Date(item.reportedAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                            </p>

                            <div style={styles.categoryTag}>
                                {item.category}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Report Modal */}
            {showModal && (
                <div style={styles.modalOverlay} onClick={() => setShowModal(false)}>
                    <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2 style={{ margin: 0 }}>Report Lost/Found Item</h2>
                            <button style={styles.closeBtn} onClick={() => setShowModal(false)}>×</button>
                        </div>

                        <form onSubmit={handleSubmit} style={styles.reportForm}>
                            <div className="form-group">
                                <label className="form-label">Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="lost">Lost</option>
                                    <option value="found">Found</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="form-select"
                                    required
                                >
                                    <option value="documents">Documents</option>
                                    <option value="pet">Pet</option>
                                    <option value="personal">Personal Items</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Item Name</label>
                                <input
                                    type="text"
                                    name="item"
                                    value={formData.item}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="e.g., National ID Card, Brown Dog, Mobile Phone"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="form-textarea"
                                    placeholder="Provide detailed description..."
                                    rows="3"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="Where was it lost/found?"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Contact Number</label>
                                <input
                                    type="tel"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    className="form-input"
                                    placeholder="+94 XX XXX XXXX"
                                    required
                                />
                            </div>

                            <button type="submit" className="btn btn-primary" style={styles.submitBtn}>
                                Submit Report
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    tabs: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        background: 'var(--color-bg-secondary)',
        padding: '0.5rem',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '400px'
    },
    tabBtn: {
        flex: 1,
        padding: '0.75rem 1.5rem',
        border: 'none',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        fontSize: '1rem',
        fontWeight: 600,
        cursor: 'pointer',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-normal)'
    },
    tabBtnActive: {
        background: 'var(--gradient-emergency)',
        color: 'white',
        boxShadow: 'var(--shadow-md)'
    },
    filtersSection: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        alignItems: 'flex-end'
    },
    filterGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    filterLabel: {
        fontSize: '0.9rem',
        fontWeight: 600,
        color: 'var(--color-text-secondary)'
    },
    filterInput: {
        minWidth: '180px'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
    },
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        position: 'relative'
    },
    typeBadge: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        padding: '0.4rem 0.9rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'white'
    },
    categoryIcon: {
        fontSize: '2.5rem',
        marginBottom: '0.75rem'
    },
    itemName: {
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem'
    },
    itemDescription: {
        fontSize: '0.95rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.75rem',
        lineHeight: 1.5
    },
    itemInfo: {
        fontSize: '0.9rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem'
    },
    time: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        marginTop: '0.5rem'
    },
    categoryTag: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        background: 'rgba(59, 130, 246, 0.2)',
        color: 'var(--color-info)',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
        textTransform: 'capitalize',
        marginTop: '0.5rem'
    },
    noItems: {
        gridColumn: '1 / -1',
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--color-text-muted)'
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    modalContainer: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--glass-border)'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-text)',
        fontSize: '2rem',
        cursor: 'pointer',
        lineHeight: 1,
        padding: 0,
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)'
    },
    reportForm: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    },
    submitBtn: {
        marginTop: '0.5rem',
        width: '100%',
        padding: '1rem',
        fontSize: '1.05rem',
        justifyContent: 'center'
    }
};

export default LostAndFound;

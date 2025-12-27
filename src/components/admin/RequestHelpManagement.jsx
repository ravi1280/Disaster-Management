import React, { useState } from 'react';
import {
    HandHeart, Search, Filter, MoreVertical,
    CheckCircle, XCircle, Clock, User, Phone, MapPin, AlertTriangle, MessageSquare, X
} from 'lucide-react';

const RequestHelpManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock data
    const [requests, setRequests] = useState([
        { id: 1, user: 'Kamal Perera', type: 'Medical Assistance', priority: 'Critical', location: 'Colombo 03', contact: '0771234567', status: 'Pending', time: '5 mins ago', description: 'Need urgent insulin for diabetic patient trapped in flood.' },
        { id: 2, user: 'Nimali Silva', type: 'Food & Water', priority: 'High', location: 'Gampaha', contact: '0719876543', status: 'In Progress', time: '25 mins ago', description: 'Family of 4 stranded without food for 24 hours.' },
        { id: 3, user: 'Sunil Fernando', type: 'Evacuation', priority: 'Critical', location: 'Ratnapura', contact: '0755555555', status: 'Pending', time: '40 mins ago', description: 'Water levels rising rapidly, need boat evacuation.' },
        { id: 4, user: 'Priya Raj', type: 'Shelter', priority: 'Medium', location: 'Batticaloa', contact: '0761112222', status: 'Resolved', time: '2 hours ago', description: 'Roof collapsed, need temporary shelter.' },
        { id: 5, user: 'John Doe', type: 'Medicine', priority: 'High', location: 'Kandy', contact: '0723334444', status: 'In Progress', time: '3 hours ago', description: 'Need antibiotics for infected wound.' },
    ]);

    const getPriorityColor = (priority) => {
        switch (priority.toLowerCase()) {
            case 'critical': return '#dc2626';
            case 'high': return '#f59e0b';
            case 'medium': return '#3b82f6';
            default: return '#10b981';
        }
    };

    const getStatusBadge = (status) => {
        const styles = {
            'Pending': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            'In Progress': { bg: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' },
            'Resolved': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'Rejected': { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
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
                textTransform: 'uppercase'
            }}>
                {status}
            </span>
        );
    };

    const handleViewDetails = (request) => {
        setSelectedRequest(request);
        setShowDetailsModal(true);
    };

    const handleUpdateStatus = (id, newStatus) => {
        setRequests(requests.map(req =>
            req.id === id ? { ...req, status: newStatus } : req
        ));
        if (selectedRequest && selectedRequest.id === id) {
            setSelectedRequest({ ...selectedRequest, status: newStatus });
        }
        // Close modal if action is taken inside it
        if (showDetailsModal) {
            setShowDetailsModal(false);
        }
    };

    // Filter logic
    const filteredRequests = requests.filter(request => {
        const matchesSearch =
            request.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.contact.includes(searchTerm);

        const matchesStatus = filterStatus === 'all' || request.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Help Requests Management</h2>
                    <p style={styles.subtitle}>Process and assign emergency help requests</p>
                </div>
                <div style={styles.stats}>
                    <div style={styles.statItem}>
                        <span style={styles.statValue}>{requests.filter(r => r.status === 'Pending').length}</span>
                        <span style={styles.statLabel}>Pending</span>
                    </div>
                    <div style={styles.statItem}>
                        <span style={styles.statValue}>{requests.filter(r => r.priority === 'Critical').length}</span>
                        <span style={styles.statLabel}>Critical</span>
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search requests..."
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
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Request Details</th>
                            <th style={styles.th}>Contact</th>
                            <th style={styles.th}>Priority</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredRequests.map(request => (
                            <tr key={request.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.requestCell}>
                                        <div style={styles.requestIcon}>
                                            <HandHeart size={18} />
                                        </div>
                                        <div>
                                            <div style={styles.requestType}>{request.type}</div>
                                            <div style={styles.requestUser}>
                                                <User size={12} />
                                                {request.user}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <Phone size={14} style={{ color: 'var(--color-text-muted)' }} />
                                        {request.contact}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <span style={{
                                        color: getPriorityColor(request.priority),
                                        fontWeight: '600',
                                        fontSize: '0.875rem'
                                    }}>
                                        {request.priority}
                                    </span>
                                </td>
                                <td style={styles.td}>{request.location}</td>
                                <td style={styles.td}>{getStatusBadge(request.status)}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            style={styles.iconButtonSuccess}
                                            title="Approve / Start"
                                            onClick={() => handleUpdateStatus(request.id, 'In Progress')}
                                        >
                                            <CheckCircle size={18} />
                                        </button>
                                        <button
                                            style={styles.iconButtonDanger}
                                            title="Reject"
                                            onClick={() => handleUpdateStatus(request.id, 'Rejected')}
                                        >
                                            <XCircle size={18} />
                                        </button>
                                        <button
                                            style={styles.actionButton}
                                            onClick={() => handleViewDetails(request)}
                                        >
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Request Details Modal */}
            {showDetailsModal && selectedRequest && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Request Details</h3>
                            <button style={styles.closeButton} onClick={() => setShowDetailsModal(false)}>
                                <X size={20} />
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <div style={styles.detailSection}>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Request Type:</span>
                                    <span style={styles.detailValue}>{selectedRequest.type}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Priority:</span>
                                    <span style={{ ...styles.detailValue, color: getPriorityColor(selectedRequest.priority), fontWeight: 'bold' }}>
                                        {selectedRequest.priority}
                                    </span>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Status:</span>
                                    <div>{getStatusBadge(selectedRequest.status)}</div>
                                </div>
                                <div style={styles.detailRow}>
                                    <span style={styles.detailLabel}>Time:</span>
                                    <span style={styles.detailValue}>{selectedRequest.time}</span>
                                </div>
                            </div>

                            <div style={styles.divider} />

                            <div style={styles.detailSection}>
                                <h4 style={styles.sectionTitle}>Requester Information</h4>
                                <div style={styles.detailRow}>
                                    <User size={16} style={styles.icon} />
                                    <span style={styles.detailValue}>{selectedRequest.user}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <Phone size={16} style={styles.icon} />
                                    <span style={styles.detailValue}>{selectedRequest.contact}</span>
                                </div>
                                <div style={styles.detailRow}>
                                    <MapPin size={16} style={styles.icon} />
                                    <span style={styles.detailValue}>{selectedRequest.location}</span>
                                </div>
                            </div>

                            <div style={styles.divider} />

                            <div style={styles.detailSection}>
                                <h4 style={styles.sectionTitle}>Description</h4>
                                <div style={styles.descriptionBox}>
                                    <MessageSquare size={16} style={{ ...styles.icon, marginTop: '4px' }} />
                                    <p style={styles.descriptionText}>{selectedRequest.description}</p>
                                </div>
                            </div>

                            <div style={styles.modalActions}>
                                {selectedRequest.status === 'Pending' && (
                                    <>
                                        <button
                                            style={styles.rejectButton}
                                            onClick={() => handleUpdateStatus(selectedRequest.id, 'Rejected')}
                                        >
                                            Reject Request
                                        </button>
                                        <button
                                            style={styles.approveButton}
                                            onClick={() => handleUpdateStatus(selectedRequest.id, 'In Progress')}
                                        >
                                            Approve & Assign
                                        </button>
                                    </>
                                )}
                                {selectedRequest.status === 'In Progress' && (
                                    <button
                                        style={styles.resolveButton}
                                        onClick={() => handleUpdateStatus(selectedRequest.id, 'Resolved')}
                                    >
                                        Mark as Resolved
                                    </button>
                                )}
                                {selectedRequest.status === 'Resolved' && (
                                    <span style={styles.resolvedText}>
                                        <CheckCircle size={16} />
                                        Request Completed
                                    </span>
                                )}
                            </div>
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
    stats: {
        display: 'flex',
        gap: '1.5rem',
    },
    statItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    statValue: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--color-text)',
    },
    statLabel: {
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase',
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
    requestCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    requestIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        color: '#f59e0b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    requestType: {
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    requestUser: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
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
    },
    iconButtonDanger: {
        padding: '0.5rem',
        background: 'transparent',
        border: 'none',
        color: '#dc2626',
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
    modalBody: {
        padding: '1.5rem',
    },
    detailSection: {
        marginBottom: '1.5rem',
    },
    detailRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '0.75rem',
    },
    detailLabel: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        width: '100px',
    },
    detailValue: {
        color: 'var(--color-text)',
        fontSize: '0.875rem',
    },
    divider: {
        height: '1px',
        backgroundColor: 'var(--glass-border)',
        margin: '1.5rem 0',
    },
    sectionTitle: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '1rem',
    },
    icon: {
        color: 'var(--color-text-muted)',
    },
    descriptionBox: {
        display: 'flex',
        gap: '0.75rem',
        padding: '1rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    descriptionText: {
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        lineHeight: '1.5',
    },
    modalActions: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem',
    },
    approveButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#10b981',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    rejectButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid #dc2626',
        color: '#dc2626',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    resolveButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#3b82f6',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    resolvedText: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: '#10b981',
        fontWeight: '600',
    }
};

export default RequestHelpManagement;

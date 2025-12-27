import React, { useState } from 'react';
import {
    FileText, Search, Filter, MoreVertical,
    CheckCircle, XCircle, MapPin, Camera, AlertTriangle, Eye
} from 'lucide-react';

const IncidentReportManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [filterType, setFilterType] = useState('all');
    const [selectedReport, setSelectedReport] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock data
    const [reports, setReports] = useState([
        { id: 1, title: 'Road Blocked by Fallen Tree', type: 'Infrastructure', location: 'Galle Road, Col 04', reporter: 'Anonymous', status: 'Verified', time: '15 mins ago', hasImage: true, description: 'A large tree has fallen across the road, blocking all lanes. Traffic is backed up.' },
        { id: 2, title: 'Flooding in Low Level Area', type: 'Flood', location: 'Kelani River Bank', reporter: 'Kamal P.', status: 'Pending Verification', time: '45 mins ago', hasImage: true, description: 'Water levels are rising rapidly near the river bank. Several houses are at risk.' },
        { id: 3, title: 'Power Line Down', type: 'Hazard', location: 'Nugegoda Junction', reporter: 'Saman K.', status: 'Pending Verification', time: '1 hour ago', hasImage: false, description: 'Live power line on the ground. Very dangerous situation.' },
        { id: 4, title: 'Landslide Warning Sign', type: 'Landslide', location: 'Badulla Road', reporter: 'Ravi S.', status: 'Verified', time: '2 hours ago', hasImage: true, description: 'Signs of soil instability observed on the hillside.' },
        { id: 5, title: 'Fake News about Tsunami', type: 'Misinformation', location: 'Online', reporter: 'System Flag', status: 'Rejected', time: '30 mins ago', hasImage: false, description: 'False reports circulating on social media about a tsunami. No official warning issued.' },
    ]);

    const getStatusBadge = (status) => {
        const styles = {
            'Verified': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'Pending Verification': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            'Rejected': { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
        };
        const style = styles[status] || styles['Pending Verification'];

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

    const handleUpdateStatus = (id, newStatus) => {
        setReports(reports.map(rep =>
            rep.id === id ? { ...rep, status: newStatus } : rep
        ));
        if (selectedReport && selectedReport.id === id) {
            setSelectedReport({ ...selectedReport, status: newStatus });
        }
    };

    const handleViewDetails = (report) => {
        setSelectedReport(report);
        setShowDetailsModal(true);
    };

    // Filter logic
    const filteredReports = reports.filter(report => {
        const matchesSearch =
            report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            report.reporter.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
        const matchesType = filterType === 'all' || report.type === filterType;

        return matchesSearch && matchesStatus && matchesType;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Incident Reports</h2>
                    <p style={styles.subtitle}>Review and verify crowdsourced incident reports</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.secondaryButton}>
                        <Filter size={18} />
                        <span>Advanced Filter</span>
                    </button>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search reports..."
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
                        <option value="Infrastructure">Infrastructure</option>
                        <option value="Flood">Flood</option>
                        <option value="Hazard">Hazard</option>
                        <option value="Landslide">Landslide</option>
                        <option value="Misinformation">Misinformation</option>
                    </select>
                    <select
                        style={styles.select}
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="Verified">Verified</option>
                        <option value="Pending Verification">Pending</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Report Details</th>
                            <th style={styles.th}>Type</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Evidence</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredReports.map(report => (
                            <tr key={report.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.reportCell}>
                                        <div style={styles.reportIcon}>
                                            <AlertTriangle size={18} />
                                        </div>
                                        <div>
                                            <div style={styles.reportTitle}>{report.title}</div>
                                            <div style={styles.reportMeta}>
                                                <span>By {report.reporter}</span>
                                                <span>•</span>
                                                <span>{report.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>{report.type}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)' }}>
                                        <MapPin size={14} />
                                        {report.location}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    {report.hasImage ? (
                                        <span style={styles.evidenceBadge}>
                                            <Camera size={12} /> Image
                                        </span>
                                    ) : (
                                        <span style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>None</span>
                                    )}
                                </td>
                                <td style={styles.td}>{getStatusBadge(report.status)}</td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        {report.status === 'Pending Verification' && (
                                            <>
                                                <button
                                                    style={styles.iconButtonSuccess}
                                                    onClick={() => handleUpdateStatus(report.id, 'Verified')}
                                                    title="Verify"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    style={styles.iconButtonDanger}
                                                    onClick={() => handleUpdateStatus(report.id, 'Rejected')}
                                                    title="Reject"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </>
                                        )}
                                        <button
                                            style={styles.actionButton}
                                            onClick={() => handleViewDetails(report)}
                                            title="View Details"
                                        >
                                            <Eye size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Report Details Modal */}
            {showDetailsModal && selectedReport && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <div style={styles.modalHeader}>
                            <h3 style={styles.modalTitle}>Report Details</h3>
                            <button style={styles.closeButton} onClick={() => setShowDetailsModal(false)}>
                                <XCircle size={20} />
                            </button>
                        </div>
                        <div style={styles.modalBody}>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Title:</span>
                                <span style={styles.detailValue}>{selectedReport.title}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Type:</span>
                                <span style={styles.detailValue}>{selectedReport.type}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Location:</span>
                                <span style={styles.detailValue}>{selectedReport.location}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Reporter:</span>
                                <span style={styles.detailValue}>{selectedReport.reporter}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Time:</span>
                                <span style={styles.detailValue}>{selectedReport.time}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Status:</span>
                                <span style={styles.detailValue}>{getStatusBadge(selectedReport.status)}</span>
                            </div>
                            <div style={styles.detailRow}>
                                <span style={styles.detailLabel}>Description:</span>
                                <p style={styles.descriptionText}>{selectedReport.description}</p>
                            </div>
                        </div>
                        <div style={styles.modalFooter}>
                            {selectedReport.status === 'Pending Verification' && (
                                <>
                                    <button
                                        style={styles.rejectButton}
                                        onClick={() => {
                                            handleUpdateStatus(selectedReport.id, 'Rejected');
                                            setShowDetailsModal(false);
                                        }}
                                    >
                                        Reject Report
                                    </button>
                                    <button
                                        style={styles.verifyButton}
                                        onClick={() => {
                                            handleUpdateStatus(selectedReport.id, 'Verified');
                                            setShowDetailsModal(false);
                                        }}
                                    >
                                        Verify Report
                                    </button>
                                </>
                            )}
                            <button style={styles.closeModalButton} onClick={() => setShowDetailsModal(false)}>
                                Close
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
    reportCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    reportIcon: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        color: '#dc2626',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    reportTitle: {
        fontWeight: '600',
        marginBottom: '0.25rem',
    },
    reportMeta: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
    },
    evidenceBadge: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.25rem',
        padding: '0.2rem 0.5rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        borderRadius: '4px',
        fontSize: '0.75rem',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
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
        ':hover': {
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
        }
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
        ':hover': {
            backgroundColor: 'rgba(220, 38, 38, 0.1)',
        }
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
    },
    modalBody: {
        padding: '1.5rem',
    },
    detailRow: {
        display: 'flex',
        marginBottom: '1rem',
        alignItems: 'flex-start',
    },
    detailLabel: {
        fontWeight: '600',
        width: '120px',
        color: 'var(--color-text-secondary)',
        fontSize: '0.9rem',
    },
    detailValue: {
        color: 'var(--color-text)',
        flex: 1,
        fontSize: '0.9rem',
    },
    descriptionText: {
        color: 'var(--color-text)',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        margin: 0,
    },
    modalFooter: {
        padding: '1.5rem',
        borderTop: '1px solid var(--glass-border)',
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
    },
    verifyButton: {
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
        backgroundColor: '#dc2626',
        color: 'white',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
    },
    closeModalButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: 'transparent',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        fontWeight: '600',
        cursor: 'pointer',
    }
};

export default IncidentReportManagement;

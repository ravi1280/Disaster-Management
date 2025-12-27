import React, { useState } from 'react';
import {
    Users, Search, Filter, MoreVertical,
    UserCheck, UserX, Mail, Phone, Award, CheckCircle, XCircle
} from 'lucide-react';

const VolunteerManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    // Mock data
    const [volunteers, setVolunteers] = useState([
        { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '0771234567', role: 'Medical Responder', status: 'Active', joined: '2024-01-15', skills: ['First Aid', 'CPR'] },
        { id: 2, name: 'David Kumar', email: 'david.k@example.com', phone: '0719876543', role: 'Logistics Coordinator', status: 'Pending Approval', joined: '2024-03-20', skills: ['Driving', 'Inventory'] },
        { id: 3, name: 'Amara Perera', email: 'amara.p@example.com', phone: '0755555555', role: 'Field Worker', status: 'Active', joined: '2023-11-10', skills: ['Search & Rescue'] },
        { id: 4, name: 'Mohamed Fazil', email: 'm.fazil@example.com', phone: '0761112222', role: 'Translator', status: 'Inactive', joined: '2024-02-05', skills: ['Tamil', 'Sinhala', 'English'] },
        { id: 5, name: 'Jenny Wilson', email: 'jenny.w@example.com', phone: '0723334444', role: 'Medical Responder', status: 'Active', joined: '2024-04-01', skills: ['Nursing'] },
    ]);

    const getStatusBadge = (status) => {
        const styles = {
            'Active': { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' },
            'Pending Approval': { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' },
            'Inactive': { bg: 'rgba(100, 116, 139, 0.1)', color: '#64748b' },
            'Rejected': { bg: 'rgba(220, 38, 38, 0.1)', color: '#dc2626' },
        };
        const style = styles[status] || styles['Inactive'];

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
        setVolunteers(volunteers.map(vol =>
            vol.id === id ? { ...vol, status: newStatus } : vol
        ));
        if (selectedVolunteer && selectedVolunteer.id === id) {
            setSelectedVolunteer({ ...selectedVolunteer, status: newStatus });
        }
    };

    const handleApprovePending = () => {
        setVolunteers(volunteers.map(vol =>
            vol.status === 'Pending Approval' ? { ...vol, status: 'Active' } : vol
        ));
        alert('All pending volunteers have been approved.');
    };

    // Filter logic
    const filteredVolunteers = volunteers.filter(volunteer => {
        const matchesSearch =
            volunteer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            volunteer.role.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = filterStatus === 'all' || volunteer.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Volunteer Management</h2>
                    <p style={styles.subtitle}>Manage volunteer profiles, approvals, and assignments</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.primaryButton} onClick={handleApprovePending}>
                        <UserCheck size={18} />
                        <span>Approve Pending</span>
                    </button>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search volunteers..."
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
                        <option value="Active">Active</option>
                        <option value="Pending Approval">Pending</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Volunteer</th>
                            <th style={styles.th}>Role & Skills</th>
                            <th style={styles.th}>Contact Info</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Joined Date</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVolunteers.map(volunteer => (
                            <tr key={volunteer.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.userCell}>
                                        <div style={styles.avatar}>
                                            {volunteer.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div style={styles.userName}>{volunteer.name}</div>
                                            <div style={styles.userId}>ID: VOL-{volunteer.id.toString().padStart(4, '0')}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.role}>{volunteer.role}</div>
                                    <div style={styles.skills}>
                                        {volunteer.skills.map((skill, index) => (
                                            <span key={index} style={styles.skillTag}>{skill}</span>
                                        ))}
                                    </div>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.contactInfo}>
                                        <div style={styles.contactItem}>
                                            <Mail size={12} /> {volunteer.email}
                                        </div>
                                        <div style={styles.contactItem}>
                                            <Phone size={12} /> {volunteer.phone}
                                        </div>
                                    </div>
                                </td>
                                <td style={styles.td}>{getStatusBadge(volunteer.status)}</td>
                                <td style={styles.td}>{volunteer.joined}</td>
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        {volunteer.status === 'Pending Approval' && (
                                            <>
                                                <button
                                                    style={styles.iconButtonSuccess}
                                                    onClick={() => handleUpdateStatus(volunteer.id, 'Active')}
                                                    title="Approve"
                                                >
                                                    <CheckCircle size={18} />
                                                </button>
                                                <button
                                                    style={styles.iconButtonDanger}
                                                    onClick={() => handleUpdateStatus(volunteer.id, 'Rejected')}
                                                    title="Reject"
                                                >
                                                    <XCircle size={18} />
                                                </button>
                                            </>
                                        )}
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
    userCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-primary)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
    },
    userName: {
        fontWeight: '600',
        color: 'var(--color-text)',
    },
    userId: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
    },
    role: {
        fontWeight: '500',
        marginBottom: '0.25rem',
    },
    skills: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.25rem',
    },
    skillTag: {
        fontSize: '0.7rem',
        padding: '0.1rem 0.4rem',
        backgroundColor: 'var(--color-bg-tertiary)',
        borderRadius: '4px',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--glass-border)',
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.8rem',
        color: 'var(--color-text-secondary)',
    },
    actionButtons: {
        display: 'flex',
        gap: '0.5rem',
        alignItems: 'center',
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
    }
};

export default VolunteerManagement;

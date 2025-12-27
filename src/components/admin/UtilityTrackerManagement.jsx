import React, { useState } from 'react';
import {
    Zap, Search, Filter, MoreVertical,
    Power, Droplet, Wifi, AlertTriangle
} from 'lucide-react';

const UtilityTrackerManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock data
    const utilities = [
        { id: 1, type: 'Electricity', provider: 'CEB', area: 'Colombo 01 - 05', status: 'Operational', outage: 'None', lastUpdated: '10 mins ago' },
        { id: 2, type: 'Water', provider: 'NWSDB', area: 'Kandy District', status: 'Disrupted', outage: 'Pipe Burst', lastUpdated: '1 hour ago' },
        { id: 3, type: 'Internet', provider: 'SLT', area: 'Galle Fort', status: 'Operational', outage: 'None', lastUpdated: '30 mins ago' },
        { id: 4, type: 'Electricity', provider: 'LECO', area: 'Negombo', status: 'Partial Outage', outage: 'Maintenance', lastUpdated: '2 hours ago' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Operational': return '#10b981';
            case 'Partial Outage': return '#f59e0b';
            case 'Disrupted': return '#dc2626';
            default: return '#64748b';
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Electricity': return <Zap size={18} />;
            case 'Water': return <Droplet size={18} />;
            case 'Internet': return <Wifi size={18} />;
            default: return <Power size={18} />;
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Utility Status Tracker</h2>
                    <p style={styles.subtitle}>Monitor essential services and report outages</p>
                </div>
                <div style={styles.headerActions}>
                    <button style={styles.primaryButton}>
                        <AlertTriangle size={18} />
                        <span>Report Outage</span>
                    </button>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.searchBox}>
                    <Search size={20} style={{ color: 'var(--color-text-muted)' }} />
                    <input
                        type="text"
                        placeholder="Search areas or providers..."
                        style={styles.searchInput}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <button style={styles.filterButton}>
                    <Filter size={18} />
                    <span>Filter Type</span>
                </button>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>Service Type</th>
                            <th style={styles.th}>Provider</th>
                            <th style={styles.th}>Affected Area</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Outage Reason</th>
                            <th style={styles.th}>Last Updated</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {utilities.map(utility => (
                            <tr key={utility.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.utilityCell}>
                                        <div style={styles.utilityIcon}>
                                            {getIcon(utility.type)}
                                        </div>
                                        <span style={{ fontWeight: '500' }}>{utility.type}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{utility.provider}</td>
                                <td style={styles.td}>{utility.area}</td>
                                <td style={styles.td}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <div style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            backgroundColor: getStatusColor(utility.status)
                                        }} />
                                        <span style={{ color: getStatusColor(utility.status), fontWeight: '500' }}>
                                            {utility.status}
                                        </span>
                                    </div>
                                </td>
                                <td style={styles.td}>{utility.outage}</td>
                                <td style={styles.td}>{utility.lastUpdated}</td>
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
    utilityCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    utilityIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        backgroundColor: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
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
    }
};

export default UtilityTrackerManagement;

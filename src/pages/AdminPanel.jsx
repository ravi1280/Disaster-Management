import React, { useState } from 'react';
import {
    Users, Bell, FileText, MapPin, Heart, Package, Activity,
    Settings, Shield, Database, BarChart3, TrendingUp, AlertCircle,
    CheckCircle, XCircle, Edit, Trash2, Eye, Plus, Search, Filter,
    Download, Upload, RefreshCw, Calendar, Clock, DollarSign, UserCheck
} from 'lucide-react';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Mock data for demonstration
    const stats = {
        totalUsers: 15234,
        activeAlerts: 23,
        pendingRequests: 156,
        totalDonations: 45678,
        volunteers: 892,
        resources: 1234,
        reports: 456,
        communities: 89
    };

    const recentAlerts = [
        { id: 1, type: 'Flood', severity: 'critical', location: 'Colombo District', time: '10 mins ago', status: 'active' },
        { id: 2, type: 'Landslide', severity: 'high', location: 'Kandy', time: '1 hour ago', status: 'active' },
        { id: 3, type: 'Cyclone Warning', severity: 'medium', location: 'Galle', time: '3 hours ago', status: 'monitoring' },
        { id: 4, type: 'Earthquake', severity: 'low', location: 'Jaffna', time: '5 hours ago', status: 'resolved' },
    ];

    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Volunteer', status: 'active', joined: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Coordinator', status: 'active', joined: '2024-02-20' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'inactive', joined: '2024-03-10' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Volunteer', status: 'active', joined: '2024-04-05' },
    ];

    const helpRequests = [
        { id: 1, user: 'Sarah Johnson', type: 'Medical', priority: 'high', location: 'Colombo', status: 'pending', time: '5 mins ago' },
        { id: 2, user: 'Mike Davis', type: 'Food', priority: 'medium', location: 'Kandy', status: 'in-progress', time: '20 mins ago' },
        { id: 3, user: 'Emma Wilson', type: 'Shelter', priority: 'high', location: 'Galle', status: 'pending', time: '45 mins ago' },
        { id: 4, user: 'Tom Brown', type: 'Water', priority: 'critical', location: 'Jaffna', status: 'pending', time: '1 hour ago' },
    ];

    const resources = [
        { id: 1, name: 'Medical Supplies', category: 'Health', quantity: 500, location: 'Colombo Center', status: 'available' },
        { id: 2, name: 'Food Packages', category: 'Food', quantity: 1000, location: 'Distribution Hub', status: 'available' },
        { id: 3, name: 'Water Bottles', category: 'Water', quantity: 250, location: 'Emergency Center', status: 'low' },
        { id: 4, name: 'Blankets', category: 'Shelter', quantity: 800, location: 'Relief Camp', status: 'available' },
    ];

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'critical': return '#dc2626';
            case 'high': return '#f59e0b';
            case 'medium': return '#3b82f6';
            case 'low': return '#10b981';
            default: return '#94a3b8';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return '#10b981';
            case 'inactive': return '#94a3b8';
            case 'pending': return '#f59e0b';
            case 'resolved': return '#3b82f6';
            case 'in-progress': return '#8b5cf6';
            default: return '#64748b';
        }
    };

    const renderOverview = () => (
        <div style={styles.tabContent}>
            {/* Stats Grid */}
            <div style={styles.statsGrid}>
                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-blue">
                        <Users size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.totalUsers.toLocaleString()}</div>
                        <div style={styles.statLabel}>Total Users</div>
                        <div style={styles.statChange}>
                            <TrendingUp size={14} />
                            <span>+12% from last month</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-red">
                        <Bell size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.activeAlerts}</div>
                        <div style={styles.statLabel}>Active Alerts</div>
                        <div style={styles.statChange}>
                            <AlertCircle size={14} />
                            <span>Requires attention</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-orange">
                        <FileText size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.pendingRequests}</div>
                        <div style={styles.statLabel}>Pending Requests</div>
                        <div style={styles.statChange}>
                            <Clock size={14} />
                            <span>23 urgent</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-green">
                        <DollarSign size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>${stats.totalDonations.toLocaleString()}</div>
                        <div style={styles.statLabel}>Total Donations</div>
                        <div style={styles.statChange}>
                            <TrendingUp size={14} />
                            <span>+8% this week</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-purple">
                        <UserCheck size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.volunteers}</div>
                        <div style={styles.statLabel}>Volunteers</div>
                        <div style={styles.statChange}>
                            <TrendingUp size={14} />
                            <span>456 active today</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-cyan">
                        <Package size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.resources}</div>
                        <div style={styles.statLabel}>Resources</div>
                        <div style={styles.statChange}>
                            <Activity size={14} />
                            <span>23 low stock</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-yellow">
                        <BarChart3 size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.reports}</div>
                        <div style={styles.statLabel}>Reports Today</div>
                        <div style={styles.statChange}>
                            <TrendingUp size={14} />
                            <span>34 verified</span>
                        </div>
                    </div>
                </div>

                <div style={styles.statCard}>
                    <div style={styles.statIcon} className="stat-icon-pink">
                        <Heart size={24} />
                    </div>
                    <div style={styles.statContent}>
                        <div style={styles.statValue}>{stats.communities}</div>
                        <div style={styles.statLabel}>Communities</div>
                        <div style={styles.statChange}>
                            <TrendingUp size={14} />
                            <span>12 new this month</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div style={styles.activitySection}>
                <h3 style={styles.sectionTitle}>Recent Critical Alerts</h3>
                <div style={styles.alertsList}>
                    {recentAlerts.map(alert => (
                        <div key={alert.id} style={styles.alertItem}>
                            <div style={{...styles.severityIndicator, background: getSeverityColor(alert.severity)}} />
                            <div style={styles.alertInfo}>
                                <div style={styles.alertHeader}>
                                    <span style={styles.alertType}>{alert.type}</span>
                                    <span style={{...styles.alertStatus, background: getStatusColor(alert.status)}}>
                                        {alert.status}
                                    </span>
                                </div>
                                <div style={styles.alertDetails}>
                                    <MapPin size={14} style={{color: '#94a3b8'}} />
                                    <span>{alert.location}</span>
                                    <span style={styles.alertDivider}>•</span>
                                    <Clock size={14} style={{color: '#94a3b8'}} />
                                    <span>{alert.time}</span>
                                </div>
                            </div>
                            <div style={styles.alertActions}>
                                <button style={styles.actionButton} title="View Details">
                                    <Eye size={16} />
                                </button>
                                <button style={styles.actionButton} title="Edit">
                                    <Edit size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderUsers = () => (
        <div style={styles.tabContent}>
            <div style={styles.tableHeader}>
                <h3 style={styles.sectionTitle}>User Management</h3>
                <div style={styles.tableActions}>
                    <div style={styles.searchBox}>
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={styles.searchInput}
                        />
                    </div>
                    <button style={styles.primaryButton}>
                        <Plus size={18} />
                        Add User
                    </button>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Role</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Joined</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id} style={styles.tr}>
                                <td style={styles.td}>
                                    <div style={styles.userCell}>
                                        <div style={styles.avatar}>{user.name.charAt(0)}</div>
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td style={styles.td}>{user.email}</td>
                                <td style={styles.td}>
                                    <span style={styles.roleBadge}>{user.role}</span>
                                </td>
                                <td style={styles.td}>
                                    <span style={{...styles.statusBadge, background: getStatusColor(user.status)}}>
                                        {user.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{user.joined}</td>
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        <button style={styles.iconButton} title="View">
                                            <Eye size={16} />
                                        </button>
                                        <button style={styles.iconButton} title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <button style={styles.iconButtonDanger} title="Delete">
                                            <Trash2 size={16} />
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

    const renderRequests = () => (
        <div style={styles.tabContent}>
            <div style={styles.tableHeader}>
                <h3 style={styles.sectionTitle}>Help Requests Management</h3>
                <div style={styles.tableActions}>
                    <select style={styles.filterSelect} value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                    </select>
                    <button style={styles.primaryButton}>
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User</th>
                            <th style={styles.th}>Request Type</th>
                            <th style={styles.th}>Priority</th>
                            <th style={styles.th}>Location</th>
                            <th style={styles.th}>Status</th>
                            <th style={styles.th}>Time</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {helpRequests.map(request => (
                            <tr key={request.id} style={styles.tr}>
                                <td style={styles.td}>{request.user}</td>
                                <td style={styles.td}>{request.type}</td>
                                <td style={styles.td}>
                                    <span style={{...styles.priorityBadge, background: getSeverityColor(request.priority)}}>
                                        {request.priority}
                                    </span>
                                </td>
                                <td style={styles.td}>{request.location}</td>
                                <td style={styles.td}>
                                    <span style={{...styles.statusBadge, background: getStatusColor(request.status)}}>
                                        {request.status}
                                    </span>
                                </td>
                                <td style={styles.td}>{request.time}</td>
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        <button style={styles.iconButton} title="View">
                                            <Eye size={16} />
                                        </button>
                                        <button style={styles.iconButtonSuccess} title="Approve">
                                            <CheckCircle size={16} />
                                        </button>
                                        <button style={styles.iconButtonDanger} title="Reject">
                                            <XCircle size={16} />
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

    const renderResources = () => (
        <div style={styles.tabContent}>
            <div style={styles.tableHeader}>
                <h3 style={styles.sectionTitle}>Resource Management</h3>
                <div style={styles.tableActions}>
                    <button style={styles.secondaryButton}>
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                    <button style={styles.primaryButton}>
                        <Plus size={18} />
                        Add Resource
                    </button>
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
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {resources.map(resource => (
                            <tr key={resource.id} style={styles.tr}>
                                <td style={styles.td}>{resource.name}</td>
                                <td style={styles.td}>{resource.category}</td>
                                <td style={styles.td}>
                                    <strong>{resource.quantity}</strong> units
                                </td>
                                <td style={styles.td}>{resource.location}</td>
                                <td style={styles.td}>
                                    <span style={{
                                        ...styles.statusBadge,
                                        background: resource.status === 'low' ? '#f59e0b' : '#10b981'
                                    }}>
                                        {resource.status}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actionButtons}>
                                        <button style={styles.iconButton} title="View">
                                            <Eye size={16} />
                                        </button>
                                        <button style={styles.iconButton} title="Edit">
                                            <Edit size={16} />
                                        </button>
                                        <button style={styles.iconButtonDanger} title="Delete">
                                            <Trash2 size={16} />
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

    const renderSettings = () => (
        <div style={styles.tabContent}>
            <div style={styles.settingsContainer}>
                <div style={styles.settingsSection}>
                    <h3 style={styles.sectionTitle}>System Settings</h3>
                    <div style={styles.settingsGrid}>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>System Name</label>
                            <input type="text" style={styles.settingInput} defaultValue="Disaster Management System" />
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>Admin Email</label>
                            <input type="email" style={styles.settingInput} defaultValue="admin@dms.gov" />
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>Emergency Contact</label>
                            <input type="tel" style={styles.settingInput} defaultValue="+94 11 123 4567" />
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>Time Zone</label>
                            <select style={styles.settingInput}>
                                <option>Asia/Colombo (UTC+5:30)</option>
                                <option>Asia/Kolkata (UTC+5:30)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style={styles.settingsSection}>
                    <h3 style={styles.sectionTitle}>Alert Settings</h3>
                    <div style={styles.settingsGrid}>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>
                                <input type="checkbox" defaultChecked /> Enable SMS Alerts
                            </label>
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>
                                <input type="checkbox" defaultChecked /> Enable Email Notifications
                            </label>
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>
                                <input type="checkbox" defaultChecked /> Enable Push Notifications
                            </label>
                        </div>
                        <div style={styles.settingItem}>
                            <label style={styles.settingLabel}>
                                <input type="checkbox" /> Enable Auto-Response
                            </label>
                        </div>
                    </div>
                </div>

                <div style={styles.settingsSection}>
                    <h3 style={styles.sectionTitle}>Data Management</h3>
                    <div style={styles.dataManagementGrid}>
                        <button style={styles.dataButton}>
                            <Database size={20} />
                            <span>Backup Database</span>
                        </button>
                        <button style={styles.dataButton}>
                            <Upload size={20} />
                            <span>Import Data</span>
                        </button>
                        <button style={styles.dataButton}>
                            <Download size={20} />
                            <span>Export Data</span>
                        </button>
                        <button style={styles.dataButton}>
                            <RefreshCw size={20} />
                            <span>Clear Cache</span>
                        </button>
                    </div>
                </div>

                <div style={styles.settingsSaveSection}>
                    <button style={styles.saveButton}>Save All Changes</button>
                    <button style={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Page Header */}
            <div style={styles.header}>
                <div style={styles.headerContent}>
                    <div style={styles.headerTitle}>
                        <Shield size={32} style={{color: '#dc2626'}} />
                        <div>
                            <h1 style={styles.title}>Admin Panel</h1>
                            <p style={styles.subtitle}>Manage and monitor disaster management system</p>
                        </div>
                    </div>
                    <div style={styles.headerActions}>
                        <button style={styles.headerButton}>
                            <Calendar size={18} />
                            <span>View Reports</span>
                        </button>
                        <button style={styles.headerButton}>
                            <Settings size={18} />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div style={styles.tabs}>
                <button
                    style={{...styles.tab, ...(activeTab === 'overview' ? styles.tabActive : {})}}
                    onClick={() => setActiveTab('overview')}
                >
                    <BarChart3 size={18} />
                    Overview
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'users' ? styles.tabActive : {})}}
                    onClick={() => setActiveTab('users')}
                >
                    <Users size={18} />
                    Users
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'requests' ? styles.tabActive : {})}}
                    onClick={() => setActiveTab('requests')}
                >
                    <FileText size={18} />
                    Help Requests
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'resources' ? styles.tabActive : {})}}
                    onClick={() => setActiveTab('resources')}
                >
                    <Package size={18} />
                    Resources
                </button>
                <button
                    style={{...styles.tab, ...(activeTab === 'settings' ? styles.tabActive : {})}}
                    onClick={() => setActiveTab('settings')}
                >
                    <Settings size={18} />
                    Settings
                </button>
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'requests' && renderRequests()}
            {activeTab === 'resources' && renderResources()}
            {activeTab === 'settings' && renderSettings()}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        minHeight: '100vh',
        background: 'var(--color-bg)',
    },
    header: {
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '1px solid var(--glass-border)',
    },
    headerContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    headerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    title: {
        fontSize: '1.875rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        margin: 0,
    },
    subtitle: {
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
        margin: 0,
    },
    headerActions: {
        display: 'flex',
        gap: '0.75rem',
    },
    headerButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '2rem',
        background: 'var(--color-bg-secondary)',
        padding: '0.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        flexWrap: 'wrap',
    },
    tab: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.75rem 1.25rem',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
    tabActive: {
        background: 'var(--color-emergency)',
        color: '#fff',
    },
    tabContent: {
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        border: '1px solid var(--glass-border)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem',
    },
    statCard: {
        display: 'flex',
        gap: '1rem',
        padding: '1.5rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
    },
    statIcon: {
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    statContent: {
        flex: 1,
    },
    statValue: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        marginBottom: '0.25rem',
    },
    statLabel: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
    },
    statChange: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
    },
    activitySection: {
        marginTop: '2rem',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '600',
        color: 'var(--color-text)',
        marginBottom: '1rem',
    },
    alertsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    alertItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    severityIndicator: {
        width: '4px',
        height: '50px',
        borderRadius: '2px',
    },
    alertInfo: {
        flex: 1,
    },
    alertHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
    },
    alertType: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--color-text)',
    },
    alertStatus: {
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#fff',
    },
    alertDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    alertDivider: {
        color: 'var(--color-text-muted)',
    },
    alertActions: {
        display: 'flex',
        gap: '0.5rem',
    },
    actionButton: {
        padding: '0.5rem',
        background: 'var(--color-bg)',
        color: 'var(--color-text-secondary)',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
    },
    tableHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    tableActions: {
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'center',
    },
    searchBox: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    searchInput: {
        background: 'transparent',
        border: 'none',
        outline: 'none',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        width: '200px',
    },
    primaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        background: 'var(--color-emergency)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
    secondaryButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.625rem 1rem',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
    filterSelect: {
        padding: '0.625rem 1rem',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
    },
    tableContainer: {
        overflowX: 'auto',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    th: {
        padding: '1rem',
        textAlign: 'left',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        background: 'var(--color-bg-tertiary)',
        borderBottom: '1px solid var(--glass-border)',
    },
    tr: {
        borderBottom: '1px solid var(--glass-border)',
        transition: 'var(--transition-fast)',
    },
    td: {
        padding: '1rem',
        fontSize: '0.875rem',
        color: 'var(--color-text)',
    },
    userCell: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    avatar: {
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: 'var(--color-emergency)',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: '600',
    },
    roleBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500',
        background: 'var(--color-info)',
        color: '#fff',
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#fff',
    },
    priorityBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500',
        color: '#fff',
    },
    actionButtons: {
        display: 'flex',
        gap: '0.5rem',
    },
    iconButton: {
        padding: '0.5rem',
        background: 'var(--color-bg)',
        color: 'var(--color-text-secondary)',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
    },
    iconButtonSuccess: {
        padding: '0.5rem',
        background: 'var(--color-safe)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
    },
    iconButtonDanger: {
        padding: '0.5rem',
        background: 'var(--color-emergency)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        transition: 'var(--transition-fast)',
    },
    settingsContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
    },
    settingsSection: {
        padding: '1.5rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    settingsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
    },
    settingItem: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    settingLabel: {
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--color-text-secondary)',
    },
    settingInput: {
        padding: '0.75rem',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem',
    },
    dataManagementGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
    },
    dataButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.5rem',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
    settingsSaveSection: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'flex-end',
        paddingTop: '1rem',
    },
    saveButton: {
        padding: '0.75rem 2rem',
        background: 'var(--color-emergency)',
        color: '#fff',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'var(--transition-fast)',
    },
    cancelButton: {
        padding: '0.75rem 2rem',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'var(--transition-fast)',
    },
};

export default AdminPanel;

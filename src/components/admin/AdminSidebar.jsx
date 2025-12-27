import React from 'react';
import {
    LayoutDashboard, Bell, Map, HandHeart, Building2, Users,
    FileText, Activity, DollarSign, Package, Zap, Cloud,
    Shield, ChevronRight
} from 'lucide-react';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { id: 'alerts', label: 'Alerts', icon: <Bell size={20} /> },
        { id: 'map', label: 'Disaster Map', icon: <Map size={20} /> },
        { id: 'requests', label: 'Help Requests', icon: <HandHeart size={20} /> },
        { id: 'resources', label: 'Resources', icon: <Building2 size={20} /> },
        { id: 'volunteers', label: 'Volunteers', icon: <Users size={20} /> },
        { id: 'reports', label: 'Incident Reports', icon: <FileText size={20} /> },
        { id: 'health', label: 'Health & Medical', icon: <Activity size={20} /> },
        { id: 'donations', label: 'Donations', icon: <DollarSign size={20} /> },
        { id: 'lost-found', label: 'Lost & Found', icon: <Package size={20} /> },
        { id: 'utilities', label: 'Utility Status', icon: <Zap size={20} /> },
        { id: 'weather', label: 'Weather Tracking', icon: <Cloud size={20} /> },
    ];

    return (
        <div style={styles.sidebar}>
            <div style={styles.header}>
                <Shield size={24} color="#dc2626" />
                <span style={styles.title}>Admin Portal</span>
            </div>

            <div style={styles.menu}>
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        style={{
                            ...styles.menuItem,
                            ...(activeTab === item.id ? styles.activeMenuItem : {})
                        }}
                    >
                        <span style={styles.icon}>{item.icon}</span>
                        <span style={styles.label}>{item.label}</span>
                        {activeTab === item.id && <ChevronRight size={16} style={styles.arrow} />}
                    </button>
                ))}
            </div>
        </div>
    );
};

const styles = {
    sidebar: {
        width: '260px',
        background: 'var(--color-bg-secondary)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        flexShrink: 0,
    },
    header: {
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        borderBottom: '1px solid var(--glass-border)',
    },
    title: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: 'var(--color-text)',
    },
    menu: {
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        overflowY: 'auto',
    },
    menuItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        background: 'transparent',
        border: 'none',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text-secondary)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        width: '100%',
        position: 'relative',
    },
    activeMenuItem: {
        background: 'var(--color-emergency)',
        color: 'white',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)',
    },
    icon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: '0.875rem',
        fontWeight: '500',
        flex: 1,
    },
    arrow: {
        opacity: 0.8,
    }
};

export default AdminSidebar;

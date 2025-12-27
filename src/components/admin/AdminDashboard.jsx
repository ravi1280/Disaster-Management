import React from 'react';
import {
    Users, Bell, FileText, Package,
    BarChart3, TrendingUp, AlertCircle,
    DollarSign, UserCheck, Heart, ArrowUpRight, ArrowDownRight,
    Activity, Shield, Zap
} from 'lucide-react';

const AdminDashboard = () => {
    // Mock data
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

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div>
                    <h2 style={styles.pageTitle}>Dashboard Overview</h2>
                    <p style={styles.pageSubtitle}>Welcome back, Admin. Here's what's happening today.</p>
                </div>
                <div style={styles.headerActions}>
                    <span style={styles.dateBadge}>{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
            </div>

            {/* Primary Stats Grid */}
            <div style={styles.statsGrid}>
                <StatCard
                    icon={<Users size={24} />}
                    value={stats.totalUsers.toLocaleString()}
                    label="Total Users"
                    trend="+12.5%"
                    trendUp={true}
                    color="blue"
                    description="Active users across all regions"
                />
                <StatCard
                    icon={<Bell size={24} />}
                    value={stats.activeAlerts}
                    label="Active Alerts"
                    trend="+5"
                    trendUp={false} // Bad trend (more alerts)
                    color="red"
                    description="Critical alerts requiring attention"
                    alert={true}
                />
                <StatCard
                    icon={<DollarSign size={24} />}
                    value={`$${stats.totalDonations.toLocaleString()}`}
                    label="Total Donations"
                    trend="+8.2%"
                    trendUp={true}
                    color="green"
                    description="Funds raised for current relief"
                />
                <StatCard
                    icon={<UserCheck size={24} />}
                    value={stats.volunteers}
                    label="Volunteers"
                    trend="+24"
                    trendUp={true}
                    color="purple"
                    description="Ready for deployment"
                />
            </div>

            {/* Secondary Stats Grid */}
            <h3 style={styles.sectionTitle}>System Activity</h3>
            <div style={styles.secondaryGrid}>
                <MiniStatCard
                    icon={<FileText size={20} />}
                    value={stats.pendingRequests}
                    label="Pending Requests"
                    color="orange"
                />
                <MiniStatCard
                    icon={<Package size={20} />}
                    value={stats.resources}
                    label="Resource Items"
                    color="cyan"
                />
                <MiniStatCard
                    icon={<BarChart3 size={20} />}
                    value={stats.reports}
                    label="Daily Reports"
                    color="yellow"
                />
                <MiniStatCard
                    icon={<Heart size={20} />}
                    value={stats.communities}
                    label="Communities"
                    color="pink"
                />
                <MiniStatCard
                    icon={<Activity size={20} />}
                    value="98%"
                    label="System Uptime"
                    color="emerald"
                />
                <MiniStatCard
                    icon={<Shield size={20} />}
                    value="Secure"
                    label="Security Status"
                    color="indigo"
                />
            </div>
        </div>
    );
};

const StatCard = ({ icon, value, label, trend, trendUp, color, description, alert }) => (
    <div style={styles.statCard}>
        <div style={styles.cardHeader}>
            <div style={{ ...styles.iconBox, background: `var(--color-${color}-500)`, boxShadow: `0 4px 12px var(--color-${color}-500-20)` }}>
                {icon}
            </div>
            <div style={{ ...styles.trendBadge, color: trendUp ? (alert ? '#ef4444' : '#10b981') : (alert ? '#10b981' : '#ef4444'), background: trendUp ? (alert ? '#fee2e2' : '#d1fae5') : (alert ? '#d1fae5' : '#fee2e2') }}>
                {trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {trend}
            </div>
        </div>
        <div style={styles.cardBody}>
            <div style={styles.statValue}>{value}</div>
            <div style={styles.statLabel}>{label}</div>
            <div style={styles.statDesc}>{description}</div>
        </div>
        <div style={{ ...styles.cardDecoration, background: `linear-gradient(135deg, var(--color-${color}-500) 0%, transparent 100%)` }} />
    </div>
);

const MiniStatCard = ({ icon, value, label, color }) => (
    <div style={styles.miniCard}>
        <div style={{ ...styles.miniIcon, color: `var(--color-${color}-500)` }}>
            {icon}
        </div>
        <div>
            <div style={styles.miniValue}>{value}</div>
            <div style={styles.miniLabel}>{label}</div>
        </div>
    </div>
);

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1600px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '2.5rem',
    },
    pageTitle: {
        fontSize: '2rem',
        fontWeight: '800',
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
        letterSpacing: '-0.025em',
    },
    pageSubtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '1rem',
    },
    dateBadge: {
        padding: '0.5rem 1rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.875rem',
        fontWeight: '500',
        color: 'var(--color-text-secondary)',
        border: '1px solid var(--glass-border)',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        position: 'relative',
        padding: '1.5rem',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '1rem',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'default',
        ':hover': {
            transform: 'translateY(-4px)',
            boxShadow: 'var(--shadow-lg)',
            borderColor: 'var(--color-primary-200)',
        }
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
        position: 'relative',
        zIndex: 2,
    },
    iconBox: {
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
    },
    trendBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        padding: '4px 8px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
    },
    cardBody: {
        position: 'relative',
        zIndex: 2,
    },
    statValue: {
        fontSize: '2.25rem',
        fontWeight: '800',
        color: 'var(--color-text)',
        marginBottom: '0.25rem',
        lineHeight: 1.2,
    },
    statLabel: {
        fontSize: '1rem',
        fontWeight: '600',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
    },
    statDesc: {
        fontSize: '0.875rem',
        color: 'var(--color-text-muted)',
    },
    cardDecoration: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        opacity: 0.1,
        borderRadius: '0 0 0 100%',
        pointerEvents: 'none',
    },
    sectionTitle: {
        fontSize: '1.25rem',
        fontWeight: '700',
        color: 'var(--color-text)',
        marginBottom: '1.5rem',
    },
    secondaryGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
    },
    miniCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1.25rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: '0.75rem',
        border: '1px solid var(--glass-border)',
        transition: 'all 0.2s ease',
        ':hover': {
            background: 'var(--color-bg-tertiary)',
            borderColor: 'var(--color-border)',
        }
    },
    miniIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'var(--color-bg)',
    },
    miniValue: {
        fontSize: '1.125rem',
        fontWeight: '700',
        color: 'var(--color-text)',
    },
    miniLabel: {
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
    },
};

export default AdminDashboard;

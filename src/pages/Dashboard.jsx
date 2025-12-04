import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { demoDashboardStats, demoAlerts } from '../data/demoData';
import { Users, AlertTriangle, HandHeart, UserCheck, Building2, TrendingUp, Phone } from 'lucide-react';
import AlertCard from '../components/AlertCard';

const Dashboard = () => {
    const { t } = useLanguage();

    const stats = [
        {
            icon: <UserCheck size={32} />,
            label: t('dashboard.peopleSafe'),
            value: demoDashboardStats.peopleSafe.toLocaleString(),
            color: 'var(--color-safe)',
            bgColor: 'rgba(16, 185, 129, 0.1)'
        },
        {
            icon: <AlertTriangle size={32} />,
            label: t('dashboard.activeAlerts'),
            value: demoDashboardStats.activeAlerts,
            color: 'var(--color-emergency)',
            bgColor: 'rgba(220, 38, 38, 0.1)'
        },
        {
            icon: <HandHeart size={32} />,
            label: t('dashboard.helpRequests'),
            value: demoDashboardStats.helpRequests,
            color: 'var(--color-warning)',
            bgColor: 'rgba(245, 158, 11, 0.1)'
        },
        {
            icon: <Users size={32} />,
            label: t('dashboard.volunteers'),
            value: demoDashboardStats.activeVolunteers,
            color: 'var(--color-info)',
            bgColor: 'rgba(59, 130, 246, 0.1)'
        }
    ];

    const quickActions = [
        { label: t('nav.safetyCheckIn'), path: '/safety', color: 'var(--gradient-safe)' },
        { label: t('nav.helpRequest'), path: '/help', color: 'var(--gradient-emergency)' },
        { label: t('nav.reporting'), path: '/reporting', color: 'var(--gradient-warning)' },
        { label: t('nav.volunteer'), path: '/volunteer', color: 'var(--color-info)' }
    ];

    return (
        <div className="container" style={styles.page}>
            {/* Header */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.title}>{t('dashboard.title')}</h1>
                    <p style={styles.subtitle}>Real-time disaster monitoring and emergency response</p>
                </div>
                {/* Emergency Call Button */}
                <a href="tel:119" style={styles.emergencyButton} className="emergency-pulse">
                    <Phone size={24} />
                    <div style={styles.emergencyText}>
                        <div style={styles.emergencyLabel}>Emergency</div>
                        <div style={styles.emergencyNumber}>119</div>
                    </div>
                </a>
            </div>

            {/* Stats Grid */}
            <div style={styles.statsGrid}>
                {stats.map((stat, index) => (
                    <div key={index} style={{ ...styles.statCard, background: stat.bgColor }}>
                        <div style={{ ...styles.statIcon, color: stat.color }}>
                            {stat.icon}
                        </div>
                        <div style={styles.statContent}>
                            <div style={styles.statValue}>{stat.value}</div>
                            <div style={styles.statLabel}>{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>{t('dashboard.quickActions')}</h2>
                <div style={styles.actionsGrid}>
                    {quickActions.map((action, index) => (
                        <Link key={index} to={action.path} style={{ ...styles.actionCard, background: action.color }}>
                            {action.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Recent Alerts */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>{t('dashboard.recentUpdates')}</h2>
                    <Link to="/alerts" style={styles.viewAllLink}>View All →</Link>
                </div>
                <div>
                    {demoAlerts.slice(0, 3).map((alert) => (
                        <AlertCard key={alert.id} alert={alert} />
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: {
        padding: '2rem 0',
        minHeight: 'calc(100vh - 200px)',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        background: 'linear-gradient(135deg, var(--color-emergency) 0%, var(--color-warning) 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
    },
    subtitle: {
        color: 'var(--color-text-secondary)',
        fontSize: '1.125rem',
    },
    emergencyButton: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.5rem',
        background: 'var(--gradient-emergency)',
        color: 'white',
        borderRadius: 'var(--radius-lg)',
        textDecoration: 'none',
        fontWeight: 700,
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(220, 38, 38, 0.4)',
        transition: 'all var(--transition-normal)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
    },
    emergencyText: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    emergencyLabel: {
        fontSize: '0.75rem',
        opacity: 0.9,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    },
    emergencyNumber: {
        fontSize: '1.5rem',
        fontWeight: 900,
        lineHeight: 1,
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem',
    },
    statCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        backdropFilter: 'var(--glass-blur)',
    },
    statIcon: {
        flexShrink: 0,
    },
    statContent: {
        flex: 1,
    },
    statValue: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1,
        marginBottom: '0.5rem',
    },
    statLabel: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        fontWeight: 500,
    },
    section: {
        marginBottom: '3rem',
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
    },
    sectionTitle: {
        fontSize: '1.75rem',
        fontWeight: 700,
    },
    viewAllLink: {
        color: 'var(--color-info)',
        fontWeight: 600,
        textDecoration: 'none',
        transition: 'color var(--transition-fast)',
    },
    actionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
    },
    actionCard: {
        padding: '1.5rem',
        borderRadius: 'var(--radius-lg)',
        color: 'white',
        fontWeight: 600,
        fontSize: '1.125rem',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-md)',
    },
};

// Add hover effect and pulse animation for emergency button
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes emergencyPulse {
    0%, 100% {
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4), 0 0 0 0 rgba(220, 38, 38, 0.7);
    }
    50% {
      box-shadow: 0 4px 20px rgba(220, 38, 38, 0.6), 0 0 0 10px rgba(220, 38, 38, 0);
    }
  }
  
  .emergency-pulse {
    animation: emergencyPulse 2s ease-in-out infinite;
  }
  
  a[href="tel:119"]:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 8px 24px rgba(220, 38, 38, 0.7) !important;
    animation: none;
  }
  a[href="tel:119"]:active {
    transform: translateY(-1px) scale(0.98);
  }
`;
document.head.appendChild(styleSheet);

export default Dashboard;

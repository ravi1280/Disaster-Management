import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useSidebar } from '../context/SidebarContext';
import {
    LayoutDashboard, Bell, Shield, Map, HandHeart, Building2, Users,
    FileText, BookOpen, Heart, Activity, DollarSign, Package, Zap,
    Cloud, AlertTriangle, MessageSquare, Phone, Globe, Menu, X, ChevronRight, ShieldCheck, UserCircle
} from 'lucide-react';

const Sidebar = () => {
    const { language, changeLanguage, t } = useLanguage();
    const { collapsed, setCollapsed } = useSidebar();
    const location = useLocation();

    const navItems = [
        { path: '/', label: t('nav.dashboard'), icon: <LayoutDashboard size={20} /> },
        { path: '/alerts', label: t('nav.alerts'), icon: <Bell size={20} /> },
        { path: '/safety', label: t('nav.safetyCheckIn'), icon: <Shield size={20} /> },
        { path: '/map', label: t('nav.map'), icon: <Map size={20} /> },
        { path: '/help', label: t('nav.helpRequest'), icon: <HandHeart size={20} /> },
        { path: '/resources', label: t('nav.resources'), icon: <Building2 size={20} /> },
        { path: '/volunteer', label: t('nav.volunteer'), icon: <Users size={20} /> },
        { path: '/reporting', label: t('nav.reporting'), icon: <FileText size={20} /> },
        { path: '/preparedness', label: t('nav.preparedness'), icon: <BookOpen size={20} /> },
        { path: '/health', label: t('nav.health'), icon: <Activity size={20} /> },
        { path: '/donation', label: t('nav.donation'), icon: <DollarSign size={20} /> },
        { path: '/lost-found', label: t('nav.lostFound'), icon: <Package size={20} /> },
        { path: '/utilities', label: t('nav.utilities'), icon: <Zap size={20} /> },
        { path: '/weather', label: t('nav.weather'), icon: <Cloud size={20} /> },
        { path: '/multi-hazard', label: t('nav.multiHazard'), icon: <AlertTriangle size={20} /> },
        { path: '/community', label: t('nav.community'), icon: <MessageSquare size={20} /> },
        { path: '/contacts', label: 'Emergency Contacts', icon: <UserCircle size={20} /> },
        { path: '/admin', label: 'Admin Panel', icon: <ShieldCheck size={20} />, special: true },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Sidebar */}
            <aside style={{
                ...styles.sidebar,
                width: collapsed ? '80px' : '280px',
            }}>
                {/* Logo & Toggle */}
                <div style={styles.sidebarHeader}>
                    {!collapsed && (
                        <div style={styles.logo}>
                            <div style={styles.logoIcon}>🚨</div>
                            <div style={styles.logoText}>
                                <div style={styles.logoTitle}>DMS</div>
                                <div style={styles.logoSubtitle}>Disaster Management</div>
                            </div>
                        </div>
                    )}
                    
                    {/* Toggle Button - Floating on the right edge */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            ...styles.toggleButton,
                            right: collapsed ? '50%' : '5px',
                            transform: collapsed ? 'translate(50%, -50%)' : 'translateY(-50%)',
                        }}
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <Menu size={20} /> : <X size={20} />}
                    </button>
                </div>

                {/* Navigation Links */}
                <nav style={styles.nav}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                ...styles.navLink,
                                ...(isActive(item.path) ? styles.navLinkActive : {}),
                                ...(item.special ? styles.navLinkSpecial : {})
                            }}
                            title={collapsed ? item.label : ''}
                        >
                            <span style={styles.navIcon}>{item.icon}</span>
                            {!collapsed && <span style={styles.navLabel}>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {/* Language Selector */}
                {!collapsed && (
                    <div style={styles.languageSelector}>
                        <Globe size={18} />
                        <select
                            value={language}
                            onChange={(e) => changeLanguage(e.target.value)}
                            style={styles.languageSelect}
                        >
                            <option value="en">English</option>
                            <option value="si">සිංහල</option>
                            <option value="ta">தமிழ்</option>
                        </select>
                    </div>
                )}
                {collapsed && (
                    <div style={{...styles.languageSelector, justifyContent: 'center'}}>
                        <Globe size={18} />
                    </div>
                )}
            </aside>

            {/* Mobile Overlay */}
            <style>{`
        @media (max-width: 768px) {
          aside {
            position: fixed !important;
            left: ${collapsed ? '-280px' : '0'} !important;
            z-index: 1000 !important;
            width: 280px !important;
            box-shadow: ${collapsed ? 'none' : '2px 0 10px rgba(0,0,0,0.3)'} !important;
          }
        }
      `}</style>
        </>
    );
};

const styles = {
    sidebar: {
        position: 'fixed',
        left: 0,
        top: 0,
        height: '100vh',
        background: 'var(--color-bg-secondary)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.3s ease',
        overflowY: 'auto',
        overflowX: 'hidden',
        zIndex: 100,
    },
    sidebarHeader: {
        padding: '1.5rem 1rem',
        borderBottom: '1px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '80px',
        position: 'relative',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        flex: 1,
    },
    logoIcon: {
        fontSize: '2rem',
    },
    logoText: {
        display: 'flex',
        flexDirection: 'column',
    },
    logoTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        lineHeight: 1,
        color: 'var(--color-text)',
    },
    logoSubtitle: {
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
    },
    toggleButton: {
        position: 'absolute',
        right: '5px',
        top: '50%',
        transform: 'translateY(-50%)',
        background: 'linear-gradient(135deg, var(--color-emergency) 0%, var(--color-emergency-dark) 100%)',
        border: '2px solid var(--color-bg-secondary)',
        color: 'white',
        cursor: 'pointer',
        padding: '0.5rem',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '32px',
        height: '32px',
        boxShadow: '0 4px 8px rgba(220, 38, 38, 0.3)',
        zIndex: 101,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
    nav: {
        flex: 1,
        padding: '1rem 0.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
    },
    navLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '0.75rem 1rem',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all var(--transition-fast)',
        position: 'relative',
    },
    navLinkActive: {
        background: 'var(--color-emergency)',
        color: 'white',
    },
    navLinkSpecial: {
        marginTop: '0.5rem',
        borderTop: '1px solid var(--glass-border)',
        paddingTop: '1rem',
        background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1) 0%, rgba(153, 27, 27, 0.1) 100%)',
        border: '1px solid rgba(220, 38, 38, 0.3)',
    },
    navIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    navLabel: {
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    languageSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem',
        borderTop: '1px solid var(--glass-border)',
        color: 'var(--color-text-secondary)',
    },
    languageSelect: {
        flex: 1,
        background: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        padding: '0.5rem',
        fontSize: '0.875rem',
        cursor: 'pointer',
        outline: 'none',
    },
};

// Add hover effects
// Add hover effects
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  aside a:hover {
    background: var(--color-bg-tertiary) !important;
  }
  aside a.active:hover {
    background: var(--color-emergency-dark) !important;
  }
  aside button:hover {
    box-shadow: 0 6px 16px rgba(220, 38, 38, 0.6) !important;
    scale: 1.15;
  }
  aside button:active {
    scale: 0.95;
  }
  
  /* Scrollbar styling */
  aside::-webkit-scrollbar {
    width: 6px;
  }
  aside::-webkit-scrollbar-track {
    background: transparent;
  }
  aside::-webkit-scrollbar-thumb {
    background: var(--color-bg-tertiary);
    border-radius: 3px;
  }
  aside::-webkit-scrollbar-thumb:hover {
    background: var(--color-text-muted);
  }
  
  /* Add smooth animation for sidebar transition */
  aside {
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  /* Add backdrop for collapsed state on mobile */
  @media (max-width: 768px) {
    aside button {
      right: -16px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Sidebar;

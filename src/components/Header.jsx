import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { Menu, X, Phone, Globe } from 'lucide-react';

const Header = () => {
    const { language, changeLanguage, t } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navLinks = [
        { path: '/', label: t('nav.dashboard') },
        { path: '/alerts', label: t('nav.alerts') },
        { path: '/safety', label: t('nav.safetyCheckIn') },
        { path: '/map', label: t('nav.map') },
        { path: '/help', label: t('nav.helpRequest') },
        { path: '/resources', label: t('nav.resources') },
        { path: '/volunteer', label: t('nav.volunteer') },
        { path: '/reporting', label: t('nav.reporting') },
    ];

    const moreLinks = [
        { path: '/preparedness', label: t('nav.preparedness') },
        { path: '/health', label: t('nav.health') },
        { path: '/donation', label: t('nav.donation') },
        { path: '/lost-found', label: t('nav.lostFound') },
        { path: '/utilities', label: t('nav.utilities') },
        { path: '/weather', label: t('nav.weather') },
        { path: '/multi-hazard', label: t('nav.multiHazard') },
        { path: '/community', label: t('nav.community') },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <header style={styles.header}>
            <div className="container">
                <div style={styles.headerContent}>
                    {/* Logo */}
                    <Link to="/" style={styles.logo}>
                        <div style={styles.logoIcon}>🚨</div>
                        <div style={styles.logoText}>
                            <div style={styles.logoTitle}>DMS</div>
                            <div style={styles.logoSubtitle}>Disaster Management</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav style={styles.desktopNav}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    ...styles.navLink,
                                    ...(isActive(link.path) ? styles.navLinkActive : {})
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {/* More Dropdown */}
                        <div className="dropdown" style={styles.dropdown}>
                            <button style={styles.navLink}>More ▾</button>
                            <div className="dropdownContent" style={styles.dropdownContent}>
                                {moreLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        style={styles.dropdownLink}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </nav>

                    {/* Right Section */}
                    <div style={styles.rightSection}>
                        {/* Emergency Hotline */}
                        <a href="tel:119" style={styles.hotline}>
                            <Phone size={18} />
                            <span>119</span>
                        </a>

                        {/* Language Selector */}
                        <div style={styles.languageSelector}>
                            <Globe size={18} />
                            <select
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                style={styles.languageSelect}
                            >
                                <option value="en">EN</option>
                                <option value="si">සිං</option>
                                <option value="ta">த</option>
                            </select>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            style={styles.mobileMenuButton}
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div style={styles.mobileMenu}>
                        {[...navLinks, ...moreLinks].map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    ...styles.mobileNavLink,
                                    ...(isActive(link.path) ? styles.mobileNavLinkActive : {})
                                }}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};

const styles = {
    header: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--glass-border)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '1rem 0',
    },
    headerContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        textDecoration: 'none',
        color: 'var(--color-text)',
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
    },
    logoSubtitle: {
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
    },
    desktopNav: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flex: 1,
    },
    navLink: {
        padding: '0.5rem 0.75rem',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        transition: 'all var(--transition-fast)',
        whiteSpace: 'nowrap',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
    },
    navLinkActive: {
        background: 'var(--color-emergency)',
        color: 'white',
    },
    dropdown: {
        position: 'relative',
    },
    dropdownContent: {
        display: 'none',
        position: 'absolute',
        top: '100%',
        right: 0,
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        padding: '0.5rem',
        minWidth: '200px',
        marginTop: '0.5rem',
        boxShadow: 'var(--shadow-xl)',
    },
    dropdownLink: {
        display: 'block',
        padding: '0.5rem 0.75rem',
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        borderRadius: 'var(--radius-sm)',
        transition: 'all var(--transition-fast)',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    hotline: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'var(--gradient-emergency)',
        color: 'white',
        borderRadius: 'var(--radius-md)',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '0.875rem',
    },
    languageSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)',
    },
    languageSelect: {
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text)',
        fontWeight: 600,
        fontSize: '0.875rem',
        cursor: 'pointer',
        outline: 'none',
    },
    mobileMenuButton: {
        display: 'none',
        background: 'transparent',
        border: 'none',
        color: 'var(--color-text)',
        cursor: 'pointer',
        padding: '0.5rem',
    },
    mobileMenu: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        marginTop: '1rem',
        padding: '1rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-lg)',
    },
    mobileNavLink: {
        padding: '0.75rem',
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)',
    },
    mobileNavLinkActive: {
        background: 'var(--color-emergency)',
        color: 'white',
    },
};

// Add hover effects via CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  .dropdown:hover .dropdownContent {
    display: block !important;
  }
  .dropdownContent a:hover {
    background: var(--color-bg-tertiary) !important;
    color: var(--color-text) !important;
  }
  @media (max-width: 1024px) {
    nav[style*="desktopNav"] {
      display: none !important;
    }
    button[style*="mobileMenuButton"] {
      display: block !important;
    }
  }
  @media (min-width: 1025px) {
    div[style*="mobileMenu"] {
      display: none !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Header;

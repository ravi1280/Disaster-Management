import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer style={styles.footer}>
            <div className="container">
                <div style={styles.footerContent}>
                    {/* About Section */}
                    <div style={styles.footerSection}>
                        <h3 style={styles.footerTitle}>Disaster Management System</h3>
                        <p style={styles.footerText}>
                            Real-time disaster alerts, safety check-ins, and emergency resources for Sri Lanka.
                            Stay safe, stay informed.
                        </p>
                        <div style={styles.socialLinks}>
                            <a href="#" style={styles.socialLink}><Facebook size={20} /></a>
                            <a href="#" style={styles.socialLink}><Twitter size={20} /></a>
                            <a href="#" style={styles.socialLink}><Instagram size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Quick Links</h4>
                        <ul style={styles.linkList}>
                            <li><a href="/" style={styles.footerLink}>Dashboard</a></li>
                            <li><a href="/alerts" style={styles.footerLink}>Alerts</a></li>
                            <li><a href="/map" style={styles.footerLink}>Disaster Map</a></li>
                            <li><a href="/help" style={styles.footerLink}>Request Help</a></li>
                            <li><a href="/volunteer" style={styles.footerLink}>Volunteer</a></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Resources</h4>
                        <ul style={styles.linkList}>
                            <li><a href="/preparedness" style={styles.footerLink}>Preparedness Guide</a></li>
                            <li><a href="/health" style={styles.footerLink}>Health Support</a></li>
                            <li><a href="/weather" style={styles.footerLink}>Weather Tracking</a></li>
                            <li><a href="/community" style={styles.footerLink}>Community Forum</a></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div style={styles.footerSection}>
                        <h4 style={styles.footerSectionTitle}>Emergency Contact</h4>
                        <div style={styles.contactInfo}>
                            <div style={styles.contactItem}>
                                <Phone size={16} />
                                <span>119 (Emergency)</span>
                            </div>
                            <div style={styles.contactItem}>
                                <Phone size={16} />
                                <span>117 (Police)</span>
                            </div>
                            <div style={styles.contactItem}>
                                <Phone size={16} />
                                <span>110 (Fire)</span>
                            </div>
                            <div style={styles.contactItem}>
                                <Mail size={16} />
                                <span>disaster@gov.lk</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div style={styles.bottomBar}>
                    <p style={styles.copyright}>
                        © 2024 Disaster Management System. All rights reserved.
                    </p>
                    <div style={styles.bottomLinks}>
                        <a href="#" style={styles.bottomLink}>Privacy Policy</a>
                        <span style={styles.separator}>•</span>
                        <a href="#" style={styles.bottomLink}>Terms of Service</a>
                        <span style={styles.separator}>•</span>
                        <a href="#" style={styles.bottomLink}>Contact Us</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        background: 'var(--color-bg-secondary)',
        borderTop: '1px solid var(--glass-border)',
        marginTop: 'auto',
        padding: '3rem 0 1rem',
    },
    footerContent: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
    },
    footerSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    footerTitle: {
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
    },
    footerSectionTitle: {
        fontSize: '1rem',
        fontWeight: 600,
        color: 'var(--color-text)',
        marginBottom: '0.5rem',
    },
    footerText: {
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
        lineHeight: 1.6,
    },
    socialLinks: {
        display: 'flex',
        gap: '1rem',
    },
    socialLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        background: 'var(--color-bg-tertiary)',
        borderRadius: '50%',
        color: 'var(--color-text-secondary)',
        transition: 'all var(--transition-fast)',
        textDecoration: 'none',
    },
    linkList: {
        listStyle: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    footerLink: {
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'color var(--transition-fast)',
    },
    contactInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    contactItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: 'var(--color-text-secondary)',
        fontSize: '0.875rem',
    },
    bottomBar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid var(--glass-border)',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    copyright: {
        color: 'var(--color-text-muted)',
        fontSize: '0.875rem',
    },
    bottomLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
    },
    bottomLink: {
        color: 'var(--color-text-muted)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        transition: 'color var(--transition-fast)',
    },
    separator: {
        color: 'var(--color-text-muted)',
    },
};

export default Footer;

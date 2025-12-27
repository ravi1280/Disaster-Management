import React from 'react';
import { Shield, Lock, ExternalLink } from 'lucide-react';

const AdminFooter = () => {
    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.leftSection}>
                    <p style={styles.copyright}>
                        &copy; {new Date().getFullYear()} Disaster Management System. All rights reserved.
                    </p>
                    <div style={styles.badges}>
                        <span style={styles.badge}>
                            <Shield size={12} />
                            Admin Secure Area
                        </span>
                        <span style={styles.badge}>
                            <Lock size={12} />
                            Encrypted
                        </span>
                    </div>
                </div>

                <div style={styles.rightSection}>
                    <a href="#" style={styles.link}>Support</a>
                    <span style={styles.separator}>&bull;</span>
                    <a href="#" style={styles.link}>Documentation</a>
                    <span style={styles.separator}>&bull;</span>
                    <a href="/" style={styles.link}>
                        View Public Site
                        <ExternalLink size={12} style={{ marginLeft: '4px' }} />
                    </a>
                </div>
            </div>
        </footer>
    );
};

const styles = {
    footer: {
        marginTop: 'auto',
        padding: '1.5rem 2rem',
        borderTop: '1px solid var(--glass-border)',
        background: 'var(--color-bg-secondary)',
    },
    container: {
        maxWidth: '1600px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    leftSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        flexWrap: 'wrap',
    },
    copyright: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    badges: {
        display: 'flex',
        gap: '0.75rem',
    },
    badge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
        fontSize: '0.75rem',
        padding: '0.25rem 0.5rem',
        borderRadius: '4px',
        background: 'var(--color-bg-tertiary)',
        color: 'var(--color-text-muted)',
        border: '1px solid var(--glass-border)',
    },
    rightSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        ':hover': {
            color: 'var(--color-primary)',
        }
    },
    separator: {
        color: 'var(--color-text-muted)',
    }
};

export default AdminFooter;

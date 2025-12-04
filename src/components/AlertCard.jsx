import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

const AlertCard = ({ alert }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'emergency':
                return 'var(--color-emergency)';
            case 'warning':
                return 'var(--color-warning)';
            case 'info':
                return 'var(--color-info)';
            default:
                return 'var(--color-text-secondary)';
        }
    };

    const getSeverityIcon = (severity) => {
        switch (severity) {
            case 'emergency':
                return <AlertTriangle size={24} />;
            case 'warning':
                return <AlertCircle size={24} />;
            default:
                return <Info size={24} />;
        }
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);

        if (diffMins < 60) {
            return `${diffMins} minutes ago`;
        } else if (diffHours < 24) {
            return `${diffHours} hours ago`;
        } else {
            return date.toLocaleDateString();
        }
    };

    return (
        <div style={{
            ...styles.card,
            borderLeft: `4px solid ${getSeverityColor(alert.severity)}`
        }}>
            <div style={styles.cardHeader}>
                <div style={{
                    ...styles.iconContainer,
                    background: `${getSeverityColor(alert.severity)}20`,
                    color: getSeverityColor(alert.severity)
                }}>
                    {getSeverityIcon(alert.severity)}
                </div>
                <div style={styles.headerContent}>
                    <div style={styles.titleRow}>
                        <h3 style={styles.title}>{alert.title}</h3>
                        <span style={{
                            ...styles.badge,
                            background: getSeverityColor(alert.severity)
                        }}>
                            {alert.severity.toUpperCase()}
                        </span>
                    </div>
                    <div style={styles.meta}>
                        <span style={styles.metaItem}>{alert.district}</span>
                        <span style={styles.separator}>•</span>
                        <span style={styles.metaItem}>{alert.type}</span>
                        <span style={styles.separator}>•</span>
                        <span style={styles.metaItem}>{formatTime(alert.issuedAt)}</span>
                    </div>
                </div>
            </div>

            <p style={styles.description}>{alert.description}</p>

            {alert.affectedAreas && alert.affectedAreas.length > 0 && (
                <div style={styles.affectedAreas}>
                    <strong>Affected Areas:</strong> {alert.affectedAreas.join(', ')}
                </div>
            )}
        </div>
    );
};

const styles = {
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-md)',
    },
    cardHeader: {
        display: 'flex',
        gap: 'var(--spacing-md)',
        marginBottom: 'var(--spacing-sm)',
    },
    iconContainer: {
        width: '48px',
        height: '48px',
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    headerContent: {
        flex: 1,
    },
    titleRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 'var(--spacing-sm)',
        marginBottom: 'var(--spacing-xs)',
    },
    title: {
        fontSize: '1.125rem',
        fontWeight: 600,
        margin: 0,
        flex: 1,
    },
    badge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'white',
        whiteSpace: 'nowrap',
    },
    meta: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        flexWrap: 'wrap',
    },
    metaItem: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    separator: {
        color: 'var(--color-text-muted)',
    },
    description: {
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: '0 0 var(--spacing-sm) 0',
    },
    affectedAreas: {
        padding: 'var(--spacing-sm)',
        background: 'var(--color-bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
};

export default AlertCard;

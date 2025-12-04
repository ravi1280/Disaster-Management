import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoHelpRequests } from '../data/demoData';
import { Package, Droplet, Pill, AlertTriangle, Home } from 'lucide-react';

const HelpRequest = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        type: 'food',
        priority: 'moderate',
        location: '',
        description: '',
        contactNumber: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Help request submitted! (Demo mode)');
        // In real app, send to backend
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'food': return <Package size={20} />;
            case 'water': return <Droplet size={20} />;
            case 'medicine': return <Pill size={20} />;
            case 'rescue': return <AlertTriangle size={20} />;
            case 'shelter': return <Home size={20} />;
            default: return <Package size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'var(--color-warning)';
            case 'inProgress': return 'var(--color-info)';
            case 'completed': return 'var(--color-safe)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('help.title')}</h1>

            <div style={styles.grid}>
                {/* Request Form */}
                <div style={styles.formCard}>
                    <h2 style={styles.cardTitle}>{t('help.submitRequest')}</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">{t('help.requestType')}</label>
                            <select
                                className="form-select"
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                            >
                                <option value="food">{t('help.food')}</option>
                                <option value="water">{t('help.water')}</option>
                                <option value="medicine">{t('help.medicine')}</option>
                                <option value="rescue">{t('help.rescue')}</option>
                                <option value="shelter">{t('help.shelter')}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('help.priority')}</label>
                            <select
                                className="form-select"
                                value={formData.priority}
                                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                            >
                                <option value="urgent">{t('common.urgent')}</option>
                                <option value="moderate">{t('common.moderate')}</option>
                                <option value="low">{t('common.low')}</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('help.location')}</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                placeholder="Enter your location"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('help.description')}</label>
                            <textarea
                                className="form-textarea"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Describe your situation and what help you need"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">{t('help.contactNumber')}</label>
                            <input
                                type="tel"
                                className="form-input"
                                value={formData.contactNumber}
                                onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                                placeholder="+94 XX XXX XXXX"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                            {t('help.submitRequest')}
                        </button>
                    </form>
                </div>

                {/* Existing Requests */}
                <div style={styles.requestsCard}>
                    <h2 style={styles.cardTitle}>{t('help.trackRequests')}</h2>
                    <div style={styles.requestsList}>
                        {demoHelpRequests.map(request => (
                            <div key={request.id} style={styles.requestItem}>
                                <div style={styles.requestHeader}>
                                    <div style={styles.requestType}>
                                        {getTypeIcon(request.type)}
                                        <span>{request.type.toUpperCase()}</span>
                                    </div>
                                    <span style={{
                                        ...styles.statusBadge,
                                        background: getStatusColor(request.status)
                                    }}>
                                        {request.status}
                                    </span>
                                </div>
                                <p style={styles.requestDesc}>{request.description}</p>
                                <div style={styles.requestMeta}>
                                    <span>📍 {request.location}</span>
                                    <span>⏰ {new Date(request.requestedAt).toLocaleString()}</span>
                                </div>
                                <div style={styles.requestPriority}>
                                    Priority: <strong style={{
                                        color: request.priority === 'urgent' ? 'var(--color-emergency)' : 'var(--color-warning)'
                                    }}>{request.priority.toUpperCase()}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
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
    title: {
        fontSize: '2.5rem',
        fontWeight: 700,
        marginBottom: '2rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem',
    },
    formCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
    },
    requestsCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
    },
    cardTitle: {
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '1.5rem',
    },
    requestsList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        maxHeight: '600px',
        overflowY: 'auto',
    },
    requestItem: {
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1rem',
    },
    requestHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.75rem',
    },
    requestType: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontWeight: 600,
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'white',
    },
    requestDesc: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.75rem',
    },
    requestMeta: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        marginBottom: '0.5rem',
    },
    requestPriority: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
};

export default HelpRequest;

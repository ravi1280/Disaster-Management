import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoReports } from '../data/demoData';
import { Camera, ThumbsUp, AlertTriangle } from 'lucide-react';

const CrowdsourcedReporting = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ type: 'flooding', location: '', description: '', severity: 'moderate' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Report submitted! (Demo mode)');
    };

    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'high': return 'var(--color-emergency)';
            case 'moderate': return 'var(--color-warning)';
            case 'low': return 'var(--color-info)';
            default: return 'var(--color-text-secondary)';
        }
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('nav.reporting')}</h1>

            <div style={styles.grid}>
                <div style={styles.formCard}>
                    <h2 style={styles.cardTitle}>Submit Incident Report</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Incident Type</label>
                            <select className="form-select" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                                <option value="flooding">Flooding</option>
                                <option value="roadBlock">Road Block</option>
                                <option value="landslide">Landslide</option>
                                <option value="damage">Property Damage</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Location</label>
                            <input type="text" className="form-input" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Enter location" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Description</label>
                            <textarea className="form-textarea" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe what you observed" required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Severity</label>
                            <select className="form-select" value={formData.severity} onChange={(e) => setFormData({ ...formData, severity: e.target.value })}>
                                <option value="high">High</option>
                                <option value="moderate">Moderate</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Upload Photo (Optional)</label>
                            <div style={styles.uploadArea}>
                                <Camera size={32} />
                                <p>Click to upload or drag and drop</p>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                            <AlertTriangle size={20} />
                            Submit Report
                        </button>
                    </form>
                </div>

                <div style={styles.reportsCard}>
                    <h2 style={styles.cardTitle}>Recent Reports</h2>
                    <div style={styles.reportsList}>
                        {demoReports.map(report => (
                            <div key={report.id} style={styles.reportItem}>
                                <div style={styles.reportHeader}>
                                    <h3 style={styles.reportType}>{report.type.toUpperCase()}</h3>
                                    <span style={{ ...styles.severityBadge, background: getSeverityColor(report.severity) }}>
                                        {report.severity}
                                    </span>
                                </div>
                                <p style={styles.reportDesc}>{report.description}</p>
                                <p style={styles.reportLocation}>📍 {report.location}</p>
                                <div style={styles.reportFooter}>
                                    <span style={styles.reportBy}>By: {report.reportedBy}</span>
                                    <span style={styles.reportTime}>{new Date(report.reportedAt).toLocaleString()}</span>
                                </div>
                                <div style={styles.reportActions}>
                                    <button style={styles.voteButton}>
                                        <ThumbsUp size={16} />
                                        {report.votes}
                                    </button>
                                    {report.verified && <span style={styles.verifiedBadge}>✓ Verified</span>}
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
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' },
    formCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' },
    reportsCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' },
    cardTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' },
    uploadArea: { border: '2px dashed var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '2rem', textAlign: 'center', color: 'var(--color-text-secondary)', cursor: 'pointer', transition: 'all var(--transition-fast)' },
    reportsList: { display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '600px', overflowY: 'auto' },
    reportItem: { background: 'var(--color-bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '1rem' },
    reportHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' },
    reportType: { fontSize: '1rem', fontWeight: 600, margin: 0 },
    severityBadge: { padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 700, color: 'white' },
    reportDesc: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' },
    reportLocation: { fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' },
    reportFooter: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' },
    reportBy: {},
    reportTime: {},
    reportActions: { display: 'flex', alignItems: 'center', gap: '1rem' },
    voteButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', background: 'var(--color-bg-tertiary)', border: 'none', borderRadius: 'var(--radius-md)', color: 'var(--color-text)', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 600 },
    verifiedBadge: { padding: '0.25rem 0.75rem', background: 'var(--color-safe)', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }
};

export default CrowdsourcedReporting;

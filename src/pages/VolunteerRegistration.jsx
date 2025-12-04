import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoVolunteers, demoHelpRequests, districts } from '../data/demoData';
import { UserPlus, CheckCircle, Clock } from 'lucide-react';

const VolunteerRegistration = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', phone: '', district: 'Colombo', skills: [] });

    const skillOptions = ['First Aid', 'Rescue Operations', 'Medical Support', 'Food Distribution', 'Logistics', 'Counseling'];

    const handleSkillToggle = (skill) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill]
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Registration submitted! (Demo mode)');
    };

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('nav.volunteer')}</h1>

            <div style={styles.grid}>
                <div style={styles.formCard}>
                    <h2 style={styles.cardTitle}>Register as Volunteer</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label className="form-label">Full Name</label>
                            <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">Phone Number</label>
                            <input type="tel" className="form-input" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label className="form-label">District</label>
                            <select className="form-select" value={formData.district} onChange={(e) => setFormData({ ...formData, district: e.target.value })}>
                                {districts.map(d => <option key={d} value={d}>{d}</option>)}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Skills</label>
                            <div style={styles.skillsGrid}>
                                {skillOptions.map(skill => (
                                    <button key={skill} type="button" onClick={() => handleSkillToggle(skill)} style={{
                                        ...styles.skillButton,
                                        background: formData.skills.includes(skill) ? 'var(--color-info)' : 'var(--color-bg-tertiary)'
                                    }}>
                                        {formData.skills.includes(skill) && <CheckCircle size={16} />}
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                            <UserPlus size={20} />
                            Register
                        </button>
                    </form>
                </div>

                <div style={styles.tasksCard}>
                    <h2 style={styles.cardTitle}>Nearby Help Requests</h2>
                    <div style={styles.tasksList}>
                        {demoHelpRequests.filter(r => r.status === 'pending').map(request => (
                            <div key={request.id} style={styles.taskItem}>
                                <h3 style={styles.taskTitle}>{request.type.toUpperCase()} - {request.priority}</h3>
                                <p style={styles.taskDesc}>{request.description}</p>
                                <p style={styles.taskLocation}>📍 {request.location}</p>
                                <button className="btn btn-success btn-sm">Accept Task</button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.volunteersSection}>
                <h2 style={styles.sectionTitle}>Active Volunteers</h2>
                <div style={styles.volunteersGrid}>
                    {demoVolunteers.map(volunteer => (
                        <div key={volunteer.id} style={styles.volunteerCard}>
                            <h3>{volunteer.name}</h3>
                            <p>{volunteer.district}</p>
                            <div style={styles.skills}>
                                {volunteer.skills.map(skill => <span key={skill} style={styles.skillBadge}>{skill}</span>)}
                            </div>
                            <p style={styles.taskCount}>✓ {volunteer.tasksCompleted} tasks completed</p>
                            <div style={{ ...styles.statusDot, background: volunteer.available ? 'var(--color-safe)' : 'var(--color-text-muted)' }}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem', marginBottom: '3rem' },
    formCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' },
    tasksCard: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '2rem' },
    cardTitle: { fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' },
    skillsGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' },
    skillButton: { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem', border: 'none', borderRadius: 'var(--radius-md)', color: 'white', fontWeight: 600, cursor: 'pointer', transition: 'all var(--transition-fast)', fontSize: '0.875rem' },
    tasksList: { display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '500px', overflowY: 'auto' },
    taskItem: { background: 'var(--color-bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-md)', padding: '1rem' },
    taskTitle: { fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' },
    taskDesc: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem' },
    taskLocation: { fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' },
    volunteersSection: { marginTop: '3rem' },
    sectionTitle: { fontSize: '1.75rem', fontWeight: 700, marginBottom: '1.5rem' },
    volunteersGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' },
    volunteerCard: { background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', position: 'relative' },
    skills: { display: 'flex', flexWrap: 'wrap', gap: '0.5rem', margin: '0.75rem 0' },
    skillBadge: { padding: '0.25rem 0.5rem', background: 'var(--color-bg-tertiary)', borderRadius: '9999px', fontSize: '0.75rem' },
    taskCount: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' },
    statusDot: { position: 'absolute', top: '1rem', right: '1rem', width: '12px', height: '12px', borderRadius: '50%' }
};

export default VolunteerRegistration;

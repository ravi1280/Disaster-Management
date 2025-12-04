import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoResources, districts } from '../data/demoData';
import { Hospital, Shield, Flame, Home, Phone, MapPin } from 'lucide-react';

const ResourceDirectory = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [districtFilter, setDistrictFilter] = useState('all');

    const getIcon = (type) => {
        switch (type) {
            case 'hospital': return <Hospital size={24} />;
            case 'police': return <Shield size={24} />;
            case 'fire': return <Flame size={24} />;
            case 'shelter': return <Home size={24} />;
            default: return <Phone size={24} />;
        }
    };

    const filteredResources = demoResources.filter(resource => {
        const typeMatch = filter === 'all' || resource.type === filter;
        const districtMatch = districtFilter === 'all' || resource.district === districtFilter;
        return typeMatch && districtMatch;
    });

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('nav.resources')}</h1>
            <p style={styles.subtitle}>Emergency contacts and resource locations</p>

            {/* Filters */}
            <div style={styles.filters}>
                <select className="form-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="all">All Types</option>
                    <option value="hospital">Hospitals</option>
                    <option value="police">Police Stations</option>
                    <option value="fire">Fire Departments</option>
                    <option value="shelter">Shelters</option>
                    <option value="relief">Relief Organizations</option>
                </select>

                <select className="form-select" value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
                    <option value="all">All Districts</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            {/* Resources Grid */}
            <div style={styles.grid}>
                {filteredResources.map(resource => (
                    <div key={resource.id} style={styles.card}>
                        <div style={styles.cardHeader}>
                            <div style={styles.iconContainer}>
                                {getIcon(resource.type)}
                            </div>
                            <div style={styles.headerContent}>
                                <h3 style={styles.resourceName}>{resource.name}</h3>
                                <span style={styles.resourceType}>{resource.type.toUpperCase()}</span>
                            </div>
                        </div>

                        <div style={styles.cardBody}>
                            <div style={styles.infoItem}>
                                <MapPin size={16} />
                                <span>{resource.address}</span>
                            </div>
                            <div style={styles.infoItem}>
                                <Phone size={16} />
                                <a href={`tel:${resource.phone}`} style={styles.phoneLink}>{resource.phone}</a>
                            </div>
                            {resource.available24x7 && (
                                <div style={styles.badge24x7}>24/7 Available</div>
                            )}
                            {resource.capacity && (
                                <div style={styles.capacityInfo}>
                                    Capacity: {resource.currentOccupancy || 0} / {resource.capacity}
                                </div>
                            )}
                        </div>

                        <a href={`tel:${resource.phone}`} className="btn btn-primary" style={{ width: '100%' }}>
                            <Phone size={18} />
                            Call Now
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    filters: { display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    cardHeader: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    iconContainer: { width: '48px', height: '48px', background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-info)', flexShrink: 0 },
    headerContent: { flex: 1 },
    resourceName: { fontSize: '1.125rem', fontWeight: 600, margin: 0, marginBottom: '0.25rem' },
    resourceType: { fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 },
    cardBody: { marginBottom: '1rem' },
    infoItem: { display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' },
    phoneLink: { color: 'var(--color-info)', textDecoration: 'none', fontWeight: 600 },
    badge24x7: { display: 'inline-block', padding: '0.25rem 0.75rem', background: 'var(--color-safe)', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, marginTop: '0.5rem' },
    capacityInfo: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }
};

export default ResourceDirectory;

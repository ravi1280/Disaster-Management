import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminDashboard from '../components/admin/AdminDashboard';
import AlertManagement from '../components/admin/AlertManagement';
import DisasterMapManagement from '../components/admin/DisasterMapManagement';
import RequestHelpManagement from '../components/admin/RequestHelpManagement';
import ResourceManagement from '../components/admin/ResourceManagement';
import VolunteerManagement from '../components/admin/VolunteerManagement';
import IncidentReportManagement from '../components/admin/IncidentReportManagement';
import HealthMedicalManagement from '../components/admin/HealthMedicalManagement';
import DonationManagement from '../components/admin/DonationManagement';
import LostFoundManagement from '../components/admin/LostFoundManagement';
import UtilityTrackerManagement from '../components/admin/UtilityTrackerManagement';
import WeatherManagement from '../components/admin/WeatherManagement';
import AdminFooter from '../components/admin/AdminFooter';

// Placeholder components for new modules
const PlaceholderModule = ({ title }) => (
    <div style={{ padding: '2rem', color: 'var(--color-text)' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>{title} Management</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>This module is currently under development.</p>
    </div>
);

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <AdminDashboard />;
            case 'alerts': return <AlertManagement />;
            case 'map': return <DisasterMapManagement />;
            case 'requests': return <RequestHelpManagement />;
            case 'resources': return <ResourceManagement />;
            case 'volunteers': return <VolunteerManagement />;
            case 'reports': return <IncidentReportManagement />;
            case 'health': return <HealthMedicalManagement />;
            case 'donations': return <DonationManagement />;
            case 'lost-found': return <LostFoundManagement />;
            case 'utilities': return <UtilityTrackerManagement />;
            case 'weather': return <WeatherManagement />;
            default: return <AdminDashboard />;
        }
    };

    return (
        <div style={styles.container}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div style={styles.content}>
                <div style={styles.scrollableContent}>
                    {renderContent()}
                </div>
                <AdminFooter />
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        height: '100vh',
        background: 'var(--color-bg)',
        overflow: 'hidden',
    },
    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-bg)',
        overflow: 'hidden',
    },
    scrollableContent: {
        flex: 1,
        overflowY: 'auto',
    }
};

export default AdminPanel;

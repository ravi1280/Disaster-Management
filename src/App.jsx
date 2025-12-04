import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { SidebarProvider, useSidebar } from './context/SidebarContext';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

// Pages
import Dashboard from './pages/Dashboard';
import AlertSystem from './pages/AlertSystem';
import SafetyCheckIn from './pages/SafetyCheckIn';
import DisasterMap from './pages/DisasterMap';
import HelpRequest from './pages/HelpRequest';
import ResourceDirectory from './pages/ResourceDirectory';
import VolunteerRegistration from './pages/VolunteerRegistration';
import CrowdsourcedReporting from './pages/CrowdsourcedReporting';
import Preparedness from './pages/Preparedness';
import HealthSupport from './pages/HealthSupport';
import DonationSystem from './pages/DonationSystem';
import LostAndFound from './pages/LostAndFound';
import UtilityStatus from './pages/UtilityStatus';
import WeatherTracking from './pages/WeatherTracking';
import MultiHazardSupport from './pages/MultiHazardSupport';
import CommunityForums from './pages/CommunityForums';

function App() {
    return (
        <LanguageProvider>
            <SidebarProvider>
                <Router>
                    <AppContent />
                </Router>
            </SidebarProvider>
        </LanguageProvider>
    );
}

const AppContent = () => {
    const { collapsed } = useSidebar();

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar />
            <div 
                className="main-content"
                style={{
                    flex: 1,
                    marginLeft: collapsed ? '80px' : '280px',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    width: '100%',
                }}>
                <main style={{ flex: 1, width: '100%' }}>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/alerts" element={<AlertSystem />} />
                        <Route path="/safety" element={<SafetyCheckIn />} />
                        <Route path="/map" element={<DisasterMap />} />
                        <Route path="/help" element={<HelpRequest />} />
                        <Route path="/resources" element={<ResourceDirectory />} />
                        <Route path="/volunteer" element={<VolunteerRegistration />} />
                        <Route path="/reporting" element={<CrowdsourcedReporting />} />
                        <Route path="/preparedness" element={<Preparedness />} />
                        <Route path="/health" element={<HealthSupport />} />
                        <Route path="/donation" element={<DonationSystem />} />
                        <Route path="/lost-found" element={<LostAndFound />} />
                        <Route path="/utilities" element={<UtilityStatus />} />
                        <Route path="/weather" element={<WeatherTracking />} />
                        <Route path="/multi-hazard" element={<MultiHazardSupport />} />
                        <Route path="/community" element={<CommunityForums />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </div>
    );
};

export default App;

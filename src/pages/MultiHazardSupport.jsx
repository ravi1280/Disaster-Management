import React from 'react';
import { AlertTriangle } from 'lucide-react';

const MultiHazardSupport = () => {
    const hazards = [
        {
            name: 'Floods',
            icon: '🌊',
            description: 'Flooding is the most common natural disaster in Sri Lanka, especially during monsoon seasons.',
            preparation: 'Keep emergency supplies ready, identify evacuation routes, elevate electrical appliances and valuables',
            warningSigns: 'Heavy rainfall for several hours, rising water levels in rivers, official flood warnings',
            safety: 'Move to higher ground immediately, avoid walking or driving through flood water (6 inches can knock you down, 2 feet can sweep away vehicles), turn off utilities if instructed, never touch electrical equipment if wet',
            afterMath: 'Wait for authorities to declare area safe, avoid flood water (may be contaminated), document damage for insurance'
        },
        {
            name: 'Landslides',
            icon: '⛰️',
            description: 'Common in hilly areas during heavy rainfall, landslides can occur suddenly and cause severe damage.',
            preparation: 'Know your area\'s landslide risk, plant ground cover on slopes, build retaining walls if needed',
            warningSigns: 'Cracks in ground or pavement, tilting trees or poles, sudden decrease in water level in streams, unusual sounds like trees cracking',
            safety: 'Evacuate immediately if you suspect danger, move away from the path of the landslide, watch for debris flows, avoid steep slopes during heavy rain',
            afterMath: 'Stay away from the slide area, watch for flooding which may occur after landslide, check for injured or trapped persons'
        },
        {
            name: 'Cyclones',
            icon: '🌀',
            description: 'Tropical cyclones bring strong winds, heavy rain, and storm surges to coastal areas.',
            preparation: 'Stock up on food, water, and medicine for at least 3 days, secure loose objects outdoors, board up windows, charge all devices',
            warningSigns: 'Official cyclone warnings from meteorological department, rapidly falling barometric pressure, increasing wind speeds',
            safety: 'Stay indoors away from windows, go to interior room on lowest floor, listen to emergency broadcasts, do not go outside during the eye of the storm',
            afterMath: 'Wait for all-clear from authorities, avoid downed power lines, be careful of structural damage, watch for flooding'
        },
        {
            name: 'Droughts',
            icon: '☀️',
            description: 'Extended periods of low rainfall can lead to water scarcity and agricultural impacts.',
            preparation: 'Install water-saving devices, collect and store rainwater, reduce water usage in daily activities',
            warningSigns: 'Below-normal rainfall for extended period, dropping water levels in reservoirs, official drought declarations',
            safety: 'Conserve water strictly, follow rationing guidelines, store emergency water supply (1 gallon per person per day), avoid wasting water on non-essential activities',
            afterMath: 'Continue water conservation practices, repair any water leaks, maintain emergency water storage'
        },
        {
            name: 'Earthquakes',
            icon: '🏚️',
            description: 'Though less common in Sri Lanka, earthquakes can occur and cause significant damage.',
            preparation: 'Secure heavy furniture to walls, identify safe spots in each room (under sturdy tables), keep emergency supplies accessible',
            warningSigns: 'Earthquakes often occur without warning, but animals may behave strangely beforehand',
            safety: 'DROP to hands and knees, take COVER under sturdy furniture, HOLD ON until shaking stops. If outdoors, move away from buildings and power lines. If in vehicle, stop safely and stay inside',
            afterMath: 'Check for injuries, inspect home for damage, be prepared for aftershocks, turn off gas if you smell leaks'
        },
        {
            name: 'Tsunamis',
            icon: '🌊',
            description: 'Large ocean waves caused by underwater earthquakes can devastate coastal areas.',
            preparation: 'Know tsunami evacuation routes in coastal areas, practice evacuation drills, keep emergency kit ready',
            warningSigns: 'Strong earthquake felt in coastal area, rapid rise or fall in sea level, roaring sound from ocean, official tsunami warnings',
            safety: 'Move inland and to higher ground immediately (at least 30 meters above sea level or 3 km inland), do not wait for official warning if you feel strong earthquake, do not return until authorities say it\'s safe',
            afterMath: 'Stay away from coast for several hours, listen to official updates, be aware of multiple waves'
        }
    ];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Multi-Hazard Support</h1>
            <p style={styles.subtitle}>Comprehensive safety guidelines for different types of disasters</p>

            <div style={styles.grid}>
                {hazards.map((hazard, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.hazardIcon}>{hazard.icon}</div>
                        <h3 style={styles.hazardName}>{hazard.name}</h3>
                        <p style={styles.description}>{hazard.description}</p>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>⚠️ Warning Signs</h4>
                            <p style={styles.sectionContent}>{hazard.warningSigns}</p>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>🛡️ Preparation</h4>
                            <p style={styles.sectionContent}>{hazard.preparation}</p>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>🚨 During Emergency</h4>
                            <p style={styles.sectionContent}>{hazard.safety}</p>
                        </div>

                        <div style={styles.section}>
                            <h4 style={styles.sectionTitle}>✅ After Event</h4>
                            <p style={styles.sectionContent}>{hazard.afterMath}</p>
                        </div>
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
    grid: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        maxWidth: '900px',
        margin: '0 auto'
    },
    card: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        transition: 'all var(--transition-normal)'
    },
    hazardIcon: {
        fontSize: '4rem',
        marginBottom: '1rem',
        textAlign: 'center'
    },
    hazardName: {
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '0.75rem',
        textAlign: 'center'
    },
    description: {
        fontSize: '0.95rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
        textAlign: 'center',
        lineHeight: 1.5,
        fontStyle: 'italic'
    },
    section: {
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--glass-border)'
    },
    sectionTitle: {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '0.5rem',
        color: 'var(--color-text)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    sectionContent: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
        margin: 0
    }
};

export default MultiHazardSupport;

import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { demoSafetyCheckins, demoMissingPersons } from '../data/demoData';
import { CheckCircle, MapPin, Clock, Users, AlertCircle, UserPlus, X, Phone, User, Calendar, FileText, Image, AlertTriangle, Heart, MessageSquare, Send } from 'lucide-react';
import ContactSelector from '../components/ContactSelector';

const SafetyCheckIn = () => {
    const { t } = useLanguage();
    const [statusSubmitted, setStatusSubmitted] = useState(false);
    const [showReportForm, setShowReportForm] = useState(false);
    const [viewMode, setViewMode] = useState('all'); // 'all' or 'my'
    const [myReports, setMyReports] = useState([]); // Store user's own reports
    const [allReports, setAllReports] = useState(demoMissingPersons);
    
    // Safety status form
    const [safetyStatus, setSafetyStatus] = useState({
        status: '', // 'safe', 'needHelp', 'injured'
        location: '',
        message: '',
        selectedContacts: [] // Array of contact IDs
    });

    // Pre-defined contacts (in real app, would come from user's profile)
    const [contacts] = useState([
        { id: 1, name: 'Mother - Anura Perera', phone: '+94 77 123 4567', relation: 'Family' },
        { id: 2, name: 'Father - Sunil Perera', phone: '+94 71 234 5678', relation: 'Family' },
        { id: 3, name: 'Sister - Nisha Perera', phone: '+94 76 345 6789', relation: 'Family' },
        { id: 4, name: 'Best Friend - Kamal Silva', phone: '+94 75 456 7890', relation: 'Friend' },
        { id: 5, name: 'Colleague - Priya Fernando', phone: '+94 77 567 8901', relation: 'Work' },
    ]);

    // Quick message templates
    const quickMessages = [
        "I'm safe and at home",
        "At school shelter",
        "With relatives",
        "At hospital - not serious",
        "At evacuation center",
        "Stuck but safe",
        "Moving to safer location",
        "At work, can't leave yet"
    ];
    
    // Form state for reporting missing person
    const [missingPersonForm, setMissingPersonForm] = useState({
        name: '',
        age: '',
        gender: '',
        lastSeen: '',
        lastSeenDate: '',
        description: '',
        contactPerson: '',
        contactNumber: '',
        clothingDescription: '',
        identifyingMarks: '',
        photo: null
    });

    const handleStatusSelect = (status) => {
        setSafetyStatus(prev => ({ ...prev, status }));
    };

    const handleContactToggle = (contactId) => {
        setSafetyStatus(prev => ({
            ...prev,
            selectedContacts: prev.selectedContacts.includes(contactId)
                ? prev.selectedContacts.filter(id => id !== contactId)
                : [...prev.selectedContacts, contactId]
        }));
    };

    const handleSubmitStatus = () => {
        if (!safetyStatus.status) {
            alert('Please select your safety status');
            return;
        }
        if (safetyStatus.selectedContacts.length === 0) {
            alert('Please select at least one contact to notify');
            return;
        }
        
        setStatusSubmitted(true);
        // In a real app, this would send notifications to selected contacts
        alert(`Status "${safetyStatus.status}" sent to ${safetyStatus.selectedContacts.length} contact(s)!`);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setMissingPersonForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePhotoUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMissingPersonForm(prev => ({
                ...prev,
                photo: URL.createObjectURL(file)
            }));
        }
    };

    const handleSubmitReport = (e) => {
        e.preventDefault();
        
        // Create new report
        const newReport = {
            id: Date.now(),
            name: missingPersonForm.name,
            age: parseInt(missingPersonForm.age),
            gender: missingPersonForm.gender,
            lastSeen: missingPersonForm.lastSeen,
            lastSeenDate: missingPersonForm.lastSeenDate,
            description: `${missingPersonForm.description}. ${missingPersonForm.clothingDescription}. Identifying marks: ${missingPersonForm.identifyingMarks}`,
            contactPerson: missingPersonForm.contactPerson,
            contactNumber: missingPersonForm.contactNumber,
            reportedAt: new Date(),
            photo: missingPersonForm.photo,
            reportedBy: 'me' // In real app, this would be the logged-in user
        };

        // Add to both lists
        setMyReports(prev => [newReport, ...prev]);
        setAllReports(prev => [newReport, ...prev]);

        // Reset form and close modal
        setMissingPersonForm({
            name: '',
            age: '',
            gender: '',
            lastSeen: '',
            lastSeenDate: '',
            description: '',
            contactPerson: '',
            contactNumber: '',
            clothingDescription: '',
            identifyingMarks: '',
            photo: null
        });
        setShowReportForm(false);
        
        alert('Missing person report submitted successfully!');
    };

    const displayedReports = viewMode === 'all' ? allReports : myReports;

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>{t('safety.title')}</h1>

            {/* Mark Safe Section with Enhanced Status Options */}
            <div style={styles.markSafeCard}>
                {!statusSubmitted ? (
                    <>
                        <h2 style={styles.cardTitle}>Check In & Notify Contacts</h2>
                        <p style={styles.cardText}>Let your family and friends know your status during this emergency</p>
                        
                        {/* Status Selection */}
                        <div style={styles.section}>
                            <label style={styles.sectionLabel}>Select Your Status *</label>
                            <div style={styles.statusGrid}>
                                <button
                                    type="button"
                                    style={{
                                        ...styles.statusButton,
                                        ...styles.statusSafe,
                                        ...(safetyStatus.status === 'safe' ? styles.statusButtonActive : {})
                                    }}
                                    onClick={() => handleStatusSelect('safe')}
                                >
                                    <CheckCircle size={32} />
                                    <span style={styles.statusButtonTitle}>I'm Safe</span>
                                    <span style={styles.statusButtonDesc}>No assistance needed</span>
                                </button>

                                <button
                                    type="button"
                                    style={{
                                        ...styles.statusButton,
                                        ...styles.statusNeedHelp,
                                        ...(safetyStatus.status === 'needHelp' ? styles.statusButtonActive : {})
                                    }}
                                    onClick={() => handleStatusSelect('needHelp')}
                                >
                                    <AlertTriangle size={32} />
                                    <span style={styles.statusButtonTitle}>Need Help</span>
                                    <span style={styles.statusButtonDesc}>Require assistance</span>
                                </button>

                                <button
                                    type="button"
                                    style={{
                                        ...styles.statusButton,
                                        ...styles.statusInjured,
                                        ...(safetyStatus.status === 'injured' ? styles.statusButtonActive : {})
                                    }}
                                    onClick={() => handleStatusSelect('injured')}
                                >
                                    <Heart size={32} />
                                    <span style={styles.statusButtonTitle}>Injured</span>
                                    <span style={styles.statusButtonDesc}>Medical help needed</span>
                                </button>
                            </div>
                        </div>

                        {/* Location */}
                        <div className="form-group">
                            <label className="form-label">Your Current Location *</label>
                            <div style={styles.inputWithIcon}>
                                <MapPin size={20} style={styles.inputIcon} />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="Enter your current location"
                                    value={safetyStatus.location}
                                    onChange={(e) => setSafetyStatus(prev => ({ ...prev, location: e.target.value }))}
                                    style={{ paddingLeft: '2.5rem' }}
                                />
                            </div>
                        </div>

                        {/* Quick Messages */}
                        <div style={styles.section}>
                            <label style={styles.sectionLabel}>Add a Message (Optional)</label>
                            <div style={styles.quickMessagesGrid}>
                                {quickMessages.map((msg, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        style={{
                                            ...styles.quickMessageButton,
                                            ...(safetyStatus.message === msg ? styles.quickMessageButtonActive : {})
                                        }}
                                        onClick={() => setSafetyStatus(prev => ({ ...prev, message: msg }))}
                                    >
                                        {msg}
                                    </button>
                                ))}
                            </div>
                            <div className="form-group" style={{ marginTop: '1rem' }}>
                                <textarea
                                    className="form-input"
                                    rows="2"
                                    placeholder="Or type your own message..."
                                    value={safetyStatus.message}
                                    onChange={(e) => setSafetyStatus(prev => ({ ...prev, message: e.target.value }))}
                                />
                            </div>
                        </div>

                        {/* Contact Selection */}
                        <ContactSelector
                            contacts={contacts}
                            selectedContacts={safetyStatus.selectedContacts}
                            onContactToggle={handleContactToggle}
                            label="Select Contacts to Notify *"
                        />

                        <button 
                            className="btn btn-primary btn-lg" 
                            onClick={handleSubmitStatus}
                            disabled={!safetyStatus.status || safetyStatus.selectedContacts.length === 0}
                            style={{ width: '100%' }}
                        >
                            <Send size={20} />
                            Send Status to {safetyStatus.selectedContacts.length} Contact(s)
                        </button>
                    </>
                ) : (
                    <div style={styles.safeStatus}>
                        <div style={{
                            ...styles.statusIcon,
                            background: safetyStatus.status === 'safe' ? 'var(--color-safe)' :
                                       safetyStatus.status === 'needHelp' ? 'var(--color-warning)' :
                                       'var(--color-emergency)'
                        }}>
                            {safetyStatus.status === 'safe' && <CheckCircle size={48} color="white" />}
                            {safetyStatus.status === 'needHelp' && <AlertTriangle size={48} color="white" />}
                            {safetyStatus.status === 'injured' && <Heart size={48} color="white" />}
                        </div>
                        <h2 style={styles.statusTitle}>
                            {safetyStatus.status === 'safe' && "You're Marked as Safe"}
                            {safetyStatus.status === 'needHelp' && "Help Request Sent"}
                            {safetyStatus.status === 'injured' && "Injury Reported"}
                        </h2>
                        <p style={styles.statusDesc}>
                            Status sent to {safetyStatus.selectedContacts.length} contact(s)
                        </p>
                        <div style={styles.statusDetails}>
                            <div style={styles.statusDetailItem}>
                                <MapPin size={18} color="var(--color-primary)" />
                                <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>
                                    {safetyStatus.location || 'Location not provided'}
                                </span>
                            </div>
                            {safetyStatus.message && (
                                <div style={styles.statusDetailItem}>
                                    <MessageSquare size={18} color="var(--color-primary)" />
                                    <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>
                                        "{safetyStatus.message}"
                                    </span>
                                </div>
                            )}
                            <div style={styles.statusDetailItem}>
                                <Clock size={18} color="var(--color-primary)" />
                                <span style={{ color: 'var(--color-text-primary)', fontWeight: '500' }}>
                                    Updated: {new Date().toLocaleString()}
                                </span>
                            </div>
                        </div>
                        <button 
                            className="btn btn-secondary" 
                            onClick={() => setStatusSubmitted(false)}
                            style={{ marginTop: '1.5rem' }}
                        >
                            Update Status
                        </button>
                    </div>
                )}
            </div>

            {/* Family & Friends Status */}
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>
                    <Users size={24} />
                    {t('safety.familyStatus')}
                </h2>
                <div style={styles.familyStatusGrid}>
                    {demoSafetyCheckins.map(person => (
                        <div key={person.id} style={styles.statusCard}>
                            <div style={styles.statusHeader}>
                                <div>
                                    <h3 style={styles.personName}>{person.name}</h3>
                                    <p style={styles.personRelation}>{person.relation}</p>
                                </div>
                                <div style={{
                                    ...styles.statusBadge,
                                    background: person.status === 'safe' ? 'var(--color-safe)' : 'var(--color-warning)'
                                }}>
                                    {person.status === 'safe' ? '✓ Safe' : '? Unknown'}
                                </div>
                            </div>
                            <div style={styles.statusInfo}>
                                <div style={styles.infoItem}>
                                    <MapPin size={16} />
                                    <span>{person.location}</span>
                                </div>
                                <div style={styles.infoItem}>
                                    <Clock size={16} />
                                    <span>{new Date(person.lastUpdate).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Missing Persons */}
            <div style={styles.section}>
                <div style={styles.sectionHeader}>
                    <h2 style={styles.sectionTitle}>
                        <AlertCircle size={24} />
                        Missing Persons Reports
                    </h2>
                    <button className="btn btn-primary" onClick={() => setShowReportForm(true)}>
                        <UserPlus size={20} />
                        Report Missing Person
                    </button>
                </div>

                {/* View Toggle */}
                <div style={styles.viewToggle}>
                    <button
                        style={{
                            ...styles.toggleButton,
                            ...(viewMode === 'all' ? styles.toggleButtonActive : {})
                        }}
                        onClick={() => setViewMode('all')}
                    >
                        All Reports ({allReports.length})
                    </button>
                    <button
                        style={{
                            ...styles.toggleButton,
                            ...(viewMode === 'my' ? styles.toggleButtonActive : {})
                        }}
                        onClick={() => setViewMode('my')}
                    >
                        My Reports ({myReports.length})
                    </button>
                </div>

                {/* Missing Persons Grid */}
                {displayedReports.length > 0 ? (
                    <div style={styles.missingGrid}>
                        {displayedReports.map(person => (
                            <div key={person.id} style={styles.missingCard}>
                                <div style={styles.missingCardHeader}>
                                    {person.photo && (
                                        <img src={person.photo} alt={person.name} style={styles.personPhoto} />
                                    )}
                                    <div style={styles.missingCardInfo}>
                                        <h3 style={styles.missingPersonName}>{person.name}</h3>
                                        <div style={styles.missingDetailRow}>
                                            <User size={16} />
                                            <span>{person.age} years old {person.gender && `• ${person.gender}`}</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={styles.missingDetails}>
                                    <div style={styles.detailItem}>
                                        <MapPin size={16} color="var(--color-emergency)" />
                                        <div style={{ color: 'var(--color-text-primary)' }}>
                                            <strong style={{ fontWeight: '600' }}>Last Seen:</strong> {person.lastSeen}
                                            {person.lastSeenDate && <div style={styles.dateText}>{new Date(person.lastSeenDate).toLocaleDateString()}</div>}
                                        </div>
                                    </div>
                                    
                                    <div style={styles.detailItem}>
                                        <FileText size={16} color="var(--color-warning)" />
                                        <div style={{ color: 'var(--color-text-primary)' }}>
                                            <strong style={{ fontWeight: '600' }}>Description:</strong> {person.description}
                                        </div>
                                    </div>
                                    
                                    <div style={styles.detailItem}>
                                        <Phone size={16} color="var(--color-primary)" />
                                        <div style={{ color: 'var(--color-text-primary)' }}>
                                            <strong style={{ fontWeight: '600' }}>Contact:</strong> {person.contactPerson}
                                            <div style={{ color: 'var(--color-text-secondary)' }}>{person.contactNumber}</div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div style={styles.reportedInfo}>
                                    <Clock size={14} />
                                    <span>Reported {new Date(person.reportedAt).toLocaleString()}</span>
                                    {person.reportedBy === 'me' && (
                                        <span style={styles.myReportBadge}>Your Report</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div style={styles.emptyState}>
                        <AlertCircle size={48} color="var(--color-text-muted)" />
                        <p style={{ color: 'var(--color-text-primary)', fontSize: '1rem', fontWeight: '500' }}>
                            {viewMode === 'all' ? 'No missing persons reported' : 'You haven\'t reported any missing persons'}
                        </p>
                    </div>
                )}
            </div>

            {/* Report Missing Person Modal */}
            {showReportForm && (
                <div style={styles.modalOverlay} onClick={() => setShowReportForm(false)}>
                    <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.modalHeader}>
                            <h2>Report Missing Person</h2>
                            <button style={styles.closeButton} onClick={() => setShowReportForm(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitReport} style={styles.form}>
                            <div style={styles.formGrid}>
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-input"
                                        value={missingPersonForm.name}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Age *</label>
                                    <input
                                        type="number"
                                        name="age"
                                        className="form-input"
                                        value={missingPersonForm.age}
                                        onChange={handleFormChange}
                                        required
                                        min="0"
                                        max="150"
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Gender</label>
                                    <select
                                        name="gender"
                                        className="form-select"
                                        value={missingPersonForm.gender}
                                        onChange={handleFormChange}
                                    >
                                        <option value="">Select gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Last Seen Date *</label>
                                    <input
                                        type="datetime-local"
                                        name="lastSeenDate"
                                        className="form-input"
                                        value={missingPersonForm.lastSeenDate}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Last Seen Location *</label>
                                    <input
                                        type="text"
                                        name="lastSeen"
                                        className="form-input"
                                        placeholder="e.g., Kolonnawa, Colombo"
                                        value={missingPersonForm.lastSeen}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Physical Description *</label>
                                    <textarea
                                        name="description"
                                        className="form-input"
                                        rows="3"
                                        placeholder="Height, build, complexion, hair color, etc."
                                        value={missingPersonForm.description}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Clothing Description *</label>
                                    <textarea
                                        name="clothingDescription"
                                        className="form-input"
                                        rows="2"
                                        placeholder="What were they wearing when last seen?"
                                        value={missingPersonForm.clothingDescription}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Identifying Marks</label>
                                    <input
                                        type="text"
                                        name="identifyingMarks"
                                        className="form-input"
                                        placeholder="Scars, tattoos, birthmarks, etc."
                                        value={missingPersonForm.identifyingMarks}
                                        onChange={handleFormChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Contact Person Name *</label>
                                    <input
                                        type="text"
                                        name="contactPerson"
                                        className="form-input"
                                        placeholder="Your name"
                                        value={missingPersonForm.contactPerson}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Contact Number *</label>
                                    <input
                                        type="tel"
                                        name="contactNumber"
                                        className="form-input"
                                        placeholder="+94 77 123 4567"
                                        value={missingPersonForm.contactNumber}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </div>

                                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                    <label className="form-label">Upload Photo (Optional)</label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="form-input"
                                        onChange={handlePhotoUpload}
                                    />
                                    {missingPersonForm.photo && (
                                        <img src={missingPersonForm.photo} alt="Preview" style={styles.photoPreview} />
                                    )}
                                </div>
                            </div>

                            <div style={styles.modalFooter}>
                                <button type="button" className="btn btn-secondary" onClick={() => setShowReportForm(false)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    <UserPlus size={20} />
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
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
    markSafeCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        marginBottom: '3rem',
    },
    cardTitle: {
        fontSize: '1.5rem',
        marginBottom: '0.5rem',
        color: 'var(--color-text-primary)',
        fontWeight: '700',
    },
    cardText: {
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
        fontSize: '1rem',
        lineHeight: '1.6',
    },
    section: {
        marginBottom: '2rem',
    },
    sectionLabel: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '1rem',
        color: 'var(--color-text-primary)',
    },
    statusGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
    },
    statusButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1.5rem 1rem',
        border: '2px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--glass-bg)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        color: 'var(--color-text-primary)',
    },
    statusSafe: {
        borderColor: 'var(--color-safe)',
        color: 'var(--color-safe)',
    },
    statusNeedHelp: {
        borderColor: 'var(--color-warning)',
        color: 'var(--color-warning)',
    },
    statusInjured: {
        borderColor: 'var(--color-emergency)',
        color: 'var(--color-emergency)',
    },
    statusButtonActive: {
        transform: 'scale(1.05)',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
        background: 'linear-gradient(135deg, var(--glass-bg), rgba(255, 255, 255, 0.1))',
        fontWeight: '700',
    },
    statusButtonTitle: {
        fontSize: '1.125rem',
        fontWeight: 700,
        color: 'inherit',
    },
    statusButtonDesc: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    inputWithIcon: {
        position: 'relative',
    },
    inputIcon: {
        position: 'absolute',
        left: '0.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        color: 'var(--color-text-secondary)',
        pointerEvents: 'none',
    },
    quickMessagesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
        gap: '0.5rem',
    },
    quickMessageButton: {
        padding: '0.75rem 1rem',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--glass-bg)',
        cursor: 'pointer',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        textAlign: 'left',
        color: 'var(--color-text-primary)',
        fontWeight: '500',
    },
    quickMessageButtonActive: {
        background: 'var(--color-primary)',
        color: 'white',
        borderColor: 'var(--color-primary)',
        fontWeight: '600',
    },
    contactsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1rem',
    },
    contactCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem',
        border: '2px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--glass-bg)',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
    },
    contactCardSelected: {
        borderColor: 'var(--color-primary)',
        background: 'rgba(var(--color-primary-rgb), 0.1)',
    },
    contactCheckbox: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: '2px solid var(--glass-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        transition: 'all 0.3s ease',
    },
    contactInfo: {
        flex: 1,
    },
    contactName: {
        fontSize: '1rem',
        fontWeight: 600,
        marginBottom: '0.25rem',
    },
    contactPhone: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem',
    },
    contactBadge: {
        display: 'inline-block',
        padding: '0.25rem 0.75rem',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: 600,
    },
    safeStatus: {
        textAlign: 'center',
        padding: '2rem',
    },
    statusIcon: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 1.5rem',
    },
    statusTitle: {
        fontSize: '1.75rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
    },
    statusDesc: {
        color: 'var(--color-text-secondary)',
        marginBottom: '1.5rem',
    },
    statusDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        maxWidth: '500px',
        margin: '0 auto',
        padding: '1.5rem',
        background: 'var(--glass-bg)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
    },
    statusDetailItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '0.95rem',
        textAlign: 'left',
        color: 'var(--color-text-primary)',
    },
    sectionTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        fontSize: '1.75rem',
        fontWeight: 700,
        margin: 0,
    },
    sectionHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem',
    },
    viewToggle: {
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        background: 'var(--glass-bg)',
        padding: '0.25rem',
        borderRadius: 'var(--radius-lg)',
        width: 'fit-content',
    },
    toggleButton: {
        padding: '0.5rem 1.5rem',
        border: 'none',
        background: 'transparent',
        color: 'var(--color-text-secondary)',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontWeight: 500,
        transition: 'all 0.3s ease',
    },
    toggleButtonActive: {
        background: 'var(--color-primary)',
        color: 'white',
    },
    familyStatusGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
    },
    statusCard: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
    },
    statusHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
    },
    personName: {
        fontSize: '1.125rem',
        fontWeight: 600,
        margin: 0,
    },
    personRelation: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        margin: 0,
    },
    statusBadge: {
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.875rem',
        fontWeight: 600,
        color: 'white',
    },
    statusInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    missingGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
        marginBottom: '1rem',
    },
    missingCard: {
        background: 'rgba(220, 38, 38, 0.05)',
        border: '2px solid var(--color-emergency)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.5rem',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
    },
    missingCardHeader: {
        display: 'flex',
        gap: '1rem',
        marginBottom: '1rem',
    },
    personPhoto: {
        width: '80px',
        height: '80px',
        borderRadius: 'var(--radius-md)',
        objectFit: 'cover',
        border: '2px solid var(--color-emergency)',
    },
    missingCardInfo: {
        flex: 1,
    },
    missingPersonName: {
        fontSize: '1.25rem',
        fontWeight: 700,
        marginBottom: '0.5rem',
        color: 'var(--color-emergency)',
    },
    missingDetailRow: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
    },
    missingDetails: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        marginBottom: '1rem',
    },
    detailItem: {
        display: 'flex',
        gap: '0.75rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-primary)',
        lineHeight: '1.6',
    },
    dateText: {
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        marginTop: '0.25rem',
    },
    reportedInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        paddingTop: '1rem',
        borderTop: '1px solid var(--glass-border)',
    },
    myReportBadge: {
        marginLeft: 'auto',
        padding: '0.25rem 0.75rem',
        background: 'var(--color-primary)',
        color: 'white',
        borderRadius: '9999px',
        fontSize: '0.7rem',
        fontWeight: 600,
    },
    emptyState: {
        textAlign: 'center',
        padding: '3rem',
        color: 'var(--color-text-muted)',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        padding: '1rem',
    },
    modalContent: {
        background: 'var(--color-bg-primary)',
        borderRadius: 'var(--radius-lg)',
        maxWidth: '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem',
        borderBottom: '1px solid var(--glass-border)',
    },
    closeButton: {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--color-text-secondary)',
        padding: '0.5rem',
        borderRadius: 'var(--radius-md)',
        transition: 'background 0.2s ease',
    },
    form: {
        padding: '1.5rem',
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
    },
    photoPreview: {
        width: '150px',
        height: '150px',
        objectFit: 'cover',
        borderRadius: 'var(--radius-md)',
        marginTop: '1rem',
        border: '2px solid var(--glass-border)',
    },
    modalFooter: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '1.5rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--glass-border)',
    },
    reportedTime: {
        fontSize: '0.75rem',
        color: 'var(--color-text-muted)',
        marginTop: '0.5rem',
    },
};

export default SafetyCheckIn;

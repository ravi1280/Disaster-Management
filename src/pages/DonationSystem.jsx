import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { demoDonations } from '../data/demoData';
import { DollarSign, Heart, X, CheckCircle } from 'lucide-react';

const DonationSystem = () => {
    const { user } = useAuth();
    const [donations, setDonations] = useState([]);
    const [showDonateModal, setShowDonateModal] = useState(false);
    const [selectedCause, setSelectedCause] = useState(null);
    const [donationAmount, setDonationAmount] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Load donations from localStorage
    useEffect(() => {
        const storedDonations = localStorage.getItem('donationCauses');
        if (storedDonations) {
            setDonations(JSON.parse(storedDonations));
        } else {
            setDonations(demoDonations);
            localStorage.setItem('donationCauses', JSON.stringify(demoDonations));
        }
    }, []);

    // Pre-fill donor info from user
    useEffect(() => {
        if (user) {
            setDonorName(user.fullName || '');
            setDonorEmail(user.email || '');
        }
    }, [user]);

    const handleDonateClick = (donation) => {
        setSelectedCause(donation);
        setShowDonateModal(true);
        setDonationAmount('');
    };

    const handleDonateSubmit = (e) => {
        e.preventDefault();

        const amount = parseFloat(donationAmount);
        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid donation amount');
            return;
        }

        // Update the donation collected amount
        const updatedDonations = donations.map(d => {
            if (d.id === selectedCause.id) {
                return {
                    ...d,
                    collected: Math.min(d.collected + amount, d.required)
                };
            }
            return d;
        });

        setDonations(updatedDonations);
        localStorage.setItem('donationCauses', JSON.stringify(updatedDonations));

        // Store donation record
        const donationRecord = {
            id: Date.now(),
            causeId: selectedCause.id,
            causeName: selectedCause.need,
            amount: amount,
            donorName: donorName,
            donorEmail: donorEmail,
            date: new Date().toISOString(),
            userId: user?.id
        };

        const existingRecords = JSON.parse(localStorage.getItem('donationRecords') || '[]');
        localStorage.setItem('donationRecords', JSON.stringify([...existingRecords, donationRecord]));

        // Show success message
        setShowSuccessMessage(true);
        setTimeout(() => {
            setShowSuccessMessage(false);
            setShowDonateModal(false);
            setDonationAmount('');
        }, 2000);
    };

    const quickAmounts = [500, 1000, 2500, 5000, 10000];

    return (
        <div className="container" style={styles.page}>
            <h1 style={styles.title}>Donation System</h1>
            <p style={styles.subtitle}>Support verified disaster relief efforts</p>

            <div style={styles.grid}>
                {donations.map(donation => {
                    const percentage = (donation.collected / donation.required) * 100;
                    const isFullyFunded = percentage >= 100;

                    return (
                        <div key={donation.id} style={styles.card}>
                            <div style={styles.cardHeader}>
                                <h3>{donation.need}</h3>
                                {donation.verified && <span style={styles.verifiedBadge}>Verified</span>}
                            </div>
                            <p style={styles.district}>📍 {donation.district}</p>

                            {isFullyFunded && (
                                <div style={styles.fullyFundedBadge}>
                                    <CheckCircle size={16} />
                                    Fully Funded - Thank You!
                                </div>
                            )}

                            <div style={styles.progressBar}>
                                <div style={{
                                    ...styles.progressFill,
                                    width: `${Math.min(percentage, 100)}%`,
                                    background: isFullyFunded ? 'var(--gradient-safe)' : 'var(--gradient-warning)'
                                }}></div>
                            </div>
                            <p style={styles.progressText}>
                                LKR {donation.collected.toLocaleString()} / {donation.required.toLocaleString()}
                                <span style={styles.percentage}> ({percentage.toFixed(1)}%)</span>
                            </p>
                            <button
                                className="btn btn-success"
                                style={{ width: '100%', marginTop: '1rem' }}
                                onClick={() => handleDonateClick(donation)}
                                disabled={isFullyFunded}
                            >
                                <Heart size={18} />
                                {isFullyFunded ? 'Fully Funded' : 'Donate Now'}
                            </button>
                        </div>
                    );
                })}
            </div>

            {/* Donation Modal */}
            {showDonateModal && selectedCause && (
                <div style={styles.modalOverlay} onClick={() => setShowDonateModal(false)}>
                    <div style={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                        {showSuccessMessage ? (
                            <div style={styles.successMessage}>
                                <CheckCircle size={64} color="#10b981" />
                                <h2>Thank You for Your Donation!</h2>
                                <p>Your contribution will make a real difference.</p>
                            </div>
                        ) : (
                            <>
                                <div style={styles.modalHeader}>
                                    <h2 style={{ margin: 0 }}>Make a Donation</h2>
                                    <button
                                        style={styles.closeBtn}
                                        onClick={() => setShowDonateModal(false)}
                                    >
                                        <X size={24} />
                                    </button>
                                </div>

                                <div style={styles.causeInfo}>
                                    <h3>{selectedCause.need}</h3>
                                    <p style={styles.causeDistrict}>📍 {selectedCause.district}</p>
                                    <div style={styles.fundingStatus}>
                                        <span>Current: LKR {selectedCause.collected.toLocaleString()}</span>
                                        <span>Goal: LKR {selectedCause.required.toLocaleString()}</span>
                                        <span>Remaining: LKR {(selectedCause.required - selectedCause.collected).toLocaleString()}</span>
                                    </div>
                                </div>

                                <form onSubmit={handleDonateSubmit} style={styles.form}>
                                    <div className="form-group">
                                        <label className="form-label">Your Name</label>
                                        <input
                                            type="text"
                                            className="form-input"
                                            value={donorName}
                                            onChange={(e) => setDonorName(e.target.value)}
                                            placeholder="Enter your name"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-input"
                                            value={donorEmail}
                                            onChange={(e) => setDonorEmail(e.target.value)}
                                            placeholder="Enter your email"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label className="form-label">Donation Amount (LKR)</label>
                                        <input
                                            type="number"
                                            className="form-input"
                                            value={donationAmount}
                                            onChange={(e) => setDonationAmount(e.target.value)}
                                            placeholder="Enter amount"
                                            min="1"
                                            required
                                        />
                                    </div>

                                    <div style={styles.quickAmounts}>
                                        <p style={styles.quickAmountsLabel}>Quick amounts:</p>
                                        <div style={styles.quickAmountsButtons}>
                                            {quickAmounts.map(amount => (
                                                <button
                                                    key={amount}
                                                    type="button"
                                                    style={styles.quickAmountBtn}
                                                    onClick={() => setDonationAmount(amount.toString())}
                                                >
                                                    LKR {amount.toLocaleString()}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-success" style={styles.submitBtn}>
                                        <Heart size={20} />
                                        Donate LKR {donationAmount ? parseFloat(donationAmount).toLocaleString() : '0'}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    page: { padding: '2rem 0', minHeight: 'calc(100vh - 200px)' },
    title: { fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem' },
    subtitle: { color: 'var(--color-text-secondary)', fontSize: '1.125rem', marginBottom: '2rem' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
    card: { background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-lg)', padding: '1.5rem' },
    cardHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' },
    verifiedBadge: { padding: '0.25rem 0.75rem', background: 'var(--color-safe)', color: 'white', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 },
    district: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' },
    fullyFundedBadge: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: 'rgba(16, 185, 129, 0.2)',
        color: 'var(--color-safe)',
        borderRadius: 'var(--radius-md)',
        fontSize: '0.875rem',
        fontWeight: 600,
        marginBottom: '1rem'
    },
    progressBar: { width: '100%', height: '12px', background: 'var(--color-bg-tertiary)', borderRadius: '9999px', overflow: 'hidden', marginBottom: '0.5rem' },
    progressFill: { height: '100%', transition: 'width var(--transition-normal)' },
    progressText: { fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 600 },
    percentage: { color: 'var(--color-text-muted)', fontWeight: 400 },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
    },
    modalContainer: {
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-xl)',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
    },
    modalHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid var(--glass-border)'
    },
    closeBtn: {
        background: 'none',
        border: 'none',
        color: 'var(--color-text)',
        cursor: 'pointer',
        padding: '0.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-md)',
        transition: 'all var(--transition-fast)'
    },
    causeInfo: {
        marginBottom: '1.5rem',
        padding: '1rem',
        background: 'var(--color-bg-secondary)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--glass-border)'
    },
    causeDistrict: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.75rem'
    },
    fundingStatus: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.25rem',
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    },
    quickAmounts: {
        marginTop: '0.5rem'
    },
    quickAmountsLabel: {
        fontSize: '0.875rem',
        color: 'var(--color-text-secondary)',
        marginBottom: '0.5rem'
    },
    quickAmountsButtons: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '0.5rem'
    },
    quickAmountBtn: {
        padding: '0.5rem 1rem',
        background: 'var(--color-bg-tertiary)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-md)',
        color: 'var(--color-text)',
        fontSize: '0.875rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all var(--transition-fast)'
    },
    submitBtn: {
        marginTop: '0.5rem',
        width: '100%',
        padding: '1rem',
        fontSize: '1.05rem',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
    },
    successMessage: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 2rem',
        textAlign: 'center',
        gap: '1rem'
    }
};

export default DonationSystem;

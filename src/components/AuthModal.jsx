import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = () => {
    const { register, login } = useAuth();
    const [activeTab, setActiveTab] = useState('login');
    const [errors, setErrors] = useState({});
    const [loginError, setLoginError] = useState('');

    // Login form state
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });

    // Registration form state
    const [registerData, setRegisterData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    // Validation functions
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone) => {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    };

    const validateRegistrationForm = () => {
        const newErrors = {};

        if (!registerData.fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        } else if (registerData.fullName.trim().length < 2) {
            newErrors.fullName = 'Name must be at least 2 characters';
        }

        if (!registerData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(registerData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (!registerData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(registerData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (!registerData.password) {
            newErrors.password = 'Password is required';
        } else if (registerData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!registerData.confirmPassword) {
            newErrors.confirmPassword = 'Please confirm your password';
        } else if (registerData.password !== registerData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateLoginForm = () => {
        const newErrors = {};

        if (!loginData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!loginData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        setLoginError('');

        if (validateLoginForm()) {
            const result = login(loginData.email, loginData.password);

            if (!result.success) {
                setLoginError(result.error);
            }
        }
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (validateRegistrationForm()) {
            register(registerData);
        }
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        setLoginError('');
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const switchTab = (tab) => {
        setActiveTab(tab);
        setErrors({});
        setLoginError('');
    };

    return (
        <div className="auth-modal-overlay">
            <div className="auth-modal-container">
                <div className="auth-modal-header">
                    <h2>Welcome to Disaster Management System</h2>
                    <p>Please login or register to continue</p>
                </div>

                <div className="auth-tabs">
                    <button
                        className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
                        onClick={() => switchTab('login')}
                    >
                        Login
                    </button>
                    <button
                        className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
                        onClick={() => switchTab('register')}
                    >
                        Register
                    </button>
                </div>

                <div className="auth-content">
                    {activeTab === 'login' ? (
                        <form onSubmit={handleLoginSubmit} className="auth-form">
                            {loginError && (
                                <div className="auth-error-banner">
                                    {loginError}
                                </div>
                            )}

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                    placeholder="Enter your password"
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary auth-submit-btn">
                                Login
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleRegisterSubmit} className="auth-form">
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className={`form-input ${errors.fullName ? 'error' : ''}`}
                                    value={registerData.fullName}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter your full name"
                                />
                                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className={`form-input ${errors.email ? 'error' : ''}`}
                                    value={registerData.email}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter your email"
                                />
                                {errors.email && <span className="error-message">{errors.email}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    className={`form-input ${errors.phone ? 'error' : ''}`}
                                    value={registerData.phone}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter 10-digit phone number"
                                />
                                {errors.phone && <span className="error-message">{errors.phone}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    className={`form-input ${errors.password ? 'error' : ''}`}
                                    value={registerData.password}
                                    onChange={handleRegisterChange}
                                    placeholder="Enter password (min 6 characters)"
                                />
                                {errors.password && <span className="error-message">{errors.password}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                                    value={registerData.confirmPassword}
                                    onChange={handleRegisterChange}
                                    placeholder="Confirm your password"
                                />
                                {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary auth-submit-btn">
                                Register
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;

import React from 'react';
import './LoadingScreen.css';

const LoadingScreen = () => {
    return (
        <div className="loading-screen">
            <div className="loading-content">
            

                {/* Animated Pulse */}
                <div className="pulse-container">
                    <div className="pulse-ring pulse-ring-1"></div>
                    <div className="pulse-ring pulse-ring-2"></div>
                    <div className="pulse-ring pulse-ring-3"></div>
                    <div className="pulse-center"></div>
                </div>

                {/* Loading Text */}
                <div className="loading-text">
                    <span>Initializing System</span>
                    <div className="loading-dots">
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="progress-bar">
                    <div className="progress-fill"></div>
                </div>

                {/* Status Message */}
                <div className="status-message">
                    Preparing emergency resources and data...
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="bg-decoration bg-decoration-1"></div>
            <div className="bg-decoration bg-decoration-2"></div>
            <div className="bg-decoration bg-decoration-3"></div>
        </div>
    );
};

export default LoadingScreen;

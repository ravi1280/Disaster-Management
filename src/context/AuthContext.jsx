import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('disasterManagementUser');
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUser(userData);
                setIsAuthenticated(true);
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('disasterManagementUser');
            }
        }
        setLoading(false);
    }, []);

    const register = (userData) => {
        // Store user data
        const newUser = {
            id: Date.now().toString(),
            fullName: userData.fullName,
            email: userData.email,
            phone: userData.phone,
            registeredAt: new Date().toISOString(),
        };

        // Store in localStorage
        localStorage.setItem('disasterManagementUser', JSON.stringify(newUser));
        
        // Also store credentials for login
        const credentials = {
            email: userData.email,
            password: userData.password, // In production, this should be hashed on backend
        };
        localStorage.setItem('disasterManagementCredentials', JSON.stringify(credentials));

        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true, user: newUser };
    };

    const login = (email, password) => {
        // Get stored credentials
        const storedCredentials = localStorage.getItem('disasterManagementCredentials');
        
        if (!storedCredentials) {
            return { success: false, error: 'No account found. Please register first.' };
        }

        try {
            const credentials = JSON.parse(storedCredentials);
            
            if (credentials.email === email && credentials.password === password) {
                const storedUser = localStorage.getItem('disasterManagementUser');
                const userData = JSON.parse(storedUser);
                
                setUser(userData);
                setIsAuthenticated(true);
                
                return { success: true, user: userData };
            } else {
                return { success: false, error: 'Invalid email or password.' };
            }
        } catch (error) {
            console.error('Error during login:', error);
            return { success: false, error: 'An error occurred during login.' };
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        // Note: We keep the user data in localStorage so they can log back in
        // To fully clear: localStorage.removeItem('disasterManagementUser');
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        register,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

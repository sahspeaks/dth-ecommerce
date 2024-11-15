
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    _id: string;
    username: string;
    email: string;
    phone: string;
    avatar: string;
    address: string;
    role: string;
    __v?: number;
}

interface AuthResponse {
    message: string;
    accessToken: string;
    refreshToken: string;
    customer: User;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (username: string, email: string, password: string, phone: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    updateUser: (updates: UpdateUserData) => Promise<void>;
    accessToken: string | null;
}

// Define specific update user data interface
interface UpdateUserData {
    username?: string;
    email?: string;
    phone?: string;
    address?: string;
    avatar?: string;  // Now avatar is a string URL
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const BASE_URL = 'https://dth-backend.onrender.com';

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [refreshToken, setRefreshToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedAccess = localStorage.getItem('accessToken');
        const storedRefresh = localStorage.getItem('refreshToken');
        const storedUser = localStorage.getItem('user');

        if (storedAccess && storedRefresh && storedUser) {
            setAccessToken(storedAccess);
            setRefreshToken(storedRefresh);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/customer/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data: AuthResponse = await response.json();

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUser(data.customer);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.customer));
        } catch (error) {
            console.error('Login error:', error);
            throw error instanceof Error ? error : new Error('Login failed');
        }
    };

    const signup = async (username: string, email: string, password: string, phone: string): Promise<void> => {
        try {
            const response = await fetch(`${BASE_URL}/api/v1/customer/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, password, phone }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Signup failed');
            }

            const data: AuthResponse = await response.json();

            setAccessToken(data.accessToken);
            setRefreshToken(data.refreshToken);
            setUser(data.customer);

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
            localStorage.setItem('user', JSON.stringify(data.customer));
        } catch (error) {
            console.error('Signup error:', error);
            throw error instanceof Error ? error : new Error('Signup failed');
        }
    };

    const logout = () => {
        setUser(null);
        setAccessToken(null);
        setRefreshToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
    };

    // const updateUser = async (updates: UpdateUserData): Promise<void> => {
    //     try {
    //         if (!user || !accessToken) {
    //             throw new Error('No user logged in');
    //         }

    //         // Remove any undefined or null values from updates
    //         const cleanUpdates = Object.fromEntries(
    //             Object.entries(updates).filter(([_, value]) => value != null)
    //         );

    //         const response = await fetch(`${BASE_URL}/customer/update/${user._id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Authorization': `Bearer ${accessToken}`,
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(cleanUpdates),
    //         });

    //         if (!response.ok) {
    //             if (response.status === 401) {
    //                 logout();
    //                 throw new Error('Session expired. Please login again.');
    //             }
    //             const errorData = await response.json();
    //             throw new Error(errorData.message || 'Failed to update user');
    //         }

    //         const updatedData = await response.json();
    //         const updatedUser = updatedData.customer || updatedData;

    //         setUser(updatedUser);
    //         localStorage.setItem('user', JSON.stringify(updatedUser));

    //         return updatedUser;
    //     } catch (error) {
    //         console.error('Update error:', error);
    //         throw error instanceof Error ? error : new Error('Failed to update user');
    //     }
    // };

    const updateUser = async (updates: UpdateUserData): Promise<void> => {
        try {
            if (!user || !accessToken) {
                throw new Error('No user logged in');
            }

            // Make sure all values, including empty strings, are included in updates
            const cleanUpdates = Object.fromEntries(
                Object.entries(updates).filter(([_, value]) => value !== undefined)
            );

            console.log('Sending updates:', cleanUpdates);
            console.log('User ID:', user._id);
            const response = await fetch(`${BASE_URL}/api/v1/customer/update/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cleanUpdates),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    logout();
                    throw new Error('Session expired. Please login again.');
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update user');
            }

            const updatedData = await response.json();
            const updatedUser = updatedData.customer || updatedData;

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            return updatedUser;
        } catch (error) {
            console.error('Update error:', error);
            throw error instanceof Error ? error : new Error('Failed to update user');
        }
    };


    const value: AuthContextType = {
        user,
        login,
        signup,
        logout,
        isLoading,
        updateUser,
        accessToken,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { User } from '../types';

// interface AuthContextType {
//     user: User | null;
//     login: (email: string, password: string) => Promise<void>;
//     logout: () => void;
//     isLoading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     const [user, setUser] = useState<User | null>(null);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         // Check for existing session
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             setUser(JSON.parse(storedUser));
//         }
//         setIsLoading(false);
//     }, []);

//     const login = async (email: string, password: string) => {
//         try {
//             // This is a mock implementation. Replace with actual API call
//             const mockUser: User = {
//                 id: '1',
//                 email,
//                 name: 'John Doe',
//                 role: email.includes('admin') ? 'admin' : 'user',
//                 createdAt: new Date().toISOString(),
//             };

//             setUser(mockUser);
//             localStorage.setItem('user', JSON.stringify(mockUser));
//         } catch (error) {
//             throw new Error('Login failed');
//         }
//     };

//     const logout = () => {
//         setUser(null);
//         localStorage.removeItem('user');
//     };

//     return (
//         <AuthContext.Provider value={{ user, login, logout, isLoading }}>
//             {children}
//         </AuthContext.Provider>
//     );
// }

// export const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (context === undefined) {
//         throw new Error('useAuth must be used within an AuthProvider');
//     }
//     return context;
// };

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            // This is a mock implementation. Replace with actual API call
            const mockUser: User = {
                id: '1',
                email,
                name: 'John Doe',
                role: email.includes('admin') ? 'admin' : 'user',
                createdAt: new Date().toISOString(),
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (error) {
            throw new Error('Login failed');
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const updateUser = async (updates: Partial<User>): Promise<void> => {
        try {
            if (!user) {
                throw new Error('No user logged in');
            }

            // This is a mock implementation. Replace with actual API call
            const updatedUser = {
                ...user,
                ...updates,
                updatedAt: new Date().toISOString(),
            };

            // Validate critical fields
            if (!updatedUser.email || !updatedUser.id) {
                throw new Error('Invalid user data');
            }

            // In a real implementation, you would make an API call here
            // await api.updateUser(user.id, updates);

            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Failed to update user: ${error.message}`);
            }
            throw new Error('Failed to update user');
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, updateUser }}>
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
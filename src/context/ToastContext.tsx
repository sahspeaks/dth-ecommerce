// ToastContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';

interface Toast {
    id: number;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastContextType {
    showToast: (message: string, type: Toast['type']) => void;
    toasts: Toast[];
    removeToast: (id: number) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: Toast['type'] = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast, toasts, removeToast }}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};

const ToastContainer: React.FC = () => {
    const context = useContext(ToastContext);
    if (!context) return null;
    const { toasts, removeToast } = context;

    return (
        <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className={`
                        ${toast.type === 'success' ? 'bg-green-500' :
                            toast.type === 'error' ? 'bg-red-500' :
                                'bg-blue-500'} 
                        text-white px-4 py-2 rounded-lg shadow-lg
                        flex items-center justify-between
                        transform transition-all duration-300 ease-in-out
                        animate-slide-in
                    `}
                >
                    <span>{toast.message}</span>
                    <button
                        onClick={() => removeToast(toast.id)}
                        className="ml-4 text-white hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>
            ))}
        </div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};
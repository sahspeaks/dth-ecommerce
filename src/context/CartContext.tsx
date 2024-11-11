import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

// Define CartItem type here to ensure consistency
export interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    total: number;
    itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        // Initialize cart from localStorage
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, quantity: number) => {
        if (quantity < 1) return;

        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === product.id);

            if (existingItemIndex >= 0) {
                // Update existing item
                const updatedItems = [...prevItems];
                const newQuantity = updatedItems[existingItemIndex].quantity + quantity;

                // Optional: Check against product stock
                // if (newQuantity > product.stock) return prevItems;

                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: newQuantity
                };
                return updatedItems;
            }

            // Add new item
            return [...prevItems, { ...product, quantity }];
        });
    };

    const removeFromCart = (productId: string) => {
        setItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const updateQuantity = (productId: string, newQuantity: number) => {
        if (newQuantity < 1) return;

        setItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(item => item.id === productId);

            if (existingItemIndex === -1) return prevItems;

            // Optional: Check against product stock
            // if (newQuantity > prevItems[existingItemIndex].stock) return prevItems;

            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
                ...updatedItems[existingItemIndex],
                quantity: newQuantity
            };
            return updatedItems;
        });
    };

    const clearCart = () => {
        setItems([]);
    };

    // Computed values
    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const itemCount = items.reduce(
        (count, item) => count + item.quantity,
        0
    );

    // Error boundary for cart operations
    const safeCartOperations = {
        addToCart: (product: Product, quantity: number) => {
            try {
                addToCart(product, quantity);
            } catch (error) {
                console.error('Failed to add item to cart:', error);
                // Optionally implement error handling/notification
            }
        },
        removeFromCart: (productId: string) => {
            try {
                removeFromCart(productId);
            } catch (error) {
                console.error('Failed to remove item from cart:', error);
            }
        },
        updateQuantity: (productId: string, quantity: number) => {
            try {
                updateQuantity(productId, quantity);
            } catch (error) {
                console.error('Failed to update cart quantity:', error);
            }
        },
        clearCart: () => {
            try {
                clearCart();
            } catch (error) {
                console.error('Failed to clear cart:', error);
            }
        }
    };

    return (
        <CartContext.Provider
            value={{
                items,
                total,
                itemCount,
                ...safeCartOperations
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
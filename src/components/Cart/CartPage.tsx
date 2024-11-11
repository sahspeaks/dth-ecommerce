// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCart } from '../../context/CartContext';
// import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
// import type { CartItem } from '../../context/CartContext';

// export default function CartPage() {
//     const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
//     const navigate = useNavigate();

//     if (items.length === 0) {
//         return (
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//                 <div className="text-center space-y-4">
//                     <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
//                     <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
//                     <p className="text-gray-500">Browse our products and find something you like!</p>
//                     <button
//                         onClick={() => navigate('/products')}
//                         className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
//                     >
//                         Continue Shopping
//                         <ArrowRight className="ml-2 h-4 w-4" />
//                     </button>
//                 </div>
//             </div>
//         );
//     }

//     const CartItem = ({ item }: { item: CartItem }) => {
//         const itemTotal = item.price * item.quantity;

//         return (
//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow gap-4">
//                 <div className="flex items-center space-x-4">
//                     <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-24 h-24 object-cover rounded"
//                     />
//                     <div className="space-y-1">
//                         <h3 className="text-lg font-medium text-gray-900">
//                             {item.name}
//                         </h3>
//                         <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
//                         <p className="text-lg font-medium text-gray-900">
//                             ₹{item.price.toLocaleString()}
//                         </p>
//                     </div>
//                 </div>
//                 <div className="flex items-center space-x-6 self-end sm:self-center">
//                     <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
//                         <button
//                             onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                             disabled={item.quantity <= 1}
//                             className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <Minus className="h-4 w-4" />
//                         </button>
//                         <span className="text-gray-900 w-8 text-center font-medium">
//                             {item.quantity}
//                         </span>
//                         <button
//                             onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                             disabled={item.quantity >= (item.stock || 99)}
//                             className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                             <Plus className="h-4 w-4" />
//                         </button>
//                     </div>
//                     <div className="w-24 text-right font-medium">
//                         ₹{itemTotal.toLocaleString()}
//                     </div>
//                     <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
//                         aria-label="Remove item"
//                     >
//                         <Trash2 className="h-5 w-5" />
//                     </button>
//                 </div>
//             </div>
//         );
//     };

//     return (
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//             <div className="flex items-center justify-between mb-8">
//                 <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart ({itemCount} items)</h2>
//                 <button
//                     onClick={() => navigate('/products')}
//                     className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
//                 >
//                     Continue Shopping
//                 </button>
//             </div>

//             <div className="grid grid-cols-1 gap-y-4">
//                 {items.map((item) => (
//                     <CartItem key={item.id} item={item} />
//                 ))}
//             </div>

//             <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-4">
//                 <div className="bg-white p-6 rounded-lg shadow w-full sm:w-96">
//                     <div className="space-y-4">
//                         <div className="flex justify-between text-base text-gray-500">
//                             <span>Subtotal</span>
//                             <span>₹{total.toLocaleString()}</span>
//                         </div>
//                         <div className="flex justify-between text-base text-gray-500">
//                             <span>Shipping</span>
//                             <span>Calculated at checkout</span>
//                         </div>
//                         <div className="border-t border-gray-200 pt-4">
//                             <div className="flex justify-between text-lg font-medium text-gray-900">
//                                 <span>Total</span>
//                                 <span>₹{total.toLocaleString()}</span>
//                             </div>
//                             <p className="mt-1 text-sm text-gray-500">Including all taxes</p>
//                         </div>
//                         <button
//                             onClick={() => navigate('/checkout')}
//                             className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center space-x-2"
//                         >
//                             <span>Proceed to Checkout</span>
//                             <ArrowRight className="h-4 w-4" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import type { CartItem } from '../../context/CartContext';

// Add type guard to verify item properties
const isValidCartItem = (item: CartItem): boolean => {
    return (
        typeof item.id !== 'undefined' &&
        typeof item.name === 'string' &&
        typeof item.price === 'number' &&
        typeof item.quantity === 'number' &&
        typeof item.image === 'string'
    );
};

export default function CartPage() {
    const { items, removeFromCart, updateQuantity, total = 0, itemCount = 0 } = useCart();
    const navigate = useNavigate();

    if (!items?.length) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center space-y-4">
                    <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
                    <h2 className="text-2xl font-semibold text-gray-900">Your cart is empty</h2>
                    <p className="text-gray-500">Browse our products and find something you like!</p>
                    <button
                        onClick={() => navigate('/products/dth')}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                    >
                        Continue Shopping
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            </div>
        );
    }

    const CartItemComponent = ({ item }: { item: CartItem }) => {
        // Validate item before rendering
        if (!isValidCartItem(item)) {
            console.error('Invalid cart item:', item);
            return null;
        }

        const itemTotal = (item.price || 0) * (item.quantity || 1);

        return (
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-white rounded-lg shadow gap-4">
                <div className="flex items-center space-x-4">
                    <img
                        src={item.image || '/api/placeholder/96/96'}
                        alt={item.name || 'Product'}
                        className="w-24 h-24 object-cover rounded"
                    />
                    <div className="space-y-1">
                        <h3 className="text-lg font-medium text-gray-900">
                            {item.name || 'Unnamed Product'}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                            {item.description || 'No description available'}
                        </p>
                        <p className="text-lg font-medium text-gray-900">
                            ₹{(item.price || 0).toLocaleString()}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-6 self-end sm:self-center">
                    <div className="flex items-center space-x-2 bg-gray-50 rounded-lg p-1">
                        <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            disabled={!item.quantity || item.quantity <= 1}
                            className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="text-gray-900 w-8 text-center font-medium">
                            {item.quantity || 1}
                        </span>
                        <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            disabled={(item.quantity || 1) >= (item.stock || 99)}
                            className="p-1 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="w-24 text-right font-medium">
                        ₹{itemTotal.toLocaleString()}
                    </div>
                    <button
                        onClick={() => item.id && removeFromCart(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        aria-label="Remove item"
                    >
                        <Trash2 className="h-5 w-5" />
                    </button>
                </div>
            </div>
        );
    };

    // Filter out invalid items
    const validItems = items.filter(isValidCartItem);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-gray-900">Shopping Cart ({itemCount} items)</h2>
                <button
                    onClick={() => navigate('/products/dth')}
                    className="text-indigo-600 hover:text-indigo-700 text-sm font-medium"
                >
                    Continue Shopping
                </button>
            </div>

            <div className="grid grid-cols-1 gap-y-4">
                {validItems.map((item) => (
                    <CartItemComponent key={item.id} item={item} />
                ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row sm:justify-end gap-4">
                <div className="bg-white p-6 rounded-lg shadow w-full sm:w-96">
                    <div className="space-y-4">
                        <div className="flex justify-between text-base text-gray-500">
                            <span>Subtotal</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-base text-gray-500">
                            <span>Shipping</span>
                            <span>Calculated at checkout</span>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <div className="flex justify-between text-lg font-medium text-gray-900">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">Including all taxes</p>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                            <span>Proceed to Checkout</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
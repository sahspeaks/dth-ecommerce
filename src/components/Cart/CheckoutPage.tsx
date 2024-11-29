// import { useLocation, useNavigate } from "react-router-dom";
// import { useCart } from "../../context/CartContext";
// import { useState } from "react";
// import { MapPin, Package, Truck, Loader2, AlertCircle } from "lucide-react";
// import { useAuth } from '../../context/AuthContext';
// import { SERVER } from "../../server";


// interface BaseItem {
//     id: string | number;
//     name: string;
//     quantity: number;
//     price: number;
//     image?: string;
// }

// interface CartItemWithSubtotal extends BaseItem {
//     subtotal: number;
// }

// interface DeliveryAddress {
//     fullName: string;
//     email: string;
//     city: string;
//     state: string;
//     pincode: string;
//     phone: string;
//     doorNo: string;
//     street: string;
//     landmark: string;
// }

// interface ApiError {
//     message: string;
//     error?: string;
// }

// export default function CheckoutPage() {
//     const { user } = useAuth();
//     // console.log(user);
//     // console.log(user?.username)

//     const location = useLocation();
//     const navigate = useNavigate();
//     const { items: cartItems, total: cartTotal, clearCart } = useCart();
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const BASE_URL = SERVER;

//     const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
//         fullName: '',
//         email: '',
//         city: '',
//         state: '',
//         pincode: '',
//         phone: '',
//         doorNo: '',
//         street: '',
//         landmark: ''
//     });

//     const navigationState = location.state as {
//         cartSummary: { items: CartItemWithSubtotal[]; totalAmount: number; };
//         isBuyNow: boolean;
//     } | null;

//     const cartItemsWithSubtotal = cartItems.map(item => ({
//         ...item,
//         subtotal: item.price * item.quantity
//     }));

//     const checkoutItems = navigationState?.isBuyNow
//         ? navigationState.cartSummary.items
//         : cartItemsWithSubtotal;

//     const totalAmount = navigationState?.isBuyNow
//         ? navigationState.cartSummary.totalAmount
//         : cartTotal;


//     console.log("Cart items Subtotal", cartItemsWithSubtotal);
//     console.log("Checkout items", checkoutItems);
//     console.log("Total amount", totalAmount);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setError(null);
//         setDeliveryAddress(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const validateForm = () => {
//         if (!/^\d{10}$/.test(deliveryAddress.phone)) {
//             setError('Please enter a valid 10-digit phone number');
//             return false;
//         }

//         if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
//             setError('Please enter a valid 6-digit PIN code');
//             return false;
//         }

//         if (!/\S+@\S+\.\S+/.test(deliveryAddress.email)) {
//             setError('Please enter a valid email address');
//             return false;
//         }

//         return true;
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         // console.log(user?.username);
//         e.preventDefault();
//         setError(null);

//         if (!validateForm()) {
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const response = await fetch(`${BASE_URL}/api/v1/create-order`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//                 },
//                 body: JSON.stringify({
//                     orderItems: checkoutItems.map(item => ({
//                         productId: item.id,
//                         productName: item.name,
//                         quantity: item.quantity,
//                         price: item.price
//                     })),
//                     deliveryAddress,
//                     customerId: user?._id,
//                     customerName: user?.username,
//                     totalAmount,
//                     shippingCost: 199,
//                     orderType: navigationState?.isBuyNow ? 'BUY_NOW' : 'CART_CHECKOUT'
//                 })
//             });

//             const data = await response.json();
//             console.log(data)

//             if (!response.ok) {
//                 throw new Error(data.message || 'Failed to place order');
//             }

//             if (!navigationState?.isBuyNow) {
//                 clearCart();
//             }

//             //razorpay payment
//             const options = {
//                 key: "rzp_test_Slq72fvAZ1MoLJ",
//                 totalAmount,
//                 currency: "INR",
//                 name: "MY STB",
//                 description: "",
//                 image: "",
//                 order_id: data.razorpayOrderId,
//                 handler: async function (response: any) {
//                     console.log("Razorpay Response:", response);
//                     const { razorpay_payment_id: paymentId, } = response;

//                     // Call the payment-complete endpoint
//                     console.log("Payment ID:OrderId", paymentId, data.orderId);
//                     const paymentCompleteResponse = await fetch(
//                         "http://localhost:9000/api/v1/payment-complete",
//                         {
//                             method: "POST",
//                             headers: { "Content-Type": "application/json" },
//                             body: JSON.stringify({
//                                 orderId: data.orderId,
//                                 paymentId,
//                                 razorpayOrderId: data.razorpayOrderId,

//                             }),
//                         }
//                     );


//                     navigate(`/order-confirmation/${data.orderId}`, {
//                         state: { orderDetails: paymentCompleteResponse }
//                     });
//                 },
//                 prefill: {
//                     name: deliveryAddress.fullName,
//                     email: deliveryAddress.email,
//                     contact: deliveryAddress.phone,
//                 },
//                 notes: {
//                     address: `${deliveryAddress.doorNo}, ${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.pincode}`,
//                 },
//                 theme: { color: "#000000", background_color: "#ffffff" },
//                 modal: { backdropclose: false, escape: false },
//             };

//             const razorpay = new window.Razorpay(options);
//             razorpay.open();


//         } catch (error) {
//             const err = error as ApiError;
//             setError(err.message || 'An error occurred while placing your order. Please try again.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!navigationState?.isBuyNow && checkoutItems.length === 0) {
//         return (
//             <div className="min-h-screen flex items-center justify-center bg-gray-50">
//                 <div className="text-center">
//                     <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
//                     <button
//                         onClick={() => navigate('/products')}
//                         className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
//                     >
//                         Continue Shopping
//                     </button>
//                 </div>
//             </div>
//         );
//     }


import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState, useEffect } from "react";
import { MapPin, Package, Truck, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from '../../context/AuthContext';
import { SERVER } from "../../server";

interface BaseItem {
    id: string | number;
    name: string;
    quantity: number;
    price: number;
    image?: string;
}

interface CartItemWithSubtotal extends BaseItem {
    subtotal: number;
}

interface DeliveryAddress {
    fullName: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    phone: string;
    doorNo: string;
    street: string;
    landmark: string;
}

interface ApiError {
    message: string;
    error?: string;
}

export default function CheckoutPage() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { items: cartItems, total: cartTotal, clearCart } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = useState(false);
    const BASE_URL = SERVER;

    const [deliveryAddress, setDeliveryAddress] = useState<DeliveryAddress>({
        fullName: '',
        email: '',
        city: '',
        state: '',
        pincode: '',
        phone: '',
        doorNo: '',
        street: '',
        landmark: ''
    });

    useEffect(() => {
        const loadRazorpay = async () => {
            if (window.Razorpay) {
                setIsRazorpayLoaded(true);
                return;
            }

            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.async = true;
            script.onload = () => setIsRazorpayLoaded(true);
            script.onerror = () => {
                setError('Failed to load payment gateway. Please try again later.');
            };
            document.body.appendChild(script);
        };

        loadRazorpay();

        return () => {
            const script = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
            if (script) {
                document.body.removeChild(script);
            }
        };
    }, []);

    const navigationState = location.state as {
        cartSummary: { items: CartItemWithSubtotal[]; totalAmount: number; };
        isBuyNow: boolean;
    } | null;

    const cartItemsWithSubtotal = cartItems.map(item => ({
        ...item,
        subtotal: item.price * item.quantity
    }));

    const checkoutItems = navigationState?.isBuyNow
        ? navigationState.cartSummary.items
        : cartItemsWithSubtotal;

    const totalAmount = navigationState?.isBuyNow
        ? navigationState.cartSummary.totalAmount
        : cartTotal;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setError(null);
        setDeliveryAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!/^\d{10}$/.test(deliveryAddress.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        if (!/^\d{6}$/.test(deliveryAddress.pincode)) {
            setError('Please enter a valid 6-digit PIN code');
            return false;
        }

        if (!/\S+@\S+\.\S+/.test(deliveryAddress.email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) {
            return;
        }

        if (!isRazorpayLoaded) {
            setError('Payment system is still loading. Please try again in a moment.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/v1/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify({
                    orderItems: checkoutItems.map(item => ({
                        productId: item.id,
                        productName: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    deliveryAddress,
                    customerId: user?._id,
                    customerName: user?.username,
                    totalAmount,
                    shippingCost: 199,
                    orderType: navigationState?.isBuyNow ? 'BUY_NOW' : 'CART_CHECKOUT'
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to place order');
            }

            if (!navigationState?.isBuyNow) {
                clearCart();
            }
            const amoutToPay = totalAmount + 199;

            try {
                const options = {
                    key: "rzp_test_Slq72fvAZ1MoLJ",
                    amount: amoutToPay, // Convert to paise
                    currency: "INR",
                    name: "MY STB",
                    description: "Order Payment",
                    image: "",
                    order_id: data.razorpayOrderId,
                    handler: async function (response: any) {
                        try {
                            const paymentCompleteResponse = await fetch(
                                `${BASE_URL}/api/v1/payment-complete`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                    },
                                    body: JSON.stringify({
                                        orderId: data.orderId,
                                        paymentId: response.razorpay_payment_id,
                                        razorpayOrderId: data.razorpayOrderId,
                                    }),
                                }
                            );

                            if (!paymentCompleteResponse.ok) {
                                throw new Error('Failed to verify payment');
                            }

                            const paymentData = await paymentCompleteResponse.json();
                            // console.log('Payment Data:', paymentData);
                            navigate(`/order-confirmation/${data.orderId}`, {
                                state: { orderDetails: paymentData }
                            });
                        } catch (error) {
                            setError('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: {
                        name: deliveryAddress.fullName,
                        email: deliveryAddress.email,
                        contact: deliveryAddress.phone,
                    },
                    notes: {
                        address: `${deliveryAddress.doorNo}, ${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.pincode}`,
                    },
                    theme: { color: "#000000", background_color: "#ffffff" },
                    modal: { backdropclose: false, escape: false },
                };

                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } catch (error) {
                setError('Failed to initialize payment. Please try again.');
                console.error('Razorpay initialization error:', error);
            }

        } catch (error) {
            const err = error as ApiError;
            setError(err.message || 'An error occurred while placing your order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!navigationState?.isBuyNow && checkoutItems.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-semibold text-gray-900">Your cart is empty</h2>
                    <button
                        onClick={() => navigate('/products/dth')}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Order Summary Section */}
                    <div className="lg:w-2/5">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <Package className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-xl font-semibold">Order Summary</h2>
                            </div>

                            <div className="space-y-4">
                                {checkoutItems.map(item => (
                                    <div key={item.id} className="flex gap-4 py-4 border-b">
                                        {item.image ? (
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-20 h-20 object-cover rounded-md"
                                            />
                                        ) : (
                                            <div className="w-20 h-20 bg-gray-200 rounded-md flex items-center justify-center">
                                                <Package className="w-8 h-8 text-gray-400" />
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{item.name}</h3>
                                            <p className="text-gray-500">Quantity: {item.quantity}</p>
                                            <p className="text-indigo-600 font-medium">₹{item.subtotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 space-y-2">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalAmount.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span>₹199</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                                    <span>Total</span>
                                    <span>₹{(totalAmount + 199).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Address Form Section */}
                    <div className="lg:w-3/5">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-xl font-semibold">Delivery Address</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            required
                                            value={deliveryAddress.fullName}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={deliveryAddress.email}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={deliveryAddress.phone}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Door No / Flat No
                                        </label>
                                        <input
                                            type="text"
                                            name="doorNo"
                                            required
                                            value={deliveryAddress.doorNo}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Street Address
                                        </label>
                                        <input
                                            type="text"
                                            name="street"
                                            required
                                            value={deliveryAddress.street}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            value={deliveryAddress.city}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            required
                                            value={deliveryAddress.state}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            PIN Code
                                        </label>
                                        <input
                                            type="text"
                                            name="pincode"
                                            required
                                            value={deliveryAddress.pincode}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Landmark (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            name="landmark"
                                            value={deliveryAddress.landmark}
                                            onChange={handleInputChange}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <Truck className="w-5 h-5" />
                                                Place Order
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
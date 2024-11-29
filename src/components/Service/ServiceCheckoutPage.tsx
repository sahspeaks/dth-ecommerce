// import React from 'react';
// import { Home, MapPin, Truck, Loader2 } from 'lucide-react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
// import { SERVER } from '../../server';

// const ServiceCheckoutPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { selectedService, date, time, price } = location.state || {};
//     const [isLoading, setIsLoading] = React.useState(false);
//     const { user } = useAuth();
//     const BASE_URL = SERVER;

//     const [deliveryAddress, setDeliveryAddress] = React.useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         doorNo: '',
//         street: '',
//         city: '',
//         state: '',
//         pincode: '',
//         landmark: ''
//     });

//     React.useEffect(() => {
//         if (!location.state) {
//             navigate('/');
//         }
//     }, [location.state, navigate]);

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setDeliveryAddress(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const needsAddress = selectedService === 'installation' || selectedService === 'support';
//     const shopAddress = "235'A Nethaji Road, Tirupati";

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsLoading(true);

//         try {
//             const orderDetails = {
//                 service: selectedService,
//                 date,
//                 time,
//                 price,
//                 customerId: user?._id,
//                 customerName: user?.username,
//                 ...(needsAddress ? deliveryAddress : { address: shopAddress })
//             };
//             console.log('Order details:', orderDetails);
//             // Add API call here
//             const response = await fetch(`${BASE_URL}/api/v1/create-service`, {
//                 method: "POST",
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
//                 },
//                 body: JSON.stringify(orderDetails)
//             })
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             console.log(data)
//             //razorpay payment


//             // Navigate to success page or show success message
//             navigate(`/order-confirmation/${data.data.serviceId}`, {
//                 state: { orderDetails: data }
//             });
//         } catch (error) {
//             console.error('Error processing order:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!location.state) return null;

import React from 'react';
import { Home, MapPin, Truck, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { SERVER } from '../../server';

const ServiceCheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedService, date, time, price } = location.state || {};
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [isRazorpayLoaded, setIsRazorpayLoaded] = React.useState(false);
    const { user } = useAuth();
    const BASE_URL = SERVER;

    const [deliveryAddress, setDeliveryAddress] = React.useState({
        fullName: '',
        email: '',
        phone: '',
        doorNo: '',
        street: '',
        city: '',
        state: '',
        pincode: '',
        landmark: ''
    });

    React.useEffect(() => {
        if (!location.state) {
            navigate('/');
        }
    }, [location.state, navigate]);

    React.useEffect(() => {
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

    const needsAddress = selectedService === 'installation' || selectedService === 'support';
    const shopAddress = "235'A Nethaji Road, Tirupati";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (needsAddress && !validateForm()) {
            return;
        }

        if (!isRazorpayLoaded) {
            setError('Payment system is still loading. Please try again in a moment.');
            return;
        }

        setIsLoading(true);

        try {
            const serviceDetails = {
                service: selectedService,
                date,
                time,
                price,
                customerId: user?._id,
                customerName: user?.username,
                ...(needsAddress ? deliveryAddress : { address: shopAddress })
            };

            const response = await fetch(`${BASE_URL}/api/v1/create-service`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(serviceDetails)
            });

            if (!response.ok) {
                throw new Error('Failed to create service order');
            }

            const data = await response.json();

            try {
                const options = {
                    key: "rzp_test_Slq72fvAZ1MoLJ",
                    amount: price * 100, // Convert to paise
                    currency: "INR",
                    name: "MY STB",
                    description: `${selectedService} Service Payment`,
                    image: "",
                    order_id: data.razorpayOrderId,
                    handler: async function (response: any) {
                        try {
                            const paymentCompleteResponse = await fetch(
                                `${BASE_URL}/api/v1/service-payment`,
                                {
                                    method: "POST",
                                    headers: {
                                        "Content-Type": "application/json",
                                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                                    },
                                    body: JSON.stringify({
                                        serviceId: data.data.serviceId,
                                        paymentId: response.razorpay_payment_id,
                                        razorpayOrderId: data.razorpayOrderId,
                                    }),
                                }
                            );

                            if (!paymentCompleteResponse.ok) {
                                throw new Error('Failed to verify payment');
                            }

                            const paymentData = await paymentCompleteResponse.json();
                            navigate(`/order-confirmation/${data.data.serviceId}`, {
                                state: { orderDetails: paymentData }
                            });
                        } catch (error) {
                            setError('Payment verification failed. Please contact support.');
                        }
                    },
                    prefill: {
                        name: needsAddress ? deliveryAddress.fullName : user?.username,
                        email: needsAddress ? deliveryAddress.email : user?.email,
                        contact: needsAddress ? deliveryAddress.phone : '',
                    },
                    notes: {
                        address: needsAddress
                            ? `${deliveryAddress.doorNo}, ${deliveryAddress.street}, ${deliveryAddress.city}, ${deliveryAddress.state}, ${deliveryAddress.pincode}`
                            : shopAddress,
                    },
                    theme: { color: "#4F46E5", background_color: "#ffffff" },
                    modal: { backdropclose: false, escape: false },
                };

                const razorpayInstance = new window.Razorpay(options);
                razorpayInstance.open();
            } catch (error) {
                setError('Failed to initialize payment. Please try again.');
                console.error('Razorpay initialization error:', error);
            }
        } catch (error: any) {
            setError(error.message || 'An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!location.state) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mr-4 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                    <Home className="h-5 w-5 mr-2" />
                    Back
                </button>
                <h2 className="text-2xl font-semibold text-gray-900">Checkout</h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left side - Address Form */}
                {needsAddress ? (
                    <div className="lg:w-3/5">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center gap-2 mb-6">
                                <MapPin className="w-5 h-5 text-indigo-600" />
                                <h2 className="text-xl font-semibold">Service Address</h2>
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
                ) : (
                    <div className="lg:w-3/5">
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <div className="flex items-start">
                                <MapPin className="h-5 w-5 text-yellow-600 mt-0.5" />
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">Visit Our Shop</h3>
                                    <p className="text-sm text-yellow-700 mt-1">
                                        Please visit our shop at the following address for your {selectedService} service:
                                    </p>
                                    <p className="text-sm font-medium text-yellow-900 mt-2">{shopAddress}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleSubmit}
                                disabled={isLoading}
                                className="w-full mt-6 flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    'Confirm Appointment'
                                )}
                            </button>
                        </div>
                    </div>
                )}

                {/* Right side - Order Summary */}
                <div className="lg:w-2/5">
                    <div className="bg-white rounded-lg shadow p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Service Type:</span>
                                <span className="font-medium text-gray-900 capitalize">{selectedService}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Date:</span>
                                <span className="font-medium text-gray-900">{date}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Time:</span>
                                <span className="font-medium text-gray-900">{time}</span>
                            </div>
                            <div className="flex justify-between text-sm border-t pt-2 mt-2">
                                <span className="text-gray-900 font-medium">Total Amount:</span>
                                <span className="font-medium text-indigo-600">₹{price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceCheckoutPage;
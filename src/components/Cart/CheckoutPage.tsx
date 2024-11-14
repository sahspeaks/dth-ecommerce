import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";
import { MapPin, Package, Truck } from "lucide-react";

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

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { items: cartItems, total: cartTotal, clearCart } = useCart();

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
        setDeliveryAddress(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch('your-api-endpoint/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderItems: checkoutItems.map(item => ({
                        productId: item.id,
                        quantity: item.quantity,
                        price: item.price
                    })),
                    deliveryAddress,
                    totalAmount,
                    shippingCost: 499,
                    orderType: navigationState?.isBuyNow ? 'BUY_NOW' : 'CART_CHECKOUT'
                })
            });

            if (!response.ok) throw new Error('Failed to place order');

            const orderConfirmation = await response.json();
            if (!navigationState?.isBuyNow) clearCart();
            navigate(`/order-confirmation/${orderConfirmation.orderId}`);
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-20 h-20 object-cover rounded-md"
                                        />
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
                                    <span>₹499</span>
                                </div>
                                <div className="flex justify-between text-lg font-semibold pt-4 border-t">
                                    <span>Total</span>
                                    <span>₹{(totalAmount + 499).toLocaleString()}</span>
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            State
                                        </label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={deliveryAddress.state}
                                            onChange={handleInputChange}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <button
                                        type="submit"
                                        className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
                                    >
                                        <Truck className="w-5 h-5" />
                                        Place Order
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
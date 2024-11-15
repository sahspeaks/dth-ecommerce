import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { ArrowLeft, ShoppingCart, Truck, XCircle } from 'lucide-react';
import type { Product } from '../../types';
// Mock product database and pincode service remain the same

// Define type for pincode service
type PincodeDeliveryDays = {
    '400001': number;
    '400002': number;
    '400003': number;
    '400004': number;
    '400005': number;
};

type ValidPincode = keyof PincodeDeliveryDays;

const pincodeService = {
    availablePincodes: ['400001', '400002', '400003', '400004', '400005'] as ValidPincode[],
    deliveryDays: {
        '400001': 2,
        '400002': 3,
        '400003': 1,
        '400004': 4,
        '400005': 2,
    } satisfies PincodeDeliveryDays
};

interface ProductApiResponse {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: {
        _id: string;
        name: string;
    };
    stock: number;
    image: string;
    addImages?: string[];
    specifications?: string[];
    features: string[];
}

export default function ProductDetails() {
    const { productId } = useParams<{ productId: string }>();
    const { category } = useParams<{ category: string }>();
    // eslint-disable-next-line
    const [categoryName, setCategoryName] = useState<string>('');


    // console.log('Product ID:', productId);
    // console.log('Category:', category);

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [pincode, setPincode] = useState('');
    const [availabilityStatus, setAvailabilityStatus] = useState<'available' | 'unavailable' | null>(null);
    const [deliveryDays, setDeliveryDays] = useState<number | null>(null);
    const [isCheckingPincode, setIsCheckingPincode] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'features'>('description');


    // State for managing current displayed image
    const [currentImage, setCurrentImage] = useState<string>('');
    const [productImages, setProductImages] = useState<string[]>([]);

    const BASE_URL = 'https://dth-backend.onrender.com';


    useEffect(() => {

        // Fetch product details from the API
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/product/${productId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                // console.log('Response:', response);
                const data: { product: ProductApiResponse } = await response.json();
                const productData = data.product;
                // console.log('Response data:', productData);
                setCategoryName(productData.category.name);
                // console.log('Category Name:', category);
                setSelectedProduct({
                    id: productData._id,
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category: productData.category._id,
                    stock: productData.stock,
                    image: productData.image,
                    addImages: productData.addImages || [],
                    specifications: productData.specifications || [],
                    features: productData.features,
                });
                const images = [productData.image, ...(productData.addImages || [])];
                setProductImages(images);
                setCurrentImage(images[0]);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // setSelectedProduct(data);

            } catch (error) {
                console.error('Error fetching product details:', error);
                throw error;
            }
        }


        fetchProductDetails();
    }, [category, productId]);

    const handleImageClick = (image: string) => {
        setCurrentImage(image);
    };

    // Show loading state while finding the product
    if (!category || !productId) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Invalid product URL</h2>
                <button
                    onClick={() => navigate('/')}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Go to Home
                </button>
            </div>
        );
    }

    // Show error if product is not found
    if (!selectedProduct) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Product not found</h2>
                <button
                    onClick={() => navigate(`/products/${category}`)}
                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                    <ArrowLeft className="h-5 w-5 mr-2" />
                    Back to Category
                </button>
            </div>
        );
    }


    const handleAddToCart = () => {
        addToCart({ ...selectedProduct }, quantity);
    };

    const handleBuyNow = () => {
        if (!selectedProduct) return;

        // Prepare the cart summary data for a single product
        const buyNowSummary = {
            items: [{
                id: selectedProduct.id,
                name: selectedProduct.name,
                quantity: quantity,
                price: selectedProduct.price,
                image: selectedProduct.image,
                subtotal: selectedProduct.price * quantity
            }],
            totalAmount: selectedProduct.price * quantity,
            itemCount: quantity
        };

        // Navigate to checkout with the buy now data
        navigate('/checkout', {
            state: {
                cartSummary: buyNowSummary,
                isBuyNow: true // Flag to indicate this is a buy now purchase
            }
        });
    };

    const checkAvailability = () => {
        setIsCheckingPincode(true);
        setTimeout(() => {
            const isAvailable = pincodeService.availablePincodes.includes(pincode as ValidPincode);
            setAvailabilityStatus(isAvailable ? 'available' : 'unavailable');
            if (isAvailable && isPincodeValid(pincode)) {
                setDeliveryDays(pincodeService.deliveryDays[pincode as ValidPincode]);
            } else {
                setDeliveryDays(null);
            }
            setIsCheckingPincode(false);
        }, 800);
    };
    // Type guard to check if pincode is valid
    const isPincodeValid = (pincode: string): pincode is ValidPincode => {
        return pincode in pincodeService.deliveryDays;
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
                    <button onClick={() => navigate('/')} className="hover:text-gray-900">Home</button>
                    <span>/</span>
                    <button onClick={() => navigate(`/products/${category}`)} className="hover:text-gray-900 capitalize">
                        {category}
                    </button>
                    <span>/</span>
                    <span className="text-gray-900">{selectedProduct.name}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        {/* main image */}
                        <div className="overflow-hidden rounded-lg shadow-lg">
                            <img
                                src={currentImage || selectedProduct.image}
                                alt={selectedProduct.name}
                                className="w-full h-[400px] object-cover"
                            />
                        </div>
                        {/* Thumbnail Preview Gallery */}
                        <div className="grid grid-cols-4 gap-4">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleImageClick(image)}
                                    className={`relative overflow-hidden rounded-lg border-2 transition-all 
                                        ${currentImage === image
                                            ? 'border-blue-500 shadow-md'
                                            : 'border-gray-200 hover:border-blue-300'
                                        }`}
                                >
                                    <div className="aspect-square">
                                        <img
                                            src={image}
                                            alt={`Product view ${index + 1}`}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
                            <div className="mt-4 flex items-center justify-between">
                                <div className="flex items-baseline">
                                    <span className="text-3xl font-bold text-gray-900">₹{selectedProduct.price.toLocaleString()}</span>
                                    <span className="ml-2 text-sm text-gray-500">inclusive of all taxes</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-white ${selectedProduct.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        <div className="p-4 border rounded-md">
                            <div className="flex items-center space-x-4">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center border rounded-md">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        disabled={quantity <= 1}
                                        className="px-3 py-1 text-gray-700"
                                    >
                                        -
                                    </button>
                                    <span className="w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(selectedProduct.stock, quantity + 1))}
                                        disabled={quantity >= selectedProduct.stock}
                                        className="px-3 py-1 text-gray-700"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-gray-500">
                                    ({selectedProduct.stock} available)
                                </span>
                            </div>
                        </div>

                        <div className="p-4 border rounded-md">
                            <h3 className="text-sm font-medium mb-3">Check Delivery Availability</h3>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="text"
                                    placeholder="Enter Pincode"
                                    value={pincode}
                                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                    className="px-3 py-2 border border-gray-300 rounded w-48"
                                />
                                <button
                                    onClick={checkAvailability}
                                    disabled={pincode.length !== 6 || isCheckingPincode}
                                    className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100"
                                >
                                    {isCheckingPincode ? 'Checking...' : 'Check'}
                                </button>
                            </div>
                            {availabilityStatus && (
                                <div className={`mt-2 p-2 rounded ${availabilityStatus === 'available' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {availabilityStatus === 'available' ? (
                                        <div className="flex items-center space-x-2">
                                            <Truck className="h-4 w-4" />
                                            <span>
                                                Delivery available in {deliveryDays} {deliveryDays === 1 ? 'day' : 'days'}
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <XCircle className="h-4 w-4" />
                                            <span>Delivery not available in your area</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        <div className="flex space-x-4">
                            <button
                                onClick={handleAddToCart}
                                disabled={selectedProduct.stock === 0}
                                className="flex-1 px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 flex items-center justify-center space-x-2"
                            >
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Add to Cart
                            </button>
                            <button
                                onClick={handleBuyNow}
                                disabled={selectedProduct.stock === 0}
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Buy Now
                            </button>
                        </div>

                        <div className="pt-6">
                            <div className="border-b border-gray-200">
                                <div className="flex space-x-8">
                                    {(['description', 'specifications', 'features'] as const).map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`pb-4 text-sm font-medium ${activeTab === tab
                                                ? 'border-b-2 border-blue-500 text-blue-600'
                                                : 'text-gray-500 hover:text-gray-700'
                                                } capitalize`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="py-4">
                                {activeTab === 'description' && (
                                    <p className="text-gray-700 whitespace-pre-line">{selectedProduct.description}</p>
                                )}
                                {activeTab === 'specifications' && (
                                    <dl className="space-y-4">
                                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                                            <div key={key} className="flex">

                                                <dd className="w-2/3 text-gray-700">{value}</dd>
                                            </div>
                                        ))}
                                    </dl>
                                )}
                                {activeTab === 'features' && (
                                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                                        {selectedProduct.features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

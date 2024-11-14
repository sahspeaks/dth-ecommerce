import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Home, Loader2 } from 'lucide-react';
import { mockProducts, ProductData } from './ProductsData';

interface CategoryResponse {
    _id: string;
    name: string;
    image: string;
    __v: number;
}

interface ProductApiResponse {
    _id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
    addImages: string[];
    specifications?: Record<string, string>;
    features: string[];
}

export default function ProductList() {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [products, setProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Record<string, string>>({});

    const BASE_URL = 'http://localhost:9000';

    const handleAddToCart = (product: ProductData) => {
        addToCart(product, 1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    // Fetch categories first
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/categories`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Categories response:', data); // Debug log

                // Handle both possible response structures
                const categoriesData: CategoryResponse[] = Array.isArray(data) ? data : data.categories || [];

                const categoryMap: Record<string, string> = {};

                if (Array.isArray(categoriesData)) {
                    categoriesData.forEach((cat) => {
                        // Remove any ObjectId wrapper if present
                        const cleanId = cat._id.toString().replace(/ObjectId\(['"](.+)['"]\)/, '$1');
                        categoryMap[cat.name.toLowerCase()] = cleanId;
                    });
                }

                console.log('Processed categories:', categoryMap); // Debug log
                setCategories(categoryMap);
            } catch (err) {
                console.error('Error fetching categories:', err);
                setError('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    // Fetch products after categories are loaded
    useEffect(() => {
        const fetchProducts = async () => {
            if (!category) {
                setError('Category not specified');
                setLoading(false);
                return;
            }

            const categoryKey = category.toLowerCase();
            if (!categories[categoryKey]) {
                setError('Invalid category');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/api/v1/products/${categories[categoryKey]}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                let productsArray: ProductData[] = [];

                if (Array.isArray(data)) {
                    productsArray = data.map((item) => ({
                        id: item._id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        stock: item.stock,
                        image: item.image,
                        addImages: item.addImages,
                        specifications: item.specifications || {},
                        features: item.features,
                    }));
                } else if (data.products && Array.isArray(data.products)) {
                    productsArray = data.products.map((item: ProductApiResponse) => ({
                        id: item._id,
                        name: item.name,
                        description: item.description,
                        price: item.price,
                        category: item.category,
                        stock: item.stock,
                        image: item.image,
                        addImages: item.addImages,
                        specifications: item.specifications || {},
                        features: item.features,
                    }));
                }

                setProducts(productsArray);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);

                if (err instanceof TypeError && err.message === 'Failed to fetch') {
                    setError('Unable to connect to the server. CORS issue detected. Using fallback data.');
                } else {
                    setError('Failed to fetch products. Using fallback data.');
                }

                if (category && mockProducts[category]) {
                    setProducts(Array.isArray(mockProducts[category]) ? mockProducts[category] : []);
                } else {
                    setProducts([]);
                }
            } finally {
                setLoading(false);
            }
        };

        if (Object.keys(categories).length > 0) {
            setLoading(true);
            fetchProducts();
        }
    }, [category, categories]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-gray-600" />
            </div>
        );
    }

    if (error && !products.length) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">
                    {error}
                </h2>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <button
                        onClick={handleGoHome}
                        className="flex items-center text-gray-600 hover:text-gray-900 mr-4 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
                    >
                        <Home className="h-5 w-5 mr-2" />
                        Back to Home
                    </button>
                    <h2 className="text-2xl font-semibold text-gray-900 capitalize">
                        {category} Products
                    </h2>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            productId={product.id}
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
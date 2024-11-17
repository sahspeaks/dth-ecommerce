import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';
import { Home, Search } from 'lucide-react';
import { mockProducts, ProductData } from './ProductsData';
import { SERVER } from '../../server.js';
import { ProductListLoading } from '../Layout/Loading';

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
    const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<Record<string, string>>({});
    const [searchQuery, setSearchQuery] = useState('');

    const BASE_URL = SERVER;

    const handleAddToCart = (product: ProductData) => {
        addToCart(product, 1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    // Search functionality
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim() === '') {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter((product) => {
            return (
                product.name.toLowerCase().includes(query) ||
                product.description.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            );
        });

        setFilteredProducts(filtered);
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
                const categoriesData: CategoryResponse[] = Array.isArray(data) ? data : data.categories || [];
                const categoryMap: Record<string, string> = {};

                if (Array.isArray(categoriesData)) {
                    categoriesData.forEach((cat) => {
                        const cleanId = cat._id.toString().replace(/ObjectId\(['"](.+)['"]\)/, '$1');
                        categoryMap[cat.name.toLowerCase()] = cleanId;
                    });
                }

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
                setFilteredProducts(productsArray);
                setError(null);
            } catch (err) {
                console.error('Error fetching products:', err);

                if (err instanceof TypeError && err.message === 'Failed to fetch') {
                    setError('Unable to connect to the server. CORS issue detected. Using fallback data.');
                } else {
                    setError('Failed to fetch products. Using fallback data.');
                }

                if (category && mockProducts[category]) {
                    const fallbackProducts = Array.isArray(mockProducts[category]) ? mockProducts[category] : [];
                    setProducts(fallbackProducts);
                    setFilteredProducts(fallbackProducts);
                } else {
                    setProducts([]);
                    setFilteredProducts([]);
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
            <ProductListLoading />
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center">
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
                    <div className="relative">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full sm:w-72 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 pointer-events-none" />
                        </div>
                    </div>
                </div>
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No products found matching your search.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                productId={product.id}
                                onAddToCart={handleAddToCart}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Category {
    _id: string;
    name: string;
}

interface Product {
    _id: string;  // Changed from id to _id to match API response
    name: string;
    description: string;
    price: number;
    image: string;
}

interface ProductCategoryData {
    [key: string]: {
        name: string;
        products: Product[];
    };
}

const ProductCatalog = () => {
    const [productCategories, setProductCategories] = useState<ProductCategoryData>({});

    const BASE_URL = 'https://dth-backend.onrender.com';

    useEffect(() => {
        // console.log('Fetching product categories...');

        const fetchProductCategories = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/v1/categories`);
                if (!response.ok) {
                    throw new Error(`HTTP error ${response.status}`);
                }
                const { categories } = await response.json();
                // console.log('Fetched categories:', categories);

                const categoryProducts: ProductCategoryData = {};
                for (const category of categories) {
                    // console.log('Fetching products for category:', category);
                    const productResponse = await fetch(`${BASE_URL}/api/v1/products/${category._id}`);
                    // console.log('Fetching category response:', productResponse);

                    if (!productResponse.ok) {
                        throw new Error(`HTTP error ${productResponse.status}`);
                    }
                    const { products } = await productResponse.json();
                    categoryProducts[category._id] = {
                        name: category.name,
                        products: products
                    };
                }

                setProductCategories(categoryProducts);
            } catch (error) {
                console.error('Error fetching product categories:', error);
            }
        };

        fetchProductCategories();
    }, []);

    return (
        <div className="bg-gray-50 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Featured Products</h2>
                    <p className="mt-4 text-lg text-gray-500">Explore our wide range of products</p>
                </div>

                {Object.entries(productCategories).map(([categoryId, { name, products }]) => (
                    <div key={categoryId} className="mt-16">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-semibold capitalize">{name}</h3>
                            <Link
                                to={`/products/${name}`}
                                className="flex items-center text-indigo-600 hover:text-indigo-500"
                            >
                                View All <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {products.map((product) => (
                                <div
                                    key={product._id}
                                    className="group relative bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-300"
                                >
                                    <div className="aspect-h-3 aspect-w-4 overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="h-48 w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                                        />
                                    </div>
                                    <div className="p-4">
                                        <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                                        <div className="mt-3 flex items-center justify-between">
                                            <p className="text-lg font-semibold text-gray-900">₹{product.price}</p>
                                            <Link
                                                to={`/products/${name}/${product._id}`}
                                                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCatalog;
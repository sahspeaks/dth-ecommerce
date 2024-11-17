import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

const CATEGORY_IDS = {
    dth: '673326295991231139de193b',
    networking: '67346ae478ff3dc035594e85',
    accessories: '67346b9d78ff3dc035594e89',
};

interface ProductCardProps {
    product: Product;
    productId: string;
    onAddToCart: (product: Product) => void;
}

// Helper function to get category name from ID
const getCategoryName = (categoryId: string): string => {
    return Object.keys(CATEGORY_IDS).find(
        key => CATEGORY_IDS[key as keyof typeof CATEGORY_IDS] === categoryId
    ) || 'Unknown Category';
};


export default function ProductCard({ product, productId, onAddToCart }: ProductCardProps) {
    const { showToast } = useToast();
    const navigate = useNavigate();
    const categoryName = getCategoryName(product.category);
    // console.log('ProductCard rendered with product:', product);
    // console.log('ProductCard rendered with productId:', productId);


    const handleClick = () => {
        navigate(`/products/${categoryName}/${productId}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart(product);
        showToast(`${product.name} has been added to your cart`, 'success');

    };

    return (
        <div
            onClick={handleClick}
            className="group h-full flex flex-col bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image container with fixed height */}
            <div className="w-full h-48 overflow-hidden rounded-t-lg bg-gray-200 flex-shrink-0">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:opacity-75"
                />
            </div>

            {/* Content wrapper with flex-grow to push footer to bottom */}
            <div className="flex flex-col flex-grow p-4">
                {/* Product info */}
                <div className="flex-grow">
                    <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                </div>

                {/* Footer - price and add to cart button */}
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-gray-200">
                    <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
                    <button
                        onClick={handleAddToCart}
                        className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}
// import React from 'react';
// import { useParams } from 'react-router-dom';
// import ProductCard from './ProductCard';
// import type { Product } from '../../types';
// import { useCart } from '../../context/CartContext';


// const mockProducts: Record<string, Product[]> = {
//     dth: [
//         {
//             id: '1',
//             name: 'HD Set-Top Box',
//             description: 'High-definition set-top box with recording capabilities',
//             price: 2499,
//             category: 'dth',
//             stock: 50,
//             image: 'https://images.unsplash.com/photo-1540821924489-7690c70c4eac?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//         {
//             id: '2',
//             name: 'Premium DTH Dish',
//             description: '90cm dish antenna with mounting kit',
//             price: 1999,
//             category: 'dth',
//             stock: 30,
//             image: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//     ],
//     networking: [
//         {
//             id: '3',
//             name: 'Dual-Band Router',
//             description: 'High-speed WiFi 6 router for seamless streaming',
//             price: 3499,
//             category: 'networking',
//             stock: 25,
//             image: 'https://images.unsplash.com/photo-1544408945-2ed27873c8c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//         {
//             id: '4',
//             name: 'Network Cable Kit',
//             description: 'CAT6 cable kit with connectors and crimping tool',
//             price: 999,
//             category: 'networking',
//             stock: 100,
//             image: 'https://images.unsplash.com/photo-1551498406-76c7c4a51c93?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//     ],
//     accessories: [
//         {
//             id: '5',
//             name: 'HDMI Cable Pack',
//             description: '4K-ready HDMI cables, 2m length',
//             price: 499,
//             category: 'accessories',
//             stock: 200,
//             image: 'https://images.unsplash.com/photo-1624996379697-f01d168b1a52?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//         {
//             id: '6',
//             name: 'Universal Remote',
//             description: 'Compatible with all major DTH brands',
//             price: 299,
//             category: 'accessories',
//             stock: 150,
//             image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80',
//         },
//     ],
// };

// export default function ProductList() {
//     const { category } = useParams<{ category: string }>();
//     const products = category ? mockProducts[category] : [];
//     const { addToCart } = useCart();
//     const handleAddToCart = (product: Product) => {
//         // TODO: Implement cart functionality
//         addToCart(product);
//         console.log('Adding to cart:', product);
//     };

//     if (!products) {
//         return (
//             <div className="text-center py-12">
//                 <h2 className="text-2xl font-semibold text-gray-900">Category not found</h2>
//             </div>
//         );
//     }

//     return (
//         <div className="bg-gray-50 py-12">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <h2 className="text-2xl font-semibold text-gray-900 mb-6 capitalize">
//                     {category} Products
//                 </h2>
//                 <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
//                     {products.map((product) => (
//                         <ProductCard
//                             key={product.id}
//                             product={product}
//                             onAddToCart={handleAddToCart}
//                         />
//                     ))}
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Home } from 'lucide-react';
import { mockProducts, ProductData } from './ProductsData';


export default function ProductList() {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const products = category ? mockProducts[category] : [];
    const { addToCart } = useCart();

    const handleAddToCart = (product: ProductData) => {
        addToCart(product, 1);
    };

    const handleGoHome = () => {
        navigate('/');
    };

    if (!products) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900">Category not found</h2>
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
                            onAddToCart={handleAddToCart}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
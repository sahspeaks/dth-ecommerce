// import React from 'react';
// import { ShoppingCart } from 'lucide-react';
// import type { Product } from '../../types';
// import { useNavigate } from 'react-router-dom';
// import { mockProducts, ProductData } from './ProductsData';


// interface ProductCardProps {
//     product: Product;
//     onAddToCart: (product: Product) => void;
// }

// export default function ProductCard({ product, onAddToCart }: ProductCardProps) {

//     const navigate = useNavigate();

//     const handleClick = () => {
//         navigate(`/products/${product.category}/${product.id}`);
//     };

//     const handleAddToCart = (e: React.MouseEvent) => {
//         e.stopPropagation(); // Prevent navigation when clicking the add to cart button
//         onAddToCart(product);
//     };
//     return (
//         <div
//             onClick={handleClick}
//             className="group relative bg-white rounded-lg shadow-md overflow-hidden">
//             <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
//                 <img
//                     src={product.image}
//                     alt={product.name}
//                     className="h-48 w-full object-cover object-center group-hover:opacity-75"
//                 />
//             </div>
//             <div className="p-4">
//                 <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
//                 <p className="mt-1 text-sm text-gray-500">{product.description}</p>
//                 <div className="mt-2 flex items-center justify-between">
//                     <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
//                     <button
//                         onClick={handleAddToCart}
//                         className="flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
//                     >
//                         <ShoppingCart className="h-4 w-4 mr-2" />
//                         Add to Cart
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// // import React from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { Card, CardContent, CardFooter } from '@/components/ui/card';
// // import { Button } from '@/components/ui/button';
// // import { ShoppingCart } from 'lucide-react';
// // import type { Product } from '../../types';

// // interface ProductCardProps {
// //     product: Product;
// //     onAddToCart: (product: Product) => void;
// // }

// // export function ProductCard({ product, onAddToCart }: ProductCardProps) {
// //     const navigate = useNavigate();

// //     const handleClick = () => {
// //         navigate(`/products/${product.id}`);
// //     };

// //     const handleAddToCart = (e: React.MouseEvent) => {
// //         e.stopPropagation(); // Prevent navigation when clicking the add to cart button
// //         onAddToCart(product);
// //     };

// //     return (
// //         <Card
// //             className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
// //             onClick={handleClick}
// //         >
// //             <CardContent className="p-0">
// //                 <div className="aspect-w-4 aspect-h-3 w-full overflow-hidden rounded-t-lg">
// //                     <img
// //                         src={product.image}
// //                         alt={product.name}
// //                         className="h-48 w-full object-cover object-center"
// //                     />
// //                 </div>
// //                 <div className="p-4">
// //                     <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
// //                     <p className="mt-1 text-sm text-gray-500">{product.description}</p>
// //                     <p className="mt-2 text-lg font-semibold text-gray-900">₹{product.price.toLocaleString()}</p>
// //                 </div>
// //             </CardContent>
// //             <CardFooter className="p-4 pt-0">
// //                 <Button
// //                     variant="outline"
// //                     className="w-full"
// //                     onClick={handleAddToCart}
// //                 >
// //                     <ShoppingCart className="h-4 w-4 mr-2" />
// //                     Add to Cart
// //                 </Button>
// //             </CardFooter>
// //         </Card>
// //     );
// // }


import React from 'react';
import { ShoppingCart } from 'lucide-react';
import type { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/products/${product.category}/${product.id}`);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.stopPropagation();
        onAddToCart(product);
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
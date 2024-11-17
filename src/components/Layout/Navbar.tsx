import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, Satellite, Router, Cable, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, logout } = useAuth();
    const { items } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <nav className="bg-indigo-600 shadow-lg fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <Satellite className="h-8 w-8 text-white" />
                            <span className="text-white font-bold text-xl">MY STB</span>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/products/dth" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                                <Satellite className="h-4 w-4 mr-2" />
                                DTH Equipment
                            </Link>
                            <Link to="/products/networking" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                                <Router className="h-4 w-4 mr-2" />
                                Networking
                            </Link>
                            <Link to="/products/accessories" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                                <Cable className="h-4 w-4 mr-2" />
                                Accessories
                            </Link>
                            <Link to="/services" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
                                Services
                            </Link>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <>
                                <Link to="/cart" className="relative p-2 text-white hover:bg-indigo-500 rounded-full">
                                    <ShoppingCart className="h-6 w-6" />
                                    {totalItems > 0 && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                                {user.role === 'admin' ? (
                                    <Link to="/admin" className="text-white hover:bg-indigo-500 p-2 rounded-full">
                                        <User className="h-6 w-6" />
                                    </Link>
                                ) : (
                                    <Link to="/profile" className="text-white hover:bg-indigo-500 p-2 rounded-full">
                                        <User className="h-6 w-6" />
                                    </Link>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="text-white hover:bg-indigo-500 p-2 rounded-full"
                                >
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-indigo-600 bg-white px-4 py-2 rounded-md font-medium">
                                Sign in
                            </Link>
                        )}
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-indigo-500 p-2 rounded-md">
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/products/dth" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
                            DTH Equipment
                        </Link>
                        <Link to="/products/networking" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
                            Networking
                        </Link>
                        <Link to="/products/accessories" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
                            Accessories
                        </Link>
                        <Link to="/services" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
                            Services
                        </Link>
                    </div>
                    <div className="flex items-center space-x-4 px-2 pb-3">
                        {user ? (
                            <>
                                <Link to="/cart" className="relative p-2 text-white hover:bg-indigo-500 rounded-full">
                                    <ShoppingCart className="h-6 w-6" />
                                    {totalItems > 0 && (
                                        <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full">
                                            {totalItems}
                                        </span>
                                    )}
                                </Link>
                                {user.role === 'admin' ? (
                                    <Link to="/admin" className="text-white hover:bg-indigo-500 p-2 rounded-full">
                                        <User className="h-6 w-6" />
                                    </Link>
                                ) : (
                                    <Link to="/profile" className="text-white hover:bg-indigo-500 p-2 rounded-full">
                                        <User className="h-6 w-6" />
                                    </Link>
                                )}
                                <button onClick={handleLogout} className="text-white hover:bg-indigo-500 p-2 rounded-full">
                                    <LogOut className="h-6 w-6" />
                                </button>
                            </>
                        ) : (
                            <Link to="/login" className="text-indigo-600 bg-white px-4 py-2 rounded-md font-medium">
                                Sign in
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { ShoppingCart, User, Menu, X, Satellite, Router, Cable, LogOut } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import { useCart } from '../../context/CartContext';

// export default function Navbar() {
//     const [isOpen, setIsOpen] = React.useState(false);
//     const { user, logout } = useAuth();
//     const { items } = useCart();
//     const navigate = useNavigate();

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//     };

//     const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

//     return (
//         <nav className="bg-indigo-600 shadow-lg">
//             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex items-center">
//                         <Link to="/" className="flex items-center space-x-2">
//                             <Satellite className="h-8 w-8 text-white" />
//                             <span className="text-white font-bold text-xl">MY STB</span>
//                         </Link>
//                     </div>

//                     <div className="hidden md:block">
//                         <div className="ml-10 flex items-baseline space-x-4">
//                             <Link to="/products/dth" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
//                                 <Satellite className="h-4 w-4 mr-2" />
//                                 DTH Equipment
//                             </Link>
//                             <Link to="/products/networking" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
//                                 <Router className="h-4 w-4 mr-2" />
//                                 Networking
//                             </Link>
//                             <Link to="/products/accessories" className="flex items-center text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
//                                 <Cable className="h-4 w-4 mr-2" />
//                                 Accessories
//                             </Link>
//                             <Link to="/services" className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md">
//                                 Services
//                             </Link>
//                         </div>
//                     </div>

//                     <div className="hidden md:flex items-center space-x-4">
//                         {user ? (
//                             <>
//                                 <Link to="/cart" className="relative p-2 text-white hover:bg-indigo-500 rounded-full">
//                                     <ShoppingCart className="h-6 w-6" />
//                                     {totalItems > 0 && (
//                                         <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full">
//                                             {totalItems}
//                                         </span>
//                                     )}
//                                 </Link>
//                                 {user.role === 'admin' ? (
//                                     <Link to="/admin" className="text-white hover:bg-indigo-500 p-2 rounded-full">
//                                         <User className="h-6 w-6" />
//                                     </Link>
//                                 ) : (
//                                     <Link to="/profile" className="text-white hover:bg-indigo-500 p-2 rounded-full">
//                                         <User className="h-6 w-6" />
//                                     </Link>
//                                 )}
//                                 <button
//                                     onClick={handleLogout}
//                                     className="text-white hover:bg-indigo-500 p-2 rounded-full"
//                                 >
//                                     <LogOut className="h-6 w-6" />
//                                 </button>
//                             </>
//                         ) : (
//                             <Link to="/login" className="text-indigo-600 bg-white px-4 py-2 rounded-md font-medium">
//                                 Sign in
//                             </Link>
//                         )}
//                     </div>

//                     <div className="md:hidden">
//                         <button onClick={() => setIsOpen(!isOpen)} className="text-white hover:bg-indigo-500 p-2 rounded-md">
//                             {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {isOpen && (
//                 <div className="md:hidden">
//                     <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//                         <Link to="/products/dth" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
//                             DTH Equipment
//                         </Link>
//                         <Link to="/products/networking" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
//                             Networking
//                         </Link>
//                         <Link to="/products/accessories" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
//                             Accessories
//                         </Link>
//                         <Link to="/services" className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md">
//                             Services
//                         </Link>
//                     </div>
//                     <div className="flex items-center space-x-4 px-2 pb-3">
//                         {user ? (
//                             <>
//                                 <Link to="/cart" className="relative p-2 text-white hover:bg-indigo-500 rounded-full">
//                                     <ShoppingCart className="h-6 w-6" />
//                                     {totalItems > 0 && (
//                                         <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-300 rounded-full">
//                                             {totalItems}
//                                         </span>
//                                     )}
//                                 </Link>
//                                 {user.role === 'admin' ? (
//                                     <Link to="/admin" className="text-white hover:bg-indigo-500 p-2 rounded-full">
//                                         <User className="h-6 w-6" />
//                                     </Link>
//                                 ) : (
//                                     <Link to="/profile" className="text-white hover:bg-indigo-500 p-2 rounded-full">
//                                         <User className="h-6 w-6" />
//                                     </Link>
//                                 )}
//                                 <button onClick={handleLogout} className="text-white hover:bg-indigo-500 p-2 rounded-full">
//                                     <LogOut className="h-6 w-6" />
//                                 </button>
//                             </>
//                         ) : (
//                             <Link to="/login" className="text-indigo-600 bg-white px-4 py-2 rounded-md font-medium">
//                                 Sign in
//                             </Link>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </nav>
//     );
// }

// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { Navigate } from 'react-router-dom';
// import {
//     BarChart,
//     Package,
//     Users,
//     ShoppingBag,
//     Settings,
//     LogOut,
//     DollarSign,
//     TrendingUp
// } from 'lucide-react';

// export default function AdminDashboard() {
//     const { user, logout } = useAuth();
//     const [activeTab, setActiveTab] = useState('overview');

//     if (!user || user.role !== 'admin') {
//         return <Navigate to="/login" replace />;
//     }

//     const mockStats = {
//         totalOrders: 156,
//         totalUsers: 1234,
//         totalProducts: 45,
//         revenue: 125000,
//     };

//     const renderContent = () => {
//         switch (activeTab) {
//             case 'overview':
//                 return (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//                         <div className="bg-white p-6 rounded-lg shadow">
//                             <div className="flex items-center">
//                                 <ShoppingBag className="h-10 w-10 text-indigo-600" />
//                                 <div className="ml-4">
//                                     <p className="text-sm font-medium text-gray-500">Total Orders</p>
//                                     <p className="text-2xl font-semibold text-gray-900">{mockStats.totalOrders}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow">
//                             <div className="flex items-center">
//                                 <Users className="h-10 w-10 text-green-600" />
//                                 <div className="ml-4">
//                                     <p className="text-sm font-medium text-gray-500">Total Users</p>
//                                     <p className="text-2xl font-semibold text-gray-900">{mockStats.totalUsers}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow">
//                             <div className="flex items-center">
//                                 <Package className="h-10 w-10 text-blue-600" />
//                                 <div className="ml-4">
//                                     <p className="text-sm font-medium text-gray-500">Total Products</p>
//                                     <p className="text-2xl font-semibold text-gray-900">{mockStats.totalProducts}</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow">
//                             <div className="flex items-center">
//                                 <DollarSign className="h-10 w-10 text-yellow-600" />
//                                 <div className="ml-4">
//                                     <p className="text-sm font-medium text-gray-500">Total Revenue</p>
//                                     <p className="text-2xl font-semibold text-gray-900">₹{mockStats.revenue.toLocaleString()}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 );
//             case 'products':
//                 return (
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Products Management</h3>
//                         <p className="text-gray-500">Product management interface will be implemented here</p>
//                     </div>
//                 );
//             case 'orders':
//                 return (
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Orders Management</h3>
//                         <p className="text-gray-500">Order management interface will be implemented here</p>
//                     </div>
//                 );
//             case 'users':
//                 return (
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Users Management</h3>
//                         <p className="text-gray-500">User management interface will be implemented here</p>
//                     </div>
//                 );
//             case 'settings':
//                 return (
//                     <div className="bg-white p-6 rounded-lg shadow">
//                         <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Settings</h3>
//                         <p className="text-gray-500">Settings interface will be implemented here</p>
//                     </div>
//                 );
//             default:
//                 return null;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             <div className="flex">
//                 {/* Sidebar */}
//                 <div className="w-64 bg-white shadow-md min-h-screen">
//                     <div className="p-4">
//                         <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
//                         <p className="text-sm text-gray-500 mt-1">Welcome, {user.name}</p>
//                     </div>
//                     <nav className="mt-4">
//                         <button
//                             onClick={() => setActiveTab('overview')}
//                             className={`flex items-center w-full px-4 py-2 text-sm ${activeTab === 'overview'
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <BarChart className="h-5 w-5 mr-2" />
//                             Overview
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('products')}
//                             className={`flex items-center w-full px-4 py-2 text-sm ${activeTab === 'products'
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <Package className="h-5 w-5 mr-2" />
//                             Products
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('orders')}
//                             className={`flex items-center w-full px-4 py-2 text-sm ${activeTab === 'orders'
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <ShoppingBag className="h-5 w-5 mr-2" />
//                             Orders
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('users')}
//                             className={`flex items-center w-full px-4 py-2 text-sm ${activeTab === 'users'
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <Users className="h-5 w-5 mr-2" />
//                             Users
//                         </button>
//                         <button
//                             onClick={() => setActiveTab('settings')}
//                             className={`flex items-center w-full px-4 py-2 text-sm ${activeTab === 'settings'
//                                     ? 'bg-indigo-50 text-indigo-600'
//                                     : 'text-gray-600 hover:bg-gray-50'
//                                 }`}
//                         >
//                             <Settings className="h-5 w-5 mr-2" />
//                             Settings
//                         </button>
//                         <button
//                             onClick={logout}
//                             className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
//                         >
//                             <LogOut className="h-5 w-5 mr-2" />
//                             Logout
//                         </button>
//                     </nav>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 p-8">
//                     <div className="max-w-7xl mx-auto">
//                         {renderContent()}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }



import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import {
    BarChart,
    Package,
    Users,
    ShoppingBag,
    Settings,
    LogOut,
    DollarSign,
    Menu,
    X
} from 'lucide-react';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    const mockStats = {
        totalOrders: 156,
        totalUsers: 1234,
        totalProducts: 45,
        revenue: 125000,
    };

    const navItems = [
        { id: 'overview', label: 'Overview', icon: BarChart },
        { id: 'products', label: 'Products', icon: Package },
        { id: 'orders', label: 'Orders', icon: ShoppingBag },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <ShoppingBag className="h-10 w-10 text-indigo-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Orders</p>
                                    <p className="text-2xl font-semibold text-gray-900">{mockStats.totalOrders}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <Users className="h-10 w-10 text-green-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                                    <p className="text-2xl font-semibold text-gray-900">{mockStats.totalUsers}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <Package className="h-10 w-10 text-blue-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Products</p>
                                    <p className="text-2xl font-semibold text-gray-900">{mockStats.totalProducts}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex items-center">
                                <DollarSign className="h-10 w-10 text-yellow-600" />
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                                    <p className="text-2xl font-semibold text-gray-900">₹{mockStats.revenue.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Products Management</h3>
                        <p className="text-gray-500">Product management interface will be implemented here</p>
                    </div>
                );
            case 'orders':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Orders Management</h3>
                        <p className="text-gray-500">Order management interface will be implemented here</p>
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Users Management</h3>
                        <p className="text-gray-500">User management interface will be implemented here</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Settings</h3>
                        <p className="text-gray-500">Settings interface will be implemented here</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navbar */}
            <nav className="bg-white border-b border-gray-200">
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">Admin Panel</h1>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded-md ${activeTab === item.id
                                                ? 'text-indigo-600 bg-indigo-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="h-5 w-5 mr-1.5" />
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center">
                            <span className="hidden md:block text-sm text-gray-500 mr-4">
                                Welcome, {user.name}
                            </span>
                            <button
                                onClick={logout}
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-5 w-5 mr-1.5" />
                                Logout
                            </button>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                            >
                                {isMobileMenuOpen ? (
                                    <X className="h-6 w-6" />
                                ) : (
                                    <Menu className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 pb-3 pt-3">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id);
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center w-full px-4 py-2 text-sm font-medium ${activeTab === item.id
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="h-5 w-5 mr-2" />
                                    {item.label}
                                </button>
                            );
                        })}
                    </div>
                )}
            </nav>

            {/* Main Content */}
            <main className="py-6 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
}
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Layout/Navbar';
import LoginForm from './components/Auth/LoginForm';
import CartPage from './components/Cart/CartPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import ProductList from './components/Products/ProductList';
import Hero from './components/Hero';
import ServiceBooking from './components/ServiceBooking';
import ProductDetails from './components/Products/ProductDetails';
import UserProfile from './components/UserProfile';

// ProtectedRoute Component remains the same
const ProtectedRoute = ({ children, requireAdmin = false }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Updated Layout Component to handle full-width content
const Layout = ({ children, fullWidth = false }: { children: React.ReactNode, fullWidth?: boolean }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className={fullWidth ? '' : 'container mx-auto px-4 py-8'}>
        {children}
      </main>
    </div>
  );
};

// Updated App Component with new routing structure
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout fullWidth>
                  <Hero />
                </Layout>
              }
            />

            <Route
              path="/login"
              element={
                <Layout>
                  <LoginForm />
                </Layout>
              }
            />

            {/* Product Routes */}
            <Route
              path="/products/*"
              element={
                <Layout>
                  <ProductList />
                </Layout>
              }
            />

            <Route
              path="/products/:category"
              element={
                <Layout>
                  <ProductList />
                </Layout>
              }
            />
            <Route path="/products/:category/:productId" element={
              <Layout>
                <ProductDetails />
              </Layout>
            } />

            {/* Protected Routes */}
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Layout>
                    <CartPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/services"
              element={
                <Layout>
                  <ServiceBooking />
                </Layout>
              }
            />

            <Route
              path="/admin/*"
              element={
                <ProtectedRoute requireAdmin>
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <Layout>
                    <UserProfile />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
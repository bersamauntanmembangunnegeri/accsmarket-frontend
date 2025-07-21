import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProductListPage from './pages/admin/ProductListPage'
import ProductForm from './pages/admin/ProductForm'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/search" element={<CategoryPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            {/* Admin Routes - Protected */}
            <Route path="/admin" element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboardPage />
              </ProtectedRoute>
            }>
              <Route index element={<div>Admin Dashboard Home</div>} />
              <Route path="products" element={<ProductListPage />} />
              <Route path="products/new" element={<ProductForm />} />
              <Route path="products/edit/:id" element={<ProductForm />} />
              <Route path="users" element={<div>User Management</div>} />
              <Route path="settings" element={<div>Admin Settings</div>} />
            </Route>
            {/* Placeholder routes for other pages */}
            <Route path="/news" element={<div className="container mx-auto px-4 py-8"><h1>News Page</h1><p>Coming soon...</p></div>} />
            <Route path="/info" element={<div className="container mx-auto px-4 py-8"><h1>Useful Information</h1><p>Coming soon...</p></div>} />
            <Route path="/faq" element={<div className="container mx-auto px-4 py-8"><h1>FAQ</h1><p>Coming soon...</p></div>} />
            <Route path="/terms" element={<div className="container mx-auto px-4 py-8"><h1>Terms of Use</h1><p>Coming soon...</p></div>} />
            <Route path="/seller" element={<div className="container mx-auto px-4 py-8"><h1>Become a Seller</h1><p>Coming soon...</p></div>} />
            <Route path="/account" element={
              <ProtectedRoute>
                <div className="container mx-auto px-4 py-8"><h1>My Account</h1><p>Coming soon...</p></div>
              </ProtectedRoute>
            } />
            <Route path="/cart" element={<div className="container mx-auto px-4 py-8"><h1>Shopping Cart</h1><p>Coming soon...</p></div>} />
          </Routes>
        </div>
        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 mt-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold mb-4">AccsMarket</h3>
                <p className="text-sm text-gray-400">
                  Your trusted marketplace for social media accounts
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Terms of Use</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white">Contact Us</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Help Center</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Refund Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Sellers</h4>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-gray-400 hover:text-white">Become a Seller</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Seller Guidelines</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white">Seller Dashboard</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
              <p>&copy; 2025 AccsMarket. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App


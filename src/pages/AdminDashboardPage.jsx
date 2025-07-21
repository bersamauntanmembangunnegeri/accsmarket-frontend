import { Link, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Home, Package, Users, Settings } from 'lucide-react'

const AdminDashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin">
            <Button variant="ghost" className="w-full justify-start text-lg text-white hover:bg-gray-700">
              <Home className="mr-3 h-5 w-5" /> Dashboard
            </Button>
          </Link>
          <Link to="/admin/products">
            <Button variant="ghost" className="w-full justify-start text-lg text-white hover:bg-gray-700">
              <Package className="mr-3 h-5 w-5" /> Products
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button variant="ghost" className="w-full justify-start text-lg text-white hover:bg-gray-700">
              <Users className="mr-3 h-5 w-5" /> Users
            </Button>
          </Link>
          {/* Add more admin links as needed */}
          <Link to="/admin/settings">
            <Button variant="ghost" className="w-full justify-start text-lg text-white hover:bg-gray-700">
              <Settings className="mr-3 h-5 w-5" /> Settings
            </Button>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet /> {/* This will render nested routes */}
      </main>
    </div>
  )
}

export default AdminDashboardPage



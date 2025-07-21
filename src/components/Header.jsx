import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Search, User, ShoppingCart, Menu, LogOut, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const { user, logout, isAdmin } = useAuth()
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    navigate(`/category/${category}`)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="bg-gray-800 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-900 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <Link to="/news" className="hover:text-green-400 transition-colors">News</Link>
            <Link to="/" className="hover:text-green-400 transition-colors">Home</Link>
            <Link to="/info" className="hover:text-green-400 transition-colors">Useful information</Link>
            <Link to="/faq" className="hover:text-green-400 transition-colors">FAQ</Link>
            <Link to="/terms" className="hover:text-green-400 transition-colors">Terms of use</Link>
            <Link to="/seller" className="hover:text-green-400 transition-colors">Become a seller</Link>
          </div>
          <div className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-gray-300">
                    <User className="h-4 w-4 mr-2" />
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account">My Account</Link>
                  </DropdownMenuItem>
                  {isAdmin() && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin">
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link to="/signup">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                    + Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
                    Login
                  </Button>
                </Link>
              </div>
            )}
            <select className="bg-transparent border border-gray-600 rounded px-2 py-1 text-xs">
              <option value="en">Eng</option>
              <option value="ru">Рус</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <h1 className="text-2xl font-bold">
                  <span className="text-red-500">ACCS</span>
                  <span className="text-white">market.com</span>
                </h1>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="flex">
                <Select onValueChange={handleCategorySelect}>
                  <SelectTrigger className="w-48 bg-green-600 border-green-600 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="facebook">Facebook Accounts</SelectItem>
                    <SelectItem value="instagram">Instagram Accounts</SelectItem>
                    <SelectItem value="twitter">Twitter Accounts</SelectItem>
                    <SelectItem value="gmail">Gmail Accounts</SelectItem>
                    <SelectItem value="vkontakte">VKontakte Accounts</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search for accounts"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-4 pr-12 py-2 border-0 rounded-l-none"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 bg-orange-500 hover:bg-orange-600 rounded-l-none"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Link to="/search/advanced">
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2 text-white border-white hover:bg-white hover:text-gray-900"
                  >
                    Advanced search
                  </Button>
                </Link>
              </form>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link to="/account">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </Link>
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


import { Search, User, ShoppingCart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const Header = () => {
  return (
    <header className="bg-gray-800 text-white">
      {/* Top Navigation */}
      <div className="bg-gray-900 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex space-x-4">
            <a href="#" className="hover:text-green-400 transition-colors">News</a>
            <a href="#" className="hover:text-green-400 transition-colors">Home</a>
            <a href="#" className="hover:text-green-400 transition-colors">Useful information</a>
            <a href="#" className="hover:text-green-400 transition-colors">FAQ</a>
            <a href="#" className="hover:text-green-400 transition-colors">Terms of use</a>
            <a href="#" className="hover:text-green-400 transition-colors">Become a seller</a>
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
              + Sign Up
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-gray-900">
              Login
            </Button>
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
              <h1 className="text-2xl font-bold">
                <span className="text-red-500">ACCS</span>
                <span className="text-white">market.com</span>
              </h1>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="flex">
                <Select>
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
                    className="w-full pl-4 pr-12 py-2 border-0 rounded-l-none"
                  />
                  <Button
                    size="sm"
                    className="absolute right-0 top-0 h-full px-4 bg-orange-500 hover:bg-orange-600 rounded-l-none"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="ml-2 text-white border-white hover:bg-white hover:text-gray-900"
                >
                  Advanced search
                </Button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <User className="h-4 w-4 mr-2" />
                Account
              </Button>
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-700">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header


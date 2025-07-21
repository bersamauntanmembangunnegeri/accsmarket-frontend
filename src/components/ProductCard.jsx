import { Star, Clock, TrendingUp, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const ProductCard = ({ 
  platform, 
  title, 
  description, 
  price, 
  stock, 
  rating, 
  successRate, 
  minOrder, 
  image,
  isNew = false 
}) => {
  const getPlatformIcon = (platform) => {
    const icons = {
      facebook: '📘',
      instagram: '📷',
      twitter: '🐦',
      gmail: '📧',
      vkontakte: '🔵'
    }
    return icons[platform.toLowerCase()] || '📱'
  }

  const getPlatformColor = (platform) => {
    const colors = {
      facebook: 'bg-blue-600',
      instagram: 'bg-pink-600',
      twitter: 'bg-blue-400',
      gmail: 'bg-red-600',
      vkontakte: 'bg-blue-800'
    }
    return colors[platform.toLowerCase()] || 'bg-gray-600'
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
      {/* Platform Header */}
      <div className={`${getPlatformColor(platform)} text-white px-3 py-1 rounded-t-lg -mx-4 -mt-4 mb-3 flex items-center justify-between`}>
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getPlatformIcon(platform)}</span>
          <span className="font-medium text-sm">{platform} Account</span>
        </div>
        {isNew && <Badge variant="secondary" className="bg-yellow-400 text-black text-xs">NEW</Badge>}
      </div>

      {/* Account Image */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-2xl">{getPlatformIcon(platform)}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm text-gray-900 line-clamp-2 mb-1">
            {title}
          </h3>
          <p className="text-xs text-gray-600 line-clamp-2">
            {description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center justify-between mb-3 text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-green-600" />
            <span className="text-green-600">48h</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span>{rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-green-600" />
            <span className="text-green-600">{successRate}%</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-3 w-3 text-blue-600" />
            <span>{minOrder}+</span>
          </div>
        </div>
      </div>

      {/* Stock and Price */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <div className="text-xs text-gray-600">In stock</div>
          <div className="font-medium text-sm">{stock.toLocaleString()} pcs.</div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-600">Price per pc</div>
          <div className="font-bold text-lg text-green-600">from ${price}</div>
        </div>
      </div>

      {/* Buy Button */}
      <div className="flex items-center space-x-2">
        <div className="flex-1">
          <div className="text-xs text-center text-gray-600 mb-1">Buy</div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2">
            Buy
          </Button>
        </div>
        <div className="text-right">
          <select className="border border-gray-300 rounded px-2 py-1 text-xs">
            <option>1</option>
            <option>5</option>
            <option>10</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default ProductCard


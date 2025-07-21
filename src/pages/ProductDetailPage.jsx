import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, Clock, TrendingUp, Users, ArrowLeft, ShoppingCart } from 'lucide-react'
import { useApi } from '../hooks/useApi'

const ProductDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  
  const { data: account, loading, error } = useApi(`/accounts/${id}`)

  const handleAddToCart = () => {
    // TODO: Implement cart functionality
    console.log(`Adding ${quantity} of account ${id} to cart`)
    alert(`Added ${quantity} account(s) to cart!`)
  }

  const handleBuyNow = () => {
    // TODO: Implement buy now functionality
    console.log(`Buying ${quantity} of account ${id}`)
    alert(`Proceeding to checkout with ${quantity} account(s)!`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading account details...</p>
        </div>
      </div>
    )
  }

  if (error || !account) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">Account not found</p>
          <Button onClick={() => navigate('/')} className="mt-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

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
    <div className="container mx-auto px-4 py-6">
      {/* Back Button */}
      <Button 
        onClick={() => navigate(-1)} 
        variant="outline" 
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image/Icon */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className={`${getPlatformColor(account.platform)} text-white p-6 rounded-lg text-center mb-6`}>
            <div className="text-6xl mb-4">{getPlatformIcon(account.platform)}</div>
            <h2 className="text-2xl font-bold">{account.platform} Account</h2>
            <p className="text-lg opacity-90">{account.account_type}</p>
          </div>

          {/* Account Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-center mb-2">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
              </div>
              <div className="font-bold text-lg">{account.rating || 'N/A'}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div className="font-bold text-lg">{account.success_rate || 'N/A'}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div className="font-bold text-lg">{account.friends_count || account.followers_count || 'N/A'}</div>
              <div className="text-sm text-gray-600">Friends/Followers</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded">
              <div className="flex items-center justify-center mb-2">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div className="font-bold text-lg">48h</div>
              <div className="text-sm text-gray-600">Delivery</div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{account.title}</h1>
          
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {account.verification_status && (
              <Badge variant="secondary">{account.verification_status}</Badge>
            )}
            {account.has_email && <Badge variant="outline">Email Included</Badge>}
            {account.has_phone && <Badge variant="outline">Phone Included</Badge>}
            {account.country && <Badge variant="outline">{account.country}</Badge>}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{account.description}</p>
          </div>

          {/* Specifications */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Specifications</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {account.registration_date && (
                <div>
                  <span className="text-gray-600">Registration:</span>
                  <span className="ml-2">{new Date(account.registration_date).getFullYear()}</span>
                </div>
              )}
              {account.gender && (
                <div>
                  <span className="text-gray-600">Gender:</span>
                  <span className="ml-2">{account.gender}</span>
                </div>
              )}
              {account.age_range && (
                <div>
                  <span className="text-gray-600">Age Range:</span>
                  <span className="ml-2">{account.age_range}</span>
                </div>
              )}
              <div>
                <span className="text-gray-600">Min Order:</span>
                <span className="ml-2">{account.min_order_quantity}</span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Price per account:</span>
              <span className="text-2xl font-bold text-green-600">
                ${account.price ? account.price.toFixed(2) : 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">In stock:</span>
              <span className="font-semibold">
                {account.stock_quantity ? account.stock_quantity.toLocaleString() : 'N/A'} pcs
              </span>
            </div>
          </div>

          {/* Purchase Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <select 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="border border-gray-300 rounded px-3 py-2 w-full"
              >
                <option value={1}>1</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <div className="flex space-x-4">
              <Button 
                onClick={handleAddToCart}
                variant="outline"
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
              <Button 
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                Buy Now
              </Button>
            </div>

            <div className="text-center text-sm text-gray-600">
              Total: ${account.price ? (account.price * quantity).toFixed(2) : 'N/A'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage


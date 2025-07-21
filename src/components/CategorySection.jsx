import { Button } from '@/components/ui/button'
import ProductCard from './ProductCard'

const CategorySection = ({ category, subcategory, products, onViewAll }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Facebook Accounts': 'bg-blue-600',
      'Instagram Accounts': 'bg-pink-600',
      'Twitter Accounts': 'bg-blue-400',
      'Gmail Accounts': 'bg-red-600',
      'VKontakte Accounts': 'bg-blue-800'
    }
    return colors[category] || 'bg-gray-600'
  }

  const getSubcategoryColor = (subcategory) => {
    const colors = {
      'Facebook Softregs': 'bg-purple-600',
      'Facebook With friends': 'bg-green-600',
      'Facebook Aged': 'bg-orange-600',
      'Facebook For advertising': 'bg-red-600',
      'Instagram Softreg': 'bg-purple-600',
      'Instagram Aged': 'bg-orange-600',
      'Instagram With Followers': 'bg-green-600',
      'Instagram Boost followers': 'bg-pink-600',
      'Instagram Boost likes': 'bg-red-600',
      'Twitter Aged': 'bg-orange-600',
      'Twitter Softreg': 'bg-purple-600',
      'Gmail Softreg': 'bg-purple-600',
      'Gmail Aged': 'bg-orange-600',
      'VKontakte Softreg': 'bg-purple-600'
    }
    return colors[subcategory] || 'bg-gray-600'
  }

  return (
    <div className="mb-8">
      {/* Category Header */}
      <div className="bg-gray-800 text-white px-4 py-3 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${getCategoryColor(category)}`}></div>
            <span className="font-medium">{category}</span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded ${getSubcategoryColor(subcategory)}`}></div>
            <span className="font-medium">{subcategory}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">In stock</span>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Price</span>
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="bg-gray-50 p-4 rounded-b-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
          {products.slice(0, 5).map((product) => (
            <ProductCard
              key={product.id}
              platform={product.platform}
              title={product.title}
              description={product.description}
              price={product.price}
              stock={product.stock_quantity}
              rating={product.rating}
              successRate={product.success_rate}
              minOrder={product.min_order_quantity}
              accountId={product.id}
              isNew={product.isNew}
            />
          ))}
        </div>
        
        {/* View All Button */}
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={onViewAll}
            className="bg-white border-green-500 text-green-600 hover:bg-green-50 px-8"
          >
            View all
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CategorySection


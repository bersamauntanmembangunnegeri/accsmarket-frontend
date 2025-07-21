import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApi } from '../../hooks/useApi'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

const ProductForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditMode = !!id

  const [formData, setFormData] = useState({
    platform: '',
    account_type: '',
    title: '',
    description: '',
    price: '',
    stock_quantity: '',
    rating: '',
    success_rate: '',
    min_order_quantity: '',
    verification_status: '',
    has_email: false,
    has_phone: false,
    country: '',
    registration_date: '',
    gender: '',
    age_range: '',
    friends_count: '',
    followers_count: '',
  })

  const { data: accountData, loading, error } = useApi(isEditMode ? `/admin/accounts/${id}` : null)

  useEffect(() => {
    if (isEditMode && accountData) {
      setFormData({
        platform: accountData.platform || '',
        account_type: accountData.account_type || '',
        title: accountData.title || '',
        description: accountData.description || '',
        price: accountData.price || '',
        stock_quantity: accountData.stock_quantity || '',
        rating: accountData.rating || '',
        success_rate: accountData.success_rate || '',
        min_order_quantity: accountData.min_order_quantity || '',
        verification_status: accountData.verification_status || '',
        has_email: accountData.has_email || false,
        has_phone: accountData.has_phone || false,
        country: accountData.country || '',
        registration_date: accountData.registration_date || '',
        gender: accountData.gender || '',
        age_range: accountData.age_range || '',
        friends_count: accountData.friends_count || '',
        followers_count: accountData.followers_count || '',
      })
    }
  }, [isEditMode, accountData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const method = isEditMode ? 'PUT' : 'POST'
    const url = isEditMode ? `/api/admin/accounts/${id}` : '/api/admin/accounts'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(`Account ${isEditMode ? 'updated' : 'created'} successfully!`)
        navigate('/admin/products')
      } else {
        const errorData = await response.json()
        alert(`Failed to ${isEditMode ? 'update' : 'create'} account: ${errorData.message || response.statusText}`)
      }
    } catch (err) {
      console.error(`Error ${isEditMode ? 'updating' : 'creating'} account:`, err)
      alert(`Error ${isEditMode ? 'updating' : 'creating'} account.`)
    }
  }

  if (isEditMode && loading) return <div>Loading product data...</div>
  if (isEditMode && error) return <div>Error loading product: {error.message}</div>

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Add New Product'}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="platform">Platform</Label>
          <Input type="text" id="platform" name="platform" value={formData.platform} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="account_type">Account Type</Label>
          <Input type="text" id="account_type" name="account_type" value={formData.account_type} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="title">Title</Label>
          <Input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="price">Price</Label>
          <Input type="number" id="price" name="price" value={formData.price} onChange={handleChange} step="0.01" required />
        </div>
        <div>
          <Label htmlFor="stock_quantity">Stock Quantity</Label>
          <Input type="number" id="stock_quantity" name="stock_quantity" value={formData.stock_quantity} onChange={handleChange} required />
        </div>
        <div>
          <Label htmlFor="rating">Rating</Label>
          <Input type="number" id="rating" name="rating" value={formData.rating} onChange={handleChange} step="0.1" min="0" max="5" />
        </div>
        <div>
          <Label htmlFor="success_rate">Success Rate (%)</Label>
          <Input type="number" id="success_rate" name="success_rate" value={formData.success_rate} onChange={handleChange} min="0" max="100" />
        </div>
        <div>
          <Label htmlFor="min_order_quantity">Min Order Quantity</Label>
          <Input type="number" id="min_order_quantity" name="min_order_quantity" value={formData.min_order_quantity} onChange={handleChange} min="1" />
        </div>
        <div>
          <Label htmlFor="verification_status">Verification Status</Label>
          <Select name="verification_status" value={formData.verification_status} onValueChange={(value) => handleSelectChange('verification_status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Verified">Verified</SelectItem>
              <SelectItem value="Unverified">Unverified</SelectItem>
              <SelectItem value="PVA">PVA</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="has_email" name="has_email" checked={formData.has_email} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_email: checked }))} />
          <Label htmlFor="has_email">Has Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id="has_phone" name="has_phone" checked={formData.has_phone} onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_phone: checked }))} />
          <Label htmlFor="has_phone">Has Phone</Label>
        </div>
        <div>
          <Label htmlFor="country">Country</Label>
          <Input type="text" id="country" name="country" value={formData.country} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="registration_date">Registration Date</Label>
          <Input type="date" id="registration_date" name="registration_date" value={formData.registration_date} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="gender">Gender</Label>
          <Select name="gender" value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">Male</SelectItem>
              <SelectItem value="Female">Female</SelectItem>
              <SelectItem value="Unspecified">Unspecified</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="age_range">Age Range</Label>
          <Input type="text" id="age_range" name="age_range" value={formData.age_range} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="friends_count">Friends Count</Label>
          <Input type="number" id="friends_count" name="friends_count" value={formData.friends_count} onChange={handleChange} min="0" />
        </div>
        <div>
          <Label htmlFor="followers_count">Followers Count</Label>
          <Input type="number" id="followers_count" name="followers_count" value={formData.followers_count} onChange={handleChange} min="0" />
        </div>
        
        <div className="md:col-span-2 flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>Cancel</Button>
          <Button type="submit">{isEditMode ? 'Update Product' : 'Add Product'}</Button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm



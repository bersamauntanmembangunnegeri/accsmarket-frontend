import { useState, useEffect } from 'react'
import { useApi } from '../../hooks/useApi'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircle, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const ProductListPage = () => {
  const { data: accounts, loading, error, fetchData } = useApi('/admin/accounts')

  const handleDelete = async (accountId) => {
    if (window.confirm(`Are you sure you want to delete account ${accountId}?`)) {
      try {
        const response = await fetch(`/api/admin/accounts/${accountId}`, {
          method: 'DELETE',
        })
        if (response.ok) {
          alert('Account deleted successfully!')
          fetchData() // Refresh the list
        } else {
          alert('Failed to delete account.')
        }
      } catch (err) {
        console.error('Error deleting account:', err)
        alert('Error deleting account.')
      }
    }
  }

  if (loading) return <div>Loading products...</div>
  if (error) return <div>Error: {error.message}</div>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <Link to="/admin/products/new">
          <Button>
            <PlusCircle className="mr-2 h-5 w-5" /> Add New Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Platform</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {accounts?.map((account) => (
              <TableRow key={account.id}>
                <TableCell className="font-medium">{account.id}</TableCell>
                <TableCell>{account.platform}</TableCell>
                <TableCell>{account.title}</TableCell>
                <TableCell>${account.price?.toFixed(2)}</TableCell>
                <TableCell>{account.stock_quantity}</TableCell>
                <TableCell className="flex space-x-2">
                  <Link to={`/admin/products/edit/${account.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(account.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default ProductListPage



import { useState, useEffect } from 'react';
import api from '../api/axios';
import { Plus, Trash, Edit } from 'lucide-react';

interface Product {
    id: number;
    name: string;
    description: string;
    price: string;
    stock: number;
}

const ProductList = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await api.get('/products/');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure?')) {
            try {
                await api.delete(`/products/${id}/`);
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product', error);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isEditing && currentProduct.id) {
                await api.put(`/products/${currentProduct.id}/`, currentProduct);
            } else {
                await api.post('/products/', currentProduct);
            }
            setIsModalOpen(false);
            setCurrentProduct({});
            setIsEditing(false);
            fetchProducts();
        } catch (error) {
            console.error('Error saving product', error);
        }
    };

    const openEditModal = (product: Product) => {
        setCurrentProduct(product);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openCreateModal = () => {
        setCurrentProduct({});
        setIsEditing(false);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Products</h1>
                <button className="btn-primary" style={{ width: 'auto' }} onClick={openCreateModal}>
                    <Plus size={16} style={{ marginRight: '8px' }} />
                    Add Product
                </button>
            </div>

            <div className="card table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>${product.price}</td>
                                <td>{product.stock}</td>
                                <td>
                                    <button onClick={() => openEditModal(product)} style={{ marginRight: '10px', background: 'none', border: 'none', cursor: 'pointer', color: 'blue' }}>
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => handleDelete(product.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'red' }}>
                                        <Trash size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2 style={{ marginBottom: '24px' }}>{isEditing ? 'Edit Product' : 'Add Product'}</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name</label>
                                <input
                                    className="form-input"
                                    value={currentProduct.name || ''}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    className="form-input"
                                    value={currentProduct.description || ''}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Price</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={currentProduct.price || ''}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Stock</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={currentProduct.stock || 0}
                                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) })}
                                    required
                                />
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button type="submit" className="btn-primary">Save</button>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-primary" style={{ backgroundColor: '#64748b' }}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductList;

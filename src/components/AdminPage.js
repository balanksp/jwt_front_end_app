import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:9052/login/all', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log(data,'========>')
        setProducts(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {error && <p>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.productId}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;

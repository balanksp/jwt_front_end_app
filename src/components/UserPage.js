// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// const UserPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchProduct = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:9052/login/${id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch product');
//         }

//         const data = await response.json();
//         setProduct(data);
//       } catch (error) {
//         setError(error.message);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   return (
//     <div>
//       <h1>Product Details</h1>
//       {error && <p>{error}</p>}
//       {product ? (
//         <div>
//           <p>Product ID: {product.productId}</p>
//           <p>Name: {product.name}</p>
//           <p>Quantity: {product.quanity}</p>
//           <p>Price: ${product.price}</p>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default UserPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserPage = () => {
  const { id } = useParams();
  const [inputId, setInputId] = useState(id || '');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProduct = async (productId) => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:9052/login/${productId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }

      const data = await response.json();
      setProduct(data);
      setError('');
    } catch (error) {
      setError(error.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const handleFetchProduct = () => {
    if (inputId) {
      fetchProduct(inputId);
    }
  };

  return (
    <div>
      <h1>Product Details</h1>
      <div>
        <input
          type="text"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
          placeholder="Enter product ID"
        />
        <button onClick={handleFetchProduct} disabled={loading}>
          {loading ? 'Loading...' : 'Fetch Product'}
        </button>
      </div>
      {error && <p>{error}</p>}
      {product ? (
        <div>
          <p>Product ID: {product.productId}</p>
          <p>Name: {product.name}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>{loading ? 'Loading...' : 'Enter an ID and fetch product details.'}</p>
      )}
    </div>
  );
};

export default UserPage;

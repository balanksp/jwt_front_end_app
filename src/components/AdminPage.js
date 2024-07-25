// import React, { useEffect, useState } from 'react';

// const AdminPage = () => {
//     const [products, setProducts] = useState([]);
//     const [error, setError] = useState('');
//     const [showProducts, setShowProducts] = useState(false); // State to toggle product list visibility


//     // const roles = localStorage.getItem('roles') ? localStorage.getItem('ROLE_ADMIN').split(',') : [];

//     useEffect(() => {
//         const fetchProducts = async () => {
//             const token = localStorage.getItem('token');
//             try {
//                 const response = await fetch('http://localhost:9052/login/all', {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 });
//                 // const token = localStorage.getItem('token');

//                 if (!response.ok) {
//                     throw new Error('Failed to fetch products');
//                 }

//                 const data = await response.json();
//                 setProducts(data);
//             } catch (error) {
//                 setError(error.message);
//             }
//         };

//         if (showProducts) { // Fetch products only if showProducts is true
//             fetchProducts();
//         }
//     }, [showProducts]); // Re-fetch products when showProducts state changes

//     const handleToggleProducts = () => {
//         setShowProducts(!showProducts); // Toggle the showProducts state
//     };

//     // if (!roles.includes('ROLE_ADMIN')) {
//     //   return <p>Access Denied. You do not have permission to view this page.</p>;
//     // }


//     return (
//         <div>
//             <h1>All Products</h1>
//             {error && <p>{error}</p>}
//             <button onClick={handleToggleProducts}>
//                 {showProducts ? 'Hide Products' : 'View All Products'}
//             </button>
//             {showProducts && (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Product ID</th>
//                             <th>Name</th>
//                             <th>Quantity</th>
//                             <th>Price</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {products.map(product => (
//                             <tr key={product.productId}>
//                                 <td>{product.productId}</td>
//                                 <td>{product.name}</td>
//                                 <td>{product.quanity}</td>
//                                 <td>${product.price}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default AdminPage;
import React, { useState } from 'react';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        const token = localStorage.getItem('token');
        console.log('Token=========>', token); // Log the token

        if (!token) {
            setError('No token found');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:9052/login/all', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Response Status:', response.status); // Log the response status
            console.log('Response Headers:', response.headers); // Log the response headers

            if (!response.ok) {
                const errorText = await response.text(); // Read the error text if available
                console.error('Response Error:', errorText); // Log the error text
                // throw new Error('Failed to fetch products');
                throw new Error('Admin only able to see all products');
            }

            const data = await response.json();
            console.log('Response Body:', data);
            setProducts(data); // Set the products state with the response body
            setError(''); // Clear any existing errors
        } catch (error) {
            console.error('Fetch Error:', error.message); // Log the fetch error message
            setError(error.message);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };
    const closeProducts = async () => {
      setProducts('');
    }
  
    return (
        <div>
            <h1>All Products</h1>
            <button onClick={fetchProducts} disabled={loading}>
                {loading ? 'Loading...' : 'View All'}
            </button>
            <button onClick={closeProducts}> close</button>
            {error && <p>{error}</p>}
            {products.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Product ID</th>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.productId}>
                                <td>{product.productId}</td>
                                <td>{product.name}</td>
                                <td>{product.quanity}</td>
                                <td>${product.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>{loading ? 'Loading...' : 'No products available. Click "View All" to load products.'}</p>
            )}
        </div>
    );
};

export default AdminPage;



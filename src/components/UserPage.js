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
        console.log('Token=========>', token); // Log the token

        if (!token) {
            setError('No token found');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:9052/login/${productId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            console.log('Response Status:', response.status); // Log the response status
            console.log('Response Headers:', response.headers); // Log the response headers

            // Log response body
            const responseBody = await response.json();
            console.log('Response Body:', responseBody);

            if (!response.ok) {
                    const errorText = await response.json(); // Read the error text if available
                  console.error('Response Error:', errorText); // Log the error text
                throw new Error('Failed to fetch product', responseBody);
            }
            setProduct(responseBody); // Set the product state with the response body
            setError(''); // Clear any existing errors
            
        } catch (error) {
            console.error('Fetch Error:', error.message); // Log the fetch error message
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

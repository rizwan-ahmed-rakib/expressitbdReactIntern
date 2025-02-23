import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]); // Default empty array

    useEffect(() => {
        axios
            .get("https://glore-bd-backend-node-mongo.vercel.app/api/product")
            .then((res) => {
                console.log("API Response:", res.data); // API Response কেমন আসছে চেক করো
                setProducts(Array.isArray(res.data.data) ? res.data.data : []); // এখানে 'data' থেকে products সেট করছি
            })
            .catch((err) => {
                console.error("API Fetch Error:", err);
                setProducts([]); // Error হলে খালি অ্যারে সেট করো
            });
    }, []);

    return (
        <div className="container">
            <h2 className="text-center mt-4">Product List</h2>
            {products.length > 0 ? (
                <div className="row">
                    {products.map((product) => (
                        <div key={product._id} className="col-md-4">
                            <div className="card p-3 shadow">
                                <img
                                    src={product.images[0]?.secure_url || "https://via.placeholder.com/150"}
                                    alt={product.name}
                                    className="card-img-top"

                                />
                                <div className="card-body">
                                    <h3 className="card-title">{product.name}</h3>
                                    <p className="card-text">Price: {product.price} BDT</p>
                                    <Link to={`/product/${product._id}`} className="btn btn-primary mt-2">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center mt-4">Loading products...</p> // Loading বা No Data Handle করা
            )}
        </div>
    );
};

export default ProductList;


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false); // Modal Control State

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get("https://glore-bd-backend-node-mongo.vercel.app/api/product");
        console.log("Full API Response:", res.data);

        const allProducts = res.data.data;
        const foundProduct = allProducts.find((p) => p._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          console.error("Product not found!");
        }
      } catch (error) {
        console.error("API Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-4">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-4 text-danger">Product not found!</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="card shadow-lg p-4">
            <div className="row">
              {/* Product Image Section */}
              <div className="col-md-5 text-center">
                <img
                  src={product.images[0]?.secure_url || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="img-fluid rounded shadow"
                  style={{ maxHeight: "300px", objectFit: "cover", cursor: "pointer" }}
                  onClick={() => setShowModal(true)} // Image Click হলে Modal Open হবে
                />
                {/*<button className="btn btn-outline-dark mt-2" onClick={() => setShowModal(true)}>*/}
                {/*  🔍 Zoom Image*/}
                {/*</button>*/}
              </div>

              {/* Product Details Section */}
              <div className="col-md-7">
                <div className="card-body">
                  <h2 className="card-title text-primary">{product.name}</h2>
                  <p className="text-muted"><strong>Category:</strong> {product.category?.name}</p>
                  <h4 className="text-success">Price: {product.price} BDT</h4>

                  <p className="mt-3" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                    <strong>Description:</strong> {product.description}
                  </p>

                  <Link to="/products" className="btn btn-outline-primary mt-3">
                    <i className="fas fa-arrow-left"></i> Back to Products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Product Image</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body text-center">
                <img
                  src={product.images[0]?.secure_url || "https://via.placeholder.com/500"}
                  alt={product.name}
                  className="img-fluid rounded"
                  style={{ maxHeight: "700px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;

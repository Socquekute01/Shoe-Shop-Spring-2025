import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Edit } from "lucide-react";
import api from "../../../api";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.getProduct(id);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details");
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Calculate discount percentage
  const calculateDiscount = (regularPrice, salePrice) => {
    if (!regularPrice || !salePrice || regularPrice <= 0) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading product details...</div>
    );
  if (error) return <div className="text-red-500 p-8">{error}</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Link
            to="/admin/products"
            className="text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold">Product Details</h1>
        </div>
        <Link
          to={`/admin/products/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Edit size={16} />
          Edit Product
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square">
            <img
              src={product.imageName || "https://via.placeholder.com/400"}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400";
              }}
            />
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium text-gray-700 mb-2">
              Pricing Information
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-sm text-gray-500">Regular Price</p>
                <p className="font-medium">
                  {formatPrice(product.capacityProductPrice)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sale Price</p>
                <p className="font-medium">
                  {formatPrice(product.capacityProductPriceSale)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Discount</p>
                <p className="font-medium text-green-600">
                  {calculateDiscount(
                    product.capacityProductPrice,
                    product.capacityProductPriceSale
                  )}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-2/3">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-500">Product ID: {product.id}</p>
          </div>

          {/* Additional product details would go here */}
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <h3 className="font-medium text-gray-700 mb-2">
              Product Description
            </h3>
            <p className="text-gray-600">
              {product.description ||
                "No description available for this product."}
            </p>
          </div>

          {/* Additional sections for specifications, variants, etc. would go here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

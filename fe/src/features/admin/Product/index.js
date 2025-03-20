import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import api from "../../../api";

const ProductsPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Nike Air Force 1 NDESTRUKT",
      price: 35.17,
      colors: ["green", "black"],
      sale: true,
      status: "",
    },
    {
      id: 2,
      name: "Nike Space Hippie 04",
      price: 57.22,
      colors: ["black"],
      sale: false,
      status: "",
    },
    {
      id: 3,
      name: "Nike Air Zoom Pegasus",
      price: 64.78,
      oldPrice: 64.78,
      colors: ["pink"],
      sale: true,
      status: "",
    },
    {
      id: 4,
      name: "Nike Blazer Low 77 Vintage",
      price: 50.79,
      colors: ["red", "blue", "white"],
      sale: false,
      status: "new",
    },
    {
      id: 5,
      name: "Nike ZoomX SuperRep",
      price: 9.57,
      colors: ["green", "black"],
      sale: true,
      status: "",
    },
    {
      id: 6,
      name: "Zoom Freak 2",
      price: 61.46,
      oldPrice: 61.46,
      colors: ["black", "white"],
      stock: 5,
      sale: false,
      status: "",
    },
    {
      id: 7,
      name: "Nike Air Max Zephyr",
      price: 96.73,
      colors: ["green", "black"],
      stock: 5,
      sale: false,
      status: "",
    },
    {
      id: 8,
      name: "Jordan Delta",
      price: 63.04,
      colors: ["green", "black"],
      stock: 5,
      sale: false,
      status: "new",
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Products</h1>
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Sort By:</span>
          <button className="px-3 py-1.5 border rounded-lg flex items-center gap-1">
            Featured
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow overflow-hidden"
          >
            <div className="relative">
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                <img
                  src={`/api/placeholder/300/200`}
                  alt={product.name}
                  className="h-full object-cover"
                />
              </div>
              {product.sale && (
                <div className="absolute top-2 right-2 bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">
                  SALE
                </div>
              )}
              {product.status === "new" && (
                <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                  NEW
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 mb-2">{product.name}</h3>
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {product.colors.map((color, index) => (
                    <div
                      key={index}
                      className={`w-4 h-4 rounded-full border ${
                        color === "black"
                          ? "bg-black"
                          : color === "white"
                          ? "bg-white"
                          : color === "green"
                          ? "bg-green-500"
                          : color === "red"
                          ? "bg-red-500"
                          : color === "blue"
                          ? "bg-blue-500"
                          : color === "pink"
                          ? "bg-pink-300"
                          : ""
                      }`}
                    />
                  ))}
                  {product.stock && (
                    <span className="text-xs text-gray-500">
                      +{product.stock}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {product.oldPrice && (
                    <span className="text-gray-400 line-through">
                      ${product.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;

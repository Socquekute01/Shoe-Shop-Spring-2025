import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader,
  Search,
  X,
  Check,
  ShoppingBag,
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";
import { Editor } from "@tinymce/tinymce-react";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  product_id: Yup.number().nullable(),
});

const BlogForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Format price to currency
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Calculate discount percentage
  const calculateDiscount = (regularPrice, salePrice) => {
    if (!regularPrice || !salePrice || regularPrice <= 0) return 0;
    return Math.round(((regularPrice - salePrice) / regularPrice) * 100);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      content: "",
      product_id: null,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // Add selected product and author ID to the form values
        const dataToSubmit = {
          ...values,
          product_id: selectedProduct?.id || null,
          author_id: currentUser?.id, // Sử dụng ID từ API getMe()
        };

        if (isEditMode) {
          await api.updateBlogPost(id, dataToSubmit);
        } else {
          await api.createBlogPost(dataToSubmit);
        }

        navigate("/admin/blog");
      } catch (error) {
        console.error("Error saving blog post:", error);
        setError(error.response?.data?.message || "Failed to save blog post");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Fetch current user information
  const fetchCurrentUser = async () => {
    try {
      const response = await api.getMe();
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      setError("Failed to fetch user information");
    }
  };

  // Fetch products for the modal
  const fetchProducts = async () => {
    try {
      const response = await api.getProducts();
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on search term
  useEffect(() => {
    if (products.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, products]);

  useEffect(() => {
    // Fetch current user and products when component mounts
    fetchCurrentUser();
    fetchProducts();

    if (isEditMode) {
      const fetchPost = async () => {
        try {
          const response = await api.getBlogPost(id);
          const postData = response.data;

          formik.setValues({
            title: postData.title || "",
            content: postData.content || "",
            product_id: postData.product_id || null,
          });

          // If the post has an associated product, fetch it
          if (postData.product_id) {
            try {
              const productResponse = await api.getProduct(postData.product_id);
              setSelectedProduct(productResponse.data);
            } catch (error) {
              console.error("Error fetching associated product:", error);
            }
          }
        } catch (error) {
          console.error("Error fetching blog post:", error);
          setError("Failed to fetch blog post data");
        } finally {
          setLoading(false);
        }
      };

      fetchPost();
    }
  }, [id, isEditMode]);

  // Select a product
  const selectProduct = (product) => {
    setSelectedProduct(product);
    formik.setFieldValue("product_id", product.id);
    setShowProductModal(false);
  };

  // Remove selected product
  const removeSelectedProduct = () => {
    setSelectedProduct(null);
    formik.setFieldValue("product_id", null);
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading blog post data...</div>
    );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link to="/admin/blog" className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Blog Post" : "Create Blog Post"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">Title</label>
          <input
            type="text"
            name="title"
            className={`w-full px-4 py-2 border rounded-lg ${
              formik.touched.title && formik.errors.title
                ? "border-red-500"
                : "border-gray-300"
            }`}
            placeholder="Enter blog post title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.title && formik.errors.title && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Content
          </label>
          <div
            className={`${
              formik.touched.content && formik.errors.content
                ? "border border-red-500 rounded-lg"
                : ""
            }`}
          >
            <Editor
              apiKey="i82efzw4ulaledd5cb1wpmkmqxefpe7jld6m24kvsaaz2wm2"
              value={formik.values.content}
              onEditorChange={(content) =>
                formik.setFieldValue("content", content)
              }
              onBlur={() => formik.setFieldTouched("content", true)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "preview",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "code",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
          {formik.touched.content && formik.errors.content && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.content}</p>
          )}
        </div>

        {/* Product Selection Section */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-2 font-medium">
            Related Product
          </label>
          {selectedProduct ? (
            <div className="flex items-center border rounded-lg p-3 bg-gray-50">
              <div className="w-16 h-16 bg-gray-200 rounded overflow-hidden mr-3">
                <img
                  src={
                    selectedProduct.imageName ||
                    "https://via.placeholder.com/100"
                  }
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100";
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedProduct.name}
                </p>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    {formatPrice(selectedProduct.capacityProductPriceSale)}
                  </span>
                  {selectedProduct.capacityProductPrice >
                    selectedProduct.capacityProductPriceSale && (
                    <>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(selectedProduct.capacityProductPrice)}
                      </span>
                      <span className="text-xs font-medium text-green-600">
                        -
                        {calculateDiscount(
                          selectedProduct.capacityProductPrice,
                          selectedProduct.capacityProductPriceSale
                        )}
                        %
                      </span>
                    </>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={removeSelectedProduct}
                className="ml-2 text-gray-400 hover:text-red-500"
              >
                <X size={20} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowProductModal(true)}
              className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center"
            >
              <ShoppingBag size={20} className="mr-2" />
              Select a product
            </button>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/admin/blog"
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? (
              <>
                <Loader size={16} className="animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {isEditMode ? "Update Post" : "Publish Post"}
              </>
            )}
          </button>
        </div>
      </form>

      {/* Product Selection Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Select a Product</h2>
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4 border-b">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="overflow-y-auto flex-1 p-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  {products.length === 0
                    ? "Loading products..."
                    : "No products found"}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((product) => {
                    const isSelected =
                      selectedProduct && selectedProduct.id === product.id;
                    return (
                      <div
                        key={product.id}
                        className={`border rounded-lg p-3 flex cursor-pointer hover:bg-gray-50 ${
                          isSelected
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200"
                        }`}
                        onClick={() => selectProduct(product)}
                      >
                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden mr-4 flex-shrink-0">
                          <img
                            src={
                              product.imageName ||
                              "https://via.placeholder.com/100"
                            }
                            alt={product.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/100";
                            }}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <div className="mt-1 flex items-baseline gap-2">
                            <span className="text-sm font-medium text-gray-900">
                              {formatPrice(product.capacityProductPriceSale)}
                            </span>
                            {product.capacityProductPrice >
                              product.capacityProductPriceSale && (
                              <>
                                <span className="text-xs text-gray-500 line-through">
                                  {formatPrice(product.capacityProductPrice)}
                                </span>
                                <span className="text-xs font-medium text-green-600">
                                  -
                                  {calculateDiscount(
                                    product.capacityProductPrice,
                                    product.capacityProductPriceSale
                                  )}
                                  %
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="ml-2 flex items-center">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center ${
                              isSelected
                                ? "bg-blue-500 text-white"
                                : "border border-gray-300"
                            }`}
                          >
                            {isSelected && <Check size={14} />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t flex justify-end">
              <button
                type="button"
                onClick={() => setShowProductModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogForm;

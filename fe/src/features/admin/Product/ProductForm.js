import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader, Upload } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import api from "../../../api";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Product name is required"),
  capacityProductPrice: Yup.number()
    .required("Regular price is required")
    .positive("Price must be positive"),
  capacityProductPriceSale: Yup.number()
    .required("Sale price is required")
    .positive("Price must be positive")
    .test(
      "is-less-than-regular",
      "Sale price should be less than or equal to regular price",
      function (value) {
        const { capacityProductPrice } = this.parent;
        return !value || !capacityProductPrice || value <= capacityProductPrice;
      }
    ),
});

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      capacityProductPrice: "",
      capacityProductPriceSale: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setSubmitting(true);

        // Handle image upload if there's a new file
        // let imageUrl = values.imageName;
        // if (imageFile) {
        //   const formData = new FormData();
        //   formData.append("file", imageFile);
        //   const uploadResponse = await api.uploadProductImage(formData);
        //   imageUrl = uploadResponse.data.url;
        // }

        const productData = {
          ...values,
          capacityProductPrice: Number(values.capacityProductPrice),
          capacityProductPriceSale: Number(values.capacityProductPriceSale),
        };

        if (isEditMode) {
          await api.updateProduct(id, productData);
        } else {
          await api.createProduct(productData);
        }

        navigate("/admin/products");
      } catch (error) {
        console.error("Error saving product:", error);
        setError(error.response?.data?.message || "Failed to save product");
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const response = await api.getProduct(id);
          const productData = response.data;

          formik.setValues({
            name: productData.name || "",
            capacityProductPrice: productData.capacityProductPrice || "",
            capacityProductPriceSale:
              productData.capacityProductPriceSale || "",
            description: productData.description || "",
            imageName: productData.imageName || "",
          });

          setImagePreview(productData.imageName);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Failed to fetch product data");
        } finally {
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading product data...</div>
    );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/admin/products"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold">
          {isEditMode ? "Edit Product" : "Create Product"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">
              Regular Price (VND)
            </label>
            <input
              type="number"
              name="capacityProductPrice"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.capacityProductPrice &&
                formik.errors.capacityProductPrice
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.capacityProductPrice}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.capacityProductPrice &&
              formik.errors.capacityProductPrice && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.capacityProductPrice}
                </p>
              )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Sale Price (VND)</label>
            <input
              type="number"
              name="capacityProductPriceSale"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.capacityProductPriceSale &&
                formik.errors.capacityProductPriceSale
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.capacityProductPriceSale}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.capacityProductPriceSale &&
              formik.errors.capacityProductPriceSale && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.capacityProductPriceSale}
                </p>
              )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-1">
              Product Description
            </label>
            <textarea
              name="description"
              rows="4"
              className={`w-full px-3 py-2 border rounded-lg ${
                formik.touched.description && formik.errors.description
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            ></textarea>
            {formik.touched.description && formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-700 mb-2">Product Image</label>
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="w-full md:w-1/3 bg-gray-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product preview"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-gray-400 flex flex-col items-center">
                    <Upload size={40} />
                    <span>No image</span>
                  </div>
                )}
              </div>
              <div className="w-full md:w-2/3">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    id="product-image"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                  <label
                    htmlFor="product-image"
                    className="cursor-pointer flex flex-col items-center justify-center py-4"
                  >
                    <Upload size={30} className="text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      SVG, PNG, JPG or GIF (max. 2MB)
                    </p>
                  </label>
                </div>
                {imageFile && (
                  <p className="text-sm text-gray-600 mt-2">
                    Selected file: {imageFile.name}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Link
            to="/admin/products"
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
                Save Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;

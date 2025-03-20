import React from "react";
import BreadCums from "../../../components/breadcrums";
import { useNavigate } from "react-router-dom";
// Component cho các checkbox item
const CheckboxItem = ({ id, name, label, count }) => (
  <div className="flex items-center">
    <input
      type="checkbox"
      name={name}
      id={id}
      className="text-primary focus:ring-0 rounded-sm cursor-pointer"
    />
    <label htmlFor={id} className="text-gray-600 ml-3 cursor-pointer">
      {label}
    </label>
    <div className="ml-auto text-gray-600 text-sm">({count})</div>
  </div>
);

// Component cho các sản phẩm
const ProductItem = ({ image, name, price, discount, rating, reviews, navigate }) => (
  <div className="bg-white shadow rounded overflow-hidden group">
    <div className="relative">
      <img src={image} alt={name} className="w-full" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
        <a
          href="#"
          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
          title="view product"
        >
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
        <a
          href="#"
          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
          title="add to wishlist"
        >
          <i className="fa-solid fa-heart"></i>
        </a>
      </div>
    </div>
    <div className="pt-4 pb-3 px-4">
      <a href="#">
        <h4
          className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition"
          onClick={() => navigate("/product")}
        >
          {name}
        </h4>
      </a>
      <div className="flex items-baseline mb-1 space-x-2">
        <p className="text-xl text-primary font-semibold">${price}</p>
        <p className="text-sm text-gray-400 line-through">${discount}</p>
      </div>
      <div className="flex items-center">
        <div className="flex gap-1 text-sm text-yellow-400">
          {Array.from({ length: rating }, (_, i) => (
            <span key={i}>
              <i className="fa-solid fa-star"></i>
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500 ml-3">({reviews})</div>
      </div>
    </div>
    <a
      href="#"
      className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
    >
      Add to cart
    </a>
  </div>
);

const CollectionPage = () => {
  const navigate = useNavigate()
  const categories = [
    { id: "cat-1", name: "cat-1", label: "Bedroom", count: 15 },
    { id: "cat-2", name: "cat-2", label: "Sofa", count: 9 },
    { id: "cat-3", name: "cat-3", label: "Office", count: 21 },
    { id: "cat-4", name: "cat-4", label: "Outdoor", count: 10 },
  ];

  const brands = [
    { id: "brand-1", name: "brand-1", label: "Cooking Color", count: 15 },
    { id: "brand-2", name: "brand-2", label: "Magniflex", count: 9 },
    { id: "brand-3", name: "brand-3", label: "Ashley", count: 21 },
    { id: "brand-4", name: "brand-4", label: "M&D", count: 10 },
    { id: "brand-5", name: "brand-5", label: "Olympic", count: 10 },
  ];

  const products = [
    {
      image: "../assets/images/products/product1.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product2.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product3.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product4.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product5.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product6.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
  ];

  return (
    <>
      <BreadCums title={"Collection"} />

      <div className="container grid md:grid-cols-4 grid-cols-2 gap-6 pt-4 pb-16 items-start">
        <div className="text-center md:hidden">
          <button
            className="text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 block md:hidden"
            type="button"
            data-drawer-target="drawer-example"
            data-drawer-show="drawer-example"
            aria-controls="drawer-example"
          >
            <ion-icon name="grid-outline"></ion-icon>
          </button>
        </div>

        <div
          id="drawer-example"
          className="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-80 dark:bg-gray-800"
          tabindex="-1"
          aria-labelledby="drawer-label"
        >
          <h5
            id="drawer-label"
            className="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            <svg
              className="w-5 h-5 mr-2"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Info
          </h5>
          <button
            type="button"
            data-drawer-hide="drawer-example"
            aria-controls="drawer-example"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close menu</span>
          </button>
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <CheckboxItem key={category.id} {...category} />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <CheckboxItem key={brand.id} {...brand} />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  name="min"
                  id="min"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  name="max"
                  id="max"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="#"
              className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              Learn more
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Get access{" "}
              <svg
                className="w-4 h-4 ml-2"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
        </div>

        <div className="col-span-1 bg-white px-4 pb-6 shadow rounded overflow-hidden hidden md:block">
          <div className="divide-y divide-gray-200 space-y-5">
            <div>
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <CheckboxItem key={category.id} {...category} />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Brands
              </h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <CheckboxItem key={brand.id} {...brand} />
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
                Price
              </h3>
              <div className="mt-4 flex items-center">
                <input
                  type="text"
                  name="min"
                  id="min"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="min"
                />
                <span className="mx-3 text-gray-500">-</span>
                <input
                  type="text"
                  name="max"
                  id="max"
                  className="w-full border-gray-300 focus:border-primary rounded focus:ring-0 px-3 py-1 text-gray-600 shadow-sm"
                  placeholder="max"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3">
          <div className="flex items-center mb-4">
            <select
              name="sort"
              id="sort"
              className="w-44 text-sm text-gray-600 py-3 px-4 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
            >
              <option value="">Default sorting</option>
              <option value="price-low-to-high">Price low to high</option>
              <option value="price-high-to-low">Price high to low</option>
              <option value="latest">Latest product</option>
            </select>

            <div className="flex gap-2 ml-auto">
              <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
                <i className="fa-solid fa-grip-vertical"></i>
              </div>
              <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
                <i className="fa-solid fa-list"></i>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-6">
            {products.map((product, index) => (
              <ProductItem key={index} {...product} navigate={navigate} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CollectionPage;

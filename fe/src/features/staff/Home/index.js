import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

// Product data structure
const PRODUCTS = [
  {
    id: 1,
    name: "Guyer Chair",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product1.jpg",
    reviews: 150,
  },
  {
    id: 2,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 3,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 4,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 5,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 6,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 7,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
  {
    id: 8,
    name: "Bed King Size",
    price: 45.0,
    originalPrice: 55.9,
    image: "assets/images/products/product4.jpg",
    reviews: 150,
  },
];

// Category data structure
const CATEGORIES = [
  { id: 1, name: "Bedroom", image: "assets/images/category/category-1.jpg" },
  { id: 2, name: "Mattrass", image: "assets/images/category/category-2.jpg" },
  { id: 3, name: "Outdoor", image: "assets/images/category/category-3.jpg" },
  { id: 4, name: "Sofa", image: "assets/images/category/category-4.jpg" },
  {
    id: 5,
    name: "Living Room",
    image: "assets/images/category/category-5.jpg",
  },
  { id: 6, name: "Kitchen", image: "assets/images/category/category-6.jpg" },
];

// Feature data structure
const FEATURES = [
  {
    icon: "assets/images/icons/delivery-van.svg",
    title: "Free Shipping",
    description: "Order over $200",
  },
  {
    icon: "assets/images/icons/money-back.svg",
    title: "Money Returns",
    description: "30 days money returns",
  },
  {
    icon: "assets/images/icons/service-hours.svg",
    title: "24/7 Support",
    description: "Customer support",
  },
];

// Product Card Component
const ProductCard = ({ product }) => (
  <div className="bg-white shadow rounded overflow-hidden group">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
        <a
          href="#"
          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
          title="view product"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </a>
        <a
          href="#"
          className="text-white text-lg w-9 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-gray-800 transition"
          title="add to wishlist"
        >
          <FontAwesomeIcon icon={faHeart} />
        </a>
      </div>
    </div>
    <div className="pt-4 pb-3 px-4">
      <a href="#">
        <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {product.name}
        </h4>
      </a>
      <div className="flex items-baseline mb-1 space-x-2">
        <p className="text-xl text-primary font-semibold">${product.price}</p>
        <p className="text-sm text-gray-400 line-through">
          ${product.originalPrice}
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex gap-1 text-sm text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <span key={i}>
              <FontAwesomeIcon icon={faStar} />
            </span>
          ))}
        </div>
        <div className="text-xs text-gray-500 ml-3">({product.reviews})</div>
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

// Category Card Component
const CategoryCard = ({ category }) => (
  <div className="relative rounded-sm overflow-hidden group">
    <img src={category.image} alt={category.name} className="w-full" />
    <a
      href="#"
      className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-xl text-white font-roboto font-medium group-hover:bg-opacity-60 transition"
    >
      {category.name}
    </a>
  </div>
);

// Feature Card Component
const FeatureCard = ({ feature }) => (
  <div className="border border-primary rounded-sm px-3 py-6 flex justify-center items-center gap-5">
    <img
      src={feature.icon}
      alt={feature.title}
      className="w-12 h-12 object-contain"
    />
    <div>
      <h4 className="font-medium capitalize text-lg">{feature.title}</h4>
      <p className="text-gray-500 text-sm">{feature.description}</p>
    </div>
  </div>
);

// Main Component
const HomePage = () => {
  return (
    <>
      {/* Banner Section */}
      <div
        className="bg-cover bg-no-repeat bg-center py-36"
        style={{ backgroundImage: `url('assets/images/banner-bg.jpg')` }}
      >
        <div className="container">
          <h1 className="text-6xl text-gray-800 font-medium mb-4 capitalize">
            best collection for <br /> home decoration
          </h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. <br />
            accusantium perspiciatis, sapiente magni eos dolorum ex quos dolores
            odio
          </p>
          <div className="mt-12">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-3 font-medium rounded-md hover:bg-transparent hover:text-primary transition"
            >
              Shop Now
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-16">
        <div className="w-10/12 grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto justify-center">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="container py-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          shop by category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>

      {/* New Arrivals Section */}
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          top new arrival
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Advertisement Banner */}
      <div className="container pb-16">
        <a href="#">
          <img src="assets/images/offer.jpg" alt="ads" className="w-full" />
        </a>
      </div>

      {/* Recommended Products Section */}
      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          recommended for you
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;

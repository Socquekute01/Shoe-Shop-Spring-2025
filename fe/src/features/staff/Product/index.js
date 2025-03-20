import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BreadCums from "../../../components/breadcrums";
import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

// Component cho các sản phẩm liên quan
const RelatedProductItem = ({
  image,
  name,
  price,
  discount,
  rating,
  reviews,
}) => (
  <div className="bg-white shadow rounded overflow-hidden group">
    <div className="relative">
      <img src={image} alt={name} className="w-full" />
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
              <FontAwesomeIcon icon={faStar} />
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

function ProductPage() {
  const relatedProducts = [
    {
      image: "../assets/images/products/product1.jpg",
      name: "Guyer Chair",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product4.jpg",
      name: "Bed King Size",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product2.jpg",
      name: "Couple Sofa",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
    {
      image: "../assets/images/products/product3.jpg",
      name: "Mattrass X",
      price: "45.00",
      discount: "55.90",
      rating: 5,
      reviews: 150,
    },
  ];

  return (
    <>
      <BreadCums title={"Product"} />

      <div className="container grid grid-cols-2 gap-6">
        <div>
          <img
            src="../assets/images/products/product1.jpg"
            alt="product"
            className="w-full"
          />
          <div className="grid grid-cols-5 gap-4 mt-4">
            {[2, 3, 4, 5, 6].map((num) => (
              <img
                key={num}
                src={`../assets/images/products/product${num}.jpg`}
                alt={`product${num}`}
                className="w-full cursor-pointer border"
              />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-medium uppercase mb-2">
            Italian L Shape Sofa
          </h2>
          <div className="flex items-center mb-4">
            <div className="flex gap-1 text-sm text-yellow-400">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  <FontAwesomeIcon icon={faStar} />
                </span>
              ))}
            </div>
            <div className="text-xs text-gray-500 ml-3">(150 Reviews)</div>
          </div>
          <div className="space-y-2">
            <p className="text-gray-800 font-semibold space-x-2">
              <span>Availability: </span>
              <span className="text-green-600">In Stock</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Brand: </span>
              <span className="text-gray-600">Apex</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">Category: </span>
              <span className="text-gray-600">Sofa</span>
            </p>
            <p className="space-x-2">
              <span className="text-gray-800 font-semibold">SKU: </span>
              <span className="text-gray-600">BE45VGRT</span>
            </p>
          </div>
          <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
            <p className="text-xl text-primary font-semibold">$45.00</p>
            <p className="text-base text-gray-400 line-through">$55.00</p>
          </div>

          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius
            eum reprehenderit dolore vel mollitia optio consequatur hic
            asperiores inventore suscipit, velit consequuntur, voluptate
            doloremque iure necessitatibus adipisci magnam porro.
          </p>

          <div className="pt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Size</h3>
            <div className="flex items-center gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <div key={size} className="size-selector">
                  <input
                    type="radio"
                    name="size"
                    id={`size-${size.toLowerCase()}`}
                    className="hidden"
                  />
                  <label
                    htmlFor={`size-${size.toLowerCase()}`}
                    className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
                  >
                    {size}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
              Color
            </h3>
            <div className="flex items-center gap-2">
              {["#fc3d57", "#000", "#fff"].map((color, index) => (
                <div key={index} className="color-selector">
                  <input
                    type="radio"
                    name="color"
                    id={`color-${index}`}
                    className="hidden"
                  />
                  <label
                    htmlFor={`color-${index}`}
                    className="border border-gray-200 rounded-sm h-6 w-6 cursor-pointer shadow-sm block"
                    style={{ backgroundColor: color }}
                  ></label>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-sm text-gray-800 uppercase mb-1">Quantity</h3>
            <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                -
              </div>
              <div className="h-8 w-8 text-base flex items-center justify-center">
                4
              </div>
              <div className="h-8 w-8 text-xl flex items-center justify-center cursor-pointer select-none">
                +
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
            <a
              href="#"
              className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition"
            >
              <i className="fa-solid fa-bag-shopping"></i> Add to cart
            </a>
            <a
              href="#"
              className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"
            >
              <FontAwesomeIcon icon={faHeart} /> Wishlist
            </a>
          </div>
        </div>
      </div>

      <div className="container pb-16">
        <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
          Product details
        </h3>
        <div className="w-3/5 pt-6">
          <div className="text-gray-600">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tenetur
              necessitatibus deleniti natus dolore cum maiores suscipit optio
              itaque voluptatibus veritatis tempora iste facilis non aut
              sapiente dolor quisquam, ex ab.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              quae accusantium voluptatem blanditiis sapiente voluptatum. Autem
              ab, dolorum assumenda earum veniam eius illo fugiat possimus illum
              dolor totam, ducimus excepturi.
            </p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
              quia modi ut expedita! Iure molestiae labore cumque nobis quasi
              fuga, quibusdam rem? Temporibus consectetur corrupti rerum
              veritatis numquam labore amet.
            </p>
          </div>

          <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
            <tbody>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Color
                </th>
                <th className="py-2 px-4 border border-gray-300">
                  Blank, Brown, Red
                </th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Material
                </th>
                <th className="py-2 px-4 border border-gray-300">Latex</th>
              </tr>
              <tr>
                <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
                  Weight
                </th>
                <th className="py-2 px-4 border border-gray-300">55kg</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="container pb-16">
        <h2 className="text-2xl font-medium text-gray-800 uppercase mb-6">
          Related products
        </h2>
        <div className="grid grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <RelatedProductItem key={index} {...product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductPage;

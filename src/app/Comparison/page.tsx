"use client";
import { useState, useEffect } from 'react';
import { client } from '@/sanity/lib/client';
import Image from 'next/image';
import CommonFooter from '@/components/commonfoot';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';

export interface Product {
  _id: string;
  title: string;
  price: number;
  dicountPercentage: number;
  tags: number;
  isNew: boolean;
  productImage: string;
}

const Comparsion = () => { 
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showProducts, setShowProducts] = useState<boolean>(false); 
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const query = await client.fetch(
        `*[_type == "product"]{
          _id,
          title,
          price,
          dicountPercentage,
          tags,
          isNew,
          "productImage": productImage.asset->url
        }`
      );
      setProducts(query);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const toggleProducts = () => {
    setShowProducts(!showProducts);
  };
  const handleProductClick = (product: Product) => {
    if (selectedProduct && selectedProduct._id === product._id) {
      setSelectedProduct(null); 
    } else {
      setSelectedProduct(product);
      setShowProducts(false); 
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Banner Section */}
      <div className="relative">
            <Image
              src="/bg.png"
              alt="Shop"
              width={1440}
              height={316}
              className="w-full lg:h-auto h-[126px] object-cover"
            />
            <br />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 space-y-3">
              <Image
                src="/Logo.png"
                alt="Logo"
                width={60}
                height={40}
                className="lg:mb-2 mb-1"
              />
              <h1 className="text-black1 text-[28px] sm:text-[34px] leading-[40px] sm:leading-[48px] font-poppins hover:scale-110 transition-transform font-semibold">
                Comparison
              </h1>
              <ul className="flex items-center justify-center space-x-2 lg:mt-4 sm:mt-2 text-[16px] sm:text-[20px]">
                <Link
                  href="/"
                  className="text-black1 hover:cursor-pointer hover:text-gray-700 hover:scale-105 transition-transform font-poppins font-semibold"
                >
                  Home
                </Link>
                <IoIosArrowForward className="w-5 h-5 text-gray-500" />
                <Link
                  href="Comparison"
                  className="text-black1 hover:cursor-pointer hover:text-gray-700 hover:scale-105 transition-transform font-poppins font-medium"
                >
                  Comparison
                </Link>
              </ul>
            </div>
          </div>
      
      <div className="flex justify-center mb-8 gap-6 my-11">
        <button
          onClick={toggleProducts}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded shadow-md transition-transform transform hover:scale-105"
        >
          Choose Product
        </button>
        {selectedProduct && (
          <div className="border p-4 rounded-lg bg-gray-100 w-full md:w-72 mx-auto shadow-lg">
            <h4 className="text-lg font-semibold mb-2 text-center">{selectedProduct.title}</h4>
            <Image
              src={selectedProduct.productImage}
              alt={selectedProduct.title}
              width={300}
              height={300}
              className="w-full h-48 object-cover mb-2 rounded"
            />
            <p className="font-bold text-center">{`$${selectedProduct.price}`}</p>
          </div>
        )}
      </div>
      {showProducts && !loading && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Product List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="border p-4 rounded-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center bg-white"
                onClick={() => handleProductClick(product)}
              >
                <Image
                  src={product.productImage}
                  width={150}
                  height={150}
                  alt={product.title}
                  className="object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-semibold text-center text-gray-900">{product.title}</h3>
                <p className="font-bold mt-2 text-gray-800">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {loading && <p className="text-center text-xl text-gray-500">Loading products...</p>}
      {/* Comparison  */}
      {selectedProduct && (
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Comparison for {selectedProduct.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="border p-4 rounded-lg bg-white">
              <h3 className="text-lg font-semibold text-center text-gray-900">Feature</h3>
              <p className="text-center">Price</p>
              <p className="text-center">Discount</p>
              <p className="text-center">Tags</p>
              <p className="text-center">Is New</p>
            </div>
            <div className="border p-4 rounded-lg bg-white">
              <h3 className="text-lg font-semibold text-center text-gray-900">{selectedProduct.title}</h3>
              <p className="text-center">${selectedProduct.price}</p>
              <p className="text-center">{selectedProduct.dicountPercentage}%</p>
              <p className="text-center">{selectedProduct.tags}</p>
              <p className="text-center">{selectedProduct.isNew ? 'Yes' : 'No'}</p>
            </div>
            {products.filter(p => p._id !== selectedProduct._id).map(product => (
              <div key={product._id} className="border p-4 rounded-lg bg-white">
                <h3 className="text-lg font-semibold text-center text-gray-900">{product.title}</h3>
                <p className="text-center">${product.price}</p>
                <p className="text-center">{product.dicountPercentage}%</p>
                <p className="text-center">{product.tags}</p>
                <p className="text-center">{product.isNew ? 'Yes' : 'No'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="w-full my-6">
        <CommonFooter />
      </div>
    </div>
  );
};
export default Comparsion;
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaTwitter, FaShareAlt, FaRegHeart, FaExchangeAlt } from "react-icons/fa";
import Link from "next/link";
import { PulseLoader } from "react-spinners";
import BuyingOptions from "@/components/BuyingOption";
import Wishlist from "@/components/Wishlist";
import { client } from "@/sanity/lib/client";
import { useParams } from "next/navigation";
import Showmore from "@/components/Showmore";
import ReviewSection from "@/components/Review";

interface Product {
  _id: string;
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  tags: string[];
  isNew: boolean;
  productImage: string;
  slug: string;
}

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState([]);
  const [activeSection, setActiveSection] = useState<"description" | "additional" | "reviews">("description");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Product link copied to clipboard!");
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(
          `
          *[_type == "product" && _id == $id]{
            _id,
            title,
            price,
            discountPercentage,
            tags,
            isNew,
            description,
            "productImage": productImage.asset->url
          }
        `,
          { id }
        );

        if (fetchedProducts.length > 0) {
          setProduct(fetchedProducts[0]);
          setImage(fetchedProducts[0].productImage);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const fetchedProducts = await client.fetch<Product[]>(
          `
          *[_type == "product"]{
            _id,
            title,
            price,
            discountPercentage,
            "productImage": productImage.asset->url
          }
        `
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch related products", error);
      }
    };

    fetchRelatedProducts();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await client.fetch(
          `*[_type == "review" && product._ref == $id]{
            _id, 
            name, 
            review, 
            rating
          }`,
          { id }
        );
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      }
    };

    fetchReviews();
  }, [id]);

  const handleSectionClick = (section: "description" | "additional" | "reviews") => {
    setActiveSection(section);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PulseLoader color="#B88E2F" size={15} />
      </div>
    );
  }

  if (!product) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-24 min-h-screen">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="flex gap-6">
            <div className="hidden lg:flex flex-col gap-4">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  className="aspect-square overflow-hidden rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                >
                  <Image
                    src={product.productImage}
                    alt={`Product ${index + 1}`}
                    width={85}
                    height={85}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex-1">
              <Image
                src={product.productImage || "/placeholder.svg"}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between lg:h-full">
            <h1 className="font-extrabold text-2xl md:text-4xl text-black">{product.title}</h1>
            <h2 className="my-2 text-lg text-gray-900 font-bold">{`$ ${product.price.toFixed(2)}`}</h2>
            <div className="my-2 flex items-center gap-4">
              <p className="text-sm text-gray-500">
                {product.discountPercentage > 0 && (
                  <span className="bg-[#FFD700] text-black px-2 py-1 rounded-md">Save {product.discountPercentage}%</span>
                )}
              </p>
            </div>
            <p className="text-gray-700 leading-relaxed my-2">{product.description.slice(0, 484)}.....</p>
            <Wishlist product={product} />
            <div className="my-2 flex flex-col md:flex-row gap-4">
              <BuyingOptions product={product} tags={product.tags} />
            </div>
          </div>
        </div>
      </div>

      <hr className="my-10" />
      <div className="flex flex-col md:flex-row items-center justify-center gap-[53px] mt-7">
        {["description", "additional", "reviews"].map((section) => (
          <p
            key={section}
            className="text-customGray text-normal md:text-[24px] cursor-pointer"
            onClick={() => handleSectionClick(section as "description" | "additional" | "reviews")}
          >
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </p>
        ))}
      </div>

      {activeSection === "description" && <p>{product.description}</p>}

      {/* Render Reviews Section only if 'id' is a valid string */}
      {activeSection === "reviews" && id && typeof id === "string" ? (
        <ReviewSection reviewId={id} />
      ) : (
        activeSection === "reviews" && <p>Error: Invalid product ID</p>
      )}
    </div>
  );
};

export default ProductPage;





// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaFacebook, FaLinkedin, FaTwitter, FaShareAlt, FaRegHeart, FaExchangeAlt } from "react-icons/fa";
// import Link from "next/link";
// import { PulseLoader } from "react-spinners";
// import BuyingOptions from "@/components/BuyingOption";
// import Wishlist from "@/components/Wishlist";
// import { client } from "@/sanity/lib/client";
// import { useParams } from "next/navigation";
// import Showmore from "@/components/Showmore";
// import ReviewSection from "@/components/Review";

// interface Product {
//   _id: string;
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   discountPercentage: number;
//   tags: string[];
//   isNew: boolean;
//   productImage: string;
//   slug: string;
// }

// const ProductPage = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState<Product | null>(null);
//   const [image, setImage] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(true);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [reviews, setReviews] = useState([]);
//   const [activeSection, setActiveSection] = useState<"description" | "additional" | "reviews">("description");

//   const handleShare = () => {
//     navigator.clipboard.writeText(window.location.href);
//     alert("Product link copied to clipboard!");
//   };

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const fetchedProducts = await client.fetch<Product[]>(
//           `
//           *[_type == "product" && _id == $id]{
//             _id,
//             title,
//             price,
//             discountPercentage,
//             tags,
//             isNew,
//             description,
//             "productImage": productImage.asset->url
//           }
//         `,
//           { id }
//         );

//         if (fetchedProducts.length > 0) {
//           setProduct(fetchedProducts[0]);
//           setImage(fetchedProducts[0].productImage);
//         }
//       } catch (error) {
//         console.error("Failed to fetch product", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   useEffect(() => {
//     const fetchRelatedProducts = async () => {
//       try {
//         const fetchedProducts = await client.fetch<Product[]>(
//           `
//           *[_type == "product"]{
//             _id,
//             title,
//             price,
//             discountPercentage,
//             "productImage": productImage.asset->url
//           }
//         `
//         );
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Failed to fetch related products", error);
//       }
//     };

//     fetchRelatedProducts();
//   }, []);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const fetchedReviews = await client.fetch(
//           `*[_type == "review" && product._ref == $id]{
//             _id, 
//             name, 
//             review, 
//             rating
//           }`,
//           { id }
//         );
//         setReviews(fetchedReviews);
//       } catch (error) {
//         console.error("Failed to fetch reviews", error);
//       }
//     };

//     fetchReviews();
//   }, [id]);

//   const handleSectionClick = (section: "description" | "additional" | "reviews") => {
//     setActiveSection(section);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <PulseLoader color="#B88E2F" size={15} />
//       </div>
//     );
//   }

//   if (!product) {
//     return <p>Product not found.</p>;
//   }

//   return (
//     <div className="max-w-screen-lg mx-auto px-4 py-24 min-h-screen">
//       <div className="flex flex-col md:flex-row gap-10 items-start">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           <div className="flex gap-6">
//             <div className="hidden lg:flex flex-col gap-4">
//               {[...Array(4)].map((_, index) => (
//                 <button
//                   key={index}
//                   className="aspect-square overflow-hidden rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//                 >
//                   <Image
//                     src={product.productImage}
//                     alt={`Product ${index + 1}`}
//                     width={85}
//                     height={85}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>

//             <div className="aspect-square overflow-hidden rounded-lg bg-gray-100 flex-1">
//               <Image
//                 src={product.productImage || "/placeholder.svg"}
//                 alt={product.title}
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           <div className="flex-1 flex flex-col justify-between lg:h-full">
//             <h1 className="font-extrabold text-2xl md:text-4xl text-black">{product.title}</h1>
//             <h2 className="my-2 text-lg text-gray-900 font-bold">{`$ ${product.price.toFixed(2)}`}</h2>
//             <div className="my-2 flex items-center gap-4">
//               <p className="text-sm text-gray-500">
//                 {product.discountPercentage > 0 && (
//                   <span className="bg-[#FFD700] text-black px-2 py-1 rounded-md">Save {product.discountPercentage}%</span>
//                 )}
//               </p>
//             </div>
//             <p className="text-gray-700 leading-relaxed my-2">{product.description.slice(0, 484)}.....</p>
//             <Wishlist product={product} />
//             <div className="my-2 flex flex-col md:flex-row gap-4">
//               <BuyingOptions product={product} tags={product.tags} />
//             </div>
//           </div>
//         </div>
//       </div>

//       <hr className="my-10" />
//       <div className="flex flex-col md:flex-row items-center justify-center gap-[53px] mt-7">
//         {["description", "additional", "reviews"].map((section) => (
//           <p
//             key={section}
//             className="text-customGray text-normal md:text-[24px] cursor-pointer"
//             onClick={() => handleSectionClick(section as "description" | "additional" | "reviews")}
//           >
//             {section.charAt(0).toUpperCase() + section.slice(1)}
//           </p>
//         ))}
//       </div>

//       {activeSection === "description" && <p>{product.description}</p>}
//       {activeSection === "reviews" && <ReviewSection reviewId={id} />}
//     </div>
//   );
// };

// export default ProductPage;

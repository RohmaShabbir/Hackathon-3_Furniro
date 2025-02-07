"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cartProvider";
import SideCart from "./SideCart";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { countAllItems } = useCart();
  const { countWishlistItems } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="bg-white/70 backdrop-blur-md border-b border-gray-200 transition-colors z-[1000] h-[60px] md:h-[70px] w-full flex items-center justify-between px-4 sm:px-6 md:px-10 fixed top-0 left-0 shadow-lg duration-300">
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/Logo.png"
            alt="Logo"
            width={50}
            height={32}
            className="w-[50px] h-[32px] md:w-[60px] md:h-[40px] cursor-pointer"
          />
        </Link>
        <h2 className="text-black text-[22px] sm:text-[24px] md:text-[26px] font-serif font-extrabold ml-4">
          Furniro
        </h2>
      </div>

      <div className="hidden md:flex space-x-8 items-center">
        <Link href="/" passHref>
          <div className="text-[18px] text-black transition-colors duration-300">
            Home
          </div>
        </Link>
        <Link href="/Shop" passHref>
          <div className="text-[18px] text-black transition-colors duration-300">
            Shop
          </div>
        </Link>
        <Link href="/Blog" passHref>
          <div className="text-[18px] text-black transition-colors duration-300">
            Blog
          </div>
        </Link>
        <Link href="/Contact" passHref>
          <div className="text-[18px] text-black transition-colors duration-300">
            Contact
          </div>
        </Link>
      </div>

      <div className="hidden md:flex space-x-6 relative">
        <Link href="/Account" passHref>
          <Image
            src="/icon1.svg"
            alt="profileIcon"
            width={28}
            height={35}
            className="cursor-pointer hover:opacity-80 transition-all duration-300"
          />
        </Link>
        <Link href="/Search" passHref>
          <Image
            src="/icon2.svg"
            alt="Search Icon"
            width={28}
            height={35}
            className="cursor-pointer hover:opacity-80 transition-all duration-300"
          />
        </Link>

        <Link href="/Wishlist" passHref>
          <div className="relative cursor-pointer">
            <Image
              onClick={closeMenu}
              src="/icon3.svg"
              alt="Heart Icon"
              width={30}
              height={35}
              className="cursor-pointer hover:opacity-80 transition-all duration-300"
            />
            {countWishlistItems() > 0 && (
              <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
                <p>{countWishlistItems()}</p>
              </div>
            )}
          </div>
        </Link>

        <div onClick={toggleCart} className="relative cursor-pointer">
          <Image
            src="/icon4.svg"
            alt="Cart Icon"
            width={30}
            height={35}
            className="cursor-pointer hover:opacity-80 transition-all duration-300"
          />
          {countAllItems() > 0 && (
            <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
              <p>{countAllItems()}</p>
            </div>
          )}
        </div>
      </div>

      <div className="md:hidden flex items-center space-x-4">
        <button onClick={toggleMenu} className="text-black focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
            className={`h-7 w-7 transition-transform duration-300 ${
              isMenuOpen ? "rotate-45" : ""
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                isMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
              className="transition-all duration-300"
            />
          </svg>
        </button>
        <div onClick={toggleCart} className="relative cursor-pointer">
          <Image
            src="/icon4.svg"
            alt="Cart Icon"
            width={30}
            height={35}
            className="cursor-pointer hover:opacity-80 transition-all duration-300"
          />
          {countAllItems() > 0 && (
            <div className="font-semibold absolute text-black bg-yellow-500 text-xs w-6 h-6 rounded-full flex items-center justify-center -top-2 -right-2 bg-opacity-90 animate-pulse">
              <p>{countAllItems()}</p>
            </div>
          )}
        </div>
      </div>

      {isCartOpen && <SideCart isOpen={isCartOpen} toggleCart={toggleCart} />}
    </div>
  );
};

export default Navbar;

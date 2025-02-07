"use client"
import Link from "next/link";

import React, { useEffect, useState } from "react";

const Footer = () => {
  const [sub, setsub] = useState<boolean>(false);
  console.log(sub);

  useEffect(() => {
    if (sub == true) {
      alert("Send Your Email");
    }
  }, [sub]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <footer className="bg-[#FFFFFF] px-6 py-8 md:px-16 xl:px-24 border-2">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 xl:gap-12 ">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Furniro.</h2>
          <p className="text-gray-500">
            400 University Drive Suite 200 Coral Gables,
            <br />
            FL 33134 USA
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-4">Links</h3>
          <ul className="md:space-y-2 lg:space-y-5">
            <li>
              <Link href="Home" className="text-gray-700 hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link href="/Shop" className="text-gray-700 hover:text-black">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/About" className="text-gray-700 hover:text-black">
                About
              </Link>
            </li>
            <li>
              <Link href="/Contact" className="text-gray-700 hover:text-black">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-lg font-semibold text-gray-500 mb-4">Help</h3>
          <ul className="md:space-y-2 lg:space-y-5">
            <li>
              <Link href="404/Payment Options/4" className="text-gray-700 hover:text-black">
                Payment Options
              </Link>
            </li>
            <li>
              <Link href="404/Returns/5" className="text-gray-700 hover:text-black">
                Returns
              </Link>
            </li>
            <li>
              <Link href="404/Privacy Policies/6" className="text-gray-700 hover:text-black">
                Privacy Policies
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className=" lg:-ml-20">
          <h3 className="text-lg font-semibold text-gray-500 mb-4">
            Newsletter
          </h3>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2  "
          >
            <input
              type="email"
              placeholder="Enter Your Email Address"
              className="flex-1 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 lg:w-[100%] "
            />
            <button
              type="submit"
              className="  text-black px-4 py-2 font-1xl hover:bg-gray-400 lg:w-[27%] lg:text-xs lg:font-bold lg:px-1 "
              onClick={() => {
                setsub(!sub);
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-300 pt-4 text-center text-gray-500">
        <p>2025 Furniro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;



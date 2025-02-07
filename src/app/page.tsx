
import React from 'react';
import Image from 'next/image';
import Range from '@/components/Range';
import Products from '@/components/Products';
import Rooms from '@/components/Rooms';
import Furniture from '@/components/Furniture';
import HeroSection from '@/components/HeroSection';


const Home = () => {
  return (
    <div className="mt-[70px]">
      <HeroSection/>
      <Range />
      <Products />
      <Rooms />
      <Furniture />
    </div>
  );
};

export default Home;
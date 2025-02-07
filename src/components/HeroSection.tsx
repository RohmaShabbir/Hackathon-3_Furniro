import Image from 'next/image';
import Link from 'next/link';


const HeroSection = () => {
  return (
    <section className="relative">
      {/* Background Image */}
      <div className="absolute inset-0">
       <Image
        src='/hero.png'
        alt="Hero"
        fill
        className="w-full h-full object-cover"
       />
      </div>
      {/* Content */}
      <div className="container px-5 py-24 mx-auto flex justify-center lg:justify-end">
        <div className="lg:w-1/3 md:w-1/2 bg-[#FFF3E3] rounded-lg p-8 flex flex-col w-full relative z-10 shadow-md">
          <h3 className="font-poppins text-sm md:text-[16px]  leading-6 md:leading-[24px]">
            New Arrival
          </h3>
          <h2 className=" text-[#B88E2F] font-poppins mb-1 font-bold text-[28px] md:text-[38px] leading-8 md:leading-[65px]">
            Discover Our 
            <br />
            New Collection
          </h2>
          <p className="text-text1 font-poppins font-medium text-sm md:text-[16px] leading-6 md:leading-[24px] mb-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
          </p>
          <div className="relative mb-4">
            <Link  href = {'/Shop'}>
            <button className=" bg-[#B88E2F] text-white py-2 px-6 font-poppins font-bold hover:scale-105 text-sm md:text-[16px] leading-6 md:leading-[24px] transition">
              Buy Now
            </button></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import React from "react";
import { assets, testimonialsData } from "../assets/assets";

const Testimonial = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 py-12 ">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">
        Customer Testimonial
      </h1>
      <p className="text-gray-500 mb-12 ">What Our Users Saying</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((data, index) => (
          <div
            key={index}
            className="bg-white/20 p-12 rounded-lg shadow-md border w-80 m-auto cursor-pointer hover:scale-[1.02] transition-all"
          >
            <div className="flex flex-col items-center">
              <img src={data.image} alt="" className="rounded-full w-14" />
              <h2 className="text-xl font-semibold mt-3">{data.name}</h2>
              <p className="text-gray-500 mb-4">{data.role}</p>
              <div className="flex mb-4">
                {Array(data.stars)
                  .fill()
                  .map((item, index) => (
                    <img key={index} src={assets.rating_star} />
                  ))}
              </div>
              <p className="text-gray-600  text-sm text-justify">{data.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;

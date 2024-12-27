import React, { useState, useEffect } from "react";

const CaseStudySlider = ({ caseStudies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cycle through case studies every 10 seconds
  useEffect(() => {
    if (caseStudies.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % caseStudies.length);
      }, 10000); // Change case study every 10 seconds

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [caseStudies]);

  return (
    <section className="bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        {/* Section Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center tracking-tight mb-10">
         Case Study
        </h2>

        {/* Case Study Slider */}
        {caseStudies.length > 0 ? (
          <div className="relative">
            {caseStudies.map((study, index) => (
              <div
                key={study.slug}
                className={`rounded-3xl bg-blue-100  shadow-lg flex flex-col md:flex-row  gap-6 transition-opacity duration-700 ${
                  index === currentIndex ? "opacity-100" : "opacity-0 hidden"
                }`}
              >
                {/* Text Content */}
                <div className="flex-col p-8 lg:p-10 text-center md:text-left lg:text-left font-semibold justify-between md:w-1/2">
                  <h3 className="text-3xl font-bold mb-4 lg:mb-10 ">
                    {study.title}
                  </h3>
                  <p className="text-gray-600  font-medium  mb-6">
                    {study.description}
                  </p>
                  <a
                    href={`/caseStudies/${study.slug}`}
                    className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-3xl shadow-md hover:bg-blue-700 transition"
                  >
                    View case study
                  </a>
                </div>

                {/* Image */}
                <div className="flex md:w-1/2 w-full justify-end">
                  <img
                    src={study.image}
                    alt={`Image for ${study.title}`}
                    className="p-2  object-cover rounded-3xl w-full lg:w-[90%] h-72 lg:h-96"
                  />
                </div>
              </div>
            ))}

            {/* Navigation Dots */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 mt-6">
              {caseStudies.map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex ? "bg-blue-600" : "bg-gray-300"
                  } transition-all`}
                  onClick={() => setCurrentIndex(index)}
                ></button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading case studies...</p>
        )}
      </div>
    </section>
  );
};

export default CaseStudySlider;

import React, { useState, useEffect } from "react";

// React component for the Case Study Slider
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
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <h2 className="text-3xl font-semibold text-center mb-8">
          See how we solve <span className="text-gray-500">problems, right on target</span>
        </h2>

        {/* Case Study Slider */}
        {caseStudies.length > 0 ? (
          <div className="flex flex-col items-center">
            {caseStudies.map((study, index) => (
              <div
                key={study.slug}
                className={`bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden mb-8 ${
                  index !== currentIndex ? "hidden" : ""
                }`}
                style={{
                  maxWidth: "900px",
                  margin: "0 auto",
                }}
              >
                {/* Content */}
                <div className="p-6 w-full md:w-1/2 flex flex-col justify-between">
                  <h3 className="text-xl font-semibold mb-4">{study.title}</h3>
                  <p className="text-gray-700 italic mb-6">{study.description}</p>
                  <a className="flex justify-center lg:justify-center " href={`/caseStudies/${study.slug}`}><button className="flex items-center justify-center font-medium bg-[#072F6A] text-white px-6 py-2 rounded-lg hover:bg-blue-600 space-x-2">
                    View case study
                  </button></a>
                </div>

                {/* Image */}
                <div className="w-full md:w-1/2">
                  <img
                    src={study.image}
                    alt={`Image for ${study.title}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading case studies...</p>
        )}

        {/* Dot Navigation */}
        {caseStudies.length > 0 && (
          <div className="flex justify-center mt-8">
            {caseStudies.map((_, index) => (
              <button
                key={index}
                className={`h-3 w-3 rounded-full mx-2 transition-all duration-300 ${
                  index === currentIndex ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(index)}
              ></button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudySlider;

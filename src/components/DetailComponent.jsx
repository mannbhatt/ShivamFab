import React, { useState } from "react";

const DetailComponent = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesInModal, setImagesInModal] = useState([]);

  
 

  const openModal = (images, index) => {
    console.log("Opening modal with images:", images, "at index:", index);
    setImagesInModal(images); 
    setCurrentImageIndex(index); 
    setModalOpen(true); 
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < imagesInModal.length - 1 ? prevIndex + 1 : 0
    ); 
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : imagesInModal.length - 1
    );
  };

  
  const items = Array.isArray(data) ? data : [data];

  return (
    <section className="py-0">
      <div className="container mx-auto px-4 sm:px-6 lg:px-14">
        {items.map((item, index) => (
          <div key={index} className="cursor-pointer py-12 border-y" id={item.slug}>
            {/* Title and Description */}
            <div className="flex flex-col lg:flex-row pb-6 justify-between items-center">
              <h2 className="lg:w-64 text-4xl lg:text-5xl text-center lg:text-left font-bold text-gray-900 mb-4">
                {item.title}
              </h2>
              <p className="text-gray-600 text-center font-semibold lg:text-left lg:max-w-lg">
                {item.description}
              </p>
            </div>

            {/* Image Gallery */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.isArray(item.images) ? (
                item.images.map((img, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="flex items-center justify-center border bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    onClick={() =>
                      openModal(item.images.map((img) => img.src), imgIndex)
                    }
                  >
                    <img
                      src={img.src}
                      alt={img.alt || `Image for ${item.title}`}
                      className="object-cover rounded-lg w-full h-40 lg:h-48 hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))
              ) : (
                <div
                  className="flex items-center justify-center border bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                  onClick={() => openModal([item.images], 0)}
                >
                  <img
                    src={item.images.src}
                    alt={item.images.alt || `Image for ${item.title}`}
                    className="object-cover rounded-lg w-full h-64 lg:h-80 hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for fullscreen image */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="relative bg-white rounded-lg w-[80%] h-[80%] flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white bg-[#072F6A] rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-800"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Left Arrow */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
              onClick={prevImage}
            >
              <img src="/leftarrowgallery.svg" alt="Previous" />
            </button>

            {/* Gallery Image */}
            <img
              src={imagesInModal[currentImageIndex]}
              alt="Gallery Image"
              className="max-w-full max-h-full object-contain"
            />

            {/* Right Arrow */}
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl hover:text-gray-300"
              onClick={nextImage}
            >
              <img src="/rightarrowgallery.svg" alt="Next" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default DetailComponent;

import React, { useEffect, useState } from "react";

const SLIDE_DURATION = 3000; // 3 seconds
const PROGRESS_UPDATE_INTERVAL = 100; // Update progress every 100ms

export default function TestimonialCarousel({
  testimonials,
  paginationLabels,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(Array(testimonials.length).fill(0)); // Track progress for each testimonial

  useEffect(() => {
    let timer;
    let progressTimers = [];

    const updateProgress = (index) => {
      setProgress(
        (prevProgress) => prevProgress.map((p, i) => (i === index ? 0 : p)) // Reset progress for all, set current index to 0
      );

      const progressTimer = setInterval(() => {
        setProgress((prevProgress) => {
          return prevProgress.map((p, i) => {
            if (i === index && p < 100) {
              return p + (PROGRESS_UPDATE_INTERVAL / SLIDE_DURATION) * 100;
            }
            return p;
          });
        });
      }, PROGRESS_UPDATE_INTERVAL);

      progressTimers.push(progressTimer);
    };

    const changeSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    updateProgress(currentIndex); // Start progress for the current testimonial

    timer = setTimeout(changeSlide, SLIDE_DURATION); // Automatically change slides

    return () => {
      clearTimeout(timer); // Clear the timeout
      progressTimers.forEach(clearInterval); // Clear all progress timers
    };
  }, [currentIndex, testimonials.length]);

  return (
    <div class="w-full max-w-4xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold">
          See how we solve{" "}
          <span class="block">
            problems, <span class="text-gray-400">right on target</span>
          </span>
        </h2>
      </div>

      <div class="bg-gray-50 rounded-lg shadow-lg overflow-hidden">
        <div class="grid md:grid-cols-2 gap-6 p-6">
          <div class="space-y-4">
            <h3 class="text-xl font-bold">
              {testimonials[currentIndex].company}
            </h3>
            <div class="h-[150px] md:h-[200px] overflow-y-auto">
              <p class="text-gray-600">"{testimonials[currentIndex].quote}"</p>
            </div>
            <div class="pt-4">
              <button class="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition">
                View case study
              </button>
            </div>
            <div class="text-sm">
              <p class="font-semibold">{testimonials[currentIndex].author}</p>
              <p class="text-gray-500">{testimonials[currentIndex].role}</p>
            </div>
          </div>
          <div class="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={testimonials[currentIndex].image}
              alt="Case study illustration"
              class="object-cover w-full h-full"
            />
          </div>
        </div>
        <div class="p-6 border-t">
          <div class="w-full space-y-4">
            <div class="flex justify-between gap-4 w-full">
              {paginationLabels.map((label, index) => (
                <div key={index} class="flex-1 space-y-2">
                  <div
                    className={`text-center  px-1 rounded-md font-medium ${
                      index === currentIndex
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {label}
                  </div>
                  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all duration-100 ease-linear"
                      style={{
                        width: progress[index] + "%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";

import conceptsData from "./concepts.json";

export const ConceptsPage = () => {
  const [view, setView] = useState("catalog");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleImageClick = () => {
    setView("detail");
  };

  const handleBack = () => {
    setView("catalog");
  };

  const handleNext = () => {
    if (selectedIndex < conceptsData.length - 1) {
      setSelectedIndex(selectedIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center p-2">
      {/* Book with stacked pages effect */}
      <div
        className="relative w-full max-w-6xl aspect-[16/10]"
        style={{ perspective: "2000px" }}
      >
        {/* Stacked pages underneath */}
        <div
          className="absolute inset-0 translate-y-2 translate-x-1.5 bg-gray-100 rounded-r-lg shadow-lg"
          style={{ zIndex: 1 }}
        />
        <div
          className="absolute inset-0 translate-y-1 translate-x-0.5 bg-gray-200 rounded-r-lg shadow-lg"
          style={{ zIndex: 2 }}
        />

        {/* Main book */}
        <div
          className="relative w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden"
          style={{ zIndex: 3 }}
        >
          <div className="w-full h-full">
            {view === "catalog" ? (
              <div className="w-full h-full flex">
                <div className="w-1/2 h-full bg-white p-6 md:p-8 overflow-y-auto border-r-1 border-gray-300">
                  <h1 className="text-xl font-serif text-gray-800 mb-4">
                    CATALOG
                  </h1>
                </div>
                <div className="w-full h-full absolute inset-0 p-6 md:p-8 overflow-y-auto pointer-events-none">
                  <div className="grid grid-cols-4 gap-4 mt-12">
                    {conceptsData.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleImageClick()}
                        className="relative aspect-square cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all group pointer-events-auto"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:brightness-110 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex relative book-spine">
                <div className="w-1/2 h-full border-r-1 border-gray-300 p-8 md:p-12 flex items-center justify-center">
                  <img
                    src={conceptsData[selectedIndex].image}
                    alt={conceptsData[selectedIndex].title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
                  />
                </div>

                <div className="w-1/2 h-full bg-white p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
                  <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-gray-800">
                      {conceptsData[selectedIndex].title}
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                          Inspiration
                        </h3>
                        <p className="text-gray-700">
                          {conceptsData[selectedIndex].inspiration}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                          Prompt
                        </h3>
                        <p className="text-gray-700 leading-relaxed">
                          {conceptsData[selectedIndex].prompt}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                          Model
                        </h3>
                        <p className="text-gray-700">
                          {conceptsData[selectedIndex].model}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <button
                      onClick={handleBack}
                      className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      ← to catalog
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={handlePrev}
                        disabled={selectedIndex === 0}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        ←
                      </button>
                      <button
                        onClick={handleNext}
                        disabled={selectedIndex === conceptsData.length - 1}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

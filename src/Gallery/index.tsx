import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NavBar } from "../Components/NavBar";

const galleryItems = [
  {
    name: "CONCEPTS",
    description:
      "If I could create my own collection of objects and home items...a dream catalog brought to life with AI ♡",
    hex: "#D6F74C",
    bgColor: "#D6F74C",
    textColor: "#8C9EFF",
    relPath: "concepts",
    image: "/gallery/design-book.png",
    position:
      "absolute sm:w-[26%] sm:bottom-[15%] sm:left-[45%] w-[40%] bottom-[30%] left-[55%]",
  },
  {
    name: "PERCEPTION",
    description: "how I perceive the world",
    hex: "#8C9EFF",
    bgColor: "#8C9EFF",
    textColor: "#FCD9BE",
    relPath: "perception",
    image: "/gallery/flowers.png",
    position: "absolute sm:w-[25%] sm:top-[5%] sm:left-[20%] w-[45%] bottom-[45%] left-[15%]",
  },
  {
    name: "FOOD & COFFEE",
    description: "if it's not aesthetic I'm not eating it",
    hex: "#F06038",
    bgColor: "#F06038",
    textColor: "#D6F74C",
    relPath: "food-coffee",
    image: "/gallery/coffee.png",
    position: "absolute sm:w-[20%] sm:top-[45%] sm:left-[25%] w-[30%] top-[45%] left-[18%]",
  },
];

export const GalleryPage = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem !== null) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedItem]);

  return (
    <div className="bg-apricot ">
      <div className="absolute p-10 z-20">
        <NavBar />
      </div>
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="relative max-w-full max-h-screen">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/gallery/background-mobile.png"
            />
            <source
              media="(min-width: 641px)"
              srcSet="/gallery/background.png"
            />
            <img
              src="/gallery/background.png"
              alt="Gallery Background"
              className="max-w-full max-h-screen w-auto h-auto"
            />
          </picture>
          {galleryItems.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.name}
              className={`${item.position} hover:brightness-80 cursor-pointer z-10 transition-all`}
              onClick={() => setSelectedItem(index)}
            />
          ))}
        </div>

        {/* Modal */}
        {selectedItem !== null && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="rounded-lg p-8 max-w-md w-full mx-4"
              style={{ backgroundColor: galleryItems[selectedItem].bgColor }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                className="text-3xl font-bold mb-5"
                style={{ color: galleryItems[selectedItem].textColor }}
              >
                {galleryItems[selectedItem].name}
              </h2>
              <p
                className="text-lg mb-6"
                style={{ color: galleryItems[selectedItem].textColor }}
              >
                {galleryItems[selectedItem].description}
              </p>
              <div className="flex justify-end">
                <Link
                  to={galleryItems[selectedItem].relPath}
                  className="px-4 py-2 rounded font-semibold cursor-pointer hover:scale-105"
                  style={{
                    backgroundColor: galleryItems[selectedItem].textColor,
                    color: galleryItems[selectedItem].bgColor,
                  }}
                >
                  Continue
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

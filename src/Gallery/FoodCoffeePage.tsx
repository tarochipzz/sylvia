const books = [
  {
    image: "/gallery/food/recipe-book.png",
    position:
      "absolute sm:w-[19%] sm:bottom-[61%] sm:left-[22%] w-[30%] bottom-[65%] left-[32%]",
  },
  {
    image: "/gallery/food/coffee-book.png",
    position:
      "absolute sm:w-[18%] sm:bottom-[63%] sm:left-[38%] w-[28%] bottom-[66.5%] left-[56%]",
  },

];

export const FoodCoffeePage = () => {
  return (
    <div className="bg-linen ">
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="relative max-w-full max-h-screen">
          <picture>
            <source
              media="(max-width: 640px)"
              srcSet="/gallery/food/food-background-mobile.png"
            />
            <source
              media="(min-width: 641px)"
              srcSet="/gallery/food/food-background.png"
            />
            <img
              src="/gallery/food/food-background.png"
              alt="Gallery Background"
              className="max-w-full max-h-screen w-auto h-auto"
            />
          </picture>
          {books.map((item, index) => (
            <img
              key={index}
              src={item.image}
              className={`${item.position} hover:brightness-80 cursor-pointer z-10 transition-all`}
              // onClick={() => setSelectedItem(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

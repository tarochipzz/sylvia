export const FoodCoffeePage = () => {
  return (
    <div className="bg-linen ">
      <div className="min-h-screen w-full flex flex-col gap-20 px-5 box-border items-center justify-center">
        <h2 className="font-sketch hidden sm:block">
          What do you want to make ?
        </h2>
        <div className="flex flex-col sm:flex-row gap-10 sm:gap-30 items-center justify-center">
          <div className="relative inline-block group cursor-pointer">
            <img
              src="/gallery/food/coffee1.png"
              className="w-70 group-hover:opacity-0 transition-opacity duration-600 ease-in-out"
              alt="Coffee maker"
            />
            <img
              src="/gallery/food/coffee2.png"
              className="scale-x-101 absolute left-[-0.5px] top-[-1px] opacity-0 group-hover:opacity-100 transition-opacity duration-600 ease-in-out"
              alt="Coffee maker with drip"
            />
          </div>
          {/* <h1>/</h1> */}
          <div className="relative inline-block group cursor-pointer">
            <img
              src="/gallery/food/sushi1.png"
              className="w-110 group-hover:opacity-0 transition-opacity duration-200 ease-in-out"
              alt="Coffee maker"
            />
            <img
              src="/gallery/food/sushi2.png"
              className="scale-105 absolute top-[-30px] left-[5px] sm:top-[-48px] sm:left-[8px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-in-out"
              alt="Coffee maker with drip"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

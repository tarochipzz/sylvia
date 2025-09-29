import { useState, useEffect } from "react";

export const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target;
      //@ts-expect-error matches is a valid method
      if (target?.matches("h1")) {
        setIsHoveringText(true);
      } else {
        setIsHoveringText(false);
      }

      //@ts-expect-error matches is a valid method
      const hoveringNavNow = target?.matches("nav *");

      // Trigger pop animation when entering nav
      if (hoveringNavNow && !isHoveringNav) {
        setIsPopping(true);
        setTimeout(() => {
          setIsPopping(false);
          setIsHoveringNav(true);
        }, 150); // Duration of pop animation
      } else if (!hoveringNavNow && isHoveringNav) {
        setIsHoveringNav(false);
      }
    };
    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHoveringNav]);

  // Hide bubble when hovering nav or during pop animation
  const showBubble = !isHoveringNav && !isPopping;

  return (
    <div className="h-screen w-full relative cursor-none">
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          background:
            "radial-gradient(circle at center, chartreuse, linen, #e7e5e4)",
        }}
      />

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 w-full h-full -z-8"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='6' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Glass Bubble Cursor */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: mousePosition.x - 25,
          top: mousePosition.y - 25,
          width: "60px",
          height: "60px",
          opacity: showBubble ? 1 : 0,
          transform: isPopping ? "scale(1.3)" : "scale(1)",
          transition: isPopping
            ? "transform 0.15s ease-out, opacity 0.15s ease-out"
            : "opacity 0.3s ease-in-out",
        }}
      >
        {/* Base bubble with iridescent colors */}
        <div
          className="w-full h-full rounded-full"
          style={{
            background: `
              radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.5) 0%,
                rgba(173, 216, 230, 0.4) 20%,
                rgba(221, 160, 221, 0.4) 40%,
                rgba(152, 251, 152, 0.3) 60%,
                rgba(255, 182, 193, 0.3) 80%,
                transparent 100%
              )
            `,
            border: "2px solid rgba(255,255,255,0.6)",
            boxShadow: `
              0 8px 32px rgba(0,0,0,0.1),
              0 0 20px rgba(173, 216, 230, 0.3),
              inset 0 0 20px rgba(255,255,255,0.4)
            `,
          }}
        >
          {/* Animated iridescent overlay */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `
                linear-gradient(135deg,
                  rgba(173, 216, 230, 0.5) 0%,
                  rgba(221, 160, 221, 0.5) 25%,
                  rgba(152, 251, 152, 0.5) 50%,
                  rgba(255, 182, 193, 0.5) 75%,
                  rgba(173, 216, 230, 0.5) 100%
                )
              `,
              backgroundSize: "200% 200%",
              animation: "shimmer 3s ease-in-out infinite",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Distortion layer with conditional color filter */}
        <div
          className="absolute inset-0 w-full h-full rounded-full"
          style={{
            backdropFilter: "blur(2px) invert(1) brightness(4)",
            opacity: isHoveringText ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* Glass overlay with highlights */}
        <div
          className="absolute inset-0 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.5), rgba(255,255,255,0.2), transparent)",
            boxShadow: `
              inset 0 2px 6px rgba(255,255,255,0.9),
              inset 0 -2px 4px rgba(0,0,0,0.1)
            `,
          }}
        />

        {/* Inner highlight for glass effect */}
        <div
          className="absolute top-2 left-2 w-4 h-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, transparent 70%)",
          }}
        />

        {/* Secondary highlight */}
        <div
          className="absolute top-5 right-4 w-2 h-2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.7) 0%, transparent 60%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="grid grid-rows-[50px_1fr] p-[20px] h-full">
        <header className="flex justify-between items-start p-[15px]">
          <nav className="flex flex-row gap-[18px] text-stone-700">
            <span className="text-sm lg:text-base font-light cursor-pointer hover:underline hover:text-stone-900 transition-colors">
              Projects
            </span>
            <span className="text-sm lg:text-base font-light cursor-pointer hover:underline hover:text-stone-900 transition-colors">
              Gallery
            </span>
            <span className="text-sm lg:text-base font-light cursor-pointer hover:underline hover:text-stone-900 transition-colors">
              About
            </span>
          </nav>
        </header>

        <main className="flex items-center justify-center w-full h-full">
          <h1 className="text-8xl text-vista-blue">Hello, I'm Sylvia.</h1>
        </main>
      </div>

      {/* Add keyframes for animations */}
      <style>{`
        @keyframes shimmer {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
};

import { useState, useEffect, useRef } from "react";
import { NavBar } from "./Components/NavBar";

export const HomePage = () => {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isPopping, setIsPopping] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Use transform instead of state - no re-renders!
        cursorRef.current.style.transform = `translate(${e.clientX - 30}px, ${
          e.clientY - 30
        }px) scale(${isPopping ? 1.3 : 1})`;
      }

      // 3D text rotation based on mouse position
      if (textRef.current) {
        const rect = textRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate rotation based on distance from center
        // Normalize to -1 to 1 range
        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -15; // Max 15deg
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 15; // Max 15deg

        textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }

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
  }, [isHoveringNav, isPopping]);

  // Hide bubble when hovering nav or during pop animation
  const showBubble = !isHoveringNav && !isPopping;

  return (
    <div className="h-screen w-full relative cursor-none">
      <div
        className="absolute inset-0 w-full h-full -z-10"
        style={{
          backgroundImage: "url(/gallery/home-background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Glass Bubble Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-50"
        style={{
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
                rgba(255, 255, 255, 0.2) 0%,
                rgba(173, 216, 230, 0.4) 20%,
                rgba(221, 160, 221, 0.4) 40%,
                rgba(152, 251, 152, 0.3) 60%,
                rgba(255, 182, 193, 0.3) 80%,
                transparent 100%
              )
            `,
            border: "1px solid rgba(255,255,255,0.6)",
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
                  rgba(173, 216, 230, 0.2) 0%,
                  rgba(221, 160, 221, 0.5) 25%,
                  rgba(152, 251, 152, 0.5) 50%,
                  rgba(255, 182, 193, 0.5) 75%,
                  rgba(173, 216, 230, 0.5) 100%
                )
              `,
              backgroundSize: "200% 200%",
              animation: "shimmer 2s ease-in-out infinite",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Distortion layer with conditional color filter */}
        <div
          className="absolute inset-0 w-full h-full rounded-full"
          style={{
            backdropFilter: "blur(2px) invert(1)",
            opacity: isHoveringText ? 1 : 0,
            transition: "opacity 0.3s ease-in-out",
          }}
        />

        {/* Glass overlay with highlights */}
        <div
          className="absolute inset-0 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), rgba(255,255,255,0.2), transparent)",
            boxShadow: `
              inset 0 2px 6px rgba(255,255,255,0.7),
              inset 0 -2px 4px rgba(0,0,0,0.1)
            `,
          }}
        />

        {/* Inner highlight for glass effect */}
        <div
          className="absolute top-2 left-2 w-4 h-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)",
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
        <header className="p-[20px]">
          <NavBar className="text-white hover:text-white" />
        </header>

        <main className="flex items-center justify-center w-full h-full">
          <h1
            ref={textRef}
            className="text-8xl text-baby-pink font-bold"
            style={{
              transformStyle: "preserve-3d",
              transition: "transform 0.1s ease-out",
              willChange: "transform",
            }}
          >
            Hello, I'm Sylvia.
          </h1>
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

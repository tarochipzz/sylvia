import { useState, useEffect, useRef } from "react";
import { NavBar } from "./Components/NavBar";

export const HomePage = () => {
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isPopping, setIsPopping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const cursorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const bubblesRef = useRef<
    Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      zIndex: number;
    }>
  >([]);

  // Initialize bubbles
  useEffect(() => {
    const bubbleCount = 65;
    bubblesRef.current = Array.from({ length: bubbleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 60 + 20,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      zIndex: Math.random() > 0.5 ? 100 : 5,
      opacity: Math.random() * 0.8 + 0.2,
    }));
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      if (cursorRef.current) {
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
        const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -8;
        const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 8;

        textRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      const target = e.target;
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

  // Animate bubbles
  useEffect(() => {
    let animationId: number;

    const animate = () => {
      bubblesRef.current.forEach((bubble, index) => {
        // Attraction to cursor
        const distToCursor = Math.sqrt(
          Math.pow(bubble.x - mousePos.x, 2) +
            Math.pow(bubble.y - mousePos.y, 2)
        );
        const cursorAttractionStrength =
          Math.max(0, 1 - distToCursor / 300) * 0.8;
        const angleToCursor = Math.atan2(
          mousePos.y - bubble.y,
          mousePos.x - bubble.x
        );

        // Push away from cursor when very close
        const cursorRadius = 60; // Same as cursor bubble size
        if (distToCursor < cursorRadius + bubble.size / 2) {
          const pushAngle = Math.atan2(
            bubble.y - mousePos.y,
            bubble.x - mousePos.x
          );
          const pushStrength =
            (1 - distToCursor / (cursorRadius + bubble.size / 2)) * 2;
          bubble.speedX += Math.cos(pushAngle) * pushStrength;
          bubble.speedY += Math.sin(pushAngle) * pushStrength;
        } else {
          // Only attract when not too close
          bubble.speedX += Math.cos(angleToCursor) * cursorAttractionStrength;
          bubble.speedY += Math.sin(angleToCursor) * cursorAttractionStrength;
        }

        // Bubble collision detection and repulsion
        bubblesRef.current.forEach((otherBubble, otherIndex) => {
          if (index === otherIndex) return;

          const dx = otherBubble.x - bubble.x;
          const dy = otherBubble.y - bubble.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const minDist = (bubble.size + otherBubble.size) / 2;

          // If bubbles are overlapping, push them apart
          if (distance < minDist && distance > 0) {
            const angle = Math.atan2(dy, dx);
            const overlap = minDist - distance;
            const pushStrength = overlap * 0.05;

            // Push away from each other
            bubble.speedX -= Math.cos(angle) * pushStrength;
            bubble.speedY -= Math.sin(angle) * pushStrength;
          }
        });

        // Apply friction
        bubble.speedX *= 0.95;
        bubble.speedY *= 0.95;

        // Update position
        bubble.x += bubble.speedX;
        bubble.y += bubble.speedY;

        // Wrap around screen edges
        if (bubble.x < -bubble.size) bubble.x = window.innerWidth + bubble.size;
        if (bubble.x > window.innerWidth + bubble.size) bubble.x = -bubble.size;
        if (bubble.y < -bubble.size)
          bubble.y = window.innerHeight + bubble.size;
        if (bubble.y > window.innerHeight + bubble.size)
          bubble.y = -bubble.size;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, [mousePos]);

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
              backdropFilter: "blur(3px)",
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

      {/* Floating Bubbles */}
      {bubblesRef.current.map((bubble, i) => (
        <div
          key={i}
          className="fixed pointer-events-none"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x - bubble.size / 2}px`,
            top: `${bubble.y - bubble.size / 2}px`,
            transition: "none",
            zIndex: bubble.zIndex,
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: `
                radial-gradient(circle at 30% 30%, 
                  rgba(255, 255, 255, 0.15) 0%,
                  rgba(173, 216, 230, 0.3) 20%,
                  rgba(221, 160, 221, 0.3) 40%,
                  rgba(152, 251, 152, 0.25) 60%,
                  rgba(255, 182, 193, 0.25) 80%,
                  transparent 100%
                )
              `,
              border: "1px solid rgba(255,255,255,0.4)",
              boxShadow: `
                0 4px 16px rgba(0,0,0,0.05),
                0 0 10px rgba(173, 216, 230, 0.2),
                inset 0 0 10px rgba(255,255,255,0.3)
              `,
              opacity: bubble.opacity,
              backdropFilter: "blur(3px)",
              transition: "opacity 0.3s ease-in-out",
            }}
          >
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: `
                  linear-gradient(135deg,
                    rgba(173, 216, 230, 0.15) 0%,
                    rgba(221, 160, 221, 0.4) 25%,
                    rgba(152, 251, 152, 0.4) 50%,
                    rgba(255, 182, 193, 0.4) 75%,
                    rgba(173, 216, 230, 0.4) 100%
                  )
                `,
                backgroundSize: "200% 200%",
                animation: "shimmer 3s ease-in-out infinite",
                opacity: 0.5,
              }}
            />
            <div
              className="absolute inset-0 w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25), rgba(255,255,255,0.15), transparent)",
              }}
            />
            <div
              className="absolute rounded-full"
              style={{
                top: `${bubble.size * 0.15}px`,
                left: `${bubble.size * 0.15}px`,
                width: `${bubble.size * 0.25}px`,
                height: `${bubble.size * 0.25}px`,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.1) 40%, transparent 70%)",
              }}
            />
          </div>
        </div>
      ))}

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

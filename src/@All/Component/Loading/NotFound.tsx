import { useEffect, useRef } from "react";
import gsap from "gsap";

const NotFound = () => {
  const sceneRef = useRef(null);
  const robotRef = useRef(null);
  const headRef = useRef(null);
  const eyeRef = useRef(null);
  const leftArmRef = useRef(null);
  const rightArmRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial entrance for the whole UI
      gsap.from(".animate-in", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      });

      // 2. Floating animation for the robot
      gsap.to(robotRef.current, {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Subtle head tilt
      gsap.to(headRef.current, {
        rotate: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        transformOrigin: "center bottom",
      });

      // 4. Robotic eye blink
      gsap.to(eyeRef.current, {
        scaleY: 0.1,
        duration: 0.1,
        repeat: -1,
        repeatDelay: 3,
        yoyo: true,
        transformOrigin: "center",
      });

      // 5. Arms waving "lost" motion
      gsap.to(leftArmRef.current, {
        rotate: 15,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "top right",
      });
      gsap.to(rightArmRef.current, {
        rotate: -15,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        transformOrigin: "top left",
      });

      // 6. Background Glow Pulse
      gsap.to(".glow", {
        opacity: 0.6,
        scale: 1.2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sceneRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sceneRef}
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#050508] text-white overflow-hidden font-sans"
    >
      {/* Background Ambient Glows */}
      <div className="glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Large 404 Background Text */}
      <h1 className="absolute text-[20rem] md:text-[30rem] font-black text-white/[0.03] select-none z-0">
        404
      </h1>

      {/* Character Section */}
      <div className="relative z-10 flex flex-col items-center">
        <div
          ref={robotRef}
          className="w-64 h-64 md:w-80 md:h-80 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]"
        >
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Robot Body */}
            <rect x="65" y="90" width="70" height="60" rx="12" fill="#312E81" />
            <rect x="75" y="100" width="50" height="25" rx="4" fill="#1E1B4B" />
            <text
              x="100"
              y="114.5"
              font-family="monospace"
              font-size="8"
              fill="#10B981"
              text-anchor="middle"
              dominant-baseline="middle"
            >
              RUNNING
            </text>{" "}
            {/* Chest Screen */}
            {/* Arms */}
            <rect
              ref={leftArmRef}
              x="45"
              y="95"
              width="15"
              height="45"
              rx="7.5"
              fill="#4338CA"
            />
            <rect
              ref={rightArmRef}
              x="140"
              y="95"
              width="15"
              height="45"
              rx="7.5"
              fill="#4338CA"
            />
            {/* Head */}
            <g ref={headRef}>
              <rect
                x="70"
                y="40"
                width="60"
                height="45"
                rx="10"
                fill="#4338CA"
              />
              {/* Eyes Container */}
              <g ref={eyeRef}>
                <circle cx="85" cy="62" r="5" fill="#6EE7B7" />
                <circle cx="115" cy="62" r="5" fill="#6EE7B7" />
              </g>
              {/* Antenna */}
              <path
                d="M100 40V25"
                stroke="#4338CA"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="100" cy="20" r="4" fill="#EF4444" />
            </g>
            {/* Bottom Shadow */}
            <ellipse cx="100" cy="185" rx="40" ry="8" fill="rgba(0,0,0,0.4)" />
          </svg>
        </div>

        {/* Text Content */}
        <div className="text-center mt-8 px-6">
          <h2 className="animate-in text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Lost in the Void
          </h2>
          <p className="animate-in text-gray-500 mt-4 max-w-md text-lg">
            The page you're looking for was deleted, moved, or never existed in
            this dimension.
          </p>

          <div className="animate-in mt-10 flex gap-4 justify-center">
            <a
              href="/"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-indigo-500/25"
            >
              Back to Home
            </a>
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg font-semibold transition-all"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

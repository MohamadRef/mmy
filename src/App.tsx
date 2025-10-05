import React, { useState, useEffect } from "react";
import Game from "./Game";

import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [started, setStarted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (started) {
    return <Game />;
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Welcome screen */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #1e3a5f 0%, #7c2d12 50%, #c2410c 100%)",
        }}
      >
        <Header onStartGame={() => setStarted(true)} />

        {/* Animated background blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div
            style={{
              position: "absolute",
              top: "5rem",
              left: "5rem",
              width: "18rem",
              height: "18rem",
              borderRadius: "9999px",
              background: "rgba(96, 165, 250, 0.4)",
              filter: "blur(60px)",
              animation: "pulse 3s ease-in-out infinite",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10rem",
              right: "5rem",
              width: "18rem",
              height: "18rem",
              borderRadius: "9999px",
              background: "rgba(251, 146, 60, 0.4)",
              filter: "blur(60px)",
              animation: "pulse 3s ease-in-out infinite 700ms",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "5rem",
              left: "50%",
              width: "18rem",
              height: "18rem",
              borderRadius: "9999px",
              background: "rgba(249, 115, 22, 0.3)",
              filter: "blur(60px)",
              animation: "pulse 3s ease-in-out infinite 1000ms",
            }}
          ></div>
        </div>

        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.1,
            backgroundImage:
              "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>

        {/* Main content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: "1200px",
            width: "100%",
            padding: "0 24px",
            textAlign: "center",
            opacity: showContent ? 1 : 0,
            transition: "opacity 0.4s ease-in-out",
          }}
        >
          {/* Floating game icon */}
          <img
            src="/src/assets/Sprites/Bird 1.png"
            alt="Game Bird"
            style={{
              marginBottom: "2rem",
              width: "120px",
              height: "120px",
              animation: "bounce 2s infinite",
              display: "block",
              margin: "0 auto 2rem auto",
            }}
          />

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(3rem, 10vw, 6rem)",
              fontWeight: "bold",
              marginBottom: "1.5rem",
              lineHeight: "1.1",
              background:
                "linear-gradient(to right, #93c5fd, #fdba74, #fed7aa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Nest Defence
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.5rem)",
              color: "#bfdbfe",
              marginBottom: "1rem",
              fontWeight: "300",
              letterSpacing: "0.025em",
            }}
          >
            Guide your bird through endless skies
          </p>

          <p
            style={{
              fontSize: "1rem",
              color: "#fed7aa",
              marginBottom: "3rem",
              maxWidth: "28rem",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Built with passion for the ultimate hackathon showcase
          </p>

          {/* Start button */}
          <button
            onClick={() => {
              setShowContent(false);
              setTimeout(() => setStarted(true), 400);
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem 3rem",
              fontSize: "1.125rem",
              fontWeight: "bold",
              color: "white",
              transition: "all 0.3s ease-out",
              borderRadius: "9999px",
              border: "none",
              cursor: "pointer",
              background: "#3b82f6",
              boxShadow: isHovering
                ? "0 20px 60px rgba(59, 130, 246, 0.6)"
                : "0 10px 40px rgba(59, 130, 246, 0.3)",
              transform: isHovering ? "scale(1.1)" : "scale(1)",
            }}
          >
            <span
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              Start Adventure
              <svg
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  transform: isHovering ? "translateX(4px)" : "translateX(0)",
                  transition: "transform 0.3s",
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </span>
          </button>

          {/* Feature badges */}
          <div
            style={{
              marginTop: "4rem",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            {[
              "Fast-paced",
              "Challenging",
              "Competitive",
            ].map((text, i) => (
              <div
                key={i}
                style={{
                  padding: "0.5rem 1.5rem",
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  borderRadius: "9999px",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#bfdbfe",
                  fontSize: "0.875rem",
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>

        {/* Floating particles */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                width: "0.5rem",
                height: "0.5rem",
                background: "white",
                borderRadius: "9999px",
                opacity: 0.2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${5 + Math.random() * 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      <Footer />

      {/* Animations */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0) rotate(6deg);
          }
          50% {
            transform: translateY(-20px) rotate(6deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.2;
          }
          90% {
            opacity: 0.2;
          }
          50% {
            transform: translateY(-100vh) translateX(20px);
          }
        }
      `}</style>
    </div>
  );
}

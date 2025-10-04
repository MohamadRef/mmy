import React, { useState } from "react";

const Game = () => (
  <div style={{
    minHeight: '100vh',
    background: '#111827',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <h1 style={{ fontSize: '2.5rem', color: 'white' }}>Game Component Goes Here</h1>
  </div>
);

export default function App() {
  const [started, setStarted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {!started ? (
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #581c87 50%, #831843 100%)'
        }}>
          {/* Animated background blobs */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            <div style={{
              position: 'absolute',
              top: '5rem',
              left: '5rem',
              width: '18rem',
              height: '18rem',
              borderRadius: '9999px',
              background: 'rgba(168, 85, 247, 0.4)',
              filter: 'blur(60px)',
              animation: 'pulse 3s ease-in-out infinite'
            }}></div>
            <div style={{
              position: 'absolute',
              top: '10rem',
              right: '5rem',
              width: '18rem',
              height: '18rem',
              borderRadius: '9999px',
              background: 'rgba(236, 72, 153, 0.4)',
              filter: 'blur(60px)',
              animation: 'pulse 3s ease-in-out infinite 700ms'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '5rem',
              left: '50%',
              width: '18rem',
              height: '18rem',
              borderRadius: '9999px',
              background: 'rgba(99, 102, 241, 0.4)',
              filter: 'blur(60px)',
              animation: 'pulse 3s ease-in-out infinite 1000ms'
            }}></div>
          </div>

          {/* Grid pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>

          {/* Main content */}
          <div style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '1200px',
            width: '100%',
            padding: '0 24px',
            textAlign: 'center'
          }}>
            {/* Floating game icon */}
            <div style={{
              marginBottom: '2rem',
              display: 'inline-block',
              animation: 'bounce 2s infinite'
            }}>
              <div style={{
                width: '6rem',
                height: '6rem',
                borderRadius: '1rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transform: 'rotate(6deg)',
                transition: 'transform 0.3s',
                background: 'linear-gradient(135deg, #f472b6, #a855f7)'
              }}>
                <span style={{ fontSize: '3rem' }}>🎮</span>
              </div>
            </div>

            {/* Title with gradient text */}
            <h1 style={{
              fontSize: 'clamp(3rem, 10vw, 6rem)',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              lineHeight: '1.1',
              background: 'linear-gradient(to right, #fda4af, #d8b4fe, #c7d2fe)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Epic Game
            </h1>

            {/* Subtitle */}
            <p style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              color: '#e9d5ff',
              marginBottom: '1rem',
              fontWeight: '300',
              letterSpacing: '0.025em'
            }}>
              Prepare yourself for an unforgettable experience
            </p>
            
            <p style={{
              fontSize: '1rem',
              color: '#d8b4fe',
              marginBottom: '3rem',
              maxWidth: '28rem',
              marginLeft: 'auto',
              marginRight: 'auto'
            }}>
              Built with passion for the ultimate hackathon showcase
            </p>

            {/* Start button with glow effect */}
            <button
              onClick={() => setStarted(true)}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1rem 3rem',
                fontSize: '1.125rem',
                fontWeight: 'bold',
                color: 'white',
                transition: 'all 0.3s ease-out',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                background: 'linear-gradient(to right, #ec4899, #a855f7, #6366f1)',
                boxShadow: isHovering ? '0 20px 60px rgba(168, 85, 247, 0.6)' : '0 10px 40px rgba(168, 85, 247, 0.3)',
                transform: isHovering ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              <span style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                Start Adventure
                <svg 
                  style={{
                    width: '1.5rem',
                    height: '1.5rem',
                    transform: isHovering ? 'translateX(4px)' : 'translateX(0)',
                    transition: 'transform 0.3s'
                  }}
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            {/* Feature badges */}
            <div style={{
              marginTop: '4rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '1rem'
            }}>
              <div style={{
                padding: '0.5rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e9d5ff',
                fontSize: '0.875rem'
              }}>
                ⚡ Fast-paced
              </div>
              <div style={{
                padding: '0.5rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e9d5ff',
                fontSize: '0.875rem'
              }}>
                🎯 Challenging
              </div>
              <div style={{
                padding: '0.5rem 1.5rem',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '9999px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#e9d5ff',
                fontSize: '0.875rem'
              }}>
                🏆 Competitive
              </div>
            </div>
          </div>

          {/* Floating particles */}
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: '0.5rem',
                  height: '0.5rem',
                  background: 'white',
                  borderRadius: '9999px',
                  opacity: 0.2,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${5 + Math.random() * 10}s linear infinite`,
                  animationDelay: `${Math.random() * 5}s`
                }}
              ></div>
            ))}
          </div>
        </div>
      ) : (
        <Game />
      )}

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
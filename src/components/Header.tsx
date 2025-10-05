import React from "react";

export default function Header({
  onStartGame,
}: {
  onStartGame?: () => void;
}) {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0.6rem 4rem",
        background: "rgba(17, 24, 39, 0.35)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      {/* Left side: Logo + title */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <span style={{ fontSize: "1.5rem" }}>🎮</span>
        <h1
          style={{
            margin: 0,
            color: "white",
            fontWeight: 700,
            fontSize: "1.15rem",
          }}
        >
          Nest Defence
        </h1>
      </div>

      {/* Right side: Buttons */}
      <nav style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
        <button
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.2s ease",
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Home
        </button>

        <button
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: "8px",
            padding: "0.4rem 1rem",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "all 0.2s ease",
          }}
          onClick={() => onStartGame?.()}
        >
          Game
        </button>
      </nav>
    </header>
  );
}

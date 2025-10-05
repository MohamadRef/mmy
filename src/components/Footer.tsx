import React from "react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        padding: "1rem 2rem",
        color: "white",
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        textAlign: "center",
        backdropFilter: "blur(10px)",
        borderTop: "1px solid rgba(255, 255, 255, 0.1)"
      }}
    >
      <p style={{ margin: 0, fontSize: "0.9rem" }}>
        © 2025 Epic Game. All rights reserved.
      </p>
    </footer>
  );
}

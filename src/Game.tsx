import React, { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";

import Crow from "./assets/sprites/Crow.png"
import Cat from "./assets/sprites/Cat.png"
import Eagle from "./assets/sprites/Eagle.png"

const Game: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let app: PIXI.Application | null = null;

    const setup = async () => {
      app = new PIXI.Application();
      await app.init({
        resizeTo: window,
        background: "#0a0a0a",
        antialias: true,
      });

      if (ref.current) {
        ref.current.innerHTML = "";
        ref.current.appendChild(app.canvas);
      }

      const square = new PIXI.Graphics();
      square.fill({ color: 0xff0000 });
      square.rect(-25, -25, 50, 50);
      square.x = app.screen.width / 2;
      square.y = app.screen.height / 2;
      app.stage.addChild(square);

      app.ticker.add((delta) => {
        square.rotation += 0.05 * delta;
      });
    };

    setup();

    return () => {
      app?.destroy(true, { children: true });
    };
  }, []);

  return <div ref={ref} style={{ width: "100%", height: "100%" }} />;
};

export default Game;

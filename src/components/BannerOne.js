'use client'
import React, { useEffect, useRef } from "react";
import * as rive from "@rive-app/canvas";

const BannerOne = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const r = new rive.Rive({
      src: "/assets/animation/cover_website.riv",
      canvas: canvasRef.current,
      stateMachines: "State Machine 1",
      autoplay: true,
      onLoad: () => {
        r.resizeDrawingSurfaceToCanvas();
      },
    });
    return () => r.cleanup();
  }, []);

  return (
    <div style={{ width: "100%", minHeight: 500, display: "flex", justifyContent: "center", alignItems: "center", background: "#ffffff" }}>
      <canvas ref={canvasRef} width={1920} height={810} style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  );
};

export default BannerOne;

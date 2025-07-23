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
    <div className="w-full min-h-[500px] flex justify-center items-center bg-white mt-16">
      <canvas ref={canvasRef} width={1920} height={810} className="max-w-full h-auto" />
    </div>
  );
};

export default BannerOne;

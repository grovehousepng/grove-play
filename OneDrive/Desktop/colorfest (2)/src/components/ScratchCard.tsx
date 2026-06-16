"use client";

import React, { useRef, useEffect, useState } from "react";

interface ScratchCardProps {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
  onClear?: () => void;
}

export default function ScratchCard({ children, width = "100%", height = "100%", onClear }: ScratchCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isCleared, setIsCleared] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    // Use a ResizeObserver to handle responsive resizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (!isCleared) {
          canvas.width = entry.contentRect.width;
          canvas.height = entry.contentRect.height;
          fillCanvas(ctx, canvas);
        }
      }
    });
    
    resizeObserver.observe(container);

    // Initial fill
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width || 300;
    canvas.height = rect.height || 200;
    fillCanvas(ctx, canvas);
    setIsReady(true);

    return () => resizeObserver.disconnect();
  }, [isCleared]);

  const fillCanvas = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
    ctx.globalCompositeOperation = "source-over"; // Reset composite to normal for filling

    // 1. Base Silver/Metallic Gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#d1d5db"); // light gray
    gradient.addColorStop(0.3, "#9ca3af"); // gray
    gradient.addColorStop(0.5, "#f3f4f6"); // almost white shine
    gradient.addColorStop(0.7, "#9ca3af"); // gray
    gradient.addColorStop(1, "#6b7280"); // dark gray

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Add realistic scratch card noise/grit
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      // Small random variations in lightness
      const noise = (Math.random() - 0.5) * 40; 
      data[i] += noise;     // R
      data[i + 1] += noise; // G
      data[i + 2] += noise; // B
    }
    ctx.putImageData(imgData, 0, 0);

    // 3. Optional: Diagonal security pattern
    ctx.globalCompositeOperation = "multiply";
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = "rgba(0, 0, 0, 0.04)";
    for (let i = -canvas.height; i < canvas.width; i += 8) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + canvas.height, canvas.height);
      ctx.stroke();
    }
    ctx.globalCompositeOperation = "source-over";

    // 4. Text hint
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Text
    ctx.fillStyle = "rgba(0, 0, 0, 0.55)";
    ctx.font = `900 ${Math.min(canvas.width * 0.09, 16)}px 'Nunito', 'Inter', system-ui`;
    ctx.shadowColor = "rgba(255, 255, 255, 0.9)";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 0;
    ctx.fillText("KAZI & GÖR!", canvas.width / 2, canvas.height / 2);

    // Reset shadow
    ctx.shadowColor = "transparent";
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Brush settings — bigger on mobile for easier scratching
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = Math.max(50, canvas.width * 0.22); // Brush size
  };

  const getPointerPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }

    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const handleStart = (e: MouseEvent | TouchEvent) => {
      if (isCleared) return;
      isDrawingRef.current = true;
      const pos = getPointerPos(e);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y);
      }
    };

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDrawingRef.current || isCleared) return;
      if (e.cancelable) e.preventDefault(); // Prevent scrolling while scratching
      
      const pos = getPointerPos(e);
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
      }
    };

    const checkClearPercentage = () => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparentCount = 0;
      
      for (let i = 3; i < pixels.length; i += 32) {
        if (pixels[i] === 0) {
          transparentCount++;
        }
      }

      const totalSampledPixels = pixels.length / 32;
      if (transparentCount / totalSampledPixels > 0.30) { // 30% threshold for easier clearing
        setIsCleared(true);
        if (onClear) onClear();
      }
    };

    const handleEnd = () => {
      if (!isDrawingRef.current) return;
      isDrawingRef.current = false;
      checkClearPercentage();
    };

    // Attach native events to canvas with { passive: false } for touchmove
    canvas.addEventListener("mousedown", handleStart);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseup", handleEnd);
    canvas.addEventListener("mouseleave", handleEnd);
    
    canvas.addEventListener("touchstart", handleStart, { passive: false });
    canvas.addEventListener("touchmove", handleMove, { passive: false });
    canvas.addEventListener("touchend", handleEnd);
    canvas.addEventListener("touchcancel", handleEnd);

    return () => {
      canvas.removeEventListener("mousedown", handleStart);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseup", handleEnd);
      canvas.removeEventListener("mouseleave", handleEnd);
      
      canvas.removeEventListener("touchstart", handleStart);
      canvas.removeEventListener("touchmove", handleMove);
      canvas.removeEventListener("touchend", handleEnd);
      canvas.removeEventListener("touchcancel", handleEnd);
    };
  }, [isCleared]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width,
        height,
        userSelect: "none",
        borderRadius: "inherit",
      }}
    >
      {/* Fallback silver background while loading */}
      {!isReady && (
        <div style={{
          position: "absolute", top: 0, left: 0, width: "100%", height: "100%",
          background: "#d1d5db", borderRadius: "inherit", zIndex: 5
        }} />
      )}
      
      {/* Background content (The hidden card) */}
      <div style={{ 
        width: "100%", height: "100%", borderRadius: "inherit", 
        opacity: isReady ? 1 : 0 
      }}>{children}</div>

      {/* Foreground Canvas (The scratch layer) */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          cursor: "crosshair",
          touchAction: "none", // Critical for mobile
          opacity: isCleared ? 0 : 1,
          pointerEvents: isCleared ? "none" : "auto",
          zIndex: 10,
          borderRadius: "inherit",
        }}
      />
    </div>
  );
}

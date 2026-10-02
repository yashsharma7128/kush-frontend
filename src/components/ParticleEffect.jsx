import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function ParticleEffect() {
  const canvasRef = useRef(null);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle types: Gold sparkles, Rose petals, Marigold petals
    const particleCount = 28;
    const particles = [];

    const colors = [
      { r: 197, g: 155, b: 78, type: 'sparkle' }, // Gold
      { r: 212, g: 175, b: 55, type: 'sparkle' }, // Bright Gold
      { r: 232, g: 213, b: 163, type: 'sparkle' }, // Champagne
      { r: 107, g: 29, b: 47, type: 'petal' },    // Maroon petal
      { r: 180, g: 45, b: 70, type: 'petal' },    // Crimson petal
      { r: 217, g: 119, b: 6, type: 'petal' },    // Marigold saffron petal
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.random() * 0.8 - 0.4,
        vy: Math.random() * 0.6 + 0.3,
        rot: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vRot;

        if (p.y > height + 20) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -10;
        if (p.x < -20) p.x = width + 10;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rot * Math.PI) / 180);

        if (p.color.type === 'petal') {
          // Draw subtle organic petal
          ctx.beginPath();
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.7})`;
          ctx.ellipse(0, 0, p.radius * 2.2, p.radius * 1.2, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Draw sparkling golden star/circle
          ctx.beginPath();
          ctx.arc(0, 0, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`;
          ctx.shadowBlur = 6;
          ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0.6)`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive]);

  return (
    <>
      {isActive && (
        <canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30 opacity-75"
        />
      )}
      
      {/* Floating Ambient Effects Control */}
      <button
        onClick={() => setIsActive(!isActive)}
        className={`fixed bottom-16 sm:bottom-6 right-3 sm:right-6 z-40 p-2 sm:p-2.5 rounded-full border shadow-lg backdrop-blur-md transition-all text-xs flex items-center gap-1.5 ${
          isActive
            ? 'bg-[#6B1D2F]/90 text-[#E2C475] border-[#C59B4E]/60 shadow-[#6B1D2F]/20'
            : 'bg-white/90 text-stone-500 border-stone-200'
        }`}
        title={isActive ? 'Disable floating gold petals' : 'Enable floating gold petals'}
      >
        <Sparkles size={14} className={isActive ? 'animate-spin' : ''} />
        <span className="hidden sm:inline font-royal font-bold text-[10px] tracking-wider uppercase">
          {isActive ? 'Shimmer: ON' : 'Shimmer: OFF'}
        </span>
      </button>
    </>
  );
}

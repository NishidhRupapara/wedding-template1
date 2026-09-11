import { useEffect, useRef } from 'react';

interface PetalCanvasProps {
  className?: string;
}

export default function PetalCanvas({ className }: PetalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    window.addEventListener('resize', handleResize);

    const petalPalettes = [
      { base: '#B51837', highlight: '#E33857', shadow: '#5E0619' },
      { base: '#940E2A', highlight: '#C72445', shadow: '#42020E' },
      { base: '#D12347', highlight: '#F55375', shadow: '#6E071D' },
      { base: '#A81333', highlight: '#DB3456', shadow: '#500516' },
    ];

    const PETAL_COUNT = width < 768 ? 16 : 24;

    const createPetal = (startY = null) => ({
      x: Math.random() * width,
      y: startY !== null ? startY : Math.random() * height,
      size: 3.5 + Math.random() * 4.0,
      speedY: 0.55 + Math.random() * 0.75,
      speedX: (Math.random() - 0.5) * 0.45,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.018 + Math.random() * 0.024,
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.012 + Math.random() * 0.016,
      swayDist: 15 + Math.random() * 22,
      palette: petalPalettes[Math.floor(Math.random() * petalPalettes.length)],
      opacity: 0.55 + Math.random() * 0.4,
    });

    const petals = Array.from({ length: PETAL_COUNT }, () => createPetal());

    const drawPetal = (petal) => {
      ctx.save();
      const currentX = petal.x + Math.sin(petal.swayOffset) * petal.swayDist;
      ctx.translate(currentX, petal.y);
      ctx.rotate(petal.rotation);
      ctx.scale(Math.cos(petal.flip), 1);
      ctx.globalAlpha = petal.opacity;

      const grad = ctx.createRadialGradient(0, -petal.size * 0.2, 0, 0, 0, petal.size);
      grad.addColorStop(0, petal.palette.highlight);
      grad.addColorStop(0.5, petal.palette.base);
      grad.addColorStop(1, petal.palette.shadow);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -petal.size * 0.7);
      ctx.bezierCurveTo(petal.size * 0.65, -petal.size * 0.7, petal.size * 0.75, petal.size * 0.3, 0, petal.size * 0.85);
      ctx.bezierCurveTo(-petal.size * 0.75, petal.size * 0.3, -petal.size * 0.65, -petal.size * 0.7, 0, -petal.size * 0.7);
      ctx.fill();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];
        petal.y += petal.speedY;
        petal.x += petal.speedX;
        petal.swayOffset += petal.swaySpeed;
        petal.rotation += petal.rotationSpeed;
        petal.flip += petal.flipSpeed;

        if (petal.y > height + 15) petals[i] = createPetal(-15);
        if (petal.x < -20) petal.x = width + 10;
        if (petal.x > width + 20) petal.x = -10;

        drawPetal(petal);
      }
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
import React, { useEffect, useRef, useState } from 'react';

const Rain = ({ start }) => {
  const canvasRef = useRef(null);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    let timer;
    if (start) {
      timer = setTimeout(() => {
        setIsRaining(true);
      }, 3500);
    } else {
      setIsRaining(false);
    }
    return () => clearTimeout(timer);
  }, [start]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animId;

    if (isRaining) {
      const chars = '01101010011010111001';
      const fontSize = 16;
      
      const columns = Math.floor(canvas.width / 20); 
      const drops = [];
      
      for (let i = 0; i < columns; i++) {
        drops[i] = {
          x: Math.random() * canvas.width,
          y: Math.random() * -100
        };
      }

      // ★ 프레임 제한용 변수 (약 20fps로 제한 = 50ms 간격과 동일한 속도)
      let lastTime = 0;
      const frameInterval = 50; // ms

      const draw = (timestamp) => {
        animId = requestAnimationFrame(draw);

        // 이전 프레임으로부터 50ms 이상 지났을 때만 그리기
        if (timestamp - lastTime < frameInterval) return;
        lastTime = timestamp;

        ctx.fillStyle = 'rgba(3, 3, 3, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00FF41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, drops[i].x, drops[i].y * fontSize);

          if (drops[i].y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i].y = 0;
            drops[i].x = Math.random() * canvas.width;
          }
          drops[i].y++;
        }
      };

      animId = requestAnimationFrame(draw);
    } else {
      setTimeout(() => {
        if (canvasRef.current && !isRaining) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
      }, 2000);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isRaining]);

  return (
    <>
      <style>
        {`
          .matrix-canvas {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: -1;
            pointer-events: none;
            opacity: 0;
            transition: opacity 2s ease-in-out; 
          }

          .matrix-canvas.active {
            opacity: 0.3;
          }
        `}
      </style>
      <canvas
        ref={canvasRef}
        className={`matrix-canvas ${isRaining ? 'active' : ''}`}
      />
    </>
  );
};

export default Rain;
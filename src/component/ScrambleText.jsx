import React, { useEffect, useState, useRef } from 'react';

const ScrambleText = ({
  text,
  chars = 'XO',
  speed = 0.3,
  delay = 0.5,
  duration = 3,
  className = '',
  start = false,
}) => {
  const [displayText, setDisplayText] = useState('');
  const frameRef = useRef(0);
  const queueRef = useRef([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    if (!start) {
      cancelAnimationFrame(frameRef.current);
      return;
    }

    let timeout;
    
    timeout = setTimeout(() => {
      const length = text.length;
      const promise = new Promise((resolve) => {
        queueRef.current = [];
        const totalFrames = duration * 60;
        
        for (let i = 0; i < length; i++) {
          const from = '';
          const to = text[i] || '';
          const startFrame = Math.floor(Math.random() * (totalFrames * 0.2));
          const endFrame = startFrame + Math.floor(Math.random() * (totalFrames * 0.8));
          queueRef.current.push({ from, to, start: startFrame, end: endFrame });
        }
        
        cancelAnimationFrame(frameRef.current);
        frameCountRef.current = 0;
        
        const update = () => {
          frameCountRef.current++;

          // ★ 2프레임에 1번만 실제 렌더링 (DOM 파싱 부하 절반 감소)
          if (frameCountRef.current % 2 !== 0) {
            frameRef.current = requestAnimationFrame(update);
            return;
          }

          let output = '';
          let complete = 0;
          
          for (let i = 0; i < queueRef.current.length; i++) {
            let { from, to, start, end, char } = queueRef.current[i];
            
            if (frameCountRef.current >= end) {
              complete++;
              output += to;
            } else if (frameCountRef.current >= start) {
              if (!char || Math.random() < speed) {
                char = chars[Math.floor(Math.random() * chars.length)];
                queueRef.current[i].char = char;
              }
              output += `<span class="opacity-70 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">${char}</span>`;
            } else {
              output += from;
            }
          }
          
          setDisplayText(output);
          
          if (complete === queueRef.current.length) {
            resolve();
          } else {
            frameRef.current = requestAnimationFrame(update);
          }
        };
        
        update();
      });
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [text, start, chars, speed, delay, duration]);

  return <span className={className} dangerouslySetInnerHTML={{ __html: displayText || '&nbsp;' }} />;
};

export default ScrambleText;
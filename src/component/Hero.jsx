import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import ScrambleText from './ScrambleText';
import '../css/hero.css';
import Rain from './Rain';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Hero = ({ onTriggerRain }) => {
  const containerRef = useRef(null);
  const portfolioTextRef = useRef(null);
  const [startScramble, setStartScramble] = useState(false);

  const prevStartRef = useRef(false);
  const onTriggerRainRef = useRef(onTriggerRain);
  onTriggerRainRef.current = onTriggerRain;

  useGSAP(() => {
    const introScene = document.querySelector('.intro-scene');
    const zoomLayer = document.querySelector('.intro-scene-zoom-layer');

    if (introScene) {
      gsap.set(introScene, {
        transformOrigin: 'center center',
      });
    }

    if (zoomLayer) {
      gsap.set(zoomLayer, {
        willChange: 'transform, opacity',
        transformOrigin: 'center center',
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const shouldStart = self.progress > 0.6;

          if (prevStartRef.current !== shouldStart) {
            prevStartRef.current = shouldStart;
            setStartScramble(shouldStart);
            onTriggerRainRef.current?.(shouldStart);
          }
        },
        onLeave: () => {
          if (zoomLayer) gsap.set(zoomLayer, { willChange: 'auto' });
        },
        onLeaveBack: () => {
          if (zoomLayer) gsap.set(zoomLayer, { willChange: 'auto' });
        },
        onEnter: () => {
          if (zoomLayer) gsap.set(zoomLayer, { willChange: 'transform, opacity' });
        },
        onEnterBack: () => {
          if (zoomLayer) gsap.set(zoomLayer, { willChange: 'transform, opacity' });
        },
      },
    });

 if (introScene) {
  tl.to(
    introScene,
    {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    },
    0
  );
}

if (zoomLayer) {
  tl.to(
    zoomLayer,
    {
      scale: 6,
      opacity: 0,
      duration: 1,
      ease: 'power2.in',
      force3D: true,
      transformOrigin: 'center center',
    },
    0
  );
}

tl.fromTo(
  portfolioTextRef.current,
  { scale: 0.8, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: 'power2.out',
    force3D: true,
  },
  '-=0.1'
);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="hero-container">
      <Rain start={startScramble} />

      <div className="scroll-indicator">
        <span className="scroll-text">Scroll To</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-green-400" />
        </motion.div>
      </div>

      <div ref={portfolioTextRef} className="portfolio-text-wrapper">
        <h2 className="neon-text">
          <ScrambleText
            text="PORTFOLIO"
            start={startScramble}
            chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
            speed={0.15}
            delay={0}
            duration={3}
          />
        </h2>
      </div>
    </section>
  );
};

export default Hero;
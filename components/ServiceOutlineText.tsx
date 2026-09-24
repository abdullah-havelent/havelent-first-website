'use client';

import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

interface ServiceOutlineTextProps {
  text: string;
  scaleX?: number;
}

export default function ServiceOutlineText({
  text,
  scaleX = 0.90,
}: ServiceOutlineTextProps) {
  const textRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const [fontSize, setFontSize] = useState(240);

  useLayoutEffect(() => {
    const element = textRef.current;
    const measureElement = measureRef.current;

    if (!element || !measureElement) return;

    const fitText = () => {
      const parentWidth =
        element.parentElement?.clientWidth ?? window.innerWidth;

      const actualTextWidth =
        measureElement.getBoundingClientRect().width;

      if (!actualTextWidth) return;

      const renderedWidth = actualTextWidth * scaleX;

      if (renderedWidth > parentWidth) {
        const fittedSize =
          240 * (parentWidth / renderedWidth);

        setFontSize(fittedSize);
      } else {
        setFontSize(240);
      }
    };

    fitText();

    const resizeObserver = new ResizeObserver(fitText);

    resizeObserver.observe(element);

    if (element.parentElement) {
      resizeObserver.observe(element.parentElement);
    }

    window.addEventListener('resize', fitText);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', fitText);
    };
  }, [scaleX, text]);

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute
        inset-x-0
        bottom-0
        z-[20]
        hidden
        h-[420px]
        items-end
        justify-center
        overflow-hidden
        select-none
        md:flex
      "
    >
      {/* Invisible measurement only */}
      <div
        ref={measureRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-99999px',
          top: 0,
          width: 'max-content',
          whiteSpace: 'nowrap',
          visibility: 'hidden',
          fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
          fontSize: '240px',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '0em',
        }}
      >
        {text}
      </div>

      <motion.div
        ref={textRef}
        initial={{
          opacity: 0,
          y: 30,
          filter: 'blur(10px)',
        }}
        animate={{
          opacity: 1,
          y:50,
          filter: 'blur(0px)',
        }}
        transition={{
          duration: 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
className="
  service-outline-word
  pointer-events-none
  select-none
  font-black
  uppercase
  [font-family:var(--font-league-spartan)]
"

style={{
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  width: '100%',
  whiteSpace: 'nowrap',

  fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
  fontSize: `${fontSize}px`,
  fontWeight: 900,

  lineHeight: 1,
  letterSpacing: '0em',

  scaleX: scaleX,
  transformOrigin: 'center',
}}
      >
        {text.split('').map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className="service-outline-letter"
          >
            {letter === ' ' ? '\u00A0' : letter}
          </span>
        ))}
      </motion.div>

      <style jsx>{`
.service-outline-letter {
  display: inline-block;
  
  pointer-events: none;

  color: transparent;
  pointer-events: auto;

          -webkit-text-fill-color: transparent;

          -webkit-text-stroke: 1.5px
            rgba(249, 115, 22, 0.22);

          transition:
            -webkit-text-stroke 0.45s ease,
            -webkit-text-fill-color 0.45s ease,
            transform 0.45s ease,
            filter 0.45s ease;
        }

.service-outline-letter:hover {
  background: linear-gradient(
    135deg,
    #9a3412 0%,
    #c2410c 35%,
    #ea6c0c 70%,
    #f97316 100%
  );

  -webkit-background-clip: text;
  background-clip: text;

  -webkit-text-fill-color: transparent;

  -webkit-text-stroke: 1.5px #c2410c;

  transform: scale(1.01);

  filter:
    drop-shadow(0 0 8px rgba(249, 115, 22, 0.18))
    drop-shadow(0 0 20px rgba(194, 65, 12, 0.12));
}


      `}</style>
    </div>
  );
}
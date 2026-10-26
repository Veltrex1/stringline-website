"use client";

import { animate, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero, images } from "@/content";

export function YardReveal() {
  const [pos, setPos] = useState(84);
  const touched = useRef(false);
  const reduce = useReducedMotion();

  // The signature move: once, the handle sweeps from the yard today to the concept and settles.
  useEffect(() => {
    if (reduce) return;
    const sweep = animate(18, 84, {
      duration: 1.6,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => sweep.stop();
  }, [reduce]);

  return (
    <figure className="reveal">
      <Image
        className="reveal__img"
        src={images.before.src}
        alt={images.before.alt}
        fill
        priority
        sizes="(max-width: 1360px) 100vw, 1280px"
        unoptimized={images.before.src.endsWith(".svg")}
      />
      <Image
        className="reveal__img reveal__img--after"
        src={images.concept.src}
        alt={images.concept.alt}
        fill
        priority
        sizes="(max-width: 1360px) 100vw, 1280px"
        unoptimized={images.concept.src.endsWith(".svg")}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />

      <span className="reveal__label reveal__label--after">{hero.reveal.after}</span>
      <span className="reveal__label reveal__label--before">{hero.reveal.before}</span>

      <div className="reveal__range" style={{ opacity: pos > 40 ? 1 : 0 }}>
        <strong>{hero.reveal.range}</strong>
        <span>{hero.reveal.rangeNote}</span>
        <span>{hero.reveal.disclaimer}</span>
      </div>

      <span className="reveal__track" style={{ transform: `translateX(${pos}%)` }} aria-hidden="true">
        <span className="reveal__line" />
        <span className="reveal__grip">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M8 6 3 11l5 5M14 6l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>

      <input
        className="reveal__input"
        type="range"
        min={2}
        max={98}
        step={1}
        value={Math.round(pos)}
        aria-label={hero.reveal.label}
        aria-valuetext={`${Math.round(pos)}% concept shown`}
        onPointerDown={() => (touched.current = true)}
        onKeyDown={() => (touched.current = true)}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
      />
    </figure>
  );
}

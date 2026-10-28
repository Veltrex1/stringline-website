"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { hero, images } from "@/content";

// The yard today sits on the left of the handle and the concept on the right, so the reveal reads
// before-to-after. It renders at its start position, then the handle sweeps once toward the concept.
const START = 82;
const END = 18;
const SWEEP_MS = 1600;
const DELAY_MS = 600;

const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

export function YardReveal() {
  const [pos, setPos] = useState(START);
  const touched = useRef(false);
  const figureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let begin = 0;
    const step = (now: number) => {
      if (touched.current) return;
      if (!begin) begin = now + (reduce ? 0 : DELAY_MS);
      const t = reduce ? 1 : Math.min(1, Math.max(0, (now - begin) / SWEEP_MS));
      setPos(START + (END - START) * easeOut(t));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // On touch screens only the handle drags, so a thumb scrolling past the photo doesn't move it.
  function onGripPointerDown(e: React.PointerEvent<HTMLSpanElement>) {
    const figure = figureRef.current;
    if (!figure) return;
    touched.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = figure.getBoundingClientRect();
    const move = (x: number) => setPos(Math.min(98, Math.max(2, ((x - rect.left) / rect.width) * 100)));
    move(e.clientX);
    const onMove = (ev: PointerEvent) => move(ev.clientX);
    const stop = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
  }

  const conceptShown = 100 - pos;

  return (
    <figure className="reveal">
      <div className="reveal__stage" ref={figureRef}>
        <Image
          className="reveal__img"
          src={images.concept.src}
          alt={images.concept.alt}
          fill
          priority
          sizes="(max-width: 1360px) 100vw, 1280px"
        />
        <Image
          className="reveal__img"
          src={images.before.src}
          alt={images.before.alt}
          fill
          priority
          sizes="(max-width: 1360px) 100vw, 1280px"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />

        <span className="reveal__label reveal__label--before" style={{ opacity: pos > 12 ? 1 : 0 }}>
          {hero.reveal.before}
        </span>
        <span className="reveal__label reveal__label--after" style={{ opacity: pos < 88 ? 1 : 0 }}>
          {hero.reveal.after}
        </span>

        <span className="reveal__track" style={{ transform: `translateX(${pos}%)` }} aria-hidden="true">
          <span className="reveal__line" />
          <span className="reveal__grip" onPointerDown={onGripPointerDown}>
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
          aria-valuetext={`${Math.round(conceptShown)}% concept shown`}
          onPointerDown={() => (touched.current = true)}
          onKeyDown={() => (touched.current = true)}
          onChange={(e) => {
            touched.current = true;
            setPos(Number(e.target.value));
          }}
        />
      </div>

      <figcaption className="reveal__range" style={{ opacity: conceptShown > 40 ? 1 : 0.0001 }}>
          <strong>{hero.reveal.range}</strong>
          <span>{hero.reveal.rangeNote}</span>
        <span>{hero.reveal.disclaimer}</span>
      </figcaption>
    </figure>
  );
}

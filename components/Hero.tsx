import React, { useMemo } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Heart, ChevronDown } from 'lucide-react';
import { PARTNER_NAME } from '../constants';

interface HeroProps {
  onNext: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNext }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for mouse parallax
  const mouseX = useSpring(x, { stiffness: 30, damping: 25 });
  const mouseY = useSpring(y, { stiffness: 30, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    x.set(clientX / innerWidth - 0.5);
    y.set(clientY / innerHeight - 0.5);
  };

  // Parallax depth layers
  const moveX1 = useTransform(mouseX, [-0.5, 0.5], [20, -20]);
  const moveY1 = useTransform(mouseY, [-0.5, 0.5], [20, -20]);
  const moveX2 = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const moveY2 = useTransform(mouseY, [-0.5, 0.5], [-12, 12]);

  // Memoize particles — fewer, softer, more intentional
  const bgParticles = useMemo(() =>
    Array.from({ length: 8 }, () => ({
      x: Math.random() * 100,
      scale: Math.random() * 0.4 + 0.3,
      rotate: Math.random() * 40 - 20,
      duration: Math.random() * 25 + 20,
      delay: Math.random() * 12,
      size: Math.random() * 24 + 12,
    })), []);

  const fgParticles = useMemo(() =>
    Array.from({ length: 6 }, () => ({
      x: Math.random() * 100,
      scale: Math.random() * 0.25 + 0.15,
      rotate: Math.random() * 60 - 30,
      duration: Math.random() * 30 + 25,
      delay: Math.random() * 18,
      size: Math.random() * 18 + 8,
    })), []);

  // Staggered entrance animation
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const fadeUpSlow = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <section
      className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden text-center"
      onMouseMove={handleMouseMove}
    >
      {/* ══════════════════════════════════════════
          BACKGROUND SYSTEM — Deep Purple Gradient
          ══════════════════════════════════════════ */}

      {/* Base gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1150 25%, #4a1a6b 50%, #2d1150 75%, #1a0a2e 100%)',
        }}
      />

      {/* Animated gradient shift — extremely slow, subtle */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse at 60% 50%, rgba(168,85,247,0.2) 0%, transparent 60%)',
            'radial-gradient(ellipse at 40% 60%, rgba(139,92,246,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 40%, rgba(139,92,246,0.25) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Radial glow behind content */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'radial-gradient(ellipse 50% 40% at 50% 45%, rgba(168,85,247,0.15) 0%, transparent 100%)',
        }}
      />

      {/* Dark overlay for WCAG contrast — 6% black */}
      <div className="absolute inset-0 z-0 bg-black/[0.06]" />

      {/* ══════════════════════════════════════════
          FLOATING HEART PARTICLES — Faint & Soft
          ══════════════════════════════════════════ */}

      {/* Back layer — slow, large, very faint */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ x: moveX1, y: moveY1 }}
      >
        {bgParticles.map((p, i) => (
          <motion.div
            key={`bg-${i}`}
            className="absolute text-pink-300/[0.08]"
            initial={{
              x: p.x + "%",
              y: "110%",
              scale: p.scale,
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.12, 0],
              rotate: [0, p.rotate],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          >
            <Heart fill="currentColor" size={p.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* Front layer — smaller, even fainter */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{ x: moveX2, y: moveY2 }}
      >
        {fgParticles.map((p, i) => (
          <motion.div
            key={`fg-${i}`}
            className="absolute text-purple-300/[0.06]"
            initial={{
              x: p.x + "%",
              y: "110%",
              scale: p.scale,
              opacity: 0,
            }}
            animate={{
              y: "-10%",
              opacity: [0, 0.08, 0],
              rotate: [0, p.rotate],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: p.delay,
            }}
          >
            <Heart fill="currentColor" size={p.size} />
          </motion.div>
        ))}
      </motion.div>

      {/* ══════════════════════════════════════════
          MAIN CONTENT — Glass Card, Staggered Entry
          ══════════════════════════════════════════ */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="z-10 relative -mt-[5vh]"
        style={{ maxWidth: '640px', width: '100%', padding: '0 1.5rem' }}
      >
        {/* Glass Card */}
        <div
          className="relative rounded-[2rem] p-10 md:p-14 flex flex-col items-center"
          style={{
            background: 'rgba(255, 255, 255, 0.06)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 0 80px rgba(168, 85, 247, 0.08), 0 0 30px rgba(255, 255, 255, 0.03), inset 0 0 60px rgba(168, 85, 247, 0.03)',
          }}
        >
          {/* Luminous border glow */}
          <div
            className="absolute inset-0 rounded-[2rem] pointer-events-none z-0"
            style={{
              border: '1px solid rgba(168, 85, 247, 0.15)',
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.06)',
            }}
          />

          {/* Heart icon — floating + glow pulse */}
          <motion.div
            variants={fadeUp}
            className="relative mb-8"
          >
            <motion.div
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative"
            >
              {/* Glow pulse behind heart */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.6, 1],
                  opacity: [0, 0.25, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart
                  size={64}
                  fill="rgba(244, 114, 182, 0.4)"
                  className="blur-xl"
                  strokeWidth={0}
                />
              </motion.div>

              <Heart
                size={56}
                fill="currentColor"
                className="text-pink-400 drop-shadow-lg relative z-10"
              />
            </motion.div>
          </motion.div>

          {/* Subtitle — small caps */}
          <motion.h2
            variants={fadeUp}
            className="text-sm md:text-base font-medium tracking-[0.25em] mb-5 uppercase"
            style={{
              color: 'rgba(244, 186, 237, 0.9)',
              fontVariant: 'small-caps',
              textShadow: '0 1px 8px rgba(168, 85, 247, 0.15)',
            }}
          >
            A Special Question
          </motion.h2>

          {/* Main title — dominant serif */}
          <motion.h1
            variants={fadeUpSlow}
            className="text-5xl md:text-7xl font-bold text-white mb-7 leading-[1.15] font-serif"
            style={{
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.2), 0 0 40px rgba(168, 85, 247, 0.08)',
            }}
          >
            For {PARTNER_NAME}
          </motion.h1>

          {/* Supporting quote */}
          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg font-light italic leading-relaxed mb-4"
            style={{
              color: 'rgba(255, 255, 255, 0.82)',
              maxWidth: '380px',
              lineHeight: 1.8,
            }}
          >
            "Every love story is beautiful, but ours is my favorite."
          </motion.p>

          {/* Personalization line */}
          <motion.p
            variants={fadeUp}
            className="text-xs md:text-sm tracking-[0.15em] mt-2"
            style={{
              color: 'rgba(244, 186, 237, 0.55)',
            }}
          >
            Since 02 June, 2021
          </motion.p>
        </div>
      </motion.div>

      {/* ══════════════════════════════════════════
          SCROLL INDICATOR — Subtle bounce, fade in
          ══════════════════════════════════════════ */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0, duration: 1.0 }}
        onClick={onNext}
        role="button"
        aria-label="Scroll to begin"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNext(); }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <span
            className="text-xs tracking-[0.2em] uppercase font-medium"
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            Scroll to Begin
          </span>
          <ChevronDown
            className="w-5 h-5"
            style={{ color: 'rgba(255, 255, 255, 0.55)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
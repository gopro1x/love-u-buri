import React from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Flower2 as Flower, Sparkles, ChevronDown } from 'lucide-react';
import { MEMORIES } from '../constants';

interface TimelineProps {
  currentIndex: number;
}

const FrameVariant: React.FC<{ index: number; memory: typeof MEMORIES[0] }> = ({ index, memory }) => {
  const variant = index % 12; // 12 Unique styles
  const imgClass = "w-full h-full object-cover transition-transform duration-700";

  switch (variant) {
    case 0: // The "Romantic" - Circular with floral accents
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-square p-4">
          <div className="absolute inset-0 bg-pink-300/30 rounded-full blur-2xl transform scale-95" />
          <div className="relative w-full h-full rounded-full border-[6px] md:border-[8px] border-white overflow-hidden shadow-2xl z-10 bg-white">
            <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-110`} />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-transparent to-transparent opacity-60" />
          </div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 }} className="absolute -top-2 -right-2 md:top-0 md:right-0 text-pink-300 z-20 drop-shadow-md bg-white rounded-full p-1"><Flower size={48} className="fill-pink-200 text-pink-400" /></motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 }} className="absolute top-1/2 -left-4 md:-left-6 text-rose-300 z-20 drop-shadow-md bg-white rounded-full p-1"><Heart size={36} className="fill-rose-300 text-rose-500" /></motion.div>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} className="absolute -bottom-2 right-12 md:right-16 text-purple-300 z-20 drop-shadow-md bg-white rounded-full p-1"><Flower size={40} className="fill-purple-200 text-purple-400" /></motion.div>
        </div>
      );

    case 1: // The "Polaroid"
      return (
        <div className="relative group w-full max-w-sm md:max-w-md mx-auto aspect-[4/5] md:aspect-[3/4] rotate-[-3deg] hover:rotate-0 transition-all duration-500 ease-out p-4">
          <div className="absolute inset-0 bg-black/20 transform translate-x-6 translate-y-6 blur-lg rounded-sm" />
          <div className="relative h-full bg-white p-3 pb-16 md:p-4 md:pb-20 shadow-2xl rounded-[2px] overflow-hidden">
            <div className="w-full h-full bg-gray-100 overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] border border-gray-100 relative">
              <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-105 filter sepia-[0.2] group-hover:sepia-0`} />
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent mix-blend-overlay pointer-events-none" />
            </div>
            {/* Empty chin for Polaroid look */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 md:w-32 h-8 md:h-10 bg-white/30 backdrop-blur-sm transform -rotate-2 shadow-sm border border-white/40 z-20" />
          </div>
        </div>
      );

    case 2: // The "Elegance" - Offset Borders
      return (
        <div className="relative group w-full max-w-lg mx-auto aspect-video md:aspect-[4/3] p-4">
          <div className="absolute top-0 right-0 bottom-8 left-8 border-2 border-white/40 rounded-lg transform translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-500" />
          <div className="absolute top-8 right-8 bottom-0 left-0 border-2 border-pink-300/40 rounded-lg transform -translate-x-2 -translate-y-2 group-hover:-translate-x-4 group-hover:-translate-y-4 transition-all duration-500" />
          <div className="relative w-full h-full rounded-sm overflow-hidden border-4 border-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-gray-900">
            <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-105 opacity-90 group-hover:opacity-100`} />
          </div>
        </div>
      );

    case 3: // The "Dreamy" - Organic Blob
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-square p-2">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-indigo-400 opacity-40 blur-2xl animate-pulse" style={{ borderRadius: '45% 55% 70% 30% / 30% 30% 70% 70%' }} />
          <div className="relative w-full h-full overflow-hidden shadow-2xl border-[6px] border-white/90 transition-all duration-700 bg-white" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}>
            <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-110 transform scale-105`} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-[15%] left-[15%] text-white opacity-80"><Sparkles size={20} /></div>
              <div className="absolute bottom-[20%] right-[20%] text-white opacity-60"><Sparkles size={14} /></div>
            </div>
          </div>
        </div>
      );

    case 4: // The "Film Strip"
      return (
        <div className="relative group w-full max-w-lg mx-auto aspect-[4/3] bg-gray-900 rounded-lg shadow-2xl overflow-hidden py-8 px-0 border border-gray-800">
          {/* Perforations Top */}
          <div className="absolute top-2 left-0 w-full h-4 flex justify-between px-2 gap-2">
            {[...Array(12)].map((_, i) => <div key={`t-${i}`} className="w-3 h-4 bg-white/20 rounded-sm" />)}
          </div>
          {/* Perforations Bottom */}
          <div className="absolute bottom-2 left-0 w-full h-4 flex justify-between px-2 gap-2">
            {[...Array(12)].map((_, i) => <div key={`b-${i}`} className="w-3 h-4 bg-white/20 rounded-sm" />)}
          </div>

          <div className="w-full h-full overflow-hidden relative border-y-2 border-gray-700">
            <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-110 opacity-90`} />
            <div className="absolute top-4 left-4 text-white/50 text-xs font-mono tracking-widest uppercase border border-white/30 px-2 rounded">REC</div>
          </div>
        </div>
      );

    case 5: // The "Scrapbook" - Washi Tape
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-square p-6">
          <div className="relative w-full h-full bg-white p-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)] rotate-2 group-hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full overflow-hidden relative">
              <img src={memory.image} alt={memory.title} className={`${imgClass} group-hover:scale-110`} />
              {/* Washi Tape Top Left */}
              <div className="absolute -top-3 -left-8 w-24 h-6 bg-pink-400/60 rotate-[-45deg] backdrop-blur-sm shadow-sm" />
              {/* Washi Tape Bottom Right */}
              <div className="absolute -bottom-3 -right-8 w-24 h-6 bg-purple-400/60 rotate-[-45deg] backdrop-blur-sm shadow-sm" />
            </div>
          </div>
        </div>
      );

    case 6: // The "Diamond"
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-square flex items-center justify-center">
          <div className="w-[72%] h-[72%] relative shadow-2xl drop-shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <div className="w-full h-full overflow-hidden transform rotate-45 border-4 border-white/80 bg-white shadow-lg rounded-xl">
              <div className="w-[142%] h-[142%] -ml-[21%] -mt-[21%] transform -rotate-45 overflow-hidden">
                <img src={memory.image} alt={memory.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      );

    case 7: // The "Postage Stamp"
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-[4/3] p-4">
          {/* Stamp Container */}
          <div className="relative w-full h-full bg-white p-1 shadow-xl"
            style={{
              clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // Fallback
              backgroundImage: 'radial-gradient(transparent 50%, white 50%)',
              backgroundSize: '20px 20px',
              backgroundPosition: '-10px -10px'
            }}>
            <div className="w-full h-full bg-white border-[6px] border-dashed border-gray-300 p-2 flex items-center justify-center relative overflow-hidden">
              <img src={memory.image} alt={memory.title} className={`${imgClass} opacity-90 group-hover:opacity-100 grayscale-[0.3] group-hover:grayscale-0`} />
              {/* Postmark */}
              <div className="absolute top-2 right-2 opacity-70 rotate-[-15deg] pointer-events-none">
                <div className="w-16 h-16 border-2 border-black/40 rounded-full flex items-center justify-center text-[10px] text-black/40 font-mono text-center leading-tight">
                  VALENTINE<br />POST
                </div>
                <div className="w-20 h-8 border-y-2 border-black/40 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 skew-x-12" />
              </div>
            </div>
          </div>
        </div>
      );

    case 8: // The "Neon Love"
      return (
        <div className="relative group w-full max-w-lg mx-auto aspect-video p-1">
          <div className="absolute inset-0 bg-pink-500 blur-xl opacity-40 group-hover:opacity-60 transition-opacity animate-pulse" />
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-pink-400/80 shadow-[0_0_15px_rgba(244,114,182,0.5)] bg-black">
            <img src={memory.image} alt={memory.title} className={`${imgClass} opacity-80 group-hover:opacity-100 group-hover:scale-105`} />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-pink-900/80 to-transparent" />
          </div>
        </div>
      );

    case 9: // The "Locket" (Heart Shape)
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-square flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-full h-full drop-shadow-2xl"
          >
            <svg viewBox="-5 -5 110 110" className="w-full h-full filter drop-shadow-xl overflow-visible">
              <defs>
                <clipPath id={`heartClip-${index}`}>
                  <path d="M50 90 C 20 70 0 45 0 25 A 25 25 0 0 1 50 25 A 25 25 0 0 1 100 25 C 100 45 80 70 50 90 Z" />
                </clipPath>
              </defs>
              {/* Border/Stroke using a slightly larger path behind or stroke on path */}
              <path d="M50 90 C 20 70 0 45 0 25 A 25 25 0 0 1 50 25 A 25 25 0 0 1 100 25 C 100 45 80 70 50 90 Z"
                fill="white" stroke="#fbcfe8" strokeWidth="3" />
              <image
                href={memory.image}
                width="100"
                height="100"
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#heartClip-${index})`}
                className="transition-opacity duration-500"
              />
            </svg>
          </motion.div>
        </div>
      );

    case 10: // The "Stacked"
      return (
        <div className="relative group w-full max-w-md mx-auto aspect-[4/3] p-6">
          {/* Bottom Stack */}
          <div className="absolute top-6 left-6 w-full h-full bg-gray-200 border-4 border-white shadow-lg rounded-sm transform rotate-6 transition-transform group-hover:rotate-12 group-hover:translate-x-4">
            <img src={memory.image} className="w-full h-full object-cover opacity-50 grayscale" alt="" />
          </div>
          {/* Middle Stack */}
          <div className="absolute top-6 left-6 w-full h-full bg-gray-200 border-4 border-white shadow-lg rounded-sm transform -rotate-3 transition-transform group-hover:-rotate-6 group-hover:-translate-x-4">
            <img src={memory.image} className="w-full h-full object-cover opacity-70 blur-[1px]" alt="" />
          </div>
          {/* Top Main */}
          <div className="relative w-full h-full bg-white border-[6px] border-white shadow-2xl rounded-sm transform transition-transform hover:scale-[1.02]">
            <img src={memory.image} alt={memory.title} className={imgClass} />
          </div>
        </div>
      );

    case 11: // The "Gallery" - Gold Frame
      return (
        <div className="relative group w-full max-w-sm mx-auto aspect-[3/4] p-2">
          <div className="w-full h-full shadow-[0_20px_60px_rgba(0,0,0,0.5)] bg-gradient-to-br from-yellow-700 via-yellow-200 to-yellow-800 p-3 rounded-lg relative overflow-hidden">
            {/* Inner Frame */}
            <div className="w-full h-full bg-black p-1 shadow-inner">
              <div className="w-full h-full border border-white/20 relative">
                <img src={memory.image} alt={memory.title} className={`${imgClass} opacity-90 group-hover:opacity-100`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-50" />
              </div>
            </div>
            {/* Shine on Gold */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent pointer-events-none" />
          </div>
        </div>
      );

    default:
      return null;
  }
};

const Timeline: React.FC<TimelineProps> = ({ currentIndex }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for mouse movement
  const mouseX = useSpring(x, { stiffness: 40, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const xPos = clientX / innerWidth - 0.5;
    const yPos = clientY / innerHeight - 0.5;
    x.set(xPos);
    y.set(yPos);
  };

  // Parallax transforms
  const moveX = useTransform(mouseX, [-0.5, 0.5], [40, -40]);
  const moveY = useTransform(mouseY, [-0.5, 0.5], [40, -40]);

  const moveXReverse = useTransform(mouseX, [-0.5, 0.5], [-30, 30]);
  const moveYReverse = useTransform(mouseY, [-0.5, 0.5], [-30, 30]);

  return (
    <section
      className="h-full w-full flex flex-col items-center justify-center px-4 relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Parallax Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-400/20 rounded-full blur-[100px] pointer-events-none -z-10"
        style={{ x: moveX, y: moveY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/20 rounded-full blur-[80px] pointer-events-none -z-10"
        style={{ x: moveXReverse, y: moveYReverse }}
      />

      <h2 className="absolute top-16 md:top-12 text-3xl md:text-5xl text-white font-bold drop-shadow-md font-serif z-20 w-full text-center">
        Our Journey
      </h2>

      <div className="w-full max-w-6xl relative flex items-center justify-center z-10 mt-0 h-[60vh] md:h-auto">
        {/* Content Container */}
        <div className="w-full overflow-hidden p-8 md:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.95 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex flex-col md:flex-row items-center gap-8 md:gap-16 min-h-[400px]"
            >
              {/* Dynamic Image Frame Section */}
              <div className="w-full md:w-1/2 flex items-center justify-center perspective-1000">
                <FrameVariant index={currentIndex} memory={MEMORIES[currentIndex]} />
              </div>

              {/* Text Content Section */}
              <div className="w-full md:w-1/2 text-left space-y-6 md:pl-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {/* Chapter header removed */}
                  <h3 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight mb-6">
                    {MEMORIES[currentIndex].title}
                  </h3>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/80 text-lg md:text-xl leading-relaxed font-light"
                >
                  {MEMORIES[currentIndex].description}
                </motion.p>

                {/* REMOVED INLINE SCROLL HINT */}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* NEW UNIFIED BOTTOM NAVIGATION */}
      <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex flex-col items-center justify-center gap-3 z-30 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-white/60"
        >
          <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-medium">Scroll to continue</span>
          <ChevronDown className="w-3 h-3 md:w-4 md:h-4 animate-bounce" />
        </motion.div>

        <div className="flex gap-3">
          {MEMORIES.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-white scale-125 shadow-[0_0_8px_white]' : 'bg-white/30 hover:bg-white/50'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
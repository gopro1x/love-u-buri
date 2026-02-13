import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { REASONS } from '../constants';
import { ChevronDown } from 'lucide-react';
import { soundManager } from '../utils/sound';

const LoveCards: React.FC = () => {
  return (
    <section className="h-full w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto flex flex-col h-full justify-center py-4 md:py-10">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl text-white text-center mb-6 md:mb-12 font-bold drop-shadow-md font-serif shrink-0"
        >
          Why I Love You
        </motion.h2>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 w-full px-2 md:px-0 shrink-0">
          {REASONS.map((reason, index) => (
            <motion.div
              key={reason.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="aspect-[3/4] md:aspect-auto"
            >
              <FlipCard reason={reason} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 md:mt-12 flex justify-center shrink-0 w-full"
        >
           <div className="flex flex-col items-center gap-2 text-white/50 animate-pulse">
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll Down</span>
            <ChevronDown className="w-5 h-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

interface FlipCardProps {
  reason: typeof REASONS[0];
}

const FlipCard: React.FC<FlipCardProps> = ({ reason }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFlip = () => {
    if (!isAnimating) {
      soundManager.playCardFlip();
      setIsFlipped(!isFlipped);
      setIsAnimating(true);
    }
  };

  return (
    <div
      className="h-full min-h-[160px] md:h-80 w-full cursor-pointer perspective-1000 group"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full text-center transition-all duration-500 preserve-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        whileHover={{ scale: isFlipped ? 1 : 1.02 }}
        onAnimationComplete={() => setIsAnimating(false)}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden">
          <div className="h-full w-full bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/30 shadow-xl flex flex-col items-center justify-center p-3 md:p-6 transition-all duration-300 group-hover:bg-white/20 group-hover:border-white/50 group-hover:shadow-pink-500/20">
            <div className="text-4xl md:text-6xl mb-2 md:mb-6 filter drop-shadow-lg">
              {reason.icon}
            </div>
            <h3 className="text-lg md:text-2xl text-white font-serif font-bold tracking-wide">
              {reason.title}
            </h3>
            <div className="mt-2 md:mt-8 px-3 py-1 md:py-2 border border-white/30 rounded-full text-white/80 text-[8px] md:text-xs uppercase tracking-widest group-hover:bg-white group-hover:text-pink-600 transition-colors">
              Tap
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="h-full w-full bg-gradient-to-br from-white via-pink-50 to-white backdrop-blur-xl rounded-xl md:rounded-2xl border border-white/50 shadow-2xl flex flex-col items-center justify-center p-4 md:p-6">
            <h3 className="text-sm md:text-xl text-pink-600 font-bold mb-2 md:mb-4 font-serif border-b-2 border-pink-200 pb-2">
              {reason.title}
            </h3>
            <p className="text-gray-600 font-medium leading-relaxed text-xs md:text-base overflow-y-auto max-h-full">
              "{reason.content}"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoveCards;
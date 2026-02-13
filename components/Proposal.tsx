import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Coordinates } from '../types';
import { soundManager } from '../utils/sound';

interface ProposalProps {
  onAccept: () => void;
}

const Proposal: React.FC<ProposalProps> = ({ onAccept }) => {
  const [noBtnPosition, setNoBtnPosition] = useState<Coordinates>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAcceptClick = () => {
    // Play sound
    soundManager.playSuccess();

    // Fire confetti burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FF1493', '#ffffff']
    });
    
    // Call parent handler
    onAccept();
  };

  const moveButton = () => {
    if (!containerRef.current) return;
    
    // Get container dimensions to keep button inside or at least relatively close
    // We restrict movement a bit more to prevent it from going off-screen easily
    const maxMove = 150; 
    
    const randomX = (Math.random() - 0.5) * maxMove * 2;
    const randomY = (Math.random() - 0.5) * maxMove * 2;

    setNoBtnPosition({ x: randomX, y: randomY });
    setIsHovered(true);
  };

  return (
    <section className="h-full w-full flex flex-col items-center justify-center px-4 relative overflow-hidden">
      
      <div 
        ref={containerRef}
        className="w-full max-w-3xl bg-white/10 backdrop-blur-2xl rounded-[3rem] p-8 md:p-12 text-center border border-white/30 shadow-[0_0_50px_rgba(0,0,0,0.1)] relative"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="mb-8 inline-block relative"
        >
           <Heart className="w-24 h-24 md:w-28 md:h-28 text-red-500 fill-red-500 drop-shadow-2xl" strokeWidth={1.5} />
           <motion.div 
             className="absolute -top-6 -right-6"
             animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
             transition={{ duration: 2, repeat: Infinity }}
           >
             <Heart className="w-8 h-8 md:w-10 md:h-10 text-pink-300 fill-pink-300 drop-shadow-lg" />
           </motion.div>
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg font-serif leading-tight">
          Will you be my Valentine?
        </h2>
        
        <p className="text-white/90 text-lg md:text-xl mb-10 italic font-light">
          There's no one else I'd rather share this day with.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative min-h-[160px]">
            {/* Yes Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAcceptClick}
              className="group relative px-12 md:px-16 py-4 md:py-5 bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xl md:text-2xl font-bold rounded-full shadow-xl hover:shadow-pink-500/50 transition-all z-20 border border-white/30 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                YES! <Heart className="w-6 h-6 fill-white" />
              </span>
              {/* Shine effect */}
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 hover-shine" />
            </motion.button>

            {/* No Button - Runaway */}
            <motion.button
              onMouseEnter={moveButton}
              onTouchStart={moveButton}
              onClick={moveButton}
              animate={isHovered ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="px-10 md:px-14 py-4 md:py-5 bg-white/5 text-white/80 text-lg md:text-xl font-medium rounded-full border border-white/20 backdrop-blur-sm hover:bg-white/10 transition-colors z-10"
            >
              No
            </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Proposal;
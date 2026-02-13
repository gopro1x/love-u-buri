import React, { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Heart } from 'lucide-react';

// Import video assets so Vite resolves their paths correctly
import videoSrc from '../videos/our-video.mp4';
import posterSrc from '../videos/our-video-cover.jpg';

interface CelebrationProps {
  onReplay: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ onReplay }) => {
  const [windowSize, setWindowSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);

    // Stop confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  // Staggered entrance
  const stagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.4 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 w-full h-full"
      style={{
        background: 'linear-gradient(160deg, #1a0a2e 0%, #2d1150 40%, #4a1a6b 70%, #2d1150 100%)',
      }}
    >
      {/* Backdrop blur overlay */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

      {/* Confetti — 3 second burst */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          gravity={0.25}
          recycle={false}
          colors={['#f472b6', '#a855f7', '#e879f9', '#fbbf24', '#fb7185', '#c084fc', '#f9a8d4']}
        />
      )}

      {/* Card */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-md rounded-[2rem] p-8 md:p-10 flex flex-col items-center text-center overflow-hidden"
        style={{
          background: 'rgba(255, 255, 255, 0.07)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 0 80px rgba(168, 85, 247, 0.1), 0 0 30px rgba(255, 255, 255, 0.03), inset 0 0 60px rgba(168, 85, 247, 0.04)',
        }}
      >
        {/* Luminous border glow */}
        <div
          className="absolute inset-0 rounded-[2rem] pointer-events-none"
          style={{
            border: '1px solid rgba(168, 85, 247, 0.18)',
            boxShadow: '0 0 25px rgba(168, 85, 247, 0.08)',
          }}
        />

        {/* Pulsing heart */}
        <motion.div variants={fadeUp} className="mb-5 relative">
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={40} fill="currentColor" className="text-pink-400 drop-shadow-lg" />
          </motion.div>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ scale: [1, 1.8, 1], opacity: [0, 0.2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Heart size={40} fill="rgba(244, 114, 182, 0.4)" className="blur-lg" strokeWidth={0} />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-2 font-serif"
          style={{
            background: 'linear-gradient(135deg, #f9a8d4, #e879f9, #c084fc)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          You Said Yes!
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-sm md:text-base font-light italic mb-6 leading-relaxed"
          style={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: '300px' }}
        >
          This is just the beginning of our forever together.
        </motion.p>

        {/* Video Player — Portrait */}
        <motion.div variants={fadeUp} className="w-full max-w-[260px] mx-auto mb-6">
          <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 bg-black">
            <div className="relative aspect-[9/16]">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover"
                src={videoSrc}
                poster={posterSrc}
                playsInline
                muted={isMuted}
                loop
                preload="metadata"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Play overlay */}
              {!isPlaying && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={handlePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer z-10"
                  aria-label="Play video"
                >
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-6 h-6 text-pink-500 ml-0.5" fill="currentColor" />
                  </motion.div>
                </motion.button>
              )}

              {/* Mute toggle */}
              {isPlaying && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-2 right-2 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/70 transition-colors"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? (
                    <VolumeX className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-white" />
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Replay */}
        <motion.button
          variants={fadeUp}
          onClick={onReplay}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xs tracking-[0.15em] uppercase cursor-pointer transition-colors"
          style={{ color: 'rgba(244, 186, 237, 0.5)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(244, 186, 237, 0.85)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(244, 186, 237, 0.5)')}
        >
          Replay Proposal
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Celebration;
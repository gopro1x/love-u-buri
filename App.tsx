import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import LoveCards from './components/LoveCards';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import { MEMORIES } from './constants';
import { soundManager } from './utils/sound';

enum Step {
  HERO = 0,
  TIMELINE = 1,
  LOVE_CARDS = 2,
  PROPOSAL = 3,
  CELEBRATION = 4,
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.HERO);
  const [timelineIndex, setTimelineIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(soundManager.getMuted());

  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);

  // Auto-initialize audio on first user interaction
  useEffect(() => {
    const unlockAudio = () => {
      soundManager.ensureInitialized();
      // Remove listeners after first interaction
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);
    window.addEventListener('keydown', unlockAudio);

    return () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };
  }, []);

  // Toggle Sound
  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking mute
    const muted = soundManager.toggleMute();
    setIsMuted(muted);
    // Also try to init if not already done
    soundManager.ensureInitialized();
  };

  // Safe navigation function
  const navigate = useCallback((newDir: number) => {
    if (isTransitioning.current) return;

    // Trigger audio init if it hasn't happened yet
    soundManager.ensureInitialized();

    // SPECIAL LOGIC: Handle Timeline Internal Navigation
    if (currentStep === Step.TIMELINE) {
      if (newDir > 0) {
        // Scrolling Down
        if (timelineIndex < MEMORIES.length - 1) {
          setTimelineIndex((prev) => Math.min(prev + 1, MEMORIES.length - 1));
          isTransitioning.current = true;
          soundManager.playTransition();
          setTimeout(() => { isTransitioning.current = false; }, 800);
          return;
        }
      } else {
        // Scrolling Up
        if (timelineIndex > 0) {
          setTimelineIndex((prev) => Math.max(prev - 1, 0));
          isTransitioning.current = true;
          soundManager.playTransition();
          setTimeout(() => { isTransitioning.current = false; }, 800);
          return;
        }
      }
    }

    // Normal Section Navigation
    const nextStep = currentStep + newDir;

    // Bounds check
    if (nextStep < Step.HERO || nextStep > Step.PROPOSAL || currentStep === Step.CELEBRATION) {
      return;
    }

    // Handle entering Timeline from bottom or top
    if (nextStep === Step.TIMELINE) {
      if (newDir < 0) {
        setTimelineIndex(MEMORIES.length - 1);
      } else {
        setTimelineIndex(0);
      }
    }

    setDirection(newDir);
    setCurrentStep(nextStep);
    isTransitioning.current = true;
    soundManager.playTransition();
    setTimeout(() => { isTransitioning.current = false; }, 1000);
  }, [currentStep, timelineIndex]);

  // Handle Global Scroll (Wheel)
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      const dir = e.deltaY > 0 ? 1 : -1;
      navigate(dir);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY.current - touchEndY;

      if (Math.abs(deltaY) > 50) {
        const dir = deltaY > 0 ? 1 : -1;
        navigate(dir);
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  const handleReplay = () => {
    setDirection(-1);
    setCurrentStep(Step.HERO);
    setTimelineIndex(0);
    soundManager.playTransition();
  };

  const handleAccept = () => {
    setDirection(1);
    setCurrentStep(Step.CELEBRATION);
  };

  const variants = {
    initial: (dir: number) => ({
      y: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      zIndex: 10
    }),
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      zIndex: 10,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
    exit: (dir: number) => ({
      y: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      filter: "blur(10px)",
      zIndex: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <div className="h-screen w-screen relative overflow-hidden selection:bg-pink-300 selection:text-pink-900 flex items-center justify-center font-sans">

      {/* Backgrounds */}
      <div className="fixed inset-0 animate-gradient bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 -z-20" />
      <div
        className="fixed inset-0 pointer-events-none opacity-20 mix-blend-overlay -z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
        }}
      />

      {/* Main App Content */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative z-10 w-full h-full"
      >
        {/* Sound Control */}
        <button
          onClick={toggleSound}
          className="fixed top-4 right-4 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all hover:scale-110 shadow-lg cursor-pointer border border-white/10"
          aria-label="Toggle Sound"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          {currentStep === Step.HERO && (
            <motion.div key="hero" custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full flex items-center justify-center">
              <Hero onNext={() => navigate(1)} />
            </motion.div>
          )}

          {currentStep === Step.TIMELINE && (
            <motion.div key="timeline" custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full flex items-center justify-center">
              <Timeline currentIndex={timelineIndex} />
            </motion.div>
          )}

          {currentStep === Step.LOVE_CARDS && (
            <motion.div key="cards" custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full flex items-center justify-center">
              <LoveCards />
            </motion.div>
          )}

          {currentStep === Step.PROPOSAL && (
            <motion.div key="proposal" custom={direction} variants={variants} initial="initial" animate="animate" exit="exit" className="absolute inset-0 w-full h-full flex items-center justify-center">
              <Proposal onAccept={handleAccept} />
            </motion.div>
          )}

          {currentStep === Step.CELEBRATION && (
            <Celebration key="celebration" onReplay={handleReplay} />
          )}
        </AnimatePresence>
      </motion.main>
    </div>
  );
};

export default App;
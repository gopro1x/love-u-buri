import { Memory, LoveReason } from './types';

// Using absolute paths for images. 
// This assumes the 'images' folder is at the root of your project/web server.
const memory1 = "/images/memory1.png";
const memory2 = "/images/memory2.png";
const memory3 = "/images/memory3.png";
const memory4 = "/images/memory4.png";
const memory5 = "/images/memory5.png";
const memory6 = "/images/memory6.png";
const memory7 = "/images/memory7.png";
const memory8 = "/images/memory8.png";
const memory9 = "/images/memory9.png";
const memory10 = "/images/memory10.png";
const memory11 = "/images/memory11.png";
const memory12 = "/images/memory12.png";

export const PARTNER_NAME = "My Love"; // Change this to the partner's name

export const MEMORIES: Memory[] = [
  {
    id: 1,
    title: "A Gentle Kiss",
    description: "You held my hand like a promise. In that small café light, the world softened. I chose you again.",
    image: memory1,
  },
  {
    id: 2,
    title: "Held in Light",
    description: "Sunlight traces your face. You lean in, and everything feels certain.",
    image: memory2,
  },
  {
    id: 3,
    title: "Quiet Shelter",
    description: "You rest against me, soft and certain. The world fades to the space our hands hold.",
    image: memory3,
  },
  {
    id: 4,
    title: "Still With You",
    description: "Your arm finds me without asking. The room fades into warm wood and soft laughter.",
    image: memory4,
  },
  {
    id: 5,
    title: "First Film, Us",
    description: "Our first movie, side by side. The screen flickered, but I only remember your weight on my shoulder.",
    image: memory5,
  },
  {
    id: 6,
    title: "Through One Lens",
    description: "Your smile leans into mine. Even in close focus, it is only us.",
    image: memory6,
  },
  {
    id: 7,
    title: "Still With You",
    description: "Your head rests against mine, and the world softens. In this small frame, everything feels enough.",
    image: memory7,
  },
  {
    id: 8,
    title: "Red, Remembered",
    description: "Your red dress glows in the hush. I sit close, memorizing the light.",
    image: memory8,
  },
  {
    id: 9,
    title: "Between Reflections",
    description: "In the quiet glow of the fitting room, you stand close, steady and sure. The mirror keeps our secret.",
    image: memory9,
  },
  {
    id: 10,
    title: "Simple Together",
    description: "Your hand on my shoulder feels like home. In this quiet light, we belong to each other.",
    image: memory10,
  },
  {
    id: 11,
    title: "Between Us",
    description: "We hid behind the lens, but not from each other. Your arms said everything.",
    image: memory11,
  },
  {
    id: 12,
    title: "Only This Moment",
    description: "Your hand found mine without asking. The world softened. I stayed.",
    image: memory12,
  },
];

export const REASONS: LoveReason[] = [
  {
    id: 1,
    title: "My Addiction",
    content: "You have this way of pulling me closer without even trying. And once I’m in your arms, I never want to behave.",
    icon: "❤️",
  },
  {
    id: 2,
    title: "Your Laughter",
    content: "It is the most beautiful sound in the world. It lights up the darkest rooms and makes my heart skip a beat.",
    icon: "✨",
  },
  {
    id: 3,
    title: "Your Strength",
    content: "You handle life's challenges with such grace. I am constantly in awe of your resilience and power.",
    icon: "💪",
  },
  {
    id: 4,
    title: "Us",
    content: "I love who I am when I'm with you. We make the perfect team, and I can't imagine life without you.",
    icon: "🔐",
  },
];
export interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
}

export interface LoveReason {
  id: number;
  title: string;
  content: string;
  icon: string; // Emoji or Lucide icon name placeholder
}

export interface Coordinates {
  x: number;
  y: number;
}
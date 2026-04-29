interface MascotProps {
  mood?: 'happy' | 'thinking' | 'sad' | 'celebrating';
  size?: 'sm' | 'md' | 'lg';
}

const moodEmoji = {
  happy: '👨‍🍳',
  thinking: '🤔',
  sad: '😕',
  celebrating: '🎉',
};

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-4xl',
  lg: 'text-6xl',
};

export function Mascot({ mood = 'happy', size = 'md' }: MascotProps) {
  return <div className={sizeClasses[size]}>{moodEmoji[mood]}</div>;
}

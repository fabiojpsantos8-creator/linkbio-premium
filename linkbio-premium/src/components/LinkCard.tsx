import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LinkItem, IndividualColors } from '../types/bio';

interface Props {
  link: LinkItem;
  globalColors: IndividualColors;
  onTrackClick: (id: string) => void;
}

export const LinkCard: React.FC<Props> = ({ link, globalColors, onTrackClick }) => {
  const colors = { ...globalColors, ...link.customColors };
  const IconComponent = (Icons as any)[link.iconName] || Icons.Link;

  // Mapeamento dinâmico de classes de animação sem quebrar a GPU
  const getAnimationClass = () => {
    switch (link.animation) {
      case 'neon-pulse': return 'anim-neon-pulse';
      case 'border-glow': return 'anim-border-glow';
      case 'float': return 'anim-float';
      case 'shine': return 'shine-effect';
      default: return '';
    }
  };

  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => onTrackClick(link.id)}
      whileHover={{ scale: 1.015, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative w-full flex items-center justify-between p-4 min-h-[56px] rounded-2xl glass-card cursor-pointer transition-all duration-300 ${getAnimationClass()}`}
      style={{
        backgroundColor: colors.buttonBg,
        borderColor: colors.cardBorder,
        color: colors.buttonText,
        '--neon-color': colors.neonAccent,
        '--border-color-start': colors.neonAccent,
        '--border-color-end': colors.cardBorder,
      } as React.CSSProperties}
    >
      <div className="flex items-center gap-3 z-10">
        <div
          className="p-2 rounded-xl transition-colors duration-300"
          style={{ color: colors.icons, backgroundColor: 'rgba(255,255,255,0.05)' }}
        >
          <IconComponent size={22} />
        </div>
        <span className="font-medium text-base sm:text-lg tracking-wide">
          {link.title}
        </span>
      </div>

      <div className="flex items-center gap-3 z-10">
        {link.price && (
          <span
            className="text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full shadow-sm"
            style={{
              backgroundColor: colors.priceBadgeBg,
              color: colors.priceBadgeText,
            }}
          >
            {link.price}
          </span>
        )}
        <Icons.ChevronRight
          size={18}
          className="opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all"
          style={{ color: colors.buttonText }}
        />
      </div>
    </motion.a>
  );
};
import React from 'react';
import { BackgroundSettings } from '../types/bio';

interface Props {
  settings: BackgroundSettings;
}

export const BackgroundEngine: React.FC<Props> = ({ settings }) => {
  if (settings.type === 'gradient') {
    const { colorStart, colorEnd, direction, opacity } = settings.gradient;
    return (
      <div
        className="absolute inset-0 transition-all duration-500 ease-out pointer-events-none"
        style={{
          background: `linear-gradient(${direction}, ${colorStart}, ${colorEnd})`,
          opacity: opacity,
        }}
      />
    );
  }

  if (settings.type === 'image') {
    const { url, zoom, position, overlayDarkness, blur } = settings.image;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-cover transition-all duration-300"
          style={{
            backgroundImage: `url(${url})`,
            backgroundPosition: position,
            transform: `scale(${zoom / 100})`,
            filter: `blur(${blur}px)`,
          }}
        />
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayDarkness }}
        />
      </div>
    );
  }

  if (settings.type === 'video') {
    const { url, overlayDarkness, blur } = settings.video;
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-all duration-300"
          style={{ filter: `blur(${blur}px)` }}
        >
          <source src={url} type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-black transition-opacity duration-300"
          style={{ opacity: overlayDarkness }}
        />
      </div>
    );
  }

  return null;
};

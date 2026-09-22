import React from 'react';

interface TinAwLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const TinAwLogo: React.FC<TinAwLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
}) => {
  const heightClass = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10',
  }[size];

  if (!showText) {
    // Pure Droplet Icon cropped to droplet geometry
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="16 9 22 33"
        fill="none"
        className={`w-auto shrink-0 ${heightClass} ${className}`}
      >
        {/* Outer Water Droplet */}
        <path
          d="M27 10C27 10 17 24 17 31C17 36.5228 21.4772 41 27 41C32.5228 41 37 36.5228 37 31C37 24 27 10 27 10Z"
          fill="#0284C7"
        />

        {/* Inner Highlight Layer */}
        <path
          d="M24 28C24 24 27 19 27 19C27 19 30 24 30 28C30 29.6569 28.6569 31 27 31C25.3431 31 24 29.6569 24 28Z"
          fill="#7DD3FC"
        />

        {/* Reflection Dot */}
        <circle cx="31" cy="22" r="3" fill="#38BDF8" opacity="0.8" />
      </svg>
    );
  }

  // Exact Clean Vector SVG Source specified for TinAw Logo
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 48"
      fill="none"
      className={`w-auto shrink-0 select-none ${heightClass} ${className}`}
    >
      {/* Outer Water Droplet */}
      <path
        d="M27 10C27 10 17 24 17 31C17 36.5228 21.4772 41 27 41C32.5228 41 37 36.5228 37 31C37 24 27 10 27 10Z"
        fill="#0284C7"
      />

      {/* Inner Highlight Layer */}
      <path
        d="M24 28C24 24 27 19 27 19C27 19 30 24 30 28C30 29.6569 28.6569 31 27 31C25.3431 31 24 29.6569 24 28Z"
        fill="#7DD3FC"
      />

      {/* Reflection Dot */}
      <circle cx="31" cy="22" r="3" fill="#38BDF8" opacity="0.8" />

      {/* Wordmark */}
      <text
        x="41"
        y="32"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="#0C2340"
        letterSpacing="-0.5"
      >
        Tin<tspan fill="#0284C7">Aw</tspan>
      </text>
    </svg>
  );
};

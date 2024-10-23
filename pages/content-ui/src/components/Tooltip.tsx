import React, { ReactNode, useState, useRef, useEffect } from 'react';

interface TooltipProps {
  content: string;
  children: ReactNode;
  delay?: number;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, delay = 1000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => setIsVisible(true), delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-sm tooltip dark:bg-gray-700 w-max">
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;

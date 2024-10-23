import React from "react";
import { AguapaneIAIcon, OptionsIcon } from "./Icons";
import Tooltip from "./Tooltip";

interface AguapaneIAButtonProps {
  onClick: () => void;
  position: {
    top: number;
    left: number;
  };
  onOptionsClick: () => void;
}

const AguapaneIAButton: React.FC<AguapaneIAButtonProps> = ({
  onClick,
  onOptionsClick,
  position,
}) => {
  const buttonStyles = "px-2 py-1 text-sm font-medium rounded-full bg-white text-red-600 shadow-lg hover:bg-gray-100 hover:shadow-xl transition-all duration-300 flex items-center space-x-2 border border-red-200";

  const iconColor = "text-red-600";

  return (
    <div
      className="rounded-full"
      style={{
        position: "absolute",
        top: `${position.top + 10}px`,
        left: `${position.left}px`,
        zIndex: 9999,
      }}
    >
      <div className={buttonStyles}>
        <Tooltip content="Aplicar AguapaneIA">
          <span
            className={`transition-transform duration-300 hover:scale-125 ${iconColor}`}
          >
            <div className="w-6 h-6 cursor-pointer" onClick={onClick}>
              <AguapaneIAIcon />
            </div>
          </span>
        </Tooltip>
        <span className={`mx-1 ${iconColor}`}>|</span>
        <Tooltip content="Opciones">
          <span
            className={`transition-transform duration-300 hover:scale-125 ${iconColor}`}
          >
            <div className="w-6 h-6 cursor-pointer" onClick={onOptionsClick}>
              <OptionsIcon />
            </div>
          </span>
        </Tooltip>
      </div>
    </div>
  );
};

export default AguapaneIAButton;

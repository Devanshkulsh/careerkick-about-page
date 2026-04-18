/**
 * Gradient text component with subtle animated color flow using Framer Motion.
 */
import { motion } from "framer-motion";
import { memo } from "react";

const GRADIENT_ANIMATION_DURATION = 8;
const GRADIENT_SIZE = "220% 220%";

export interface GradientTextProps {
  text: string;
  className?: string;
}

function GradientTextComponent({ text, className }: GradientTextProps) {
  return (
    <motion.span
      className={className}
      style={{
        backgroundImage:
          "linear-gradient(120deg, #c8f025 0%, #ffffff 35%, #a8d816 70%, #c8f025 100%)",
        backgroundSize: GRADIENT_SIZE,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      transition={{
        duration: GRADIENT_ANIMATION_DURATION,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
    >
      {text}
    </motion.span>
  );
}

export const GradientText = memo(GradientTextComponent);

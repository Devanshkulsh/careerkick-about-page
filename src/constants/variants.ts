/**
 * Shared Framer Motion variants for About page sections and cards.
 */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] as const },
  },
}

export const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export const slideFromLeftVariants = {
  hidden: { opacity: 0, x: -64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}

export const slideFromRightVariants = {
  hidden: { opacity: 0, x: 64 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const } },
}





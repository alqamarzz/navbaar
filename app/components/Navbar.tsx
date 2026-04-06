"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring } from "motion/react";

interface NavbarProps {
  items?: string[];
}

const Navbar = ({ items = ["Home", "Courses", "Store", "Contact"] }: NavbarProps) => {
  const rawY = useSpring(-30, {
    stiffness: 300,
    damping: 25,
    mass: 0.8,
  });

  const [Hoveractive, setHoveractive] = useState(items[0] ?? "Home");
  const [Clickactive, setClickactive] = useState(items[0] ?? "Home");

  useEffect(() => {
    rawY.set(0);
  }, [rawY]);

  return (
    <motion.div
      style={{ y: rawY }}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="mx-auto w-fit rounded-full border border-neutral-700/80 bg-neutral-900/60 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.18)] backdrop-blur-xl"
    >
      <div className="flex items-center gap-1">
        {items.map((item, idx) => (
          <motion.button
            key={item}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.05, duration: 0.3 }}
            onMouseEnter={() => setHoveractive(item)}
            onMouseLeave={() => setHoveractive(Clickactive)}
            onClick={() => setClickactive(item)}
            className={`text-md relative cursor-pointer rounded-full px-4 py-2 font-sans transition-colors ${
              Clickactive === item ? "text-black" : "text-white"
            }`}
          >
            {Hoveractive === item && (
              <motion.div
                layoutId="nav-bubble"
                className="absolute inset-0 rounded-full bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 35,
                }}
              />
            )}
            {Clickactive === item && (
              <motion.div
                layoutId="nav-bubble1"
                className="absolute inset-0 rounded-full bg-white shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.5)]"
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Navbar;

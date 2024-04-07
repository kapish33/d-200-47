"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const CustomModal = ({
  loading,
  duration = 2000,
  loop = true,
  children,
}: {
  loading?: boolean;
  duration?: number;
  loop?: boolean;
  children: React.ReactNode;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
  }, [currentState, loading, loop, duration]);
  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center backdrop-blur-2xl"
        >
          <div className="h-96 relative">{children}</div>

          {/* <div className="bg-gradient-to-t inset-x-0 z-20 bottom-0 bg-white dark:bg-black h-full absolute [mask-image:radial-gradient(900px_at_center,transparent_30%,white)]" /> */}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

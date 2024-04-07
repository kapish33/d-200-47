'use client';
import React, { useState, useEffect } from 'react';
import { IconSquareRoundedX } from '@tabler/icons-react';
import { CustomModal } from '@/components/ui/custum-modal';
import { SignupForm } from '../SignUp';


export function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [loaderCanceled, setLoaderCanceled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!loaderCanceled) {
        setLoading(true);
      }
    }, 60000); // 1 minute delay

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > lastScrollY ? 'down' : 'up');
      setLastScrollY(currentScrollY);

      if (scrollDirection === 'up' && !loaderCanceled) {
        setLoading(true);
        // Remove the scroll event listener once the loader is triggered
        window.removeEventListener('scroll', handleScroll);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, [lastScrollY, scrollDirection, loaderCanceled]);

  return (
    <div className=''>
      {/* Core Loader Modal */}
      <CustomModal loading={loading}>
        <SignupForm />
      </CustomModal>

      {/* The button for manual loading */}
      {/* <button
        onClick={() => {
          setLoading(true);
          setLoaderCanceled(false); // Reset loader cancelation status
        }}
        className="bg-[#39C3EF] hover:bg-[#39C3EF]/90 text-black mx-auto text-sm md:text-base transition font-medium duration-200 h-10 rounded-lg px-8 flex items-center justify-center"
        style={{
          boxShadow:
            "0px -1px 0px 0px #ffffff40 inset, 0px 1px 0px 0px #ffffff40 inset",
        }}
      >
        Click to load
      </button> */}

      {loading && (
        <button
          className='fixed top-4 right-4 text-black dark:text-white z-[120]'
          onClick={() => {
            setLoading(false);
            setLoaderCanceled(true); // Mark loader as canceled
          }}>
          <IconSquareRoundedX className='h-10 w-10' />
        </button>
      )}
    </div>
  );
}

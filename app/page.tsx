import { PinContainer } from '@/components/ui/3d-pin';
import { Button } from '@/components/ui/button';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import { StickyScroll } from '@/components/ui/sticky-scroll-reveal';
import { firebaseConfig } from '@/firebase/config';
import { content, testimonials } from '@/lib/dummyconst';
import Image from 'next/image';

export default function Home() {
  const test = firebaseConfig;
  // console.log("first",test);
  return (
    <main>
      <div className='flex min-h-screen flex-col items-center justify-between p-24'>
        <Button>Click me</Button>
        <div className='h-[40rem] w-full flex items-center justify-center '>
          {JSON.stringify(test)}
          <PinContainer
            title='/ui.aceternity.com'
            href='https://twitter.com/mannupaaji'>
            <div className='flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] '>
              <h3 className='max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100'>
                Aceternity UI
              </h3>
              <div className='text-base !m-0 !p-0 font-normal'>
                <span className='text-slate-500 '>
                  Customizable Tailwind CSS and Framer Motion Components.
                </span>
              </div>
              <div className='flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500' />
            </div>
          </PinContainer>
        </div>
      </div>
      <div className='h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden'>
        <InfiniteMovingCards
          items={testimonials}
          direction='right'
          speed='slow'
        />
      </div>
      {/* <StickyScroll content={content} /> */}
    </main>
  );
}

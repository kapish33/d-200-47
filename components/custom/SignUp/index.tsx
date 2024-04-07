'use client';
import React from 'react';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useForm } from 'react-hook-form';

export function SignupForm() {
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log('Form submitted');
  // };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log(data);
  // console.log(errors);

  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Hold On!
      </h2>
      <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
        {`Don't leave without a smile

Talk to our experts and learn more about Sudarshan Kriya`}
      </p>

      <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          <LabelInputContainer>
            <Label htmlFor='firstname'>First name</Label>
            <Input
              {...register('Name', { required: true })}
              id='firstname'
              placeholder='Tyler'
              type='text'
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor='lastname'>WhatsApp Number</Label>
            <Input
              {...register('Email', { required: true, pattern: /^\S+@\S+$/i })}
              id='lastname'
              placeholder='Durden'
              type='text'
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            {...register('Mobile number', {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
            id='email'
            placeholder='projectmayhem@fc.com'
            type='email'
          />
        </LabelInputContainer>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

        <div className='flex flex-col space-y-4'>
          <button
            className=' relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
            {/* <IconForms className="h-4 w-4 text-neutral-800 dark:text-neutral-300" /> */}
            <span className='text-neutral-700 dark:text-neutral-300 text-sm mx-auto'>
              Submit Details
            </span>
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};

import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import * as yup from 'yup';
import { toast } from 'sonner';
import { crudOperations } from '@/firebase/firestore-db/crud';

const schema = yup.object().shape({
  firstname: yup.string().required(),
  whatsapp: yup.string().required(),
  email: yup.string().required().email(),
});

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      // Make the asynchronous request
      await crudOperations('POST', 'formdata', data);

      // Display a success toast notification
      toast('We have received your details', {
        description: 'We will connect with you soon',
        // Optionally, you can include an action button in the toast
        // action: {
        //   label: 'Undo',
        //   onClick: () => console.log('Undo'),
        // },
      });

      // Log the form data to the console
      console.log(data);
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error submitting form:', error);
      // Display an error toast notification
      toast.error(
        'There was an error submitting the form. Please try again later.'
      );
    }
  };

  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
        Hold On!
      </h2>
      <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
        {
          "Don't leave without a smile. Talk to our experts and learn more about Sudarshan Kriya"
        }
      </p>

      <form className='my-8' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          <LabelInputContainer>
            <Label htmlFor='firstname'>First name</Label>
            <Input
              id='firstname'
              placeholder='Tyler'
              type='text'
              {...register('firstname')}
            />
            <div className='text-xs text-red-400 capitalize'>
              {errors.firstname?.message}
            </div>
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor='whatsapp'>WhatsApp Number</Label>
            <Input
              id='whatsapp'
              placeholder='Durden'
              type='text'
              {...register('whatsapp')}
            />
            <div className='text-xs text-red-400 capitalize'>
              {errors.whatsapp?.message}
            </div>
          </LabelInputContainer>
        </div>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            id='email'
            placeholder='projectmayhem@fc.com'
            type='email'
            {...register('email')}
          />
          <div className='text-xs text-red-400 capitalize'>
            {errors.email?.message}
          </div>
        </LabelInputContainer>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

        <div className='flex flex-col space-y-4'>
          <button
            className='relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
            type='submit'>
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

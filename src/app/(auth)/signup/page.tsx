import React from 'react';

import SignUpForm from '@/app/components/auth/SignUpForm';

export default async function page() {
  return (
    <div className='flex items-center justify-center h-screen'>
      <SignUpForm />
    </div>
  );
}

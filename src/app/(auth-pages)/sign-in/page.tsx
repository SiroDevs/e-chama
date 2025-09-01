import { redirect } from 'next/navigation';
import React from 'react';

import SignInForm from '@/components/auth/SignInForm';

import { readUserSession } from '@/app/(protected-page)/actions';

export default async function page() {
  const { data: userSession } = await readUserSession();

  if (userSession.session) {
    return redirect('/dashboard');
  }

  return (
    <div className='flex items-center justify-center h-screen'>
      <SignInForm />
    </div>
  );
}

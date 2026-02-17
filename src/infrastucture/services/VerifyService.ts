"use server";

import { supabase } from "@/lib/supabase/client";

export async function resendVerificationEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: process.env.NODE_ENV === 'production' 
          ? 'https://echama.vercel.app/verify'
          : 'http://localhost:3000/verify'
      }
    });

    if (error) {
      console.error('🔐 Resend verification failed:', error);
      return { success: false, error: 'Failed to send verification email' };
    }

    console.info('🔐 Verification email resent to:', email);
    return { success: true };
  } catch (err) {
    console.error('🔐 Resend verification error:', err);
    return { success: false, error: 'Failed to send verification email' };
  }
}

export async function verifyToken(token: string) {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "signup",
    })

    if (error) {
      console.error('Verification error:', error)
      return { data: null, error }
    }

    return { data, error: null }
  } catch (err) {
    console.error('Unexpected verification error:', err)
    return {
      data: null,
      error: {
        message: 'An unexpected error occurred during verification',
        name: 'UnexpectedError'
      }
    }
  }
}

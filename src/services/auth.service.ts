import { createClient } from '@supabase/supabase-js';
import type { SignUpRequest, LoginRequest } from '../validations/auth.validation.js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function signUp(data: SignUpRequest) {
  const { email, password, name } = data;

  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { name },
  });

  if (authError) {
    throw new Error(`Sign up failed: ${authError.message}`);
  }

  return { user: authData.user };
}

export async function login(data: LoginRequest) {
  const { email, password } = data;

  const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (sessionError) {
    throw new Error(`Login failed: ${sessionError.message}`);
  }

  return {
    user: sessionData.user,
    session: sessionData.session,
    accessToken: sessionData.session?.access_token,
  };
}

export async function verifyToken(token: string) {
  const { data, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error(`Token verification failed: ${error.message}`);
  }

  return { user: data.user };
}

export async function logout(userId: string) {
  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    throw new Error(`Logout failed: ${error.message}`);
  }

  return { success: true };
}

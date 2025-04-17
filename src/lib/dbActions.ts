'use server';

import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

// Change Password Input type
export type ChangePasswordInput = {
  email: string;
  oldpassword: string;
  password: string;
  confirmPassword: string;
};

// Change Password Action
export async function changePassword(input: ChangePasswordInput) {
  const { email, password } = input;
  const hashed = await hash(password, 10);
  await prisma.user.update({
    where: { email },
    data: { password: hashed },
  });
  redirect('/profile');
}

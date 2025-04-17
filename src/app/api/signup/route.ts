/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user
  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
}

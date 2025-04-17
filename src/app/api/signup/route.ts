/* eslint-disable import/prefer-default-export */
import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '../../../lib/prisma';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ message: 'Email and password are required.' }, { status: 400 });
  }

  console.log('Checking if user exists:', email); // Debugging log

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });

  if (existingUser) {
    console.log('User already exists:', email); // Debugging log
    return NextResponse.json({ message: 'User already exists.' }, { status: 409 });
  }

  // Hash password
  const hashedPassword = await hash(password, 10);

  // Create user
  try {
    console.log('Creating new user:', email); // Debugging log
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    console.log('User created successfully:', email); // Debugging log
    return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error); // Error log
    return NextResponse.json({ message: 'An error occurred during sign up.' }, { status: 500 });
  }
}

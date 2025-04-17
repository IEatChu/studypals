import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma'; // Ensure this path is correct
import bcrypt from 'bcrypt';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const { email, password } = credentials;

        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error('No user found with this email');
        }

        // Compare hashed password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid password');
        }

        // Return user info with id as string
        return { id: String(user.id), email: user.email };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom login page
    error: '/auth/error', // Error page if login fails
  },
  session: {
    strategy: 'jwt', // Use JWT-based session strategy
  },
  secret: process.env.NEXTAUTH_SECRET, // Set in your .env.local
});

export { handler as GET, handler as POST };

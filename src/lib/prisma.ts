/* eslint-disable import/prefer-default-export */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Ensure we only instantiate PrismaClient once in serverless environments
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query', 'error'], // Enable query and error logging for debugging
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

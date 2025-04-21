import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  const user = await prisma.user.findUnique({
    where: { email },
    include: { userProfile: true },
  });

  if (!user || !user.userProfile) return NextResponse.json(null);

  return NextResponse.json({
    fullName: user.userProfile.fullName,
    headshotUrl: user.userProfile.headshotUrl,
    coursesTaken: user.userProfile.coursesTaken,
    coursesHelped: user.userProfile.coursesHelped,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const { email, fullName, headshotUrl, coursesTaken, coursesHelped } = body;

  if (!email) return NextResponse.json({ error: 'Missing email' }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const profile = await prisma.userProfile.upsert({
    where: { userId: user.id },
    update: {
      fullName,
      headshotUrl,
      coursesTaken,
      coursesHelped,
    },
    create: {
      userId: user.id,
      fullName,
      headshotUrl,
      coursesTaken,
      coursesHelped,
    },
  });

  return NextResponse.json(profile);
}

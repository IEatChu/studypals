import { PrismaClient, Role, SessionStatus } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding the database...');

  // Hash the default password
  const password = await hash('changeme', 10);

  // Seed Users
  for (const account of config.defaultAccounts) {
    const role = (account.role as Role) || Role.USER;
    console.log(`👤 Seeding user: ${account.email} (${role})`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
        name: account.name ?? null,
        profilePicture: account.profilePicture ?? null,
      },
    });
  }

  // Seed Courses
  const course1 = await prisma.course.upsert({
    where: { id: 1 }, // Using the ID to find or create
    update: {},
    create: {
      name: 'Intro to Computer Science I',
    },
  });

  const course2 = await prisma.course.upsert({
    where: { id: 2 }, // Make sure to use a unique ID here
    update: {},
    create: {
      name: 'Software Engineering',
    },
  });

  // Create Study Session
  const hostUser = await prisma.user.findFirst(); // pick first user as host
  if (hostUser) {
    const session = await prisma.studySession.create({
      data: {
        topic: 'Pointers and Memory',
        description: 'Cram session before midterm',
        ownerId: hostUser.id,
        courseId: course1.id, // Link the session to the course created above
        status: SessionStatus.ACTIVE,
        startTime: new Date(Date.now() + 60 * 60 * 1000), // 1 hour from now
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        attendees: {
          connect: [{ id: hostUser.id }],
        },
      },
    });

    // Give points for hosting the session
    await prisma.pointHistory.create({
      data: {
        userId: hostUser.id,
        points: 10,
        description: 'Hosted a study session',
      },
    });
  }

  console.log('✅: Done seeding!');
}

main()
  .catch(async (e) => {
    console.error('❌: Seeding error:', e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

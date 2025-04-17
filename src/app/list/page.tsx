import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';

export default async function ListPage() {
  // Protect the page so that only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Example: Instead of fetching "stuff", perhaps you want to fetch users
  const owner = (session && session.user && session.user.email) || '';
  const users = await prisma.user.findMany({
    where: {
      // Adjust filtering as necessary; here's just a placeholder
      email: owner,
    },
  });

  if (!users) {
    return notFound();
  }

  return (
    <main>
      <h1>List Page</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </main>
  );
}

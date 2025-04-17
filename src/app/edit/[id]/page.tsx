import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';

export default async function EditStuffPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page so that only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Convert the id to a string (if it's an array, take the first element)
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  if (!id) {
    return notFound();
  }

  // Render a basic edit page with the ID.
  return (
    <main>
      <h1>Edit Item</h1>
      <p>Editing item with ID: {id}</p>
    </main>
  );
}

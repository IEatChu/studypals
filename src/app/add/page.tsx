import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';

const AddStuff = async () => {
  // Protect the page; only logged-in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // Since the AddStuffForm is removed, render a placeholder or redirect
  return (
    <main>
      {/* This page is no longer available */}
      <h1>Page Not Found</h1>
    </main>
  );
};

export default AddStuff;

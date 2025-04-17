// src/app/landing/page.tsx
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to StudyPalz</h1>
      <p>Your go-to platform for study groups!</p>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/profile">Set Up Profile</Link>
    </div>
  );
}

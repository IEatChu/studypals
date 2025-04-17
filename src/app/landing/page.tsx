// src/app/landing/page.js
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to StudyPalz</h1>
      <p>Your ultimate study partner platform.</p>
      <Link href="/sign-in">Sign In</Link>
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}

/* eslint-disable jsx-a11y/label-has-associated-control */
// src/app/auth/signin/page.tsx

'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react'; // Import signIn from NextAuth
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../page1.module.css';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      // Use NextAuth's signIn method to handle login
      const res = await signIn('credentials', {
        redirect: false, // Prevent auto redirect
        email,
        password,
      });

      if (res?.error) {
        setError(res.error || 'Login failed, please try again.');
      } else {
        // Redirect on successful login
        window.location.href = '/';
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '64px', alignItems: 'center' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <Image
              src="/studypalzlogo.png"
              alt="Study Palz Logo"
              width={200}
              height={120}
              style={{ margin: '0 auto 1rem' }}
            />
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Welcome</h1>
            <p style={{ fontSize: '1.125rem', marginTop: '1rem', color: 'white' }}>
              Login to reconnect with your study palz.
            </p>
          </div>
          <div
            style={{
              flex: 1,
              background: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem' }}>Login</h2>
            <form onSubmit={handleLogin}>
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label htmlFor="loginEmail">Email address</label>
                <input
                  type="email"
                  id="loginEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem', textAlign: 'left' }}>
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              {error && (
                <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}
              <button type="submit" className="primary" style={{ width: '100%' }}>
                Login
              </button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Don&apos;t have an account?
              {' '}
              <Link className="secondary" href="/auth/signup">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

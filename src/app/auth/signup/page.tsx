/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import styles from '../../page1.module.css';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Something went wrong');
      } else {
        // Auto-login the user after successful signup
        const signInRes = await signIn('credentials', {
          redirect: false,
          email,
          password,
        });

        if (signInRes?.error) {
          setError('Error logging in. Please try again.');
        } else {
          // Redirect the user to the home page (or logged-in home page)
          window.location.href = '/';
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
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
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'white' }}>Join the Squad!</h1>
            <p style={{ fontSize: '1.125rem', marginTop: '1rem', color: 'white' }}>
              Create your Study-Palz account and start collaborating 🚀
            </p>
          </div>

          {/* Right side: Signup Form */}
          <div
            style={{
              flex: 1,
              background: '#ffffff',
              padding: '40px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              maxWidth: '400px',
              width: '100%',
            }}
          >
            <h2 style={{ fontSize: '1.75rem', marginBottom: '1rem', textAlign: 'center' }}>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="signupEmail">Email address</label>
                <input
                  type="email"
                  id="signupEmail"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="signupPassword">Password</label>
                <input
                  type="password"
                  id="signupPassword"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem' }}
                />
              </div>
              {error && (
                <p style={{ color: 'red', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </p>
              )}
              <button type="submit" className="primary" style={{ width: '100%' }}>
                Sign Up
              </button>
            </form>

            <p style={{ textAlign: 'center', marginTop: '1rem' }}>
              Already have an account?
              {' '}
              <Link className="secondary" href="/auth/signin">
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

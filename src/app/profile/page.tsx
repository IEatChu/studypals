/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useSession } from 'next-auth/react';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [fullName, setFullName] = useState('');
  const [headshotUrl, setHeadshotUrl] = useState('');
  const [coursesTaken, setCoursesTaken] = useState('');
  const [coursesHelped, setCoursesHelped] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/profile?email=${session.user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data) {
            setFullName(data.fullName || '');
            setHeadshotUrl(data.headshotUrl || '');
            setCoursesTaken(data.coursesTaken || '');
            setCoursesHelped(data.coursesHelped || '');
          }
        });
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/profile', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: session?.user?.email,
        fullName,
        headshotUrl,
        coursesTaken,
        coursesHelped,
      }),
    });

    if (res.ok) {
      setMessage('✅ Profile updated successfully!');
    } else {
      setMessage('❌ Failed to update profile.');
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setHeadshotUrl(imageUrl);
    }
  };

  return (
    <Container className="py-5" style={{ color: 'white' }}>
      <h2 className="mb-4">👤 Your Profile</h2>

      {message && <Alert variant="info">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Headshot</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </Form.Group>

        {headshotUrl && (
          <div className="mb-3">
            <Form.Label>Preview</Form.Label>
            <div>
              <img
                src={headshotUrl}
                alt="Headshot Preview"
                style={{
                  width: '150px',
                  height: '150px',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Courses you&apos;re taking (Grasshopper)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. ICS 314, ICS 321"
            value={coursesTaken}
            onChange={(e) => setCoursesTaken(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Courses you can help with (Sensei)</Form.Label>
          <Form.Control
            type="text"
            placeholder="e.g. ICS 111, ICS 211"
            value={coursesHelped}
            onChange={(e) => setCoursesHelped(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Profile
        </Button>
      </Form>
    </Container>
  );
}

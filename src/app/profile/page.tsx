'use client';

import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

export default function ProfilePage() {
  return (
    <Container className="py-5" style={{ color: 'white' }}>
      <h2 className="mb-4">👤 Your Profile</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Headshot URL</Form.Label>
          <Form.Control type="text" placeholder="Paste image URL" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Courses you're taking (Grasshopper)</Form.Label>
          <Form.Control type="text" placeholder="e.g. ICS 314, ICS 321" />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Courses you can help with (Sensei)</Form.Label>
          <Form.Control type="text" placeholder="e.g. ICS 111, ICS 211" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Profile
        </Button>
      </Form>
    </Container>
  );
}

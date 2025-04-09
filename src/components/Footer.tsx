'use client';

import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import Link from 'next/link';

const Footer = () => (
  <footer className="bg-dark text-light py-4">
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6} className="text-center">
          <h5>Studymate</h5>
          <p>
            Studymate helps ICS students at UH Manoa connect face-to-face for real-time study sessions in ICSpace.
          </p>
        </Col>
        <Col xs={12} md={6} className="text-center">
          <h6>Quick Links</h6>
          <ListGroup className="list-group-flush">
            <ListGroup.Item className="border-0 bg-dark">
              <Link href="/profile" className="text-light text-decoration-none">Profile</Link>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 bg-dark">
              <Link href="/calendar" className="text-light text-decoration-none">Calendar</Link>
            </ListGroup.Item>
            <ListGroup.Item className="border-0 bg-dark">
              <Link href="/leaderboard" className="text-light text-decoration-none">Leaderboard</Link>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <Row className="mt-4 text-center">
        <Col>
          <small>
            &copy;
            {new Date().getFullYear()}
            {' '}
            Studymate | All Rights Reserved
          </small>
        </Col>
      </Row>
    </Container>
  </footer>
);

export default Footer;

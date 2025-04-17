'use client';

import { Col, Container, Image, Row, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

const Home = () => {
  const { data: session } = useSession();
  const profileLink = session ? '/profile' : '/auth/signup';
  return (
    <main>
      <Container id="landing-page" fluid className="py-5 text-center">
        <Row className="mb-5 align-items-center" style={{ color: 'white' }}>
          <Col xs={12} md={4} />
          <Col xs={12} md={12}>
            <h1>
              Welcome to
              <Image
                src="/studypalzlogo.png"
                alt="StudyPalz Logo"
                width={400}
                height={200}
              />
            </h1>

            <p className="lead">
              Connect with ICS students for live, face-to-face study groups in ICSpace!
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={6}>
            <Link href={profileLink} passHref>
              <Card className="h-100 p-3 hover-shadow cursor-pointer">
                <Card.Body>
                  <Card.Title>📄 Set up your profile</Card.Title>
                  <Card.Text>
                    Pick your courses, upload a headshot, and choose your roles.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6}>
            <Link href="/calendar" passHref>
              <Card className="h-100 p-3 hover-shadow cursor-pointer">
                <Card.Body>
                  <Card.Title>📅 View or schedule study sessions</Card.Title>
                  <Card.Text>
                    Join a session now or plan one later in ICSpace.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6}>
            <Link href="/leaderboard" passHref>
              <Card className="h-100 p-3 hover-shadow cursor-pointer">
                <Card.Body>
                  <Card.Title>🏆 Earn points & level up</Card.Title>
                  <Card.Text>
                    Help others, join sessions, and get recognized!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>

          <Col md={6}>
            <Link href="/leaderboard" passHref>
              <Card className="h-100 p-3 hover-shadow cursor-pointer">
                <Card.Body>
                  <Card.Title>📊 Check the leaderboard</Card.Title>
                  <Card.Text>
                    See who’s leading the ICS Studymate community.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    </main>
  );
};
export default Home;

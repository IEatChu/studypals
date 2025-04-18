/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */

'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import styles from '../app/page.module.css';

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Get session data
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string; image?: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' }); // Redirect to homepage after logout
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'rgb(8, 8, 8)' }}>
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/">
          <img src="/studypalzlogo.png" alt="StudyPalz Logo" height="100" width="200" />
        </Navbar.Brand>

        {/* Navbar Toggle (Hamburger) for mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className={styles['navbar-toggler-icon']} // Apply the custom class here
        />

        {/* Main Nav Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {/* Nav Links for larger screens */}
            <Nav.Link href="/" className="me-5" style={{ color: 'white', fontWeight: 'bold' }}>
              Home
            </Nav.Link>
            <Nav.Link href="/about" className="me-5" style={{ color: 'white', fontWeight: 'bold' }}>
              About
            </Nav.Link>
            <Nav.Link href="/contact" style={{ color: 'white', fontWeight: 'bold' }}>
              Contact
            </Nav.Link>

            {/* Show if logged in */}
            {currentUser && (
              <>
                <Nav.Link href="/calendar" active={pathName === '/calendar'} className="me-5, ms-5" style={{ color: 'white', fontWeight: 'bold' }}>
                  Calendar
                </Nav.Link>
                <Nav.Link href="/leaderboard" active={pathName === '/leaderboard'} className="me-5, ms-5" style={{ color: 'white', fontWeight: 'bold' }}>
                  Leaderboard
                </Nav.Link>
              </>
            )}
            {/* Admin Access */}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link href="/admin" active={pathName === '/admin'} style={{ color: 'white' }}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          {/* Right-side Auth Buttons */}
          <Nav>
            {session ? (
              <>
                {/* Profile Image as Icon */}
                <Nav.Link href="/profile" className="me-3">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '2px solid white',
                      }}
                    />
                  ) : (
                    <PersonFill size={24} color="white" />
                  )}
                </Nav.Link>

                {/* Sign Out Button */}
                <Nav.Link
                  onClick={handleSignOut}
                  className="login-signup-btn"
                  style={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  <BoxArrowRight className="me-1" />
                  Sign Out
                </Nav.Link>
              </>
            ) : (
              <div className="d-flex">
                <Nav.Link href="/auth/signin" className="login-signup-btn me-2">
                  <PersonFill />
                  {' '}
                  Sign In
                </Nav.Link>
                <Nav.Link href="/auth/signup" className="login-signup-btn">
                  <PersonPlusFill />
                  {' '}
                  Sign Up
                </Nav.Link>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;

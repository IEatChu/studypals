/* eslint-disable @next/next/no-img-element */

'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill, PersonCircle } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession(); // Getting session data
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();

  console.log('Session Data:', session); // Debugging: Check if session is defined

  return (
    <Navbar expand="lg" style={{ backgroundColor: 'rgb(8, 8, 8)' }}>
      <Container>
        {/* Brand Name */}
        <Navbar.Brand href="/">
          <img
            src="/studypalzlogo.png"
            alt="StudyPalz Logo"
            height="100"
            width="200"
          />
        </Navbar.Brand>
        <Nav.Link href="/" className="me-5" style={{ color: 'white', fontWeight: 'bold' }}>
          Home
        </Nav.Link>
        <Nav.Link href="/about" className="me-5" style={{ color: 'white', fontWeight: 'bold' }}>
          About
        </Nav.Link>
        <Nav.Link href="/contact" style={{ color: 'white', fontWeight: 'bold' }}>
          Contact
        </Nav.Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {/* Display user links if logged in */}
            {currentUser && (
              <>
                <Nav.Link href="/profile" active={pathName === '/profile'}>
                  Profile
                </Nav.Link>
                <Nav.Link href="/calendar" active={pathName === '/calendar'}>
                  Calendar
                </Nav.Link>
                <Nav.Link href="/leaderboard" active={pathName === '/leaderboard'}>
                  Leaderboard
                </Nav.Link>
              </>
            )}
            {/* Admin access */}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link href="/admin" active={pathName === '/admin'}>
                Admin
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {/* Login/Logout dropdown */}
            {session ? (
              <NavDropdown
                title={(
                  <>
                    <PersonCircle className="me-2" />
                    {currentUser}
                  </>
)}
                id="login-dropdown"
              >
                <NavDropdown.Item href="/api/auth/signout">
                  <BoxArrowRight />
                  {' '}
                  Sign Out
                </NavDropdown.Item>
                <NavDropdown.Item href="/auth/change-password">
                  <Lock />
                  {' '}
                  Change Password
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="d-flex">
                <Nav.Link href="/auth/signin" className="login-signup-btn me-2">
                  <PersonFill />
                  {' '}
                  Sign in
                </Nav.Link>
                <Nav.Link href="/auth/signup" className="login-signup-btn">
                  <PersonPlusFill />
                  {' '}
                  Sign up
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

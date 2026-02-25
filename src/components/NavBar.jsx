import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { ThemeContext } from '../context/ThemeContext.jsx'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

const NavBar = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Navbar
      fixed="top"
      expand="md"
      className={darkMode ? 'dark' : 'light'}
      style={{
        backgroundColor: scrolled
          ? (darkMode ? '#141414' : '#f8f9fa')
          : 'transparent',
        transition: 'background-color 0.3s ease',
        zIndex: 1000
      }}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="netflix-brand">
          MOVIEAPP
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="netflix-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/search" className="netflix-nav-link">Search</Nav.Link>
            <Nav.Link as={Link} to="/favorites" className="netflix-nav-link">Favorites</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={toggleTheme} style={{ cursor: 'pointer' }}>
              {darkMode ? <BsSunFill color="#f59e0b" size={20} /> : <BsMoonFill color="#1a3c5e" size={20} />}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar

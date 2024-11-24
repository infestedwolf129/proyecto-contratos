import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/logo.png';
import '../styles_files/index.css';

function NavBar() {
  const location = useLocation(); // Obtiene la ruta actual

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg" fixed="top" className="justify-content-end navbar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/"> {/* Usa 'as={Link}' para el logo también */}
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Contrato Fácil
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to="/" className={`custom-nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                Inicio
              </Nav.Link>
              <Nav.Link as={Link} to="/generador-contratos" className={`custom-nav-link ${location.pathname === '/generador-contratos' ? 'active' : ''}`}>
                Generador
              </Nav.Link>
              <Nav.Link as={Link} to="/iniciar-sesion" className={`custom-nav-link ${location.pathname === '/iniciar-sesion' ? 'active' : ''}`}>
                Iniciar Sesión
              </Nav.Link>
              <Nav.Link as={Link} to="/registrarse" className={`custom-nav-link ${location.pathname === '/registrarse' ? 'active' : ''}`}>
                Registrarse
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;

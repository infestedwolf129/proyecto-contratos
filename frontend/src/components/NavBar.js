import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LoginButton } from "./login.js";
import { LogoutButton } from "./logout.js";
import { useAuth0 } from "@auth0/auth0-react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import logo from '../assets/logo.png';
import '../styles_files/index.css';

function NavBar() {
  const location = useLocation(); // Obtiene la ruta actual
  const { isAuthenticated } = useAuth0();

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
              
              {/* Agregar el enlace a Mis Contratos */}
              <Nav.Link as={Link} to="/miscontratos" className={`custom-nav-link ${location.pathname === '/miscontratos' ? 'active' : ''}`}>
                Mis Contratos
              </Nav.Link>

              {isAuthenticated ? (
                <>
                  <Nav.Link as={Link} to="/perfil" className={`custom-nav-link ${location.pathname === '/perfil' ? 'active' : ''}`}>
                    Perfil
                  </Nav.Link>
                  <LogoutButton />
                </>
              ) : (
                <LoginButton />
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;


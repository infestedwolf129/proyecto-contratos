import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <>
      <Navbar  bg="primary" data-bs-theme="dark" collapseOnSelect expand="lg">
        <Container>
            <Navbar.Brand href="#home">
            <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Proyecto Contratos
            </Navbar.Brand>
            <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                  <Nav.Link href="#home">Inicio</Nav.Link>
                  <Nav.Link href="#link">Generador</Nav.Link>
                  <NavDropdown title="Más" id="collapsible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                      Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                      Separated link
                  </NavDropdown.Item>
                  </NavDropdown>
              </Nav>
              <Nav>
                  <Nav.Link href="#deets">Iniciar Sesión</Nav.Link>
                  <Nav.Link eventKey={2} href="#memes">
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
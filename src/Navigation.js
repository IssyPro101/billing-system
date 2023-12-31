import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Navigation({user}) {
  const navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>Customer Billing System</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>Menu</Nav.Link>
            {user ? <Nav.Link onClick={() => navigate("/profile")}>Profile</Nav.Link> : <Nav.Link onClick={() => navigate("/profile")}>Login</Nav.Link>}
            <Nav.Link onClick={() => navigate("/info")}>Project Info</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { UserContext } from './contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function NavBar() {

  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  const logoutUser = async () => {
    try {
      await axios.delete("/api/v1/logout")
      setUser(null)
      navigate("/")
    } catch (error) {
      alert(error.message)
    }
  }

  // const logoutUser = () => {
  //   fetch("/api/v1/logout", { method: "DELETE" })
  //     .then((r) => {
  //       if (r.ok) {
  //         setUser(null);
  //       }
  //     })
  //     .then(() => {
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       console.error("Logout failed:", error.message);
  //     });
  // }

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">blurbHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
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
        </Navbar.Collapse>
        {user
          ? <Button onClick={logoutUser} variant="secondary" size="sm">Logout {user.username}</Button>
          : null
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;
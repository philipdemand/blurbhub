import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
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

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">blurbHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {user
          ? <Button onClick={logoutUser} variant="secondary" size="sm">Logout {user.username}</Button>
          : null
        }
      </Container>
    </Navbar>
  );
}

export default NavBar;
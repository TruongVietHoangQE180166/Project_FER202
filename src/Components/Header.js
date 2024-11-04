// src/Components/Header.js
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../Style/Header.css'; 
import "bootstrap/dist/css/bootstrap.min.css";
import LoginComponent from "./LoginComponent";
import RegisterComponent from "./RegisterComponent";
import { FaUser } from 'react-icons/fa'; 
import Cart from "./Cart";

function Header({ cartItems, setCartItems }) {
  const [showModal, setShowModal] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Payload = token.split('.')[1];
        const userData = JSON.parse(atob(base64Payload));
        setUser(userData);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    const user = {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role
    };
    localStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setShowModal(false);
  };
  

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate('/');
    
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const switchForm = () => {
    setIsLoginForm(!isLoginForm);
  };
  const handleMyOrders = (e) => {
    e.preventDefault();
    navigate('/my-orders');
  };

  return (
    <header className="sticky-header">
      <Navbar expand="lg" className="py-3">
        <Container>
          <Link to="/" className="navbar-brand me-5">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              height="60"
              alt="Logo"
            />
          </Link>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <div className="d-flex justify-content-between w-100">
              <Nav className="navbar-nav">
                <Link to="/" className="nav-link nav-item-custom">Home</Link>
                <Link to="/products" className="nav-link nav-item-custom">Products</Link>
                <Link to="/contact" className="nav-link nav-item-custom">Contact</Link>
                <Link to="/about" className="nav-link nav-item-custom">About</Link>
              </Nav>

              <div className="d-flex align-items-center">
                <Form className="d-flex" style={{ maxWidth: '300px' }}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="rounded"
                    aria-label="Search"
                  />
                  <Button variant="outline-secondary" className="ms-2">
                    <i className="fas fa-search"></i>
                  </Button>
                </Form>

                {user ? (
                  <>
                    <Cart cartItems={cartItems} setCartItems={setCartItems} />

                    <NavDropdown
        title={<FaUser size={20} />}
        align="end"
        menuVariant="light"
        className="ms-4"
      >
        <NavDropdown.Item as={Link} to="#">My Profile</NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/my-orders" onClick={handleMyOrders}>Order History</NavDropdown.Item>
        {user.role === "admin" && (
          <NavDropdown.Item as={Link} to="/admin">Admin Dashboard</NavDropdown.Item>
        )}
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
                  </>
                ) : (
                  <div className="d-flex align-items-center ms-4">
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setIsLoginForm(true);
                        toggleModal();
                      }}
                      className="me-2"
                    >
                      Login
                    </Button>
                    <Button
                      variant="outline-dark"
                      onClick={() => {
                        setIsLoginForm(false);
                        toggleModal();
                      }}
                    >
                      Register
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isLoginForm ? (
        <LoginComponent
          modalOpen={showModal}
          toggleModal={toggleModal}
          switchToRegister={switchForm}
          onLoginSuccess={handleLoginSuccess}
        />
      ) : (
        <RegisterComponent
          modalOpen={showModal}
          toggleModal={toggleModal}
          switchToLogin={switchForm}
        />
      )}
    </header>
  );
}

export default Header;

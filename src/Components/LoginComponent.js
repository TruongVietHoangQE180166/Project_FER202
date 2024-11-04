import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function LoginComponent({ modalOpen, toggleModal, switchToRegister, onLoginSuccess }) {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
    if (!showForgotPasswordModal) {
      toggleModal(); // Đóng modal đăng nhập khi mở modal quên mật khẩu
    }
  };

  const handleCloseForgotPassword = () => {
    setShowForgotPasswordModal(false);
    toggleModal(); // Mở lại modal đăng nhập khi đóng modal quên mật khẩu
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/users.json");
      const data = await response.json();
      const user = data.users.find(u => u.email === email && u.password === password);

      if (user) {
        // Bao gồm role trong thông tin người dùng
        const { password, ...userWithoutPassword } = user;
        const token = btoa(JSON.stringify(userWithoutPassword));
        localStorage.setItem("token", token);
        onLoginSuccess(userWithoutPassword);
        toggleModal();
      } else {
        setError("Invalid email or password.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <Modal show={modalOpen} onHide={toggleModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control 
                type="email" 
                placeholder="Enter email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="dark" type="submit" className="mt-3 w-100">
              Login
            </Button>
          </Form>
          <div className="mt-3 text-center">
            <p>
              Don't have an account?{" "}
              <Button variant="link" onClick={switchToRegister} className="p-0">
                Register here
              </Button>
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleForgotPasswordModal}>
            Forgot Password
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal show={showForgotPasswordModal} onHide={handleCloseForgotPassword} centered>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formForgotPasswordEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseForgotPassword}>
            Close
          </Button>
          <Button variant="dark" type="submit">
            Reset Password
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginComponent;
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

function RegisterComponent({ modalOpen, toggleModal, switchToLogin }) {
  return (
    <Modal show={modalOpen} onHide={toggleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your full name" />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mt-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword" className="mt-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm password" />
          </Form.Group>
        </Form>
        <div className="mt-3 text-center">
          <p>
            Already have an account?{" "}
            <Button variant="link" onClick={switchToLogin} className="p-0">
              Login here
            </Button>
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        
        <Button variant="dark" type="submit">
          Register
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RegisterComponent;
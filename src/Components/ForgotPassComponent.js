
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
function ForgotPassComponent({ showForgotPasswordModal, handleCloseForgotPassword }) {
    return (
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
    );
  }
  
  export default ForgotPassComponent;
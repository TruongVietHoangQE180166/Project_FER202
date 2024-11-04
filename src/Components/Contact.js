// src/Components/News.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../Style/Contact.css'; // Import CSS tùy chỉnh

function News() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    // Add form submission logic here (e.g., send data to backend)
  };

  return (
    <Container className="news-container mt-5 mb-5">
      <h2 className="mb-4 text-center">Contact Us</h2>
      <Row className="justify-content-center"> {/* Center the row */}
        <Col md={8}> {/* Adjust width of the form container */}
          <hr className="my-4 form-hr" /> {/* Horizontal line limited to form width */}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name here"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email here"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-4">
              <Form.Label>Messages</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter your message here"
                name="message"
                value={formData.message}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="dark" type="submit" className="submit-button">
              Post
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default News;

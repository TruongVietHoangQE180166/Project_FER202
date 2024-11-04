import React from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function WebFooter() {
  return (
    <footer className="bg-dark text-white">
      <Container className="py-5">
        <Row>
          <Col lg={4} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">About Our InfinityShop</h5>
            <p>
              At InfinityShop, we offer the latest gadgets, electronics, and tech accessories from the top brands. 
              We are committed to providing high-quality products and exceptional customer service.
            </p>
            <div className="mt-4">
              <Button variant="light" className="me-2"><FaFacebookF /></Button>
              <Button variant="light" className="me-2"><FaTwitter /></Button>
              <Button variant="light"><FaInstagram /></Button>
            </div>
          </Col>

          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Contact Us</h5>
            <Form.Group className="mb-4">
              <Form.Control type="text" placeholder="Subscribe to our newsletter" />
            </Form.Group>
            <ul className="list-unstyled">
              <li className="mb-3"><FaMapMarkerAlt /> Đại Học FPT Quy Nhơn</li>
              <li className="mb-3"><FaEnvelope /> 123hoangxxx@gmail.com</li>
              <li className="mb-3"><FaPhone /> (+84) 0356645624</li>
            </ul>
          </Col>

          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">Store Hours</h5>
            <Table bordered variant="dark">
              <tbody>
                <tr>
                  <td>Mon - Fri:</td>
                  <td>9am - 8pm</td>
                </tr>
                <tr>
                  <td>Saturday:</td>
                  <td>10am - 6pm</td>
                </tr>
                <tr>
                  <td>Sunday:</td>
                  <td>Closed</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2023 Copyright: <a className="text-white" href="https://techstore.com/">TechStore.com</a>
      </div>
    </footer>
  );
}

export default WebFooter;

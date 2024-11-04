import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const About = () => {
  return (
    <section className="py-3 py-md-5">
      <Container>
        <Row className="gy-3 gy-md-4 align-items-lg-center">
          <Col xs={12} lg={6}>
            <img className="img-fluid rounded" loading="lazy" src="https://uic.vn/wp-content/uploads/2022/03/contact-us-Mod-3.jpg" alt="About Technology" />
          </Col>
          <Col xs={12} lg={6}>
            <div className="row justify-content-lg-center">
              <Col xs={12} lg={11}>
                <h2 className="mb-3">Who We Are?</h2>
                <p className="lead fs-4 text-secondary mb-3">
                  We provide cutting-edge technology products that empower individuals and businesses to excel.
                </p>
                <p className="mb-5">
                  As a rapidly growing e-commerce platform, we focus on delivering high-quality tech gadgets and accessories. Our commitment to innovation, customer satisfaction, and exceptional service drives us to continually improve our offerings.
                </p>
                <Row className="gy-4 gx-xxl-5">
                  <Col xs={12} md={6}>
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-laptop" viewBox="0 0 16 16">
                          <path d="M1 3h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm0 1v8h14V4H1z" />
                          <path d="M0 9h16v1H0v-1z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="h4 mb-3">Innovative Solutions</h2>
                        <p className="text-secondary mb-0">We offer the latest gadgets and tech solutions to enhance your digital experience.</p>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} md={6}>
                    <div className="d-flex">
                      <div className="me-4 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
                          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm0 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm1 7H7V4h2v4zm0 1H7v4h2V9z" />
                        </svg>
                      </div>
                      <div>
                        <h2 className="h4 mb-3">Global Reach</h2>
                        <p className="text-secondary mb-0">Our products are accessible worldwide, ensuring everyone enjoys the benefits of technology.</p>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default About;

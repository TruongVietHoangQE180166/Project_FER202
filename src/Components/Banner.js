import React from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import '..//Style/Banner.css'; // Assuming you're using a separate CSS file
import { Link, useNavigate } from 'react-router-dom';

const ProductOfTheYear = () => {
  const navigate = useNavigate();
  return (
    <Container className="product-year-container">
      <Row className="align-items-center">
        {/* Image Section */}
        <Col md={6} className="text-center">
          <img src='https://bizweb.dktcdn.net/100/444/581/products/apple-macbook-pro-14-16-inch-jpeg-b2dc7a7d-d44c-4d26-ad51-a97756e6e9a7.jpg?v=1709350560137' alt="Product of the Year" className="product-image" />
        </Col>

        {/* Text Section */}
        <Col md={6}>
          <h2 className="product-title">Product of The Year</h2>
          <p className="product-description">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat cupiditate modi amet!
            Facilis, aperiam quaerat.
          </p>
          <Button
            variant="dark"
            size="lg"
            className="shop-now-btn"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </Button>

        </Col>
      </Row>
    </Container>
  );
};

export default ProductOfTheYear;

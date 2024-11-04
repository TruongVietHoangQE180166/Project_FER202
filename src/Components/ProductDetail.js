import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import '../Style/ProductDetail.css';
import { Link } from 'react-router-dom';
function ProductDetail({ products, addToCart }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <Container className="my-5 product-detail">
      <Row>
        <Col md={6}>
          <Image src={product.image || 'https://via.placeholder.com/500'} fluid />
        </Col>
        <Col md={6}>
          <h2 className="mb-3">{product.name}</h2>
          <p className="text-muted mb-4">{product.category}</p>
          <div className="d-flex align-items-center mb-4">
            <h3 className="text-primary me-3">
              {product.newPrice}
            </h3>
            {product.onSale && (
              <del className="text-muted">{product.oldPrice}</del>
            )}
          </div>
          <div className="mb-4">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon key={index} icon={faStar} className="text-warning me-1" />
            ))}
            <span className="ms-2">(50 reviews)</span>
          </div>
          <p className="mb-4">
          Experience unmatched quality and innovation with our premium products, designed for durability, style, and ultimate customer satisfaction. Elevate your lifestyle today!
          </p>
          <Form className="d-flex align-items-center mb-4">
            <Form.Control
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              min="1"
              max="10"
              className="me-3"
              style={{ width: '70px' }}
            />
            <Button variant="dark" onClick={handleAddToCart} className="me-3">
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              Add to Cart
            </Button>
            <Button variant="outline-danger">
              <FontAwesomeIcon icon={faHeart} />
            </Button>
          </Form>
          <div>
            <strong>Availability:</strong> In Stock<br />
            <strong>SKU:</strong> BE45VGRT
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          
        </Col>
      </Row>
    </Container>
  );
}

export default ProductDetail;

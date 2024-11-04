import React, { useState } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import '../Style/ProductCarousel.css'; // CSS riêng
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Component hiển thị từng sản phẩm
function ProductCard({ product, addToCart}) {
  return (
    
      <Col lg={3} md={4} sm={6} className="mb-4">
        <Card className="product-card">
          {product.onSale && <div className="badge1">Sale</div>}
          <div className="product-tumb">
            <Card.Img variant="top" src={product.image} className="product-img" />
          </div>
          <Card.Body className="product-details">
            <span className="product-category">{product.category}</span>
            <h4><Link to={`/product/${product.id}`}>{product.name}</Link></h4>
            <div className="product-bottom-details">
              <div className="product-price">
                {product.onSale ? (
                  <>
                    <small>{product.oldPrice}</small> {product.newPrice}
                  </>
                ) : (
                  <>{product.newPrice}</>
                )}
              </div>
              <div className="product-links">
                <a href="#"><FontAwesomeIcon icon={faHeart} /></a>
                <a href="#" onClick={(e) => { e.preventDefault(); addToCart(product); }}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </a>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
  );
}

function ProductCarousel({addToCart, products}) {
  const itemsPerSlide = 4; // Hiển thị 4 sản phẩm mỗi lần
  const totalProducts = products.length;
  const [currentIndex, setCurrentIndex] = useState(0);

  if (totalProducts === 0) {
    return <p>No products available.</p>; // Xử lý khi không có sản phẩm
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalProducts - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + 1) % totalProducts
    );
  };

  const visibleProducts = Array.from({ length: itemsPerSlide }).map(
    (_, index) => products[(currentIndex + index) % totalProducts]
  );

  return (
    <div>
      <h2 className="featured-title">Featured Products</h2>

      <div className="carousel-container">
        <Button variant="dark" className="carousel-btn prev" onClick={handlePrev}>
          <i className="fa fa-chevron-left"></i>
        </Button>

        <Row className="carousel-row justify-content-center align-items-center">
  {visibleProducts.map((product) => (
    <ProductCard key={product.id} product={product} addToCart={addToCart} />
  ))}
</Row>


        <Button variant="dark" className="carousel-btn next" onClick={handleNext}>
          <i className="fa fa-chevron-right"></i>
        </Button>
      </div>
    </div>
  );
}


export default ProductCarousel;

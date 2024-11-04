import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faHeart, faSearch, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../Style/Products.css'; // CSS riêng
// Component hiển thị từng sản phẩm
function ProductCard({ product, addToCart }) {
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

// Trang sản phẩm với tìm kiếm và filter
function Products({ addToCart, products }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  // Hàm xử lý khi chọn category
  const handleCategoryChange = (category) => {
    setSelectedCategories(category === 'All' ? [] : 
      prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]);
  };

  // Hàm xử lý khi chọn price range
  const handlePriceRangeChange = (range) => {
    setSelectedPriceRange(range === 'All' ? [] : 
      prev => prev.includes(range) ? prev.filter(r => r !== range) : [...prev, range]);
  };

  // Hàm xử lý khi chọn tag
  const handleTagChange = (tag) => {
    setSelectedTags(tag === 'All' ? [] : 
      prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  // Hàm lọc sản phẩm dựa trên các lựa chọn
  const filteredProducts = products.filter(product => {
    const newPrice = parseFloat(product.newPrice.replace('$', '')); // Convert price to number
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
  
    const matchesPriceRange = selectedPriceRange.length === 0 || selectedPriceRange.some(range => {
      switch (range) {
        case '0-100$':
          return newPrice <= 100;
        case '100$-200$':
          return newPrice > 100 && newPrice <= 200;
        case '200$-300$':
          return newPrice > 200 && newPrice <= 300;
        case '300$-400$':
          return newPrice > 300 && newPrice <= 400;
        case '400$-More':
          return newPrice > 400;
        default:
          return true;
      }
    });
  
    const matchesTag = selectedTags.length === 0 || (selectedTags.includes('Sale') && product.onSale);
  
    return matchesSearchTerm && matchesCategory && matchesPriceRange && matchesTag;
  });
  

  return (
    <Container fluid className="py-5">
      <Row>
      <Col lg={3} md={4} className="mb-4">
  <Card className="filter-card shadow-sm">
    <Card.Body>
      <h4 className="filter-title mb-4">Filters</h4>
      <Form className="search-form mb-4">
        <Form.Group className="mb-3">
          
          <div className="d-flex search-bar">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 search-input"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-secondary" className="search-button">
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </div>
        </Form.Group>
      </Form>

      {/* Categories Filter */}
      <h5 className="filter-subtitle mb-3">Categories</h5>
      {['All', 'Laptops', 'Phones and Accessories', 'Audio Devices', 'Wearables'].map((category) => (
        <Form.Check 
          key={category}
          type="checkbox"
          id={`category-${category.toLowerCase()}`}
          label={category}
          className="filter-checkbox mb-2"
          checked={category === 'All' ? selectedCategories.length === 0 : selectedCategories.includes(category)}
          onChange={() => handleCategoryChange(category)}
        />
      ))}

      {/* Price Range Filter */}
      <h5 className="filter-subtitle mb-3">Price Range</h5>
      {['All', '0-100$', '100$-200$', '200$-300$', '300$-400$', '400$-More'].map((range) => (
        <Form.Check 
          key={range}
          type="checkbox"
          id={`price-${range.toLowerCase().replace('$', '').replace('-', 'to')}`}
          label={range}
          className="filter-checkbox mb-2"
          checked={range === 'All' ? selectedPriceRange.length === 0 : selectedPriceRange.includes(range)}
          onChange={() => handlePriceRangeChange(range)}
        />
      ))}

      {/* Tags Filter */}
      <h5 className="filter-subtitle mb-3">Tags</h5>
      {['All', 'Sale'].map((tag) => (
        <Form.Check 
          key={tag}
          type="checkbox"
          id={`tag-${tag.toLowerCase()}`}
          label={tag}
          className="filter-checkbox mb-2"
          checked={tag === 'All' ? selectedTags.length === 0 : selectedTags.includes(tag)}
          onChange={() => handleTagChange(tag)}
        />
      ))}

      {/* Clear All Filters Button */}
      <Button variant="dark" className="clear-filters-btn w-100 mb-3" onClick={() => {
        setSelectedCategories([]);
        setSelectedPriceRange([]);
        setSelectedTags([]);
        setSearchTerm("");
      }}>
        <FontAwesomeIcon icon={faFilter} className="me-2" /> Clear Filters
      </Button>
    </Card.Body>
  </Card>
</Col>


        {/* Products Display */}
        <Col lg={9} md={8}>
          <h2 className="xxx">Our Products</h2>
          <Row>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} addToCart={addToCart} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Products;

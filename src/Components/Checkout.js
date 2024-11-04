import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faMoneyBill, faWallet, faTrash } from '@fortawesome/free-solid-svg-icons';

function Checkout({ cartItems, setCartItems }) {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newTotalPrice = cartItems.reduce((total, item) => total + parseFloat(item.newPrice.slice(1)) * item.quantity, 0);
    setTotalPrice(newTotalPrice);
  }, [cartItems]);

  const handleRemoveItem = (itemId) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userId = JSON.parse(localStorage.getItem('user'))?.id;
    if (!userId) {
      alert('Please log in to place an order.');
      navigate('/login');
      return;
    }
  
    const newOrder = {
      id: Date.now(), // Tạo ID duy nhất cho đơn hàng mới
      userId: userId,
      items: cartItems,
      totalPrice: totalPrice,
      date: new Date().toISOString(),
      status: 'pending', // Trạng thái mặc định khi tạo mới
    };
  
    // Lấy mảng orders hiện có từ localStorage và thêm đơn hàng mới
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
  
    setCartItems([]); // Xóa giỏ hàng sau khi đặt hàng
    alert('Thanh toán thành công!');
    navigate('/');
  };
  

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        <Col md={8}>
          <Card className="mb-4">
            <Card.Body>
              <h4 className="mb-3">Shipping Information</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="firstName">
                      <Form.Label>First name</Form.Label>
                      <Form.Control type="text" placeholder="Enter first name" required />
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group controlId="lastName">
                      <Form.Label>Last name</Form.Label>
                      <Form.Control type="text" placeholder="Enter last name" required />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="1234 Main St" required />
                </Form.Group>
                
                <hr className="mb-4" />
                <h4 className="mb-3">Payment</h4>
                <div className="mb-3">
                  <Form.Check
                    type="radio"
                    label={<><FontAwesomeIcon icon={faCreditCard} className="me-2" />Credit card</>}
                    name="paymentMethod"
                    id="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={() => setPaymentMethod('credit')}
                  />
                  <Form.Check
                    type="radio"
                    label={<><FontAwesomeIcon icon={faMoneyBill} className="me-2" />Cash on delivery</>}
                    name="paymentMethod"
                    id="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={() => setPaymentMethod('cash')}
                  />
                  
                </div>
                {paymentMethod === 'credit' && (
                  <>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="cc-name">
                          <Form.Label>Name on card</Form.Label>
                          <Form.Control type="text" placeholder="Full name as displayed on card" required />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="cc-number">
                          <Form.Label>Credit card number</Form.Label>
                          <Form.Control type="text" placeholder="1234 5678 9012 3456" required />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3} className="mb-3">
                        <Form.Group controlId="cc-expiration">
                          <Form.Label>Expiration</Form.Label>
                          <Form.Control type="text" placeholder="MM/YY" required />
                        </Form.Group>
                      </Col>
                      <Col md={3} className="mb-3">
                        <Form.Group controlId="cc-cvv">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control type="text" placeholder="123" required />
                        </Form.Group>
                      </Col>
                    </Row>
                  </>
                )}
                <hr className="mb-4" />
                <Button variant="dark" type="submit" size="lg" block>
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted">Your cart</span>
                <span className="badge bg-secondary rounded-pill">{cartItems.length}</span>
              </h4>
              <ListGroup variant="flush">
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id} className="d-flex justify-content-between lh-sm">
                    <div className="d-flex align-items-center">
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{ width: '50px', height: '50px', marginRight: '10px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="my-0">{item.name}</h6>
                        <small className="text-muted">Quantity: {item.quantity}</small>
                      </div>
                    </div>
                    <div className="d-flex align-items-center">
                      <span className="text-muted me-2">${(parseFloat(item.newPrice.slice(1)) * item.quantity).toFixed(2)}</span>
                      <Button variant="outline-danger" size="sm" onClick={() => handleRemoveItem(item.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="d-flex justify-content-between">
                  <span>Total (USD)</span>
                  <strong>${totalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
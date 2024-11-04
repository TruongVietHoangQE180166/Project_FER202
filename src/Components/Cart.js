import React, { useState } from 'react';
import { Modal, Button, Container, Row, Col, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Cart({ cartItems, setCartItems }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const updateQuantity = (item, quantity) => {
    if (quantity <= 0) {
      setCartItems(cartItems.filter(cartItem => cartItem.id !== item.id));
    } else {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id ? { ...cartItem, quantity } : cartItem
      ));
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + parseFloat(item.newPrice.slice(1)) * item.quantity, 0);

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  return (
    <>
      <div onClick={handleShow} style={{ cursor: 'pointer', padding: '10px 15px', borderRadius: '5px', backgroundColor: '#f8f9fa' }} className="d-flex justify-content-between align-items-center">
        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
        {cartItems.length > 0 && (
          <span className="badge bg-danger rounded-pill ms-2">
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>
      <Modal show={showModal} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton className="bg-dark text-white">
          <Modal.Title>Your Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          {cartItems.length > 0 ? (
            <Container fluid>
              {cartItems.map((item) => (
                <Row key={item.id} className="align-items-center mb-4 pb-3 border-bottom">
                  <Col xs={3} md={2}>
                    <Image src={item.image || 'https://via.placeholder.com/100'} alt={item.name} fluid rounded />
                  </Col>
                  <Col xs={9} md={4}>
                    <h5 className="mb-1">{item.name}</h5>
                    <p className="text-muted mb-0">{item.newPrice}</p>
                  </Col>
                  <Col xs={6} md={3} className="d-flex align-items-center justify-content-center">
                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item, item.quantity - 1)}>
                      <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    <span className="mx-3">{item.quantity}</span>
                    <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(item, item.quantity + 1)}>
                      <FontAwesomeIcon icon={faPlus} />
                    </Button>
                  </Col>
                  <Col xs={6} md={3} className="text-end">
                    <Button variant="danger" size="sm" onClick={() => updateQuantity(item, 0)}>
                      <FontAwesomeIcon icon={faTrash} /> Remove
                    </Button>
                  </Col>
                </Row>
              ))}
              <Row className="mt-4">
                <Col className="text-end">
                  <h4>Total: <span className="text-danger">${totalPrice.toFixed(2)}</span></h4>
                </Col>
              </Row>
            </Container>
          ) : (
            <div className="text-center py-5">
              <FontAwesomeIcon icon={faShoppingCart} size="4x" className="text-muted mb-3" />
              <h4>Your cart is empty!</h4>
              <p className="text-muted">Add some items to your cart and come back here.</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Continue Shopping
          </Button>
          <Button variant="dark" disabled={cartItems.length === 0} onClick={handleCheckout}>
            Proceed to Checkout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Cart;

// src/Components/MyOrder.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function MyOrder() {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/');
        return;
      }
  
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const userOrders = allOrders.filter(order => order.userId === user.id);
      setOrders(userOrders);
    }, [navigate]);

    // Hàm xử lý hủy đơn hàng
    const handleCancelOrder = (orderId) => {
      const updatedOrders = orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancel' } : order
      );
      
      setOrders(updatedOrders); // Cập nhật trạng thái trên giao diện

      // Cập nhật lại trong localStorage
      const allOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedAllOrders = allOrders.map(order => 
        order.id === orderId ? { ...order, status: 'cancel' } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedAllOrders));
    };

    // Hàm render màu sắc cho badge theo trạng thái
    const renderStatusBadge = (status) => {
      switch (status) {
        case 'approve':
          return <Badge bg="success">Approve</Badge>;
        case 'cancel':
          return <Badge bg="danger">Cancel</Badge>;
        case 'pending':
        default:
          return <Badge bg="warning">Pending</Badge>;
      }
    };

    return (
      <Container className="my-5">
        <h2 className="mb-4">My Orders</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          orders.map((order, index) => (
            <Card key={index} className="mb-4">
              <Card.Header>
                <strong>Order Date:</strong> {new Date(order.date).toLocaleString()}
                <span className="ms-3">
                  <strong>Status:</strong> {renderStatusBadge(order.status)}
                </span>
              </Card.Header>
              <ListGroup variant="flush">
                {order.items.map((item, itemIndex) => (
                  <ListGroup.Item key={itemIndex}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} 
                        />
                        <div>
                          <strong>{item.name}</strong> x {item.quantity}
                        </div>
                      </div>
                      <div>${(parseFloat(item.newPrice.slice(1)) * item.quantity).toFixed(2)}</div>
                    </div>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <strong>Total: ${order.totalPrice.toFixed(2)}</strong>
                </ListGroup.Item>
                {order.status === 'pending' && (
                  <ListGroup.Item>
                    <Button variant="danger" onClick={() => handleCancelOrder(order.id)}>
                      Cancel Order
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card>
          ))
        )}
      </Container>
    );
}

export default MyOrder;

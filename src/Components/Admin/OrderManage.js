// src/Components/OrderManage.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Dropdown, Badge, Card, Image, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

function OrderManage() {
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Retrieve all orders from localStorage or initialize sample orders if not present
        const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        if (existingOrders.length === 0) {
            const sampleOrders = [/*... sample data here, as provided above ...*/];
            localStorage.setItem('orders', JSON.stringify(sampleOrders));
            setOrders(sampleOrders);
        } else {
            setOrders(existingOrders);
        }
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));
    };

    const filteredOrders = orders.filter(order => 
        order.userId.toString().includes(searchTerm) || 
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderStatusBadge = (status) => {
        switch (status) {
            case 'approve':
                return <Badge bg="success" pill>Approve</Badge>;
            case 'cancel':
                return <Badge bg="danger" pill>Cancel</Badge>;
            case 'pending':
            default:
                return <Badge bg="warning" pill>Pending</Badge>;
        }
    };

    return (
        <Container className="my-5">
            <Card className="shadow-sm mb-4 border-0">
                <Card.Header className="bg-dark text-white d-flex align-items-center justify-content-between p-3 rounded-top">
                    <h2 className="h4 mb-0">Order Management</h2>
                    <InputGroup className="w-50">
                        <InputGroup.Text><FaSearch /></InputGroup.Text>
                        <Form.Control 
                            type="text" 
                            placeholder="Search by User ID or Status" 
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </InputGroup>
                </Card.Header>
                <Card.Body className="bg-light">
                    <Table striped hover responsive className="table-borderless align-middle">
                        <thead className="table-secondary text-center">
                            <tr>
                                <th>Order ID</th>
                                <th>User ID</th>
                                <th>Items</th>
                                <th>Total Price</th>
                                <th>Order Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => (
                                <tr key={index}>
                                    <td className="text-center">{order.id}</td>
                                    <td className="text-center">{order.userId}</td>
                                    <td>
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="d-flex align-items-center mb-2">
                                                <Image 
                                                    src={item.image} 
                                                    alt={item.name} 
                                                    width={50} 
                                                    height={50} 
                                                    rounded 
                                                    className="me-2 shadow-sm"
                                                />
                                                <div>
                                                    <strong>{item.name}</strong><br />
                                                    <small>Quantity: {item.quantity} - Price: {item.newPrice}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </td>
                                    <td className="text-center">${parseFloat(order.totalPrice).toFixed(2)}</td>
                                    <td className="text-center">{new Date(order.date).toLocaleString()}</td>
                                    <td className="text-center">{renderStatusBadge(order.status)}</td>
                                    <td className="text-center">
                                        <Dropdown>
                                            <Dropdown.Toggle variant="outline-secondary" size="sm" id="dropdown-basic">
                                                Change Status
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, 'pending')}>Pending</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, 'approve')}>Approve</Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleStatusChange(order.id, 'cancel')}>Cancel</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default OrderManage;

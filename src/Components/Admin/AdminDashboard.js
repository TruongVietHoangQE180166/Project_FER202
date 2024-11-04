import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Container, Row, Col, Card, Table, Badge, Button, Form, InputGroup } from 'react-bootstrap';
import { ArrowUp, ArrowDown, Search } from 'lucide-react';

// Add custom CSS
const styles = {
  dashboardContainer: {
    background: '#f8f9fa',
    minHeight: '100vh',
    padding: '2rem'
  },
  card: {
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)'
    }
  },
  statCard: {
    background: 'white',
    padding: '1.5rem'
  },
  statValue: {
    fontSize: '1.8rem',
    fontWeight: '600',
    marginBottom: '0.5rem'
  },
  statTitle: {
    color: '#6c757d',
    fontSize: '0.9rem',
    fontWeight: '500'
  },
  chartCard: {
    padding: '1.5rem',
    height: '100%'
  },
  tableCard: {
    padding: '1.5rem'
  }
};

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [orderStats, setOrderStats] = useState({ approved: 0, pending: 0, canceled: 0 });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(fetchOrders);
    const approvedOrders = fetchOrders.filter(order => order.status === 'approve').length;
    const pendingOrders = fetchOrders.filter(order => order.status === 'pending').length;
    const canceledOrders = fetchOrders.filter(order => order.status === 'cancel').length;
    const revenue = fetchOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    
    setOrderStats({ approved: approvedOrders, pending: pendingOrders, canceled: canceledOrders });
    setTotalRevenue(revenue);
  }, []);

  const COLORS = ['#4CAF50', '#FFC107', '#F44336'];
  
  const pieData = [
    { name: 'Approved', value: orderStats.approved },
    { name: 'Pending', value: orderStats.pending },
    { name: 'Canceled', value: orderStats.canceled },
  ];

  const barData = orders.map(order => ({
    date: new Date(order.date).toLocaleDateString(),
    revenue: order.totalPrice,
  }));

  const stats = [
    {
      title: "Total Revenue",
      value: `$${totalRevenue.toFixed(2)}`,
      percentChange: 12.3,
      trend: "up",
      variant: "primary",
      icon: <ArrowUp size={20} className="text-success" />
    },
    {
      title: "Approved Orders",
      value: orderStats.approved,
      percentChange: 7.1,
      trend: "up",
      variant: "success",
      icon: <ArrowUp size={20} className="text-success" />
    },
    {
      title: "Pending Orders",
      value: orderStats.pending,
      percentChange: -4.5,
      trend: "down",
      variant: "warning",
      icon: <ArrowDown size={20} className="text-danger" />
    },
    {
      title: "Canceled Orders",
      value: orderStats.canceled,
      percentChange: -8.2,
      trend: "down",
      variant: "danger",
      icon: <ArrowDown size={20} className="text-danger" />
    }
  ];

  const filteredOrders = orders.filter(order => 
    order.id.toString().includes(searchTerm) ||
    order.userId.toString().includes(searchTerm) ||
    order.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status) => {
    switch(status) {
      case 'approve': return 'success';
      case 'pending': return 'warning';
      case 'cancel': return 'danger';
      default: return 'secondary';
    }
  };

  return (
    <div style={styles.dashboardContainer}>
      <Container fluid>
        {/* Header */}
        <Row className="mb-4 align-items-center">
          <Col>
            <h1 className="fw-bold text-dark mb-0">Admin Dashboard</h1>
            <p className="text-muted mt-2">Welcome back! Here's what's happening today.</p>
          </Col>
          <Col xs="auto">
            <Button 
              variant="dark" 
              className="d-flex align-items-center gap-2 rounded-pill px-4"
            >
              <Search size={18} />
              Export Data
            </Button>
          </Col>
        </Row>

        {/* Stats Cards */}
        <Row className="g-4 mb-4">
          {stats.map((stat, index) => (
            <Col key={index} xs={12} md={6} lg={3}>
              <Card style={styles.card} className="h-100">
                <Card.Body style={styles.statCard}>
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div>
                      <h6 className="text-muted mb-2" style={styles.statTitle}>{stat.title}</h6>
                      <h3 style={styles.statValue}>{stat.value}</h3>
                    </div>
                    <div className={`rounded-circle p-2 bg-${stat.variant} bg-opacity-10`}>
                      {stat.icon}
                    </div>
                  </div>
                  <div className={`d-flex align-items-center text-${stat.variant}`}>
                    <span className="fw-semibold">{Math.abs(stat.percentChange)}%</span>
                    <span className="ms-2 text-muted small">vs last month</span>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {/* Charts */}
        <Row className="g-4 mb-4">
          <Col xs={12} lg={6}>
            <Card style={styles.card}>
              <Card.Body style={styles.chartCard}>
                <h5 className="fw-bold mb-4">Order Status Distribution</h5>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} lg={6}>
            <Card style={styles.card}>
              <Card.Body style={styles.chartCard}>
                <h5 className="fw-bold mb-4">Revenue Trend</h5>
                <div style={{ height: '300px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="purple" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Orders Table */}
        <Card style={styles.card}>
          <Card.Body style={styles.tableCard}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Recent Orders</h5>
              <Col xs={12} md={4}>
                <InputGroup>
                  <InputGroup.Text className="bg-white border-end-0">
                    <Search size={18} />
                  </InputGroup.Text>
                  <Form.Control
                    className="border-start-0 ps-0"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
              </Col>
            </div>
            <div className="table-responsive">
              <Table hover className="align-middle">
                <thead className="bg-light">
                  <tr>
                    <th className="border-0">Order ID</th>
                    <th className="border-0">User ID</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Total Price</th>
                    <th className="border-0">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td className="fw-semibold">#{order.id}</td>
                      <td>{order.userId}</td>
                      <td>
                        <Badge 
                          bg={getStatusBadgeVariant(order.status)}
                          className="rounded-pill px-3 py-2"
                        >
                          {order.status}
                        </Badge>
                      </td>
                      <td className="fw-semibold">${order.totalPrice.toFixed(2)}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdminDashboard;
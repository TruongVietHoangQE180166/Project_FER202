import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBox, faShoppingCart, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './AdminNavbar.css';

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="admin-navbar">
      <div>
        <h5>INFINITY TECH SHOP</h5>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/admin" className="nav-link-custom">
            <FontAwesomeIcon icon={faTachometerAlt} />
            <span style={{ marginLeft: '8px' }}>Dashboard</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/products" className="nav-link-custom">
            <FontAwesomeIcon icon={faBox} />
            <span style={{ marginLeft: '8px' }}>Product Manage</span>
          </Nav.Link>
          <Nav.Link as={Link} to="/admin/orders" className="nav-link-custom">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: '8px' }}>Order Manage</span>
          </Nav.Link>
        </Nav>
      </div>
      <Button variant="outline-light" onClick={handleLogout}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span style={{ marginLeft: '8px' }}>Log Out</span>
      </Button>
    </div>
  );
}

export default AdminNavbar;

import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './Narbar'; // Đảm bảo đường dẫn chính xác

function AdminPage() {
    return (
        <div style={{ display: 'flex' }}>
            <AdminNavbar /> {/* Hiển thị Navbar cho Admin */}
            <Container style={{ marginLeft: '220px', padding: '2rem' }}>
                <Outlet /> {/* Sử dụng Outlet để hiển thị các trang con */}
            </Container>
        </div>
    );
}

export default AdminPage;
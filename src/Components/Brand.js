import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

// Danh sách các thương hiệu với tên, logo và liên kết tương ứng
const brands = [
  { name: 'Dell', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg', link: 'https://www.dell.com' },
  { name: 'ASUS', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/AsusTek-black-logo.png', link: 'https://www.asus.com' },
  { name: 'HP', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg', link: 'https://www.hp.com' },
  { name: 'Lenovo', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Lenovo_logo_2015.svg', link: 'https://www.lenovo.com' },
  { name: 'Acer', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Acer_Inc._logo_from_1987-2001.svg', link: 'https://www.acer.com' },
  { name: 'ThinkPad', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/09/ThinkPad_Logo.svg', link: 'https://www.lenovo.com/thinkpad' },
  { name: 'MSI', logo: 'https://upload.wikimedia.org/wikipedia/vi/6/6c/Msi_logo.png', link: 'https://www.msi.com' },
  { name: 'Gigabyte', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Gigabyte_Technology_logo_20080107.svg', link: 'https://www.gigabyte.com' },
  { name: 'MacBook', logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', link: 'https://www.apple.com/macbook' },
];

// Hàm xử lý sự kiện khi bấm vào nút
function handleBrandClick(link) {
    window.open(link, '_blank'); // Mở liên kết trong tab mới
  }
  
  // Component hiển thị danh sách logo trên một hàng
  function BrandList() {
    return (
      <Container className="d-flex justify-content-center align-items-center py-5 flex-wrap">
        {brands.map((brand, index) => (
          <Button
            key={index}
            variant="outline-light"
            className="border rounded-pill p-3 shadow-sm mx-2"
            style={{ width: '120px' }}
            onClick={() => handleBrandClick(brand.link)}
          >
            <img src={brand.logo} alt={brand.name} style={{ maxWidth: '100%', height: '40px' }} />
          </Button>
        ))}
      </Container>
    );
  }
  
  export default BrandList;
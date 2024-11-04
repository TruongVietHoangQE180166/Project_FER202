// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './Components/Header';
import MyCarousel from './Components/MyCarousel';
import WebFooter from './Components/WebFooter';
import BrandList from './Components/Brand';
import ProductCarousel from './Components/ProductCarousel';
import ProductOfTheYear from './Components/Banner';
import Products from './Components/Products';
import Contact from './Components/Contact';
import About from './Components/About';
import AdminPage from './Components/Admin/AdminPage';
import AdminDashboard from './Components/Admin/AdminDashboard'; // Import các trang quản lý
import ProductManage from './Components/Admin/ProductManage';
import OrderManage from './Components/Admin/OrderManage';
import Checkout from "./Components/Checkout";
import MyOrder from "./Components/MyOrder";
import ProductDetail from "./Components/ProductDetail";






function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([
  { id: 1, name: 'MacBook Pro', category: 'Laptops', image: 'https://image.anhducdigital.vn/apple/macbook/macbook-pro/macbook-pro-2022/macbook-pro-2022-01-500x500.jpg', onSale: true, oldPrice: '$1200.00', newPrice: '$1099.00' },
  { id: 2, name: 'Dell XPS 13', category: 'Laptops', image: 'https://macstores.vn/wp-content/uploads/2021/10/dell-xps-13-inch-9310-1.jpg', onSale: false, newPrice: '$999.00' },
  { id: 3, name: 'Asus ROG Zephyrus', category: 'Laptops', image: 'https://songphuong.vn/Content/uploads/2020/11/ASUS-ROG-Zephyrus-S17-GX701LXS-HG038T-songphuong.vn_-e1606536779314.jpg', onSale: true, oldPrice: '$1500.00', newPrice: '$1299.00' },
  { id: 4, name: 'HP Spectre x360', category: 'Laptops', image: 'https://laptopworld.vn/media/product/19155_hp_spectre_x360_14_eu0050tu__5.jpg', onSale: false, newPrice: '$1099.00' },

  { id: 5, name: 'iPhone 13', category: 'Phones and Accessories', image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/591757101.jpeg', onSale: true, oldPrice: '$799.00', newPrice: '$699.00' },
  { id: 6, name: 'Samsung Galaxy S21', category: 'Phones and Accessories', image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/1777020013.jpeg', onSale: false, newPrice: '$749.00' },
  { id: 7, name: 'OnePlus 9 Pro', category: 'Phones and Accessories', image: 'https://cdn.xtmobile.vn/vnt_upload/product/12_2023/thumbs/(500x500)_crop_oneplus-12-12gb-256gb-xtmobile_1.jpg', onSale: true, oldPrice: '$969.00', newPrice: '$849.00' },
  { id: 8, name: 'Google Pixel 6', category: 'Phones and Accessories', image: 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/181/18165/18165475.jpg', onSale: false, newPrice: '$599.00' },

  { id: 9, name: 'Sony WH-1000XM4', category: 'Audio Devices', image: 'https://bizweb.dktcdn.net/thumb/grande/100/340/129/products/wh-1000xm4-tai-nghe-chong-on-sony-cuong-phan-15.jpg?v=1714534536050', onSale: true, oldPrice: '$349.00', newPrice: '$299.00' },
  { id: 10, name: 'Bose QuietComfort 45', category: 'Audio Devices', image: 'https://antien.vn/files/products/2022/01/10/tai-nghe-bose-quietcomfort-45-chinh-hang.jpg', onSale: false, newPrice: '$329.00' },
  { id: 11, name: 'Apple AirPods Pro', category: 'Audio Devices', image: 'https://product.hstatic.net/1000259254/product/apple_airpods_pro-anh1_06e5affff22f40dca50bb13d0ce86316_grande.jpg', onSale: true, oldPrice: '$249.00', newPrice: '$199.00' },
  { id: 12, name: 'JBL Flip 5 Speaker', category: 'Audio Devices', image: 'https://phukiendidong.com/wp-content/uploads/2020/07/LOA-BLUETOOTH-JBL-FLIP-5-e1595926149890.jpg', onSale: false, newPrice: '$119.00' },

  { id: 13, name: 'Fitbit Charge 5', category: 'Wearables', image: 'https://cello.vn/image/cache/catalog/Cello/SanPham/Dong%20Ho%20Thong%20Minh/Fitbit/Charge%205/Charge5_Black-500x500.jpg', onSale: true, oldPrice: '$179.00', newPrice: '$149.00' },
  { id: 14, name: 'Apple Watch Series 7', category: 'Wearables', image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/p/apple_watch_series_7_gps_41mm_starlight_aluminum_starlight_sport_band_34fr_screen__usen_copy_2_2.jpg', onSale: false, newPrice: '$399.00' },
  { id: 15, name: 'Samsung Galaxy Watch 4', category: 'Wearables', image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/1688944944.jpeg', onSale: true, oldPrice: '$249.00', newPrice: '$199.00' },
  { id: 16, name: 'Garmin Forerunner 245', category: 'Wearables', image: 'https://image.anhducdigital.vn/di-dong/dong-ho-thong-minh/garmin/garmin-forerunner-245/garmin-forerunner-245-05-500x500.jpg', onSale: false, newPrice: '$299.00' }
  ]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  
  useEffect(() => {
    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
  
    if (existingOrders.length === 0) {  // Nếu chưa có dữ liệu trong orders
      const sampleOrders = [
        {
          id: 1,
          userId: 1,
          items: [
            { id: 1, name: 'MacBook Pro', newPrice: '$1099.00', quantity: 1, image: 'https://image.anhducdigital.vn/apple/macbook/macbook-pro/macbook-pro-2022/macbook-pro-2022-01-500x500.jpg' },
            { id: 5, name: 'iPhone 13', newPrice: '$699.00', quantity: 2, image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/591757101.jpeg' },
          ],
          totalPrice: 2497.00,
          date: new Date().toISOString(),
          status: 'pending',
        },
        {
          id: 2,
          userId: 2,
          items: [
            { id: 2, name: 'Dell XPS 13', newPrice: '$999.00', quantity: 1, image: 'https://macstores.vn/wp-content/uploads/2021/10/dell-xps-13-inch-9310-1.jpg' },
            { id: 11, name: 'Apple AirPods Pro', newPrice: '$199.00', quantity: 1, image: 'https://product.hstatic.net/1000259254/product/apple_airpods_pro-anh1_06e5affff22f40dca50bb13d0ce86316_grande.jpg' },
          ],
          totalPrice: 1198.00,
          date: new Date().toISOString(),
          status: 'approve',
        },
        {
          id: 3,
          userId: 3,
          items: [
            { id: 3, name: 'Asus ROG Zephyrus', newPrice: '$1299.00', quantity: 1, image: 'https://songphuong.vn/Content/uploads/2020/11/ASUS-ROG-Zephyrus-S17-GX701LXS-HG038T-songphuong.vn_-e1606536779314.jpg' },
          ],
          totalPrice: 1299.00,
          date: new Date().toISOString(),
          status: 'pending',
        },
        {
          id: 4,
          userId: 1,
          items: [
            { id: 4, name: 'HP Spectre x360', newPrice: '$1099.00', quantity: 1, image: 'https://laptopworld.vn/media/product/19155_hp_spectre_x360_14_eu0050tu__5.jpg' },
            { id: 7, name: 'OnePlus 9 Pro', newPrice: '$849.00', quantity: 2, image: 'https://cdn.xtmobile.vn/vnt_upload/product/12_2023/thumbs/(500x500)_crop_oneplus-12-12gb-256gb-xtmobile_1.jpg' },
          ],
          totalPrice: 2797.00,
          date: new Date().toISOString(),
          status: 'cancel',
        },
        {
          id: 5,
          userId: 2,
          items: [
            { id: 9, name: 'Sony WH-1000XM4', newPrice: '$299.00', quantity: 1, image: 'https://bizweb.dktcdn.net/thumb/grande/100/340/129/products/wh-1000xm4-tai-nghe-chong-on-sony-cuong-phan-15.jpg?v=1714534536050' },
            { id: 13, name: 'Fitbit Charge 5', newPrice: '$149.00', quantity: 1, image: 'https://cello.vn/image/cache/catalog/Cello/SanPham/Dong%20Ho%20Thong%20Minh/Fitbit/Charge%205/Charge5_Black-500x500.jpg' },
          ],
          totalPrice: 448.00,
          date: new Date().toISOString(),
          status: 'approve',
        },
        {
          id: 6,
          userId: 3,
          items: [
            { id: 8, name: 'Google Pixel 6', newPrice: '$599.00', quantity: 1, image: 'https://multimedia.bbycastatic.ca/multimedia/products/500x500/181/18165/18165475.jpg' },
            { id: 16, name: 'Garmin Forerunner 245', newPrice: '$299.00', quantity: 1, image: 'https://image.anhducdigital.vn/di-dong/dong-ho-thong-minh/garmin/garmin-forerunner-245/garmin-forerunner-245-05-500x500.jpg' },
          ],
          totalPrice: 898.00,
          date: new Date().toISOString(),
          status: 'pending',
        },
        {
          id: 7,
          userId: 1,
          items: [
            { id: 14, name: 'Apple Watch Series 7', newPrice: '$399.00', quantity: 1, image: 'https://cdn2.cellphones.com.vn/x/media/catalog/product/a/p/apple_watch_series_7_gps_41mm_starlight_aluminum_starlight_sport_band_34fr_screen__usen_copy_2_2.jpg' },
          ],
          totalPrice: 399.00,
          date: new Date().toISOString(),
          status: 'approve',
        },
        {
          id: 8,
          userId: 2,
          items: [
            { id: 6, name: 'Samsung Galaxy S21', newPrice: '$749.00', quantity: 1, image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/1777020013.jpeg' },
          ],
          totalPrice: 749.00,
          date: new Date().toISOString(),
          status: 'pending',
        },
        {
          id: 9,
          userId: 3,
          items: [
            { id: 15, name: 'Samsung Galaxy Watch 4', newPrice: '$199.00', quantity: 2, image: 'https://cdn.viettelstore.vn/Images/Product/ProductImage/1688944944.jpeg' },
          ],
          totalPrice: 398.00,
          date: new Date().toISOString(),
          status: 'approve',
        },
        {
          id: 10,
          userId: 1,
          items: [
            { id: 12, name: 'JBL Flip 5 Speaker', newPrice: '$119.00', quantity: 3, image: 'https://phukiendidong.com/wp-content/uploads/2020/07/LOA-BLUETOOTH-JBL-FLIP-5-e1595926149890.jpg' },
          ],
          totalPrice: 357.00,
          date: new Date().toISOString(),
          status: 'cancel',
        },
      ];
  
      localStorage.setItem('orders', JSON.stringify(sampleOrders));
    }
  }, []);
  
  




  
  return (
    <Router>
      <Routes>
        {/* Các route với Header và Footer */}
        <Route
          path="/"
          element={
            <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              <MyCarousel />
              <BrandList />
              
              <ProductOfTheYear />
              <h1></h1>
              <ProductCarousel addToCart={addToCart} products={products} />
              <WebFooter />
            </>
          }
        />
        <Route
          path="/products"
          element={
            <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              <Products addToCart={addToCart} products={products} />
              <WebFooter />
            </>
          }
        />
        
        <Route
          path="/contact"
          element={
            <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              <Contact />
              <WebFooter />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              <About />
              <WebFooter />
            </>
          }
        />
        <Route 
        path="/checkout" 
        element={
          <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              <Checkout cartItems={cartItems} setCartItems={setCartItems}/>
              <WebFooter />
   
    
    </>
  } 
/>
          <Route
          path="/my-orders"
          element={
            <>
              <Header cartItems={cartItems} setCartItems={setCartItems} />
              
              <MyOrder  />
              
              <WebFooter />
            </>
          }
        />
          <Route path="/product/:id" element={
            <>
            <Header cartItems={cartItems} setCartItems={setCartItems} />
            <ProductDetail products={products} addToCart={addToCart} />
            <WebFooter />
            </>
            } />

        {/* Route cho Admin Dashboard, không có Header và Footer */}
        <Route path="/admin" element={<AdminPage />}>
          <Route index element={<AdminDashboard products={products}/>} /> {/* Mặc định là Dashboard */}
          <Route path="products" element={<ProductManage products = {products} setProducts = {setProducts}/>} />
          <Route path="orders" element={<OrderManage />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import '../Style/MyCarousel.css'; // Make sure to create and import your CSS file

function MyCarousel() {
  return (
    <Container> {/* Use p-0 to remove padding */}
      <Carousel id="carouselExample" className="full-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://images6.alphacoders.com/112/1128061.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Smartphone</h3>
            <p>Explore the latest smartphones in the market.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://i.pinimg.com/originals/92/08/a9/9208a991148d5ceeccc502a0146b05ef.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Laptop</h3>
            <p>Discover cutting-edge laptops for all your needs.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://www.dell.com/community/assets/community/687062f5-603c-4f5f-ab9d-31aa7cacb376/AlienwareWallpaper-bc68301f-fb78-4323-a44e-34500cf6f4b3-1036433598"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Tech Accessories</h3>
            <p>Find the best tech accessories for your devices.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://wallpapers.com/images/hd/lenovo-legion-logo-dark-abstract-background-6jmaolfenmnd7b75.jpg"
            alt="Fourth slide"
          />
          <Carousel.Caption>
            <h3>Circuit Board</h3>
            <p>Explore the world of electronics and circuit design.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src="https://wallpapers.com/images/featured/apple-k2475ozowx4qo6bv.jpg"
            alt="Fifth slide"
          />
          <Carousel.Caption>
            <h3>IoT Device</h3>
            <p>Innovate with IoT devices transforming our lives.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default MyCarousel;

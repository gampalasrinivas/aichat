"use client";

import React, { useEffect, useState } from 'react';
import '../defaultpage.css'; // Import your CSS file

const DefaultPage: React.FC = () => {
  const images = [
    "url(bk_sunrise.jpeg)",
    "url(bk_morning.jpg)",
    "url(bk_noon.jpeg)",
    "url(bk_evening.jpg)",
    "url(bk_night.jpg)",
  ];

const hoverStyle = {
  ':hover': {
    transform: 'scale(1.05)', 
  },
};  
  const handleClick = (alt: string) => {
    alert(`You clicked on ${alt}`);
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

const handleHover = (event: React.MouseEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  target.style.transform = 'scale(1.05)'; 
  target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)'; 
  target.style.cursor = 'pointer';
};

const handleLeave = (event: React.MouseEvent<HTMLImageElement>) => {
  const target = event.currentTarget;
  target.style.transform = 'scale(1)'; 
  target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'; 
};  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10000); 

    return () => clearInterval(intervalId); 
  }, [images.length]);
  const backgroundStyle: React.CSSProperties = {
    height: '100vh',
    width: '100vw',
    backgroundImage: images[currentImageIndex],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'background-image 1s ease-in-out', 
    position: 'relative', 
  };

  return <div style={backgroundStyle}>
        <div  className="container">
      
      <div className="login">
        <button className="login-button">Login</button>
      </div>
      
      <div className="image-container-header">
        <img src="header.jpg" alt="Centered Visual" className="centered-image" />
      </div>
      
      <div className={"text-container".concat(currentImageIndex.toString())}>
        <p className="text-header"><b>Welcome !</b></p>
        <p className="text-line">We're here to celebrate with your parenthood and</p>
        <p className="text-line">help you nurture your little one's health and happiness.</p>
      </div>

      <div className="image-block">
        <div className="image-container-base">
          {Array.from({ length: 3 }).map((_, index) => (
            <img 
              key={index} 
              src={"clk_base_image_".concat(index.toString().concat(".jpg"))}
              alt={`Image ${index + 1}`} 
              className="grid-image" 
              onClick={() => handleClick("clk_base_image_".concat(index.toString().concat(".jpg")))}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>        
        <div className="image-container">
          {Array.from({ length: 4 }).map((_, index) => (
            <img 
              key={index} 
              src={"clk_image_".concat(index.toString().concat(".jpg"))}
              alt={`Image ${index + 1}`} 
              className="grid-image" 
              onClick={() => handleClick("clk_image_".concat(index.toString().concat(".jpg")))}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
            />
          ))}
        </div>
      </div>
    </div>
  </div>;
};

export default DefaultPage;

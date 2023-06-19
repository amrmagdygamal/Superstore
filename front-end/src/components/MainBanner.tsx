import React from 'react';
import Swiper from 'react-id-swiper';
import { Link } from 'react-router-dom';
import 'swiper/swiper.css';



const MainBanner = () => {

  const swiperParams = {
    loop: true,
    autoplay: {
      delay: 5000, // 5 seconds
      disableOnInteraction: false,
    },
  };


  return (
    <Swiper {...swiperParams}>
      
      
      
    </Swiper>
  );
}

export default MainBanner
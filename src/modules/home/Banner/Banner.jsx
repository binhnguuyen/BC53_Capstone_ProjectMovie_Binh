import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBannersAPI } from "../../../apis/movieApi";
import Slider from "react-slick";
import { Box, Skeleton } from "@mui/material";

// thư viện Lottie
import Lottie from 'react-lottie';
import animationData from "../../../Lotties/Aniki Hamster.json"

// setting của slick
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
};

const Banner = () => {
  // thư viện Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  // khi load trang lên, thằng banner chạy thì nó sẽ chạy thằng useQuerry và get API
  // đặt data là 1 cái mảng ngay từ đầu luôn để nó ko bị undefined lúc đầu
  // dùng useQuery để khi có 1 thay đổi thì nó sẽ GET API về
  const { data = [], isLoading, isError, error } = useQuery({
    // key để caching lại data
    queryKey: ["banner"],
    // function nhận 1 cái async function, cái async function đc viết bên movieApi để tăng tính tái sử dụng
    queryFn: getBannersAPI,
  });


  if (isLoading) {
    return (
      // thư viện Lottie
      // <Lottie options={defaultOptions} width={300} height={300}/>
      // Skeleton này khi loading nó sẽ chỉ hiện ra trong lúc chờ load API kiểu giống FaceBook và Youtube
      <Skeleton variant="rectangular" sx={{ height: 500 }} animation="wave" />
    );
  }

  return (
    <div>
      
      {/* {
        data.map((item) => {
          return (
            <img
              src={item.hinhAnh}
              width="100%"
              height={400}
              style={{ objectFit: "cover" }}
            />
          );
        })
      } */}
      {/* slider này nó clone lại cái settings */}
      {/* ko viết vầy thì có thể viết như sau
      < Slider dots={settings.dots}
      infinite={settings.infinite}
      speed={settings.speed} 
      slidesToShow={settings.slidesToShow}
      slidesToScroll={settings.slidesToScroll}
      > */}
      <Slider
        // dot={settings.dots}
        // infinite={settings.infinite}
        // speed={settings.speed}
        // slidesToShow={settings.slidesToShow}
        // slidesToScroll={settings.slidesToScroll}
        {...settings}
      >
        {data.map((item, index) => {
          return (
            // cái box này để bọc lại phần nội dung của carousel
            <Box sx={{ height: 400 }} key={index}>
              <img
                src={item.hinhAnh}
                width="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>
          );
        })}
      </Slider>
    </div >
  );

};

export default Banner;
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getBannersAPI } from "../../../apis/movieApi";
import Slider from "react-slick";
import { Box, Container, Grid, Skeleton } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
  // khi load trang lên, thằng banner chạy thì nó sẽ chạy thằng useQuerry và get API
  // đặt data là 1 cái mảng ngay từ đầu luôn để nó ko bị undefined lúc đầu
  // dùng useQuery để khi có 1 thay đổi thì nó sẽ GET API về
  const { data = [], isLoading, isError, error } = useQuery({
    // key để caching lại data
    queryKey: ["banner"],
    // function nhận 1 cái async function, cái async function đc viết bên movieApi để tăng tính tái sử dụng
    queryFn: getBannersAPI,
  });

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'grey' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



  if (isLoading) {
    return (
      // Skeleton này khi loading nó sẽ chỉ hiện ra trong lúc chờ load API kiểu giống FaceBook và Youtube
      <Grid container >
        <Grid item xs={12} md={12} lg={12}>
          <Item>
            <Skeleton variant="rounded" sx={{ height: 500 }} animation="wave" style={{ margin: 10 }} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Skeleton variant="rounded" sx={{ height: 400 }} animation="wave" style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} width="80%" style={{ margin: 10 }} />
            <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Skeleton variant="rounded" sx={{ height: 400 }} animation="wave" style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} width="80%" style={{ margin: 10 }} />
            <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
          </Item>
        </Grid>
        <Grid item xs={4}>
          <Item>
            <Skeleton variant="rounded" sx={{ height: 400 }} animation="wave" style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} style={{ margin: 10 }} />
            <Skeleton animation="wave" height={25} width="80%" style={{ margin: 10 }} />
            <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
          </Item>
        </Grid>
      </Grid>
    );
  }

  return (
    <Container maxWidth="xl" sx={{marginBottom: 10}}>
      <Slider
        // slider này nó clone lại cái settings
        {...settings}
      >
        {data.map((item, index) => {
          return (
            // cái box này để bọc lại phần nội dung của carousel
            <Box style={{ height: "auto", width: "100%"}} key={index}>
              <img
                src={item.hinhAnh}
                width="100%"
                style={{ objectFit: "cover" }}
              />
            </Box>
          );
        })}
      </Slider>
    </Container >
  );

};

export default Banner;
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getListMovieAPI } from "../../../apis/movieApi";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container, Skeleton, Box } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
import { blue } from '@mui/material/colors';

const Showing = () => {

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    autoplay: true,
    initialSlide: 0,
    rows: 2,
    dots: true,
    swipeToSlide: true,
    customPaging: i => (
      <div
        style={{
          margin: "5px",
          padding: "2px",
          fontSize: 20,
          width: "30px",
          color: 'black',
          // backgroundColor: `${blue[200]}`,
          border: `1px ${blue[500]} solid`,
          borderRadius: "5px",
        }}
      >
        {i + 1}
      </div>
    )
  };

  // cái hook giúp mình chuyển trang
  const navigate = useNavigate()
  // khi load trang lên, thằng banner chạy thì nó sẽ chạy thằng useQuerry và get API
  // đặt data là 1 cái mảng ngay từ đầu luôn để nó ko bị undefined lúc đầu
  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["showing"],
    // queryFn ko truyền vào tham số thì gọi thế này(nếu có truyền tham số thì phải gọi bằng 1 callback)
    queryFn: getListMovieAPI,
  });


  // if (isLoading) {
  //   return (
  //     // Skeleton này khi loading nó sẽ chỉ hiện ra trong lúc chờ load API kiểu giống FaceBook và Youtube
  //     <Skeleton variant="rectangular" sx={{ height: 500 }} animation="wave" />
  //   );
  // }

  return (
    // thằng Container này từ MUI, thay nó cho thằng div
    // nó sẽ có chức năng giống container của BS
    <Container maxWidth="xl" sx={{ marginBottom: 10 }} spacing={2}>
      {/* <Button variant="outlined" size="large">
        Hello World
      </Button> */}
      {/* thằng Grid này giống row trong BS */}
      <Slider {...settings}>
        {data.map((item) => (
          <Card >
            {
              isLoading ? (
                <Box>
                  <Skeleton variant="rounded" sx={{ height: 400 }} animation="wave" style={{ margin: 10 }} />
                  <Skeleton animation="wave" height={25} style={{ margin: 10 }} />
                  <Skeleton animation="wave" height={25} width="80%" style={{ margin: 10 }} />
                  <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
                </Box>
              ) : (
                <Box>
                  {/* <CardMedia
                    sx={{
                      height: 400,
                      border: "2px solid #1976d2",
                      borderRadius: "10px",
                      cursor: "pointer",
                    }} 
                    title="green iguana"
                    image={item.hinhAnh}
                    onClick={() => {
                      navigate(`movie/${item.maPhim}`)
                    }}
                  /> */}
                  <Button
                    onClick={() => {
                      navigate(`movie/${item.maPhim}`)
                    }}
                  >
                    <img
                      src={item.hinhAnh}
                      width="100%"
                      style={{
                        height: 800,
                        objectFit: "cover",
                        border: "2px solid #1976d2",
                        borderRadius: "10px",
                      }}
                    />
                  </Button>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="truncate" >
                      {item.tenPhim}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="truncate truncate--1">
                      {item.moTa}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small"
                      variant="contained"
                      fullWidth
                      onClick={() => {
                        navigate(`movie/${item.maPhim}`)
                      }}
                    >Xem chi tiết
                    </Button>
                  </CardActions>
                </Box>
              )
            }
          </Card>
        ))}
      </Slider>

    </Container>
  );

};

export default Showing
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getListMovieAPI } from "../../../apis/movieApi";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container, Skeleton, Box, Rating } from "@mui/material"
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
import { blue } from '@mui/material/colors';
import { useAuth, useDarkMode } from "../../../contexts/UserContext/UserContext";
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';

const Showing = () => {

  const { isDarkMode } = useDarkMode();

  const settings = {
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    speed: 500,
    autoplaySpeed: 2000,
    slidesToShow: 4,
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
          // color: 'black',
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
    <Container style={{ maxWidth: "1600px" }} sx={{ marginBottom: 10 }} spacing={2}>
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
                <Box className={isDarkMode ? 'dark-mode' : 'light-mode'}
                style={{
                  padding: "10px 10px",
                }}
                >
                  <CardMedia
                    onClick={() => {
                      navigate(`movie/${item.maPhim}`)
                    }}
                  >
                    <img
                      src={item.hinhAnh}
                      style={{
                        width: "100%",
                        height: "25vw",
                        objectFit: "cover",
                        margin: "0 auto",
                        border: "2px solid #1976d2",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h4"
                      // style={{fontSize: 12,}}
                      component="div"
                      className="truncate" >
                      {item.tenPhim}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      className="truncate"
                      marginBottom={2}
                    >
                      Đánh giá:
                    </Typography>
                    <Rating name="size-large" defaultValue={item.danhGia / 2} size="large"></Rating>
                    <Typography
                      variant="h6"
                      className="truncate truncate--1">
                      {item.moTa}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="large"
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
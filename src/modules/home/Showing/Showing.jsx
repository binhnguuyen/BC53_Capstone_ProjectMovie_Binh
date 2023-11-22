import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { getListMovieAPI } from "../../../apis/movieApi";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Container, Skeleton } from "@mui/material"
import { useNavigate } from 'react-router-dom';

// thư viện Lottie
import Lottie from 'react-lottie';
import animationData from "../../../Lotties/Aniki Hamster.json"

const Showing = () => {
  // thư viện Lottie
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  // cái hook giúp mình chuyển trang
  const navigate = useNavigate()
  // khi load trang lên, thằng banner chạy thì nó sẽ chạy thằng useQuerry và get API
  // đặt data là 1 cái mảng ngay từ đầu luôn để nó ko bị undefined lúc đầu
  const { data = [], isLoading, isError, error } = useQuery({
    queryKey: ["showing"],
    queryFn: getListMovieAPI,
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
    // thằng Container này từ MUI, thay nó cho thằng div
    // nó sẽ có chức năng giống container của BS
    <Container maxWidth="xl">
      {/* <Button variant="outlined" size="large">
        Hello World
      </Button> */}
      {/* thằng Grid này giống row trong BS */}
      <Grid container spacing={2}>
        {/* row */}
        {data.map((item) => (
          // col-x trong BS
          <Grid item xs={4} key={item.maPhim}>
            {/* col */}
            <Card >
              <CardMedia
                sx={{ height: 400 }}
                image={item.hinhAnh}
                title="green iguana"
              />
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
                  className="truncate truncate--2">
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );

};

export default Showing
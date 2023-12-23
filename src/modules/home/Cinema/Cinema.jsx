import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Skeleton, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getTheaterSystemInfo, getTheaterInfo, getShowtimeInfo } from '../../../apis/cinemaAPI';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import { red } from '@mui/material/colors';
import dayjs from 'dayjs';
import { useAuth, useDarkMode } from "../../../contexts/UserContext/UserContext";
import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';


// Ở đầy dùng Vertical tabs của MUI
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const Cinema = () => {
  const { isDarkMode } = useDarkMode();

  const settings = {
    dots: true,
    slidesToShow: 3,
    swipeToSlide: true,
    slidesToScroll: 3,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    infinite: true,
  };

  const typographySettings = {
    variant: "h6",
    style: {
      fontSize: 20,
      fontWeight: 700,
      textAlign: "left",
    }
  }


  const navigate = useNavigate()


  const [theaterSystemId, setTheaterSystemId] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [showtimeInfo, setShowtimeInfo] = useState("");


  const { data: theaterSystemData, isLoading: isLoadingTheaterSysytem } = useQuery({
    queryKey: ["TheaterSystemInfo"],
    // queryFn ko truyền vào tham số thì gọi thế này(nếu có truyền tham số thì phải gọi bằng 1 callback)
    queryFn: getTheaterSystemInfo,
  });
  const theaterSystem = theaterSystemData || [];


  const { data: theaterData, isLoading: isLoadingTheaterInfo } = useQuery({
    queryKey: ["TheaterInfo", theaterSystemId],
    // queryFn có truyền vào tham số thì gọi kiểu callback
    queryFn: () => getTheaterInfo(theaterSystemId),
    enabled: !!theaterSystemId,
  });
  const theater = theaterData || [];


  const { data: showtimeData, isLoading: isLoadingShowtimeInfo } = useQuery({
    queryKey: ["ShowtimeInfo", theaterSystemId],
    // queryFn có truyền vào tham số thì gọi kiểu callback
    queryFn: () => getShowtimeInfo(theaterSystemId),
    enabled: !!theaterSystemId,
  });
  const showtime = showtimeData || [];



  const handleChangeTheaterSystemId = (newValue) => {
    setTheaterSystemId(newValue);
  };


  const handleChangeTheaterId = (newValue) => {
    setTheaterId(newValue);
    handleChangeShowtimeInfo(newValue);
  }


  const handleChangeShowtimeInfo = (newValue) => {
    var showtimeList = [];
    for (let i in showtime[0]?.lstCumRap) {
      if (newValue === showtime[0]?.lstCumRap[i].maCumRap) {
        for (let j in showtime[0]?.lstCumRap[i].danhSachPhim) {
          showtimeList.push(showtime[0]?.lstCumRap[i].danhSachPhim[j]);
        }
        break;
      }
    }
    setShowtimeInfo(showtimeList);
  }


  // khi theaterSystem thay đổi (>0) thì mặc định render ra thằng đầu tiên
  useEffect(() => {
    if (theaterSystem.length > 0) {
      setTheaterSystemId(theaterSystem[0].maHeThongRap);
    }
  }, [theaterSystem]);

  useEffect(() => {
    if (theater.length > 0) {
      setTheaterId(theater[0].maCumRap);
      handleChangeShowtimeInfo(theater[0].maCumRap);
    }
  }, [theater]);

  useEffect(() => {
    if (showtime[0]?.lstCumRap.length > 0) {
      handleChangeShowtimeInfo(theater[0].maCumRap);
    }
  }, [showtime[0]?.lstCumRap]);


  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Tabs
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            // truyền thêm prop value vào, cái value này tương đương với value trong Tab bên dưới
            value={theaterSystemId}
            onChange={(event, newValue) => {
              // console.log("newValue", newValue);
              // console.log("event", event);
              handleChangeTheaterSystemId(newValue);
            }}
          >
            {theaterSystem.map((item) => {
              return (
                <Tab
                  key={item.maHeThongRap}
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  // onClick={() => handleChangeTheaterSystemId(item.maHeThongRap)}
                  label={<img src={item.logo} style={{ width: 100 }} />}
                  // {...a11yProps(item.maHeThongRap)}
                  // truyền thêm prop value vào, tương ứng với value trên Tabs
                  value={item.maHeThongRap}
                />
              );
            })}
          </Tabs>
        </Grid>
        <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
          <Tabs
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            // truyền thêm prop value vào, cái value này tương đương với value trong Tab bên dưới
            value={theaterId}
            onChange={(event, newValue) => {
              handleChangeTheaterId(newValue);
            }}
          >
            {theater?.map((item) => {
              return (
                <Tab
                  sx={{ borderBottom: 1, borderColor: "divider", width: "100%" }}
                  key={item.maCumRap}
                  // onClick={() => handleChangeTheaterId(item.maCumRap)}
                  label={
                    <Box textAlign="left" className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                      <Typography {...typographySettings}>
                        {item.tenCumRap}
                      </Typography>
                      <Typography {...typographySettings}>
                        Địa Chỉ: {item.diaChi}
                      </Typography>
                      <Typography sx={{ color: "red" }}>
                        [Xem chi tiết]
                      </Typography>
                    </Box>
                  }
                  // truyền thêm prop value vào, tương ứng với value trên Tabs
                  value={item.maCumRap}
                />
              );
            })}
          </Tabs>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}
        >
          <Tabs
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderBottom: 1, borderColor: "divider" }}
            // truyền thêm prop value vào
            value={theaterSystemId}
            style={{
              textAlign: "center"
            }}
          // onChange={(event, newValue) => {
          //   setShowtimeInfo(newValue);
          // }}
          >
            {
              showtimeInfo ? (
                <Slider {...settings}>
                  {
                    showtimeInfo.map((item) => {
                      return (
                        <Card
                          sx={{
                            maxWidth: 600,
                          }}
                          
                        >
                          <CardMedia
                            sx={{
                              height: 300,
                              border: "2px solid #1976d2",
                              borderRadius: "10px",
                              cursor: "pointer",
                              textAlign: "left"
                            }}
                            image={item.hinhAnh}
                            onClick={() => {
                              navigate(`movie/${item.maPhim}`)
                            }}
                            title="green iguana"
                          />
                          <CardContent className={isDarkMode ? 'dark-mode' : 'light-mode'}>
                            <Typography
                              gutterBottom
                              variant="h4"
                              component="div"
                              {...typographySettings}
                              style={{
                                fontSize: 28,
                              }}
                            >
                              {item.tenPhim}
                            </Typography>
                            <Typography
                              {...typographySettings}
                              style={{
                                fontSize: 18,
                              }}
                            >
                              Ngày giờ chiếu:
                              {
                                dayjs(item.lstLichChieuTheoPhim[0]?.ngayChieuGioChieu).format("DD/MM/YYYY ~ hh:mm")
                              }
                            </Typography>
                            <Button
                              variant="contained"
                              style={{
                                marginTop: 20,
                                backgroundColor: `${red[500]}`,
                                display: "flex",
                                width: 200,
                                height: 50,
                                fontSize: 24,
                                margin: "auto",
                              }}
                              onClick={() => {
                                navigate(`movie/${item.maPhim}`)
                              }}>
                              Mua vé
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })
                  }
                </Slider>
              ) : (
                <Box maxWidth="md">
                  <Grid container spacing={2}>
                    <Grid xs={6} lg={6}>
                      <Skeleton variant="rounded" sx={{ height: 500 }} animation="wave" style={{ margin: 10 }} />
                    </Grid>
                    <Grid xs={6} lg={6}>
                      <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                      <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
                      <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                      <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                      <Skeleton variant="rounded" sx={{ height: 50 }} width="60%" animation="wave" style={{ margin: 10 }} />
                    </Grid>
                  </Grid>
                </Box>
              )
            }
          </Tabs>
        </Grid>
      </Grid>
    </Container >
  )
}

export default Cinema
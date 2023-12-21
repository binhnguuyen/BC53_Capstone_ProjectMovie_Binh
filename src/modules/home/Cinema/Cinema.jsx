import { Box, Button, CardContent, CardMedia, Container, Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getTheaterSystemInfo, getTheaterInfo, getShowtimeInfo } from '../../../apis/cinemaAPI';
import { useNavigate } from 'react-router-dom';

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

const Cinema = () => {
  const typographySettings = {
    // gutterbottom: true,
    variant: "h6",
    // marginBottom: 2,
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
  console.log('theater: ', theater);


  const { data: showtimeData, isLoading: isLoadingShowtimeInfo } = useQuery({
    queryKey: ["ShowtimeInfo", theaterSystemId],
    // queryFn có truyền vào tham số thì gọi kiểu callback
    queryFn: () => getShowtimeInfo(theaterSystemId),
    enabled: !!theaterSystemId,
  });
  const showtime = showtimeData || [];
  console.log('showtime: ', showtime);
  console.log('showtime[0].lstCumRap: ', showtime[0]?.lstCumRap);


  const handleChangeTheaterSystemId = (newValue) => {
    setTheaterSystemId(newValue);
  };


  const handleChangeTheaterId = (newValue) => {
    setTheaterId(newValue);
    handleChangeShowtimeInfo(newValue);
  }
  console.log('theaterId: ', theaterId);


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
  console.log('showtimeInfo: ', showtimeInfo);


  // khi theaterSystem thay đổi (>0) thì mặc định render ra thằng đầu tiên
  useEffect(() => {
    if (theaterSystem.length > 0) {
      setTheaterSystemId(theaterSystem[0].maHeThongRap);
    }

  }, [theaterSystem]);

  useEffect(() => {
    if (theater.length > 0) {
      setTheaterId(theater[0].maCumRap);
    }
  }, [theater]);


  return (
    <Container maxWidth="xl" sx={{ marginBottom: 100 }}>
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
                  // onClick={() => handleChangeTheaterSystemId(item.maHeThongRap)}
                  label={<img src={item.logo} style={{ width: 100 }} />}
                  // {...a11yProps(item.maHeThongRap)}
                  // truyền thêm prop value vào, tương ứng với value trên Tabs
                  value={item.maHeThongRap}
                />
              );
            })}
          </Tabs>
          {/* {theaterSystems.map((item) => (
            <TabPanel value={theaterSystemsValue} index={item.maHeThongRap}>

            </TabPanel>
          ))} */}
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
                  key={item.maCumRap}
                  // onClick={() => handleChangeTheaterId(item.maCumRap)}
                  label={
                    <Box textAlign="left">
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
          {/* {theaterInfo.map((item) => (
            <TabPanel value={theaterInfoValue} index={item.maCumRap}>

            </TabPanel>
          ))} */}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
          <Tabs
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            // truyền thêm prop value vào
            value={theaterSystemId}
          // onChange={(event, newValue) => {
          //   setShowtimeInfo(newValue);
          // }}
          >
            {
              showtimeInfo ? (
                showtimeInfo.map((item) => {
                  return (
                    <Tab
                      key={item.maPhim}
                      onClick={() => {
                        navigate(`movie/${item.maPhim}`)
                      }}
                      label={
                        <Box textAlign="left">
                          <Grid container spacing={2}>
                            <Grid xs={6} lg={6}>
                              <CardMedia
                                id="posterMovie"
                              >
                                <img src={item.hinhAnh} alt="" id='posterImg'
                                  style={{
                                    width: 150,
                                    border: "2px solid #1976d2",
                                    borderRadius: "10px",
                                  }} />
                              </CardMedia>
                            </Grid>
                            <Grid xs={6} lg={6} paddingLeft={2}>
                              <CardContent>
                                <Typography
                                  gutterBottom
                                  variant="h4"
                                  component="div"
                                  marginBottom={2}
                                  {...typographySettings}
                                >
                                  {item.tenPhim}
                                </Typography>
                                {/* <Typography
                                  variant="h5"
                                  color="text.secondary"
                                  marginBottom={2}
                                >
                                  Ngày chiếu:
                                  {
                                    dayjs(data.ngayKhoiChieu).format("DD/MM/YYYY ~ hh:mm")
                                  }
                                </Typography> */}
                              </CardContent>
                            </Grid>
                          </Grid>
                        </Box>
                      }
                      // {...a11yProps(item.maHeThongRap)}
                      // truyền thêm prop value vào, tương ứng với value dưới TabPanel
                      value={item.maCumRap}
                    />
                  );
                })
              ) : (
                showtime[0]?.lstCumRap[0]?.map((item) => {
                  return (
                    <Tab
                      key={item.maCumRap}
                      onClick={() => {
                        navigate(`movie/${item.maPhim}`)
                      }}
                      label={
                        <Box>
                          {
                            item.danhSachPhim.map((item) => {
                              {
                                return (
                                  <Box textAlign="left">
                                    <Grid container spacing={2}>
                                      <Grid xs={6} lg={6}>
                                        <CardMedia
                                          id="posterMovie"
                                        >
                                          <img src={item.hinhAnh} alt="" id='posterImg'
                                            style={{
                                              border: "2px solid #1976d2",
                                              borderRadius: "10px",
                                            }} />
                                        </CardMedia>
                                      </Grid>
                                      <Grid xs={6} lg={6} paddingLeft={4}>
                                        <CardContent >
                                          <Typography
                                            gutterBottom
                                            variant="h4"
                                            component="div"
                                            className="truncate"
                                            marginBottom={2}
                                          >
                                            {item.tenPhim}
                                          </Typography>
                                          {/* <Typography
                                            variant="h5"
                                            color="text.secondary"
                                            marginBottom={2}
                                          >
                                            Ngày chiếu:
                                            {
                                              dayjs(item.ngayKhoiChieu).format("DD/MM/YYYY ~ hh:mm")
                                            }
                                          </Typography> */}
                                        </CardContent>
                                      </Grid>
                                    </Grid>
                                  </Box>
                                )
                              }
                            })
                          }
                        </Box>
                      }
                      // {...a11yProps(item.maHeThongRap)}
                      // truyền thêm prop value vào, tương ứng với value dưới TabPanel
                      value={item.maCumRap}
                    />
                  );
                })
              )
            }


          </Tabs>
          {/* {showtimeInfo.map((item) => (
            <TabPanel value={showtimeInfoValue} index={item.maHeThongRap}>

            </TabPanel>
          ))} */}
        </Grid>
      </Grid>
    </Container >
  )
}

export default Cinema
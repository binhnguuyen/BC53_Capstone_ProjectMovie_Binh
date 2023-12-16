import { Box, Container, Grid, Skeleton, Tab, Tabs, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { getTheaterSystemInfo, getTheaterInfo, getShowtimeInfo } from '../../../apis/cinemaAPI';

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
  const [value, setValue] = useState("");

  const [theaterId, setTheaterId] = useState("");
  const handleChangeTheaterSystem = (newValue) => {
    setTheaterId(newValue);
  };

  // const [theaterId, setTheaterId] = useState("");
  const handleChangeTheater = (newValue) => {
    setTheaterId(newValue);
  };

  const { data: theaterSystemInfoData, isLoading: isLoadingTheaterSysytem } = useQuery({
    queryKey: ["TheaterSystemInfo"],
    // queryFn ko truyền vào tham số thì gọi thế này(nếu có truyền tham số thì phải gọi bằng 1 callback)
    queryFn: getTheaterSystemInfo,
  });
  const theaterSystems = theaterSystemInfoData || [];
  console.log('theaterSystems: ', theaterSystems);

  const { data: theaterInfoData, isLoading: isLoadingTheaterInfo } = useQuery({
    queryKey: ["TheaterInfo", theaterId],
    // queryFn có truyền vào tham số thì gọi kiểu callback
    queryFn: () => getTheaterInfo(theaterId),
    enabled: !!theaterId,
  });
  const theaterInfo = theaterInfoData || [];
  console.log('theaterInfo: ', theaterInfo);

  const { data: showtimeInfoInfoData, isLoading: isLoadingShowtimeInfo } = useQuery({
    queryKey: ["ShowtimeInfo", theaterId],
    // queryFn có truyền vào tham số thì gọi kiểu callback
    queryFn: () => getShowtimeInfo(theaterId),
    enabled: !!theaterId,
  });
  const showtimeInfo = showtimeInfoInfoData || [];
  console.log('showtimeInfo: ', showtimeInfo);

  // khi theaterSystems thay đổi (>0) thì mặc định render ra thằng đầu tiên
  useEffect(() => {
    if (theaterSystems.length > 0) {
      setTheaterId(theaterSystems[0].maHeThongRap);
    }
  }, [theaterSystems]);



  return (
    <Container maxWidth="xl" sx={{ marginBottom: 100 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
          <Tabs
            orientation="vertical"
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
            // truyền thêm prop value vào
            value={value}
            onChange={(event, newValue) => {
              // console.log("newValue", newValue);
              // console.log("event", event);
              setValue(newValue);
            }}
          >
            {theaterSystems.map((item) => {
              return (
                <Tab
                  key={item.maHeThongRap}
                  onClick={() => handleChangeTheaterSystem(item.maHeThongRap)}
                  label={<img src={item.logo} style={{ width: 100 }} />}
                  // {...a11yProps(item.maHeThongRap)}
                  // truyền thêm prop value vào, tương ứng với value dưới TabPanel
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
            // truyền thêm prop value vào
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            {theaterInfo.map((item) => {
              return (
                <Tab
                  key={item.maCumRap}
                  onClick={() => handleChangeTheaterSystem(item.maHeThongRap)}
                  label={
                    <Typography>
                      {item.tenCumRap}
                    </Typography>
                  }
                  value={item.maCumRap}
                />
              );
            })}
          </Tabs>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
        </Grid>
      </Grid>
    </Container >
  )
}

export default Cinema
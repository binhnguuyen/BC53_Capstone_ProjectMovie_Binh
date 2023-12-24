import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import { getMovieShowTimesAPI } from "../../../apis/cinemaAPI"
import { Alert, Box, Button, Container, Divider, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';
import { useAuth, useDarkMode } from "../../../contexts/UserContext/UserContext";
// import DarkModeToggle from '../../../components/DarkModeToggle/DarkModeToggle';
import { Scrollbars } from 'react-custom-scrollbars';


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

// function a11yProps(index) {
//   return {
//     id: `vertical-tab-${index}`,
//     "aria-controls": `vertical-tabpanel-${index}`,
//   };
// }

const ShowTimes = ({ movieId }) => {
  const { isDarkMode } = useDarkMode();
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleBooking = (maLichChieu) => {
    if (currentUser && currentUser.maLoaiNguoiDung ==="KhachHang") {
      navigate(`${PATH.BOOKING}/${maLichChieu}`)
    }
    else {
      alert("Xin vui lòng đăng nhập");
      // cái customOptions này để đưa maLichChieu về sign-in, sai khi user đăng nhập xong chuyển họ lại trang booking
      navigate(PATH.SIGN_IN, { state: { customOption: `${maLichChieu}` }});
    }
  }


  // dùng useQuery để khi có 1 thay đổi thì nó sẽ GET API về
  const { data = {}, isLoading, isError, error } = useQuery({
    // "showtimes" là key tự do ko bắt buộc, modieId truyền vào để khi modieId thay  đổi thì queryFn tự chạy lại giống useEffect 
    queryKey: ["showtimes", movieId],
    // thằng function này phải truyền tham số movieId vào nên phải dùng callback function
    // thằng nào ko cần truyền tham số thì chỉ gọi ra giống bên Showing là OK
    // queryFn: () => {
    //   return getMovieDetailsAPI(movieId);
    // },
    // hoặc viết gọn lại như sau
    queryFn: () => getMovieShowTimesAPI(movieId),
    // nếu movieId khác undefined(tức là false) thì cái queryFn trên mới chạy
    // tức là khi có movieId mới chạy
    // còn nếu movieId chưa có thì queryFn sẽ ko chạy
    enabled: !!movieId,
  });
  const cinemaSystems = data.heThongRapChieu || [];

  // khi cinemaSystems thay đổi (>0) thì mặc định render ra thằng đầu tiên
  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setValue(cinemaSystems[0].maHeThongRap);
    }
  }, [cinemaSystems]);

  return (
    <Container style={{ maxWidth: "1600px", marginTop: 40 }} >
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
        className={isDarkMode ? 'dark-mode' : 'light-mode'}
      >
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
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
            {cinemaSystems.map((item) => {
              return (
                <Tab
                  // onClick={() => handleChange(item.maHeThongRap)}
                  label={<img src={item.logo} style={{ width: 100 }} />}
                  // {...a11yProps(item.maHeThongRap)}
                  // truyền thêm prop value vào, tương ứng với value dưới TabPanel
                  value={item.maHeThongRap}
                />
              );
            })}
          </Tabs>
        </Grid>
        <Scrollbars
          class="ScrollbarsCustom-Content"
          style={{ width: 1200, height: 1000 }}
        >
          {cinemaSystems.map((item) => (
            <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
              <TabPanel value={value} index={item.maHeThongRap}>
                {item.cumRapChieu.map((rap) => (
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant="h5"
                      component="h6"
                      style={{
                        fontSize: 24,
                        fontWeight: 700,
                      }}
                    >
                      {rap.tenCumRap}
                    </Typography>
                    {/* thằng stack này có hết thuộc tính của flex, nên ko cần phải display: flex này nọ nữa */}
                    {/* display: flex;
              flex-direction: row;
            gap: 3; */}
                    <Stack
                      xs={6} lg={6}
                      spacing={{ xs: 1, sm: 2 }}
                      direction={{ xs: 'column', sm: 'row' }}
                      useFlexGap
                      flexWrap="wrap"
                      divider={<Divider orientation="vertical" flexItem />}
                    >
                      <Scrollbars
                        class="ScrollbarsCustom-Content"
                        style={{ width: 1100, height: 250 }}
                      >
                        {
                          rap.lichChieuPhim.map((lichChieu) => {
                            const date = new Date(lichChieu.ngayChieuGioChieu);
                            // nếu chưa cài Day.js rồi thì dùng như sau:
                            // const times = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ~ ${date.getHours()}:${date.getMinutes()}` // dd//mm//yyyy
                            // nếu đã cài Day.js rồi thì dùng như sau:
                            const times = dayjs(lichChieu.ngayChieuGioChieu).format(
                              "DD/MM/YYYY ~ hh:mm"
                            )
                            return (
                              <Button
                                variant="outlined"
                                size='large'
                                style={{
                                  fontSize: 20,
                                  fontWeight: 700,
                                }}
                                onClick={() => {
                                  handleBooking(lichChieu.maLichChieu);
                                }}
                              >
                                {times}
                              </Button>
                            );
                          })
                        }
                      </Scrollbars>
                    </Stack>
                  </Box>
                ))}
                {/* </Stack> */}
              </TabPanel>
            </Grid>
          ))}
        </Scrollbars>
      </Box>
    </Container >
  );
};

export default ShowTimes
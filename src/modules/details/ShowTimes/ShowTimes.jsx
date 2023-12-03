import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from "react";
import { getMovieShowTimesAPI } from "../../../apis/cinemaAPI"
import { Box, Button, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import dayjs from 'dayjs';
import { Navigate, useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';

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
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  // dùng useQuery để khi có 1 thay đổi thì nó sẽ GET API về
  const { data = {}, isLoading, isError, error } = useQuery({
    // thằng function này phải truyền tham số movieId vào nên phải dùng callback function
    // thằng nào ko cần truyền tham số thì chỉ gọi ra giống bên Showing là OK
    // queryFn: () => {
    //   return getMovieDetailsAPI(movieId);
    // },
    // hoặc viết gọn lại như sau
    queryKey: ["showtimes", movieId],
    queryFn: () => getMovieShowTimesAPI(movieId),
    // nếu movieId khác undefined(tức là false) thì cái queryFn trên mới chạy
    // tức là khi có movieId mới chạy
    // còn nếu movieId chưa có thì queryFn sẽ ko chạy
    enabled: !!movieId,
  });
  const cinemaSystems = data.heThongRapChieu || [];
  console.log('cinemaSystems: ', cinemaSystems);

  // khi cinemaSystems thay đổi (>0) thì mặc định render ra thằng đầu tiên
  useEffect(() => {
    if (cinemaSystems.length > 0) {
      setValue(cinemaSystems[0].maHeThongRap);
    }
  }, [cinemaSystems]);

  return (
    <Container maxWidth="lg" style={{ marginTop: 20 }}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
        }}
      >

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
        {cinemaSystems.map((item) => (
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
                <Stack spacing={2} direction={"row"}>
                  {rap.lichChieuPhim.map((lichChieu) => {
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
                            navigate(`${PATH.BOOKING}/${lichChieu.maLichChieu}`)
                          }}
                        >
                          {times}
                        </Button>
                    );
                  })}
                </Stack>
              </Box>
            ))}
            {/* </Stack> */}
          </TabPanel>
        ))}
      </Box>
    </Container>
  );
};

export default ShowTimes
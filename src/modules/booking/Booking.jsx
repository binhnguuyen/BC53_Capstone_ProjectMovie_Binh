import { Box, Button, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { getChairListAPI } from '../../apis/chairAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import style from "./style.css";

const Booking = () => {
    const { maLichChieu } = useParams();
    console.log('maLichChieu: ', maLichChieu);

    // Dùng useQuery để get API
    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["bookingId", maLichChieu],
        queryFn: () => getChairListAPI(maLichChieu),
        enabled: !!maLichChieu,
    });
    const movieInfo = data.thongTinPhim || [];
    const chairList = data.danhSachGhe || [];
    console.log('movieInfo: ', movieInfo);
    console.log('chairList: ', chairList);

    const typographySettings = {
        gutterBottom: true,
        variant: "h6",
        marginBottom: 2,
        style: {
            fontSize: 20,
            fontWeight: 700,
        }
    }

    const stackSettings = {
        spacing: 2,
        direction: "row",
        justifyContent: "space-between",
    }


    return (
        <div>
            <Container maxWidth="xl">
                <Grid container spacing={2}>
                    <Grid
                        item
                        xs={7}
                        lg={7}
                        xl={7}
                        alignItems={"center"}
                    >
                        <Grid container spacing={3}>
                            {chairList.map((ghe) => {
                                return (
                                    <Grid
                                        item
                                        // key={ghe.tenGhe}
                                        xs={3}
                                        sm={2}
                                        md={1}
                                        lg={1}
                                    >
                                        <Typography className="ghe">
                                            {ghe.tenGhe}
                                        </Typography>
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Grid>
                    <Grid item xs={5} lg={5}>
                        <CardContent>
                            <Stack
                                spacing={2}
                                divider={<Divider orientation="horizontal" flexItem />}
                                direction="column"
                            >
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography
                                        {...typographySettings}
                                    >
                                        Tên phim:
                                    </Typography>
                                    <Typography
                                        {...typographySettings}
                                        color={"green"}
                                    >
                                        <></>
                                        {movieInfo.tenPhim}
                                    </Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography
                                        {...typographySettings}
                                    >
                                        Cụm Rạp:
                                    </Typography>
                                    <Typography
                                        {...typographySettings}
                                        color={"green"}
                                    >
                                        <></>
                                        {movieInfo.tenCumRap}
                                    </Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography
                                        {...typographySettings}
                                    >
                                        Rạp:
                                    </Typography>
                                    <Typography
                                        {...typographySettings}
                                        color={"green"}
                                    >
                                        <></>
                                        {movieInfo.tenRap}
                                    </Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography
                                        {...typographySettings}
                                    >
                                        Ngày giờ chiếu:
                                    </Typography>
                                    <Typography
                                        {...typographySettings}
                                        color={"green"}
                                    >
                                        <></>
                                        {movieInfo.ngayChieu} {movieInfo.gioChieu}
                                    </Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography
                                        {...typographySettings}
                                    >
                                        Địa chỉ:
                                    </Typography>
                                    <Typography
                                        {...typographySettings}
                                        color={"green"}
                                    >
                                        <></>
                                        {movieInfo.diaChi}
                                    </Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography id="gheDaDat" className="ghe"></Typography>
                                    <Typography>Ghế đã đặt</Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography id="gheDangChon" className="ghe"></Typography>
                                    <Typography>Ghế đang chọn</Typography>
                                </Stack>
                                <Stack
                                    {...stackSettings}
                                >
                                    <Typography id="gheTrong" className="ghe"></Typography>
                                    <Typography>Ghế trống</Typography>
                                </Stack>
                            </Stack>
                            <Button
                                size="large"
                                variant="contained"
                                width={100}
                                color="success"
                                style={{
                                    width: 150,
                                    display: "flex",
                                    fontSize: 20,
                                    margin: "auto",
                                }}
                                onClick={() => {
                                    // navigate(PATH.HOME);
                                }}
                            >Đặt vé
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}


export default Booking
import { Box, Button, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { getChairListAPI } from '../../apis/chairAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import style from "./style.css";
import { red } from '@mui/material/colors';
import cn from "classnames"
import { btMovieBookingActions } from "../../store/Chair/slice";

// import base from "../../styles/base.css"

const Booking = () => {
    // tạo hàm dispatch
    const dispatch = useDispatch();

    // lấy chairsBooking, chairsBooked về 
    const { chairsBooking, chairsBooked } = useSelector((state) => state.btMovieBooking)

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
                                    key={ghe.tenGhe}
                                    xs={3}
                                    sm={2}
                                    md={1}
                                    lg={1}
                                >
                                    {
                                        <Typography
                                            className="ghe"
                                            id={`ghe${ghe.loaiGhe}`}
                                            onClick={() => {
                                                dispatch(btMovieBookingActions.setChairsBooking(ghe))
                                            }}
                                        >
                                            {ghe.tenGhe}
                                        </Typography>
                                    }

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
                                >
                                    <></>
                                    {movieInfo.diaChi}
                                </Typography>
                            </Stack>
                            <Stack
                                {...stackSettings}
                            >
                                <Typography id="gheDaDat" className="ghe"></Typography>
                                <Typography
                                    {...typographySettings}
                                >
                                    Ghế đã đặt</Typography>
                            </Stack>
                            <Stack
                                {...stackSettings}
                            >
                                <Typography id="gheDangChon" className="ghe"></Typography>
                                <Typography
                                    {...typographySettings}
                                >
                                    Ghế đang chọn
                                </Typography>
                            </Stack>
                            <Stack
                                {...stackSettings}
                            >
                                <Typography id="gheTrongThuong" className="ghe"></Typography>
                                <Typography
                                    {...typographySettings}
                                >
                                    Ghế trống thường
                                </Typography>
                            </Stack>
                            <Stack
                                {...stackSettings}
                            >
                                <Typography id="gheTrongVIP" className="ghe"></Typography>
                                <Typography
                                    {...typographySettings}
                                >
                                    Ghế trống VIP
                                </Typography>
                            </Stack>
                        </Stack>
                        <Button
                            variant="contained"
                            style={{
                                // backgroundColor: "#ff3d00",
                                backgroundColor: `${red[500]}`,
                                display: "flex",
                                width: 150,
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
    )
}


export default Booking
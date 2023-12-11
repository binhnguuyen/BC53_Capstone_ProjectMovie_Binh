import { Box, Button, CardContent, Container, Divider, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { getChairListAPI } from '../../apis/chairAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import cn from "classnames"
import { btMovieBookingActions } from "../../store/Chair/slice";
import BookingResult from './BookingResult';
import { red } from '@mui/material/colors';


const Booking = () => {
    // tạo hàm dispatch
    const dispatch = useDispatch();

    // lấy chairsBooking, chairsBooked về 
    const { chairsBooking, chairsBooked } = useSelector((state) => state.btMovieBooking)
    console.log('chairsBooking: ', chairsBooking);

    const { maLichChieu } = useParams();

    // Dùng useQuery để get API
    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["bookingId", maLichChieu],
        queryFn: () => getChairListAPI(maLichChieu),
        enabled: !!maLichChieu,
    });
    const chairList = data.danhSachGhe || [];

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
                                            className={cn("ghe",
                                                `ghe${ghe.loaiGhe}`,
                                                {
                                                    gheDangChon: chairsBooking.find((e) => e.maGhe === ghe.maGhe),
                                                    gheDaDat: chairsBooked.find((e) => e.maGhe === ghe.maGhe),
                                                }
                                            )}
                                            // id={`ghe${ghe.loaiGhe}`}
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
                    <BookingResult />
                </Grid>
            </Grid>
            <Grid>
                <Button
                    variant="contained"
                    style={{
                        backgroundColor: `${red[500]}`,
                        display: "flex",
                        width: 200,
                        height: 50,
                        fontSize: 24,
                        margin: "auto",
                    }}
                    onClick={() => {
                        // navigate(PATH.HOME);
                    }}
                >Đặt vé
                </Button>
            </Grid>
        </Container>
    )
}


export default Booking
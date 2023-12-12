import React from 'react'
import { Box, Button, CardContent, Container, Divider, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { btMovieBookingActions } from "../../store/Chair/slice";
import { getChairListAPI } from '../../apis/chairAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import cn from "classnames"



const Chair = () => {
    // tạo hàm dispatch
    const dispatch = useDispatch();

    // lấy chairsBooking, chairsBooked về 
    const { chairsBooking, chairsBooked } = useSelector((state) => state.btMovieBooking)

    const { maLichChieu } = useParams();

    // Dùng useQuery để get API
    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["bookingId", maLichChieu],
        queryFn: () => getChairListAPI(maLichChieu),
        enabled: !!maLichChieu,
    });
    const chairList = data.danhSachGhe || [];

    let gheDaDat = [];
    for (let i in chairList) {
        if (chairList[i].taiKhoanNguoiDat != null) {
            gheDaDat.push(chairList[i]);
        }
    }


    return (
        <Grid container spacing={3}>
            {
                isLoading ? (
                    <Grid xs={12} lg={12}>
                        <Skeleton variant="rounded" sx={{ height: 800 }} animation="wave" style={{ margin: 10 }} />
                    </Grid>
                ) : (
                    chairList.map((ghe) => {
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
                                                gheDaDat: gheDaDat.find((e) => e.maGhe === ghe.maGhe),
                                            }
                                        )}
                                        onClick={() => {
                                            let isAreadySelected = gheDaDat.findIndex((e) => e.maGhe === ghe.maGhe)
                                            if (isAreadySelected !== -1) {
                                                alert("Ghế này đã được đặt. Xin vui lòng chọn ghế khác!");
                                            }
                                            else {
                                                dispatch(btMovieBookingActions.setChairsBooking(ghe));
                                            }
                                        }}
                                    >
                                        {ghe.tenGhe}
                                    </Typography>
                                }
                            </Grid>
                        );
                    })
                )
            }
        </Grid>
    )
}

export default Chair
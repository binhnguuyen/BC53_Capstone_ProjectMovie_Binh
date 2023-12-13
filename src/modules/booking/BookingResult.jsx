import React from 'react'
import { Box, Button, CardContent, Container, Divider, Grid, Paper, Skeleton, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { getChairListAPI } from '../../apis/chairAPI';
import { btMovieBookingActions } from "../../store/Chair/slice";
import style from "./style.css";
import { useDispatch, useSelector } from 'react-redux';


const BookingResult = () => {
    // tạo hàm dispatch
    const dispatch = useDispatch();

    const typographySettings = {
        // gutterbottom: true,
        variant: "h6",
        // marginBottom: 2,
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

    const { maLichChieu } = useParams();

    const { data = {}, isLoading, isError, error } = useQuery({
        queryKey: ["bookingId", maLichChieu],
        queryFn: () => getChairListAPI(maLichChieu),
        enabled: !!maLichChieu,
    });
    const movieInfo = data.thongTinPhim || [];

    const { chairsBooking } = useSelector((state) => state.btMovieBooking)

    return (
        <CardContent>
            <Typography
                align="center"
                {...typographySettings}
                style={{
                    fontSize: 36,
                }}
            >
                Thông tin chi tiết
            </Typography>
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
                        {
                            isLoading ? (
                                <Skeleton variant="rounded" width="300px" animation="wave" style={{ margin: 5 }} />
                            ) : (
                                movieInfo.tenPhim
                            )
                        }
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
                        {
                            isLoading ? (
                                <Skeleton variant="rounded" width="300px" animation="wave" style={{ margin: 5 }} />
                            ) : (
                                movieInfo.tenCumRap
                            )
                        }
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
                        {
                            isLoading ? (
                                <Skeleton variant="rounded" width="300px" animation="wave" style={{ margin: 5 }} />
                            ) : (
                                movieInfo.tenRap
                            )
                        }
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
                        {
                            isLoading ? (
                                <Skeleton variant="rounded" width="300px" animation="wave" style={{ margin: 5 }} />
                            ) : (
                                `${movieInfo.ngayChieu} ${movieInfo.gioChieu}`
                            )
                        }
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
                        {
                            isLoading ? (
                                <Skeleton variant="rounded" width="300px" animation="wave" style={{ margin: 5 }} />
                            ) : (
                                movieInfo.diaChi
                            )
                        }
                    </Typography>
                </Stack>
                <Stack
                    {...stackSettings}
                >
                    <Typography id="" className="ghe gheDaDat"></Typography>
                    <Typography
                        {...typographySettings}
                    >
                        Ghế đã được đặt</Typography>
                </Stack>
                <Stack
                    {...stackSettings}
                >
                    <Typography id="" className="ghe gheBanDaDat"></Typography>
                    <Typography
                        {...typographySettings}
                    >
                        Ghế bạn đã đặt</Typography>
                </Stack>
                <Stack
                    {...stackSettings}
                >
                    <Typography id="" className="ghe gheDangChon"></Typography>
                    <Typography
                        {...typographySettings}
                    >
                        Ghế đang chọn
                    </Typography>
                </Stack>
                <Stack
                    {...stackSettings}
                >
                    <Typography id="" className="ghe gheThuong"></Typography>
                    <Typography
                        {...typographySettings}
                    >
                        Ghế trống thường
                    </Typography>
                </Stack>
                <Stack
                    {...stackSettings}
                >
                    <Typography id="" className="ghe gheVip"></Typography>
                    <Typography
                        {...typographySettings}
                    >
                        Ghế trống VIP
                    </Typography>
                </Stack>
            </Stack>
            <TableContainer component={Paper}
                style={{
                    marginTop: 50,
                }}
            >
                <Typography
                    align="center"
                    {...typographySettings}
                    style={{
                        fontSize: 36,
                    }}
                >
                    Danh sách ghế đang chọn
                </Typography>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left" {...typographySettings}>Số ghế</TableCell>
                            <TableCell align="center" {...typographySettings}>Giá vé</TableCell>
                            <TableCell align="right" {...typographySettings}>Huỷ vé</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            chairsBooking.map((ghe) => {
                                return (
                                    <TableRow key={ghe.maGhe}>
                                        <TableCell align="left" {...typographySettings}>{ghe.tenGhe}</TableCell>
                                        <TableCell align="center" {...typographySettings}>{ghe.giaVe}</TableCell>
                                        <TableCell align="right" {...typographySettings}>
                                            <Button
                                                variant="contained"
                                                style={{
                                                    backgroundColor: `${red[900]}`,
                                                    fontSize: 20,
                                                    marginTop: 50,
                                                    margin: "auto",
                                                }}
                                                onClick={() => {
                                                    dispatch(btMovieBookingActions.setChairsBooking(ghe))
                                                }}
                                            >X</Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell
                                align="left"
                                {...typographySettings}
                                style={{
                                    fontSize: 28,
                                }}
                            >
                                Tổng tiền
                            </TableCell>
                            <TableCell
                                align="center"
                                {...typographySettings}
                                style={{
                                    fontSize: 28,
                                }}
                            >
                                {
                                    // hàm reduce giúp chạy và xét tất cả các phần tử trong 1 mảng bất kỳ
                                    // thông thường sd khi tính tổng tất cả các giá trị trong 1 mảng
                                    // 0 là giá trị ban đầu
                                    // viết đầy đủ: return ( total += value.gia, 0 )
                                    // viết ngắn gọn thì bỏ "return" và ()
                                    chairsBooking.reduce((total, value) => (total + value.giaVe), 0)
                                }
                            </TableCell>
                            <TableCell
                                align="right"
                                {...typographySettings}
                                style={{
                                    fontSize: 28,
                                }}
                            >
                                VND
                            </TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </CardContent>
    )
}

export default BookingResult
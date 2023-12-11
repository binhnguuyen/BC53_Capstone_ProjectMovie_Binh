import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import Chair from './Chair';
import BookingResult from './BookingResult';
import { btMovieBookingActions } from "../../store/Chair/slice";
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { postBookedChairListAPI } from '../../apis/chairAPI';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const Booking = () => {
    // thằng này tự gọi lại API sau khi thêm xoá sửa
    const queryClient = useQueryClient();

    const { maLichChieu } = useParams();

    const { chairsBooking } = useSelector((state) => state.btMovieBooking)

    // dùng useMutation, khi có 1 thao tác thì mới thực hiện POST lên API
    const { mutate: handleBooking, isPending } = useMutation({
        // values này là formBooking mình đưa vào trong hàm handleSubmit
        mutationFn: (values) => postBookedChairListAPI(values),
        onSuccess: (values) => {
            // chuyển use về trang HOME
            // navigate(PATH.HOME);
        },
        onError: (error) => {
            alert("Lỗi rồi");
        },
    });

    // tạo formBooking truyền lên API
    // {
    //     "maLichChieu": 0,
    //     "danhSachVe": [
    //         {
    //             "maGhe": 0,
    //             "giaVe": 0
    //         }
    //     ]
    // }
    const handleSubmit = (chair) => {
        const formGhe = chair.map((item) => ({
            maGhe: item.maGhe,
            giaVe: item.giaVe,
        }));
        const formBooking = { maLichChieu: maLichChieu, danhSachVe: formGhe };
        console.log('formBooking: ', formBooking);
        handleBooking(formBooking);
    }


    return (
        <Container maxWidth="xl">
            <Grid container spacing={2} alignItems={"center"}>
                <Grid item xs={7} lg={7} xl={7}>
                    <Typography className="screen">
                        Màn chiếu
                    </Typography>
                    <Chair />
                </Grid>
                <Grid item xs={5} lg={5} xl={5}>
                    <BookingResult />
                </Grid>
            </Grid>
            <Grid>
                <LoadingButton
                    type="submit"
                    loading={isPending}
                    variant="contained"
                    style={{
                        backgroundColor: `${red[500]}`,
                        display: "flex",
                        width: 200,
                        height: 50,
                        fontSize: 24,
                        margin: "auto",
                    }}
                    onClick={() => handleSubmit(chairsBooking)}
                >Đặt vé
                </LoadingButton>
            </Grid>
        </Container>
    )
}


export default Booking
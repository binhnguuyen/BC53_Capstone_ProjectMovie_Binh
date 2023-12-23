import { Box, Button, Container, Grid, Modal, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
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
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Booking = () => {
    // thư viện SweetAlert
    const MySwal = withReactContent(Swal);

    // Hàm để handle modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    const typographySettings = {
        // gutterbottom: true,
        variant: "h6",
        // marginBottom: 2,
        style: {
            fontSize: 20,
            fontWeight: 700,
        }
    }

    // thằng này tự gọi lại API sau khi thêm xoá sửa
    const queryClient = useQueryClient();

    const { maLichChieu } = useParams();

    const { chairsBooking } = useSelector((state) => state.btMovieBooking)

    // dùng useMutation, khi có 1 thao tác thì mới thực hiện POST lên API
    const { mutate: handleBooking, isPending } = useMutation({
        // values này là formBooking mình đưa vào trong hàm handleSubmit
        mutationFn: (values) => postBookedChairListAPI(values),
        onSuccess: (values) => {
            MySwal.fire({
                icon: "success",
                title: "Bạn đã đặt vé thành công",
                text: "Quay lại trang phim",
                confirmButtonText: "Đồng ý"
            }).then((result) => {
                if (result.isConfirmed) {
                    queryClient.invalidateQueries({ queryKey: ["bookingId"] });
                }
            })
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
        handleBooking(formBooking);
        handleClose();
    }


    return (
        <Container style = {{ maxWidth: "1600px" }}>
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
                    onClick={handleOpen}
                >Đặt vé
                </LoadingButton>
            </Grid>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        chairsBooking.length ? (
                            <Box>
                                <Typography id="modal-modal-title" variant="h4" gutterBottom>
                                    Xác nhận mua vé
                                </Typography>
                                <Typography id="modal-modal-description" variant="h5" gutterBottom>
                                    <Table aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="left" {...typographySettings}>Số ghế</TableCell>
                                                <TableCell align="center" {...typographySettings}>Giá vé</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                chairsBooking.map((ghe) => {
                                                    return (
                                                        <TableRow key={ghe.maGhe}>
                                                            <TableCell align="left" {...typographySettings}>{ghe.tenGhe}</TableCell>
                                                            <TableCell align="center" {...typographySettings}>{ghe.giaVe}</TableCell>
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
                                                        fontSize: 24,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    Tổng tiền
                                                </TableCell>
                                                <TableCell
                                                    align="center"
                                                    {...typographySettings}
                                                    style={{
                                                        fontSize: 24,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    {
                                                        chairsBooking.reduce((total, value) => (total + value.giaVe), 0)
                                                    }
                                                </TableCell>
                                                <TableCell
                                                    align="right"
                                                    {...typographySettings}
                                                    style={{
                                                        fontSize: 24,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    VND
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                    </Table>
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
                                            handleSubmit(chairsBooking)
                                        }}
                                    >Mua</Button>
                                </Typography>
                            </Box>
                        ) : (
                            <Box>
                                <Typography
                                    {...typographySettings}
                                >
                                    Bạn chưa chọn ghế
                                </Typography>
                            </Box>
                        )
                    }

                </Box>
            </Modal>
        </Container>
    )
}


export default Booking
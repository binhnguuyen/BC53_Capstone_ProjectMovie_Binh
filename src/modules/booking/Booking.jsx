import { Box, Container } from '@mui/material';
import React from 'react'
import { getChairListAPI } from '../../apis/chairAPI';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Booking = () => {
    const { maLichChieu } = useParams();
    console.log('maLichChieu: ', maLichChieu);

    // Dùng useQuery để get API
    const { data = {}, isLoading, isError, error  } = useQuery({
        queryKey: ["bookingId", maLichChieu],
        queryFn: () => getChairListAPI(maLichChieu),
        enabled: !!maLichChieu,
    });
    const movieInfo = data.thongTinPhim || [];
    const chairList = data.danhSachGhe || [];
    console.log('movieInfo: ', movieInfo);
    console.log('chairList: ', chairList);

    return (
        <div>
            <Container maxWidth="lg">
                <Box>Booking</Box>
            </Container>
        </div>
    )
}

export default Booking
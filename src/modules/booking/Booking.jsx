import { Button, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import Chair from './Chair';
import BookingResult from './BookingResult';
import { red } from '@mui/material/colors';

const Booking = () => {

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
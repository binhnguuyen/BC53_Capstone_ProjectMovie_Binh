import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieDetailsAPI } from "../../../apis/movieApi";
import { Box, CardActions, Card, CardMedia, CardContent, Container, Grid, Skeleton, Typography, Button, Modal } from '@mui/material';
import dayjs from 'dayjs';
import style from "./style.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const MovieProfile = ({ movieId }) => {

  const styleIframe = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: "none",
    border: 'none',
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  // dùng useQuery để khi có 1 thay đổi thì nó sẽ GET API về
  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ["movie-details"],
    // thằng function này phải truyền tham số movieId vào nên phải dùng callback function
    // thằng nào ko cần truyền tham số thì chỉ gọi ra giống bên Showing là OK
    // queryFn: () => {
    //   return getMovieDetailsAPI(movieId);
    // },
    // hoặc viết gọn lại như sau
    queryFn: () => getMovieDetailsAPI(movieId),
    // nếu movieId khác undefined(tức là false) thì cái queryFn trên mới chạy
    // tức là khi có movieId mới chạy
    // còn nếu movieId chưa có thì queryFn sẽ ko chạy
    enabled: !!movieId,
  });


  const handleURLYouTube = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    var videoID = (match && match[7].length == 11) ? match[7] : false;
    var embedUrl = `https://www.youtube.com/embed/${videoID}`;

    return embedUrl;
  }

  return (
    <Container maxWidth="lg" className='container'>
      {
        isLoading ? (
          <Box maxWidth="md">
            <Grid container spacing={2}>
              <Grid xs={6} lg={6}>
                <Skeleton variant="rounded" sx={{ height: 500 }} animation="wave" style={{ margin: 10 }} />
              </Grid>
              <Grid xs={6} lg={6}>
                <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                <Skeleton variant="rounded" sx={{ height: 50 }} animation="wave" style={{ margin: 10 }} />
                <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                <Skeleton animation="wave" height={25} width="60%" style={{ margin: 10 }} />
                <Skeleton variant="rounded" sx={{ height: 50 }} width="60%" animation="wave" style={{ margin: 10 }} />
              </Grid>
            </Grid>
          </Box>
        ) : (
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid xs={6} lg={6}>
                <CardMedia
                  id="posterMovie"
                >
                  <img src={data.hinhAnh} alt="" id='posterImg' />
                  <Button
                    id='playVideoButton'
                    onClick={handleOpen}
                  >
                    <i className="fab fa-youtube"></i>
                  </Button>
                </CardMedia>

              </Grid>
              <Grid xs={6} lg={6} paddingLeft={4}>
                <CardContent >
                  <Typography
                    gutterBottom
                    variant="h4"
                    component="div"
                    className="truncate"
                    marginBottom={2}
                  >
                    {data.tenPhim}
                  </Typography>
                  <Typography
                    variant="h5"
                    color="text.secondary"
                    marginBottom={2}
                  >
                    Ngày chiếu:
                    {
                      dayjs(data.ngayKhoiChieu).format("DD/MM/YYYY ~ hh:mm")
                    }
                  </Typography>
                  <Typography
                    justifyContent=""
                    color="text.secondary"
                    variant="h6"
                    textAlign='justify'
                  >
                    {data.moTa}
                  </Typography>
                </CardContent>
                <CardActions>
                  {/* <Button size="large"
                    variant="contained"
                    color='secondary'
                    width={100}
                    // href={data.trailer}
                    onClick={handleOpen}
                    target="_blank"
                  >Xem Trailer
                  </Button> */}
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: "#ff3d00",
                      display: "flex",
                      width: 150,
                      fontSize: 20,
                      margin: "auto",
                    }}
                    onClick={() => {
                      navigate(PATH.HOME);
                    }}
                  >Mua vé
                  </Button>
                </CardActions>
              </Grid>
              <Grid>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={styleIframe}>
                    <iframe
                      width="1280"
                      height="720"
                      src={handleURLYouTube(data.trailer)}
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>
                    </iframe>
                  </Box>
                </Modal>
              </Grid>
            </Grid>
          </Box>
        )
      }
    </Container>
  )
}

export default MovieProfile
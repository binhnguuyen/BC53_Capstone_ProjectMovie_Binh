import React from 'react'
import MovieProfile from './MovieProfile/MovieProfile'
import ShowTimes from './ShowTimes/ShowTimes'
import { useParams } from 'react-router-dom'
import { Box } from '@mui/material'

const Details = () => {
  // dùng useParams lấy id sau dầu : trong URL của details về
  const { movieId } = useParams();
  return (
    // xài material UI nên sửa thành box
    <Box>
      {/* truyền movieId cho 2 thằng MovieProfile & ShowTimes */}
      <MovieProfile movieId={movieId} />
      <ShowTimes movieId={movieId} />
    </Box>
  )
}

export default Details
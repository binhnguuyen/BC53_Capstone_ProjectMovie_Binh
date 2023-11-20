import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom';
import { getMovieDetailsAPI } from "../../../apis/movieApi";

const MovieProfile = ({ movieId }) => {
  // console.log('movieId: ', movieId);
  // const id = "";
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
  console.log('data: ', data);
  // console.log('isLoading: ', isLoading);
  // console.log('isError: ', isError);
  // console.log('error: ', error);
  return (
    <div>
      MovieProfile
    </div>
  )
}

export default MovieProfile
import fetcher from "./fetcher";

export const getMovieShowTimesAPI = async (movieId) => {
    try {
        // thằng này sẽ gắn cái path trong () vào cái baseURL(định nghĩa bên fetcher) và tự hiểu method là get luôn cho mình
        const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuPhim", {
            params: {
                maPhim: movieId,
            },
        });
        return response.data.content; // là 1 mảng
    }
    catch (error) {
        throw Error(error)
    }
}
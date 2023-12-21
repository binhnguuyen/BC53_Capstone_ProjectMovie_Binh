import { GROUP_CODE } from "../constants";
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

export const getTheaterSystemInfo = async () => {
    try {
        // thằng này sẽ gắn cái path trong () vào cái baseURL(định nghĩa bên fetcher) và tự hiểu method là get luôn cho mình
        const response = await fetcher.get("/QuanLyRap/LayThongTinHeThongRap");
        return response.data.content; // là 1 mảng
    }
    catch (error) {
        throw Error(error)
    }
}

export const getTheaterInfo = async (theaterSystemId) => {
    try {
        // thằng này sẽ gắn cái path trong () vào cái baseURL(định nghĩa bên fetcher) và tự hiểu method là get luôn cho mình
        const response = await fetcher.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", {
            params: {
                maHeThongRap: theaterSystemId,
            },
        });
        return response.data.content; // là 1 mảng
    }
    catch (error) {
        throw Error(error)
    }
}

export const getShowtimeInfo = async (theaterSystemId) => {
    try {
        // thằng này sẽ gắn cái path trong () vào cái baseURL(định nghĩa bên fetcher) và tự hiểu method là get luôn cho mình
        const response = await fetcher.get("/QuanLyRap/LayThongTinLichChieuHeThongRap", {
            params: {
                maHeThongRap: theaterSystemId,
                maNhom: GROUP_CODE,
            },
        });
        return response.data.content; // là 1 mảng
    }
    catch (error) {
        throw Error(error)
    }
}


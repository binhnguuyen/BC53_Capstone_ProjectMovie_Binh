import { Query } from "@tanstack/react-query";
import fetcher from "./fetcher";

export const getBannersAPI = async () => {
  try {
    // thằng này sẽ gắn cái path trong () vào cái baseURL và tự hiểu method là get luôn cho mình
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachBanner");
    // console.log("response", response);
    return response.data.content; // là 1 mảng
  } catch (error) {}
};

export const getListMovieAPI = async () => {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayDanhSachPhim", {
      params: {
        // khi mình nhóm nào thì phải sửa cái maNhom của mình thành tên đó
        maNhom: "GP03",
      },
      //"/QuanLyPhim/LayDanhSachPhim?maNhom=GP01&page=1&pageSize=10"
    });
    // console.log("response", response);
    return response.data.content; // là 1 mảng
  } 
  catch (error) {
    throw Error(error)
  }
};

export const getMovieDetailsAPI = async (movieId) => {
  try {
    const response = await fetcher.get("/QuanLyPhim/LayThongTinPhim", {
      params: {
        maPhim: movieId,
      },
    });
    return response.data.content
  } catch (error) {
    // phải quăng lỗi ra thì bên Query mới biết có lỗi và nó sẽ retry call API lại
    throw Error(error)
  }
};

export const addMovieAPI = async(payload) => {
  try {
    const response = await fetcher.post("/QuanLyPhim/ThemPhimUploadHinh", payload);
    return response.date.content;
  } 
  catch (error) {
    throw Error(error)
  }
}


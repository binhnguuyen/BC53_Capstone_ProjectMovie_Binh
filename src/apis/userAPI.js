import fetcher from "./fetcher"

export const signupAPI = async (payload) => {
    try {
        // console.log('payload: ', payload);
        // payload: { taiKhoan: "", matKhau:""...}
        // back-end muốn mình gửi lên gì thì gửi lên giống vậy
        const response = await fetcher.post("/QuanLyNguoiDung/DangKy", payload);
        return response.data.content;
    } catch (error) {
        throw "Lỗi Call API khi đăng ký";
    }
}

export const signinAPI = async (payload) => {
    try {
        const response = await fetcher.post("/QuanLyNguoiDung/DangNhap", payload);
        return response.data.content;
    } catch (error) {
        throw "Lỗi Call API khi đăng nhập";
    }
}
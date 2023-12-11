import fetcher from "./fetcher";

export const getChairListAPI = async (showingId) => {
    try {
        const response = await fetcher.get("/QuanLyDatVe/LayDanhSachPhongVe", {
            params: {
                maLichChieu: showingId,
            },
        });
        return response.data.content;
    }
    catch (error) {
        throw Error(error)
    }
}

export const postBookedChairListAPI = async (payload) => {
    try {
        // console.log("payload", payload);
        const response = await fetcher.post("/QuanLyDatVe/DatVe", payload);
        return response.data.content;
    }
    catch (error) {
        throw Error(error)
    }
}
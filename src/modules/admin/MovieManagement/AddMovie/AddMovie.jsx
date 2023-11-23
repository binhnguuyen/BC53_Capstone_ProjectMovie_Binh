import { Button, FormControlLabel, Grid, Stack, Switch, TextField, Typography, styled } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

// 2 thằng này để xài date picker
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { GROUP_CODE } from "../../../../constants";
import dayjs from "dayjs";
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { addMovieAPI } from "../../../../apis/movieApi";
import { LoadingButton } from "@mui/lab";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const schemaAddMovie = yup.object({
    tenPhim: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .max(100, "Tài khoản nhiều nhất 100 ký tự"),
    trailer: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .matches(
            /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
            "Link Trailer phải chưa đúng định dạng. Ví dụ: https://..."
        ),
    moTa: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .max(500, "Tài khoản nhiều nhất 500 ký tự"),
    danhGia: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .matches(
            /^[0-9]+$/,
            "Đánh giá phải là số nguyên có một chữ số"
        ),

});

const AddMovie = () => {
    const { handleSubmit, register, control, setValue, formState: { errors }, watch } = useForm({
        defaultValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            maNhom: GROUP_CODE,
            ngayKhoiChieu: "",
            sapChieu: false,
            dangChieu: false,
            hot: false,
            danhGia: "",
            hinhAnh: undefined,
        },
        resolver: yupResolver(schemaAddMovie),
        // sự kiện này có onChange, onBlue, onSubmit
        mode: "all",

    });

    // nó lắng nghe những cái file mình upload lên
    const file = watch("hinhAnh");

    const { mutate: handleAddMovie, isPending } = useMutation({
        mutationFn: (payload) => addMovieAPI(payload),
    });

    const onSubmit = (formValues) => {
        console.log("formValues", formValues);
        // sử dụng formdata để khi đưa lên API nó sẽ chuyển sang định dạng Json mà ko bị lỗi và mất file
        const formData = new FormData();
        formData.append("tenPhim", formValues.tenPhim);
        formData.append("trailer", formValues.trailer);
        formData.append("moTa", formValues.moTa);
        formData.append("maNhom", formValues.maNhom);
        formData.append("ngayKhoiChieu", formValues.ngayKhoiChieu);
        formData.append("sapChieu", formValues.sapChieu);
        formData.append("dangChieu", formValues.dangChieu);
        formData.append("hot", formValues.hot);
        formData.append("danhGia", formValues.danhGia);
        // do hình ảnh là 1 array nên bóc tách lấy phần tử thứ 0
        formData.append("hinhAnh", formValues.hinhAnh[0]);

        handleAddMovie(formData);
    };

    const onError = (errors) => {
        console.log('errors: ', errors);
    };

    // useEffect(() => {
    //     if (data) {
    //         setValue("dangChieu", "");
    //         setValue("tenPhim", "");
    //     }
    // }, [data]);

    // Hàm preview hình ảnh khi upload hình ảnh vào
    const previewImage = (file) => {
        return URL.createObjectURL(file);
    };

    useEffect(() => {
        if (file?.length > 0) {
            console.log("previewImage", previewImage(file?.[0])); // url
        }
    }, [file]);

    return (
        // muốn xài date picker thì phải bọc thằng LocalizationProvider ngoài cùng
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div>
                <Typography component={"h2"}>AddMovie</Typography>

                <Grid
                    container
                    justifyContent={"center"}
                    alignItems={"center"}
                    sx={{ marginTop: 20 }}
                >
                    <Grid item md={6}>
                        <form onSubmit={handleSubmit(onSubmit, onError)}>
                            <Stack direction={"column"} spacing={3}>
                                <TextField label="Tên phim" fullWidth {...register("tenPhim")}
                                    error={Boolean(errors.tenPhim)}
                                    helperText={Boolean(errors.tenPhim) && errors.tenPhim.message}
                                />
                                <TextField label="Trailer" fullWidth {...register("trailer")}
                                    error={Boolean(errors.trailer)}
                                    helperText={Boolean(errors.trailer) && errors.trailer.message}
                                />
                                <TextField label="Mô tả" fullWidth {...register("moTa")}
                                    error={Boolean(errors.moTa)}
                                    helperText={Boolean(errors.moTa) && errors.moTa.message}
                                />
                                {/* sử dụng Controller để xử lý cho thằng DatePicker, nếu ko khi chọn ngày nó sẽ bị lội */}
                                <Controller
                                    control={control}
                                    name="ngayKhoiChieu"
                                    render={(field) => {
                                        return (
                                            <DatePicker
                                                label="Ngày khởi chiếu"
                                                onChange={(date) => {
                                                    const value = dayjs(date).format("DD/MM/YYYY");
                                                    // nếu có cập nhật thời gian thì setValue lại vì thằng date picker này hơi khác
                                                    setValue("ngayKhoiChieu", value);
                                                }}
                                                {...field}
                                            />
                                        );
                                    }}
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="dangChieu" {...register("dangChieu")} />
                                    }
                                    label="Đang chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="sapChieu" {...register("sapChieu")} />
                                    }
                                    label="Sắp chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="hot" {...register("hot")} />
                                    }
                                    label="Hot"
                                    labelPlacement="start"
                                />
                                <TextField label="Đánh giá" fullWidth {...register("danhGia")}
                                    error={Boolean(errors.danhGia)}
                                    helperText={Boolean(errors.danhGia) && errors.danhGia.message}
                                />
                                {/* Có 3 nút switch Đang chiếu, Sắp chiếu, Hot về nhà làm */}
                                {!file && (
                                    <Button
                                        component="label"
                                        variant="contained"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload file
                                        <VisuallyHiddenInput 
                                        type="file" 
                                        {...register("hinhAnh")} 
                                        accept=".png, .jpeg, .jpg, .gif"/>
                                    </Button>
                                )}
                                {file?.length > 0 && (
                                    <>
                                        <img src={previewImage(file[0])} width={240} />
                                        <Button onClick={() => setValue("hinhAnh", undefined)}>Xoá hình</Button>
                                    </>
                                )}
                                <LoadingButton
                                    loading={isPending}
                                    variant="contained"
                                    size="large" type="submit">
                                    Thêm phim
                                </LoadingButton>
                            </Stack>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </LocalizationProvider>
    );
};

export default AddMovie;

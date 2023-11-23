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
    const { handleSubmit, register, control, setValue, formState: { errors } } = useForm({
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

    const onSubmit = (formValues) => {
        console.log("formValues", formValues);
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
                                        <Switch name="dangChieu" {...register("dangChieu")}/>
                                    }
                                    label="Đang chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="sapChieu" {...register("sapChieu")}/>
                                    }
                                    label="Sắp chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="hot" {...register("hot")}/>
                                    }
                                    label="Hot"
                                    labelPlacement="start"
                                />
                                <TextField label="Đánh giá" fullWidth {...register("danhGia")}
                                    error={Boolean(errors.danhGia)}
                                    helperText={Boolean(errors.danhGia) && errors.danhGia.message}
                                />
                                {/* Có 3 nút switch Đang chiếu, Sắp chiue61, Hot về nhà làm */}
                                <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
                                    Upload file
                                    <VisuallyHiddenInput type="file" {...register("hinhAnh")} />
                                </Button>
                                <Button variant="contained" size="large" type="submit">Thêm phim</Button>
                            </Stack>
                        </form>
                    </Grid>
                </Grid>
            </div>
        </LocalizationProvider>
    );
};

export default AddMovie;

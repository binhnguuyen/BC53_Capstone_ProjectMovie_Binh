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

const AddMovie = () => {
    const { handleSubmit, register, control, setValue } = useForm({
        defaultValues: {
            tenPhim: "",
            trailer: "",
            moTa: "",
            maNhom: GROUP_CODE,
            ngayKhoiChieu: "",
            sapChieu: true,
            dangChieu: false,
            hot: true,
            danhGia: "",
            hinhAnh: undefined,
        },
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
                                <TextField label="Tên phim" fullWidth {...register("tenPhim")} />
                                <TextField label="Trailer" fullWidth {...register("trailer")} />
                                <TextField label="Mô tả" fullWidth {...register("moTa")} />
                                {/* sử dụng Controller để xử lý cho thằng DatePicker, nếu ko khi chọn ngày nó sẽ bị lội */}
                                <Controller
                                    control={control}
                                    name="ngayKhoiChieu"
                                    render={(field) => {
                                        return (
                                            <DatePicker
                                                label="Ngày chiếu"
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
                                        <Switch name="showing" />
                                    }
                                    label="Đang chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="comingSoon" />
                                    }
                                    label="Sắp chiếu"
                                    labelPlacement="start"
                                />
                                <FormControlLabel
                                    sx={{ display: 'inline' }}
                                    alignItems="flex-start"
                                    control={
                                        <Switch name="hot" />
                                    }
                                    label="Hot"
                                    labelPlacement="start"
                                />
                                <TextField label="Đánh giá" fullWidth {...register("danhGia")} />
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

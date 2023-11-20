import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import { GROUP_CODE } from "../../../constants";
// Thư viện Yup giúp mình validate Hook Form
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
// GET là useQuery còn POST là useMutation
import { useMutation } from '@tanstack/react-query';
import { signupAPI } from '../../../apis/userAPI';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../routes/path';

const schemaSignup = yup.object({
    taiKhoan: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .min(6, "Tài khoản ít nhất 6 ký tự")
        .max(8, "Tài khoản nhiều nhất 8 ký tự"),
    hoTen: yup.string().required("Vui lòng nhập thông tin"),
    email: yup.string().required("Vui lòng nhập thông tin"),
    soDt: yup.string().required("Vui lòng nhập thông tin"),
    matKhau: yup
        .string()
        .required("Vui lòng nhập thông tin")
        .matches(
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
            "Mật khẩu phải bao gồm 8 ký tự trở lên, 1 ký tự hoa, 1 ký tự thường và 1 ký tự đặc biệt"
        ),
});

const Signup = () => {
    const navigate = useNavigate();    

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: GROUP_CODE,
            hoTen: "",
        },
        resolver: yupResolver(schemaSignup),
        // sự kiện này có onChange, onBlue, onSubmit
        mode: "all",
    });

    // dùng useMutation, khi có 1 thao tác thì mới thực hiện POST lên API
    const { mutate: handleSignup, isPending } = useMutation({
        mutationFn: (values) => signupAPI(values),
        // khi API call thành công nó tự động chạy onSuccess
        // nên mình ko cần chờ await ở handleSignup nữa
        // khi đưa lên API thành công (tức tạo tk thành công) thì đá luôn sang trang đăng nhập
        // gắn values và đưa sẵn dữ liệu lên để trong TH muốn fill dữ liệu trong form bên trang sign in
        onSuccess: (values) => {
            navigate(PATH.SIGN_IN);
        },
        onError: (error) => {
            alert("Lỗi rồi");
        },
    });

    const onSubmit = (values) => {
        // gọi API
        handleSignup(values);
        // console.log('handleSignup(values): ', handleSignup(values));
    };

    const onError = (errors) => {
        console.log('errors: ', errors);
    }

    return (
        <Container maxWidth="sm">
            <Typography component="h2">
                Sign up
            </Typography>
            <Grid
                container
                spacing={6}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Grid item lg={3}>
                    {/* thằng handleSubmit trong này phải truyền 1 callback onSubmit trung gian vào thì nó mới chạy */}
                    {/* thành công thì chạy onSubmit, thất bại thì onError */}
                    {/* ở đây có thể bỏ onError ko nhất thiết phải có */}
                    <form onSubmit={handleSubmit(onSubmit, onError)} action="">
                        {/* Thằng stack này giống display: flex trong CSS, giúp xếp các phần tử ngang hoặc dọc */}
                        <Stack spacing={3}>
                            {/* {...register} ngay này để khi nó lấy đúng giá trị được điền vào chứ ko phải trí trị initial*/}
                            {/* Thằng TextField này giống input trong HTML */}
                            <TextField label="Họ Tên" fullWidth
                                {...register("hoTen")}
                                error={Boolean(errors.hoTen)}
                                helperText={Boolean(errors.hoTen) && errors.hoTen.message}
                            // {...register("hoTen", {
                            //     required: {
                            //         value: true,
                            //         message: "Vui lòng nhập thông tin"
                            //     },
                            // })}
                            // error={Boolean(errors.hoTen)}
                            // helperText={Boolean(errors.hoTen) && errors.hoTen.message}
                            />
                            {/* nếu ko dùng MUI thì làm như sau nhưng hơi xấu */}
                            {/* {errors.hoTen && <p style={{ color: "red" }}>{errors.hoTen.message}</p>} */}
                            <TextField label="Email" fullWidth
                                {...register("email")}
                                error={Boolean(errors.email)}
                                helperText={Boolean(errors.email) && errors.email.message}
                            // {...register("email", {
                            //     required: {
                            //         value: true,
                            //         message: "Vui lòng nhập thông tin"
                            //     },
                            // })}
                            // error={Boolean(errors.email)}
                            // helperText={Boolean(errors.email) && errors.email.message}
                            />
                            <TextField label="Tài khoản" fullWidth
                                {...register("taiKhoan")}
                                error={Boolean(errors.taiKhoan)}
                                helperText={Boolean(errors.taiKhoan) && errors.taiKhoan.message}
                            // {...register("taiKhoan", {
                            //     required: {
                            //         value: true,
                            //         message: "Vui lòng nhập thông tin"
                            //     },
                            // })}
                            // error={Boolean(errors.taiKhoan)}
                            // helperText={Boolean(errors.taiKhoan) && errors.taiKhoan.message}
                            />
                            <TextField label="Mật khẩu" fullWidth type='password' {...register("matKhau")}
                                // trạng thái error này giúp css khi validate trả về lỗi, chẳng hạn màu chữ thành màu đỏ
                                error={Boolean(errors.matKhau)}
                                // nội dung hiển thị ra khi validate trả về lỗi
                                helperText={Boolean(errors.matKhau) && errors.matKhau.message}
                            // {...register("matKhau", {
                            //     required: {
                            //         value: true,
                            //         message: "Vui lòng nhập thông tin",
                            //     },
                            //     pattern: {
                            //         value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
                            //         message: "Mật khẩu phải bao gồm 8 ký tự trở lên, 1 ký tự hoa, 1 ký tự thường và 1 ký tự đặc biệt",
                            //     }
                            // })}
                            // error={Boolean(errors.matKhau)}
                            // helperText={Boolean(errors.matKhau) && errors.matKhau.message}
                            />
                            {/* {errors.matKhau && <p style={{ color: "red" }}>{errors.matKhau.message}</p>} */}
                            <TextField label="Số điện thoại" fullWidth
                                {...register("soDt")}
                                error={Boolean(errors.soDt)}
                                helperText={Boolean(errors.soDt) && errors.soDt.message}
                            // {...register("soDt", {
                            //     required: {
                            //         value: true,
                            //         message: "Vui lòng nhập thông tin"
                            //     },
                            // })}
                            // error={Boolean(errors.soDt)}
                            // helperText={Boolean(errors.soDt) && errors.soDt.message}
                            />
                            {/* nút LoadingButton này từ thư viện LoadingButton của MuiLab */}
                            <LoadingButton variant="outlined" fullWidth type="submit" size='large' loading={isPending}>Sign up</LoadingButton>
                        </Stack>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Signup
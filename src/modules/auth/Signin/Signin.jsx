import { Alert, Box, Container, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { PATH } from '../../../routes/path';
import { signinAPI } from '../../../apis/userAPI';
// GET là useQuery còn POST là useMutation
import { useMutation } from '@tanstack/react-query';
// Thư viện Yup giúp mình validate Hook Form
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { Navigate, useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useAuth } from '../../../contexts/UserContext/UserContext';
import { useDarkMode } from "../../../contexts/UserContext/UserContext";


const schemaSignin = yup.object({
  taiKhoan: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .min(6, "Tài khoản ít nhất 6 ký tự")
    .max(8, "Tài khoản nhiều nhất 8 ký tự"),
  matKhau: yup
    .string()
    .required("Vui lòng nhập thông tin")
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "Mật khẩu phải bao gồm 8 ký tự trở lên, 1 ký tự hoa, 1 ký tự thường và 1 ký tự đặc biệt"
    ),
});


const Signin = () => {
  const { isDarkMode } = useDarkMode();
  console.log('isDarkMode: ', isDarkMode);

  // do trùng tên hàm nên chỗ này đổi tên
  const { currentUser, handleSignin: handleSigninContext } = useAuth();
  const navigate = useNavigate();

  // khu này để khi ấn vào icon con mắt thì show password ra
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    // resolver: yupResolver(schemaSignin),
    // sự kiện này có onChange, onBlue, onSubmit
    mode: "all",
  });


  const { mutate: handleSignin, isPending } = useMutation({
    mutationFn: (values) => signinAPI(values),
    onSuccess: (values) => {
      // lưu user dưới local storage trước
      handleSigninContext(values);

      // tuỳ vào loại người dùng mà đá sang trang khác nhau
      if (values.maLoaiNguoiDung === "KhachHang") navigate(PATH.HOME);
      if (values.maLoaiNguoiDung === "QuanTri") navigate(PATH.ADMIN);

    },
    onError: (error) => {
      alert("Tài khoản hoặc mật khẩu không đúng");
    },
  });

  const onSubmit = (values) => {
    // console.log('values: ', values);
    handleSignin(values);
  };

  const onError = (errors) => {
    // console.log('errors: ', errors);
    alert("Lỗi submit");
  }

  // nếu có currentUser thì đá sang trang HOME
  if (currentUser) {
    return <Navigate to={PATH.HOME} />;
  }

  return (
    <Box className={isDarkMode ? 'dark-mode container' : 'light-mode container'}>
      <Container>
      <Typography component="h2">Sign in</Typography>
      <Grid
        container
        spacing={3}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Grid item xs={6}>
          <form 
          className={isDarkMode ? 'dark-mode' : 'light-mode'}
          onSubmit={handleSubmit(onSubmit, onError)} action="">
            <Stack spacing={3}>
              <TextField
                label="Tài khoản"
                fullWidth
                {...register("taiKhoan")}
                error={Boolean(errors.taiKhoan)}
                helperText={Boolean(errors.taiKhoan) && errors.taiKhoan.message}
              />
              <FormControl variant="outlined" fullWidth >
                <InputLabel htmlFor="outlined-adornment-password"
                  error={Boolean(errors.matKhau)}
                >
                  Mật khẩu
                </InputLabel>
                <OutlinedInput
                  error={Boolean(errors.matKhau)}
                  {...register("matKhau")}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                <FormHelperText error={Boolean(errors.matKhau)}>
                  {Boolean(errors.matKhau) && errors.matKhau.message}
                </FormHelperText>
              </FormControl>
              {/* nút LoadingButton này từ thư viện LoadingButton của MuiLab */}
              <LoadingButton variant="contained" fullWidth type="submit" size='large' loading={isPending}>Sign in</LoadingButton>
            </Stack>
          </form>
        </Grid>
      </Grid>
      </Container>
    </Box>
  )
}

export default Signin
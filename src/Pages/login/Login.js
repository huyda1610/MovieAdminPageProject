import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { accountLogin, loginSuccess } from '../../Slices/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Controls from '../../Components/controls/Controls';

const schema = yup.object({
  taiKhoan: yup.string()
    .required("This field is required"),
  matKhau: yup.string()
    .required("This field is required"),    
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Admin Page
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Login() {
  const [checkBox, setCheckBox] = useState(false);
  const [buttonTrigger, setButton]= useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginAccount, authIsLoading } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem('savedAccount'))
    ? JSON.parse(localStorage.getItem('savedAccount'))
    : {
      taiKhoan: "",
      matKhau: ""
    },
    mode: "onTouched",
    resolver: yupResolver(schema),
  }
  );

  const [togglePassword, setToggle] = useState(true);

  const handleTogglePassword = () => {
    setToggle(!togglePassword);
  };

  const onSubmit = (account) => {
    dispatch(accountLogin(account));
    setButton(true);
    if (checkBox) {
      if (JSON.parse(localStorage.getItem('savedAccount'))) {
        localStorage.removeItem("savedAccount");
        localStorage.setItem('savedAccount', JSON.stringify(account));
      } else {
        localStorage.setItem('savedAccount', JSON.stringify(account));
      }
    } else {
      localStorage.removeItem("savedAccount");
    }
  };

  const handleCheck = (event) => {
    setCheckBox(event.target.checked);
  };

  useEffect(() => {
    if (loginAccount !== null && buttonTrigger) {
      if (typeof loginAccount === "object" && loginAccount !== undefined) {
        if (loginAccount.maLoaiNguoiDung !== "KhachHang") {
          dispatch(loginSuccess(loginAccount));
          reset();
          navigate('/home/movies');
        } else {
          toast.error("Login failed !!!\nPlease login with Admin Account");
        }
        setButton(false);
      }

      if (typeof loginAccount === "string") {
        toast.error("Login failed !!!\nAccount or Password is incorrect");
        setButton(false);
      } 
    }
  }, [loginAccount, navigate, dispatch, reset, setButton, buttonTrigger]);

  return (
    <ThemeProvider theme={theme}>
      <div><Toaster/></div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {authIsLoading 
            && <CircularProgress 
                  size={40}
                  sx={{
                    position: 'absolute',
                  }}       
              />
            }
            <AdminPanelSettingsIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Admin Account *"
              name="taiKhoan"
              autoComplete="account"
              autoFocus
              error={Boolean(errors.taiKhoan)}
              helperText={errors.taiKhoan?.message}
              {...register('taiKhoan')}
            />
            <TextField
              margin="normal"
              fullWidth
              name="matKhau"
              label="Password *"
              type={ togglePassword ? "password" : "text" }
              autoComplete="current-password"
              error={Boolean(errors.matKhau)}
              helperText={errors.matKhau?.message}
              InputProps = {
                {
                  endAdornment: ( 
                  <InputAdornment position="end"> {
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleTogglePassword}
                      >
                        {togglePassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                      </IconButton>
                    }
                    </InputAdornment>
                  ),
                }
              }
              {...register('matKhau')}
            />
            <FormControlLabel
              control={<Checkbox checked={checkBox} onChange={handleCheck} color="primary" />}
              label="Remember me"
            />
            <Controls.Button
              type="submit"
              fullWidth
              text="Sign In"
              sx={{ mt: 3, mb: 2 }}
              disabled={!Boolean(JSON.parse(localStorage.getItem('savedAccount'))) && (!isDirty || !isValid)}
            />
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
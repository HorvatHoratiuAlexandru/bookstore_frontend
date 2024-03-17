import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { loginDataReq } from "../../common/interfaces/requests/login.req.interface";
import { usePostLoginMutation } from "../../store/api/authapi/auth.api";
import { useEffect } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/auth/authSlice";
import { UserAuthData } from "../../common/interfaces/auth.interface";

const LogInPage = () => {
  const [postLogin, { data, error, isLoading, isError }] =
    usePostLoginMutation();
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const reqData: loginDataReq = {
      email: formData.get("email")?.toString()!,
      password: formData.get("password")?.toString()!,
    };

    postLogin(reqData);
  };

  useEffect(() => {
    if (!isLoading && !isError && data) {
      const userData: UserAuthData = {
        uid: data.userId,
        token: data.token,
        refreshToken: data.refreshToken,
        isLoggedIn: true,
      };
      dispatch(setUser(userData));
      navigate("/"); // Redirect to home
    }
  }, [isLoading]);

  return (
    <Container component="main" maxWidth="xs">
      {isError && <p>{JSON.stringify(error)}</p>}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log in
          </Button>
          <Grid container>
            <Grid item>
              <Link to="../register">{"Don't have an account? Register"}</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LogInPage;

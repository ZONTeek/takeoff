import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { loginThunk, selectAuth } from "../../store/AuthSlice";
import "./styles.css";

export const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector(selectAuth);

  useEffect(() => {
    if (authenticated) navigate("/contacts");
  }, [authenticated, navigate]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(loginThunk({ email: values.email, password: values.password }));
    },
  });

  return (
    <div className="login-wrapper">
      <div>
        <span className="login-main-title">Login</span>
        <form onSubmit={formik.handleSubmit} className={"login-form"}>
          <span className="login-title">Email</span>
          <TextField
            name="email"
            id="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            className="login-input"
          />
          <span className="login-title">Password</span>
          <TextField
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            className="login-input"
          />
          <Button
            variant="contained"
            type="submit"
            disabled={!formik.values.email || !formik.values.password}
            sx={{
              marginTop: "15px",
              borderRadius: "10px",
              width: "320px",
              textTransform: "none",
            }}
          >
            Log in
          </Button>
        </form>
      </div>
    </div>
  );
};

import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";
import { logoutThunk, selectAuth } from "../../store/AuthSlice";
import { setSearchFilter } from "../../store/ContaсtsSlice";
import {
  Search,
  StyledButton,
  StyledInputBase,
} from "../StyledComponents/Search";

export const Header = (): JSX.Element => {
  const { user, authenticated } = useSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSearchChange = (value: string) => {
    dispatch(setSearchFilter(value));
  };

  const goToLogin = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  const logout = (): void => {
    dispatch(logoutThunk());
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>{authenticated && user.name}</div>
        {authenticated && (
          <Search>
            <StyledInputBase
              onChange={(e) => onSearchChange(e.target.value)}
              inputProps={{ maxLength: 40, placeholder: "Search..." }}
            />
          </Search>
        )}
        {authenticated ? (
          <StyledButton onClick={logout}>Logout</StyledButton>
        ) : (
          <StyledButton onClick={goToLogin}>Login</StyledButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

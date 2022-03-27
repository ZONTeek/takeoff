import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout } from "../api/authService";
import { Contact, LoginPropsType, RootStateType } from "../types/types";

const initialState = {
  value: {
    authenticated: false,
    user: {
      name: "",
    },
  },
};

export const loginThunk = createAsyncThunk<string, LoginPropsType>(
  "auth/login",
  async ({ email, password }) => {
    const data = (await login({ email, password })) as Pick<Contact, "name">;

    return data.name;
  }
);

export const logoutThunk = createAsyncThunk<void>("auth/logout", async () => {
  await logout();
});

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<string>) => {
        console.log(action);

        state.value.authenticated = true;
        state.value.user.name = action.payload;
      }
    );
    builder.addCase(loginThunk.rejected, (state) => {
      state.value.authenticated = false;
      state.value.user.name = "";
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.value.authenticated = false;
      state.value.user.name = "";
    });
  },
});

export const selectAuth = (state: RootStateType) => state.auth.value;
export const AuthReducer = AuthSlice.reducer;

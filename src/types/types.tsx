import { store } from "../store/Store";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type Contact = {
  email: string;
  name: string;
  id: number;
};

export type LoginPropsType = {
  email: string;
  password: string;
};

export type LogoutResponseType = {
  result: string;
};

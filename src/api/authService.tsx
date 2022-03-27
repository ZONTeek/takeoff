import { axiosClient } from "./axios";
import { Contact, LoginPropsType, LogoutResponseType } from "../types/types";

export const login = async ({
  email,
  password,
}: LoginPropsType): Promise<Contact | void> => {
  console.log(email, password);
  try {
    const response = await axiosClient.get<Contact>("/login");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (): Promise<LogoutResponseType | void> => {
  try {
    const response = await axiosClient.get<LogoutResponseType>("/logout");

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

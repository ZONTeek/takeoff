import styled from "@emotion/styled";
import { Button, InputBase } from "@mui/material";

export const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "3px",
  backgroundColor: "#bbdfed",
  minWidth: "300px",
  width: "20vw",
  height: "30px",
  "&:hover": {
    backgroundColor: "#fff",
  },
  "& .MuiInputBase-root": {
    width: "100%",
  },
}));

export const StyledInputBase = styled(InputBase)(() => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    width: "100%",
    color: "#000",
    paddingLeft: "0.5em",
  },
}));

export const StyledButton = styled(Button)(() => ({
  color: "white",
  backgroundColor: "#800080",
  "&:hover": {
    backgroundColor: "#990099",
  },
}));

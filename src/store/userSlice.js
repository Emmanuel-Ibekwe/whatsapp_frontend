import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_ENDPOINT = `${process.env.REACT_APP_API_ENDPOINT}/auth`;

const initialState = {
  status: "",
  error: "",
  user: {
    _id: "",
    name: "",
    email: "",
    picture: "",
    status: "",
    token: ""
  }
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (values, { rejectWithValue }) => {
    try {
      console.log(AUTH_ENDPOINT);
      const { data } = await axios.post(`${AUTH_ENDPOINT}/signup`, {
        ...values
      });

      // console.log(data);

      return data;
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      return rejectWithValue(error.response.data.message);
    }
  }
  // error.response.data.error.message
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.status = "";
      state.error = "";
      state.user = {
        _id: "",
        name: "",
        email: "",
        picture: "",
        status: "",
        token: ""
      };
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(signupUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = "";
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  }
});

export const { logout, changeStatus } = userSlice.actions;
export default userSlice.reducer;

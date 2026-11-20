import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../home/lib/api";

const initialState = {
  user: null,
  guestId: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/login-user", userData);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Login failed. Please try again."
      );
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post("/api/user/register-user", userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed. Please try again."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("userToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
    initializeAuth: (state) => {
      if (typeof window !== "undefined") {
        state.user = JSON.parse(localStorage.getItem("userInfo")) || null;
        state.guestId =
          localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
        if (!localStorage.getItem("guestId")) {
          localStorage.setItem("guestId", state.guestId);
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout, generateNewGuestId, initializeAuth } = authSlice.actions;
export default authSlice.reducer;

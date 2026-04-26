import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/axios';

export const adminLogin = createAsyncThunk(
  'auth/adminLogin',
  async (data, { rejectWithValue }) => {
    try {
      const res = await API.post('/auth/login', data);

      if (res.data.user.role !== 'admin') {
        throw new Error('Not authorized as admin');
      }

      localStorage.setItem('admin', JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: {
    admin: JSON.parse(localStorage.getItem('admin')) || null,
  },
  reducers: {
    logout: (state) => {
      state.admin = null;
      localStorage.removeItem('admin');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.admin = action.payload;
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
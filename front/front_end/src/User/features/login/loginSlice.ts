import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Profile } from '../../../components/interface/Profile';
import { UpdatePW } from '../../../components/interface/UpdatePW';
import type { RootState } from './store';

const apiUrl = process.env.REACT_APP_API_V1_BASE_URL;

export const fetchAsyncLogin = createAsyncThunk('login/post', async (auth: Profile) => {
  const res = await axios.post(`${apiUrl}api/auth/sign_in`, auth);
  localStorage.setItem('uid', res.headers['uid']);
  localStorage.setItem('client', res.headers['client']);
  localStorage.setItem('access-token', res.headers['access-token']);
});

export const fetchAsyncRegister = createAsyncThunk('login/register', async (auth: Profile) => {
  const res = await axios.post(`${apiUrl}api/auth`, auth);
  localStorage.setItem('uid', res.headers['uid']);
  localStorage.setItem('client', res.headers['client']);
  localStorage.setItem('access-token', res.headers['access-token']);
});

export const fetchAsyncUpdate = createAsyncThunk('login/put', async (profile: Profile) => {
  const res = await axios.put(`${apiUrl}api/auth`, profile, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    },
  });
  return res.data;
});

export const fetchAsyncShowUserData = createAsyncThunk('login/get', async () => {
  const res = await axios.get(`${apiUrl}api/v1/users/current_user`, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    },
  });
  return res.data;
});

export const logout = createAsyncThunk('logout/delete', async () => {
  axios
    .delete(`${apiUrl}api/auth/sign_out`, {
      headers: {
        'Content-Type': 'application/json',
        'access-token': localStorage.getItem('access-token'),
        client: localStorage.getItem('client'),
        uid: localStorage.getItem('uid'),
      },
    })
    .then(() => {
      localStorage.clear();
    });
});

export const fetchAsyncPassWdUpdate = createAsyncThunk('login/uppass', async (editAuth: UpdatePW) => {
  const res = await axios.put(`${apiUrl}api/auth/password`, editAuth, {
    headers: {
      'Content-Type': 'application/json',
      'access-token': localStorage.getItem('access-token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    },
  });
  return res.data;
});

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    isLoginView: false,
    profile: {
      id: 0,
      username: '',
      email: '',
      birth: '',
      password: '',
      password_confirmation: '',
    } as Profile,
  },
  reducers: {
    setTrueMode(state) {
      state.isLoginView = true;
    },
    setFalseMode(state) {
      state.isLoginView = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncShowUserData.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
    builder.addCase(fetchAsyncUpdate.fulfilled, (state, action) => {
      state.profile = action.payload;
      alert('ユーザー情報を更新しました。');
    });
    builder.addCase(fetchAsyncPassWdUpdate.fulfilled, () => {
      alert('パスワードを更新しました。');
    });
    builder.addCase(fetchAsyncLogin.rejected, () => {
      alert('ログイン失敗');
    });
    builder.addCase(fetchAsyncLogin.fulfilled, (state) => {
      state.isLoginView = true;
      alert('ログインしました。');
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isLoginView = false;
      alert('ログアウトしました。');
    });
  },
});
export const { setTrueMode, setFalseMode } = loginSlice.actions;
export const selectAuthen = (state: RootState): Profile => state.login.profile;
export const selectIsLoginView = (state: RootState): boolean => state.login.isLoginView;
export const selectProfile = (state: RootState): Profile => state.login.profile;

export default loginSlice;

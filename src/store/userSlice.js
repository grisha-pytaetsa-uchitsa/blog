/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let initialState;

if (sessionStorage.getItem('user')) {
  const newUser = JSON.parse(sessionStorage.getItem('user'));
  initialState = {
    user: newUser,
    isAuth: true,
    userStatus: null,
    userError: null,
  };
} else {
  initialState = {
    user: {},
    isAuth: false,
    userStatus: null,
    userError: null,
  };
}

export const operationWithAcc = createAsyncThunk('card/createNewAcc', async (userInfo, { rejectWithValue }) => {
  const { username } = userInfo;

  let url = 'https://blog.kata.academy/api/users';

  if (!username) {
    url = 'https://blog.kata.academy/api/users/login';
  }

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user: userInfo,
    }),
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Warning! Error');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

export const editAcc = createAsyncThunk('card/editAcc', async (userInfo, { rejectWithValue }) => {
  const { token, data } = userInfo;

  const url = 'https://blog.kata.academy/api/user';

  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      user: data,
    }),
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Warning! Error');
    }
    const editData = await res.json();
    return editData;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const userSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    logOut(state) {
      state.user = {};
      sessionStorage.clear();
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(operationWithAcc.pending, (state) => {
        state.userStatus = 'loading';
        state.userError = null;
      })
      .addCase(operationWithAcc.fulfilled, (state, action) => {
        state.userStatus = 'resolved';
        state.isAuth = true;
        const { username, email, token, image } = action.payload.user;
        try {
          state.user = {
            email,
            token,
            username,
            image,
          };
          sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        } catch (err) {
          console.log(err);
        }
      })
      .addCase(operationWithAcc.rejected, (state, action) => {
        state.userStatus = 'rejected';
        state.userError = action.payload;
      });
    builder
      .addCase(editAcc.pending, (state) => {
        state.userStatus = 'loading';
        state.userError = null;
      })
      .addCase(editAcc.fulfilled, (state, action) => {
        state.userStatus = 'resolved';
        const { username, email, token, image } = action.payload.user;
        try {
          state.user = {
            email,
            token,
            username,
            image,
          };
          sessionStorage.setItem('user', JSON.stringify(action.payload.user));
        } catch (err) {
          console.log(err);
        }
      })
      .addCase(editAcc.rejected, (state, action) => {
        state.userStatus = 'rejected';
        state.userError = action.payload;
      });
  },
});

export const { logOut, showUser } = userSlice.actions;

export default userSlice.reducer;

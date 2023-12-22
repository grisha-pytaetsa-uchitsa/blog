/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createArticle = createAsyncThunk('card/createArticle', async (articleData, { rejectWithValue }) => {
  const { token, info } = articleData;
  const url = 'https://blog.kata.academy/api/articles';

  const options = {
    method: 'POST',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      article: info,
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

export const updateArticle = createAsyncThunk('card/createArticle', async (articleData, { rejectWithValue }) => {
  const { token, slug, info } = articleData;
  const url = `https://blog.kata.academy/api/articles/${slug}`;
  const options = {
    method: 'PUT',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      article: info,
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

export const deleteArticle = createAsyncThunk('card/deleteArticle', async (info, { rejectWithValue }) => {
  const { token, slug } = info;
  const url = `https://blog.kata.academy/api/articles/${slug}`;

  const options = {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${token}`,
    },
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

const articleSlice = createSlice({
  name: 'card',
  initialState: {
    currentArticle: null,
    articleStatus: null,
    articleError: null,
  },
  reducers: {
    ShowFullCard(state, action) {
      state.currentCardIsActive = !state.currentCardIsActive;
      state.currentCard = state.cards.find((el) => el.id === action.payload.id);
    },
    currentPageReducer(state, action) {
      state.currentPage = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.articleStatus = 'loading';
        state.articleError = null;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.articleStatus = 'resolved';
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.articleStatus = 'rejected';
        state.articleError = action.payload;
      });
  },
});

export const { ShowFullCard, currentPageReducer } = articleSlice.actions;

export default articleSlice.reducer;

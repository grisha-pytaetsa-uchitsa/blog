/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, nanoid } from '@reduxjs/toolkit';

export const fetchGetArticles = createAsyncThunk('card/fetchGetArticles', async (articleData, { rejectWithValue }) => {
  const { token = null, skipNum = 0 } = articleData;
  const url = `https://blog.kata.academy/api/articles?limit=5&offset=${skipNum}`;

  const options = {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
      'content-type': 'application/json',
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

export const fetchGetOneArticle = createAsyncThunk(
  'card/fetchGetOneArticle',
  async (articleData, { rejectWithValue }) => {
    const { token = null, id } = articleData;
    const url = `https://blog.kata.academy/api/articles/${id}`;

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        'content-type': 'application/json',
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
  }
);

export const fetchFavorite = createAsyncThunk('card/fetchFavorite', async (favoriteData, { rejectWithValue }) => {
  const { token, slug, type } = favoriteData;
  const url = `https://blog.kata.academy/api/articles/${slug}/favorite`;

  const options = {
    method: type,
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

const cardSlice = createSlice({
  name: 'card',
  initialState: {
    cards: [],
    cardsCount: null,
    currentPage: 1,
    currentCard: null,
    currentCardIsActive: false,
    changeLike: false,
    status: null,
    error: null,
  },
  reducers: {
    ShowFullCard(state) {
      state.currentCardIsActive = !state.currentCardIsActive;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetArticles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGetArticles.fulfilled, (state, action) => {
        state.status = 'resolved';
        try {
          const newArticles = action.payload.articles.map((el) => {
            el.id = nanoid();
            return el;
          });
          state.cards = [];
          state.cards.push(...newArticles);
          state.cardsCount = action.payload.articlesCount;
        } catch (err) {
          console.log(err);
        }
      })
      .addCase(fetchGetArticles.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    builder
      .addCase(fetchGetOneArticle.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGetOneArticle.fulfilled, (state, action) => {
        state.status = 'resolved';
        try {
          state.currentCard = action.payload.article;
        } catch (err) {
          console.log(err);
        }
      })
      .addCase(fetchGetOneArticle.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
    builder
      .addCase(fetchFavorite.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchFavorite.fulfilled, (state, action) => {
        state.status = 'resolved';
        try {
          state.cards.forEach((el) => {
            if (el.slug === action.payload.article.slug) {
              el.favorited = action.payload.article.favorited;
            }
          });
          state.changeLike = !state.changeLike;
          state.currentCard.favorited = action.payload.article.favorited;
          state.currentCard.favoritesCount = action.payload.article.favoritesCount;
        } catch (err) {
          console.log(err);
        }
      })
      .addCase(fetchFavorite.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload;
      });
  },
});

export const { ShowFullCard } = cardSlice.actions;

export default cardSlice.reducer;

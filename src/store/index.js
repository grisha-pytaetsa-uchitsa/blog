/* eslint-disable import/no-extraneous-dependencies */
import { configureStore } from '@reduxjs/toolkit';

import cardReducer from './cardSlice';
import userSlice from './userSlice';
// import articleSlice from './articleSlice';

export default configureStore({
  reducer: {
    card: cardReducer,
    user: userSlice,
    // article: articleSlice,
  },
});

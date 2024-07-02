import { configureStore } from '@reduxjs/toolkit';
import userProfileReducer from '@/store/userProfiles';
import dataReducer from '@store/data';

const store = configureStore({
  reducer: {
    userProfiles: userProfileReducer,
	data: dataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
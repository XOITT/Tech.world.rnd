import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userReducer from './userSlice';
import learningReducer from './learningSlice';
import rewardsReducer from './rewardsSlice';
import parentReducer from './parentSlice';
import soundReducer from './soundSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    learning: learningReducer,
    rewards: rewardsReducer,
    parent: parentReducer,
    sound: soundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

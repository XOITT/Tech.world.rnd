import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { soundService } from '../services/soundService';

interface SoundState {
  isMuted: boolean;
}

const initialState: SoundState = {
  isMuted: soundService.getMuted(),
};

export const soundSlice = createSlice({
  name: 'sound',
  initialState,
  reducers: {
    toggleSound: (state) => {
      state.isMuted = !state.isMuted;
      soundService.setMuted(state.isMuted);
    },
    setMuted: (state, action: PayloadAction<boolean>) => {
      state.isMuted = action.payload;
      soundService.setMuted(action.payload);
    },
  },
});

export const { toggleSound, setMuted } = soundSlice.actions;
export default soundSlice.reducer;

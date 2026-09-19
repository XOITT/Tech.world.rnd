import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageService } from '../services/storageService';

interface ParentState {
  isParentModeActive: boolean;
  pin: string;
}

const initialState: ParentState = {
  isParentModeActive: false,
  pin: storageService.getParentPin() || '1234',
};

export const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    setParentModeActive: (state, action: PayloadAction<boolean>) => {
      state.isParentModeActive = action.payload;
    },
    updatePin: (state, action: PayloadAction<string>) => {
      state.pin = action.payload;
      storageService.saveParentPin(action.payload);
    },
  },
});

export const { setParentModeActive, updatePin } = parentSlice.actions;
export default parentSlice.reducer;

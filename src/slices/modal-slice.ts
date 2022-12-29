import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface ModalSlice {
    isHidden: boolean;
}

export const modalInitialState: ModalSlice = {
    isHidden: true,
};

export const modalSlice = createSlice({
    initialState: modalInitialState,
    name: 'modal',
    reducers: {
        hideModal(state) {
            state.isHidden = true;
        },
        showModal(state) {
            state.isHidden = false;
        },
    },
});

export const { hideModal, showModal } = modalSlice.actions;

export const selectIsHidden = ({ modal: { isHidden } }: RootState): boolean => isHidden;

export default modalSlice.reducer;

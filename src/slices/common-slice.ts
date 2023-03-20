import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer } from './offers-slice';

// Define a type for the slice state
export interface CommonState {
    isCheckoutPanelCollapsedView: boolean;
    isMobilePortraitView: boolean;
    loading: boolean;
    userSelectedOffer: PrizeoutOffer | null;
}

// Define the initial state using that type
export const commonInitialState: CommonState = {
    isCheckoutPanelCollapsedView: false,
    isMobilePortraitView: false,
    loading: false,
    userSelectedOffer: null,
};

export const commonSlice = createSlice({
    initialState: commonInitialState,
    name: 'common',
    reducers: {
        setIsCheckoutPanelCollapsed(state, action: PayloadAction<boolean>) {
            state.isCheckoutPanelCollapsedView = action.payload;
        },
        setIsMobilePortrait(state, action: PayloadAction<boolean>) {
            state.isMobilePortraitView = action.payload;
        },
        setSelectedOffer(state, action: PayloadAction<PrizeoutOffer>) {
            state.userSelectedOffer = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setIsCheckoutPanelCollapsed, setIsMobilePortrait, toggleIsLoading, setSelectedOffer } =
    commonSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectLoading = ({ common: { loading } }: RootState): boolean => loading;

export const selectOffer = ({ common: { userSelectedOffer } }: RootState): PrizeoutOffer => userSelectedOffer;

export const selectIsCheckoutPanelCollapsed = ({ common: { isCheckoutPanelCollapsedView } }: RootState): boolean =>
    isCheckoutPanelCollapsedView;

export const selectIsMobilePortrait = ({ common: { isMobilePortraitView } }: RootState): boolean =>
    isMobilePortraitView;

export default commonSlice.reducer;

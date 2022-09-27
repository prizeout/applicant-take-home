import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer } from './offers-slice';

export interface CheckoutSlice {
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
    giftCard?: PrizeoutOffer;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isSide: true,
    loading: false,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setGiftCard(state, action: PayloadAction<PrizeoutOffer>) {
            state.giftCard = action.payload;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
    },
});

export const { setCheckoutView, toggleIsLoading, toggleIsSide, setGiftCard } = checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => checkout.isSide;

export const selectGiftCard = ({ checkout }: RootState): PrizeoutOffer => checkout.giftCard;

export default checkoutSlice.reducer;

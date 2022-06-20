import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PrizeoutOffer } from './offers-slice';

import type { RootState } from '../store';

export interface CheckoutSlice {
    cart: Record<string, PrizeoutOffer>;
    isSide: boolean;
    loading: boolean;
    view: ViewEnum;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    cart: {},
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

        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        toggleIsSide(state) {
            // TODO: Check screen size to determine if it's side or bottom
            state.isSide = !state.isSide;
        },
        toggleOfferFromCart(state, action: PayloadAction<PrizeoutOffer>) {
            const offer = action.payload;
            const { name } = offer;
            state.cart[name] = state.cart[name] ? undefined : offer;
        },
    },
});

export const { setCheckoutView, toggleIsLoading, toggleIsSide, toggleOfferFromCart } = checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutIsSide = ({ checkout }: RootState): boolean => {
    return checkout.isSide;
};

export const selectCart = ({ checkout }: RootState): PrizeoutOffer[] => {
    return Object.values(checkout.cart);
};

export default checkoutSlice.reducer;

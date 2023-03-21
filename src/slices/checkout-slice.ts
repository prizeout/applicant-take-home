import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer, PrizeoutOfferValueOptions } from './offers-slice';
export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    view: ViewEnum;
    userCheckoutValueOffer: PrizeoutOfferValueOptions | null;
    data: PrizeoutOffer | null;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    data: null,
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    userCheckoutValueOffer: null,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setcheckoutValueOffer(state, action: PayloadAction<PrizeoutOfferValueOptions>) {
            state.userCheckoutValueOffer = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setCheckoutView, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading, setcheckoutValueOffer } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectCheckoutValueOffer = ({
    checkout: { userCheckoutValueOffer },
}: RootState): PrizeoutOfferValueOptions => userCheckoutValueOffer;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;

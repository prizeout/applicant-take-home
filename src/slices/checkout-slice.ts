import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer } from '../slices/offers-slice';



export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    view: ViewEnum;
    giftCard: PrizeoutOffer;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    view: 'checkout',
    giftCard: {
        checkout_hero_url: '',
        currency_code: '',
        description: '',
        giftcard_list: [],
        image_url: '',
        is_enabled: false,
        logomark_url: '',
        name: '',
        stores: [],
        support_creative_list: [],
        tag: '',
    },
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
        setGiftCard(state, action: PayloadAction<PrizeoutOffer>) {
            state.giftCard = action.payload;
        },
    },
});

export const { setCheckoutView, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading, setGiftCard } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectGiftCard = ({ checkout: { giftCard } }: RootState): PrizeoutOffer  => giftCard;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;

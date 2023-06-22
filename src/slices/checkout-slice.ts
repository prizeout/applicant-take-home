import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOffer } from '../slices/offers-slice';

export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    giftCard: PrizeoutOffer;
    view: ViewEnum;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export const checkoutInitialState: CheckoutSlice = {
    giftCard: {
        checkout_hero_url: '',
        currency_code: '',
        description: '',
        giftcard_list: [],
        image_url: 'https://d13080yemosbe2.cloudfront.net/Images/GiftCardFaceplates/External/EBOOKUL_fp01.png',
        is_enabled: false,
        logomark_url: '',
        name: '',
        stores: [],
        support_creative_list: [],
        tag: '',
    },
    isCollapsedCheckoutPanelOpen: false,
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
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setCheckoutView, setGiftCard, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectGiftCard = ({ checkout: { giftCard } }: RootState): PrizeoutOffer => giftCard;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;

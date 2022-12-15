import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { PrizeoutOfferValueOptions, selectActiveOffer } from './offers-slice';
import { getPriceStringFromCents } from '../utils/calculations/money';

export interface CheckoutSlice {
    isCollapsedCheckoutPanelOpen: boolean;
    loading: boolean;
    selectedCheckoutValueId?: string;
    view: ViewEnum;
}

export type ViewEnum = 'checkout' | 'checkout-confirmation';

export interface CheckoutRequest {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: string;
}

export interface CheckoutResponse {
    endpoint: string;
    body: CheckoutRequest;
    success: boolean;
}

/* Mocked API Call */
const post = async (endpoint: string, body: any) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
        body,
        endpoint,
        success: true,
    };
};

export const requestCheckout = createAsyncThunk<CheckoutResponse, void, { state: RootState }>(
    'posts/checkout',
    async (_, { getState }) => {
        const state = getState();
        const selectedGiftCard = selectSelectedGiftCard(state);
        const activeOffer = selectActiveOffer(state);
        const { name } = activeOffer;
        const { checkout_value_id, cost_in_cents, value_in_cents } = selectedGiftCard;
        const response = await post('/checkout', {
            checkout_value_id,
            cost_in_cents,
            name,
            value_in_cents,
        });
        return response;
    },
);

export const checkoutInitialState: CheckoutSlice = {
    isCollapsedCheckoutPanelOpen: false,
    loading: false,
    selectedCheckoutValueId: null,
    view: 'checkout',
};

export const checkoutSlice = createSlice({
    initialState: checkoutInitialState,
    name: 'checkout',
    reducers: {
        setCheckoutView(state, action: PayloadAction<ViewEnum>) {
            state.view = action.payload;
        },
        setSelectedCheckoutValueId(state, action: PayloadAction<string>) {
            state.selectedCheckoutValueId = action.payload;
        },
        toggleIsCollapsedCheckoutPanelOpen(state) {
            state.isCollapsedCheckoutPanelOpen = !state.isCollapsedCheckoutPanelOpen;
        },
        toggleIsLoading(state) {
            state.loading = !state.loading;
        },
    },
});

export const { setCheckoutView, setSelectedCheckoutValueId, toggleIsCollapsedCheckoutPanelOpen, toggleIsLoading } =
    checkoutSlice.actions;

export const selectLoading = ({ checkout: { loading } }: RootState): boolean => loading;

export const selectCheckoutView = ({ checkout: { view } }: RootState): ViewEnum => view;

export const selectSelectedCheckoutValueId = ({ checkout: { selectedCheckoutValueId } }: RootState): string =>
    selectedCheckoutValueId;

export const selectSelectedGiftCard = (rootState: RootState): PrizeoutOfferValueOptions => {
    const selectedCheckoutValueId = selectSelectedCheckoutValueId(rootState);
    const activeOffer = selectActiveOffer(rootState);
    if (!selectedCheckoutValueId || !activeOffer) {
        return;
    }
    return activeOffer.giftcard_list.find((obj) => obj.checkout_value_id === selectedCheckoutValueId);
};

export const selectGiftCardCost = (rootState: RootState): string => {
    const selectedGiftCard = selectSelectedGiftCard(rootState);
    if (!selectedGiftCard) {
        return '';
    }
    return getPriceStringFromCents(selectedGiftCard.cost_in_cents);
};

export const selectGiftCardValue = (rootState: RootState): string => {
    const selectedGiftCard = selectSelectedGiftCard(rootState);
    if (!selectedGiftCard) {
        return '';
    }
    return getPriceStringFromCents(selectedGiftCard.value_in_cents);
};

export const selectGiftCardPrizoutBonus = (rootState: RootState): string => {
    const selectedGiftCard = selectSelectedGiftCard(rootState);
    if (!selectedGiftCard) {
        return '';
    }
    return getPriceStringFromCents(selectedGiftCard.value_in_cents - selectedGiftCard.cost_in_cents);
};

export const selectGiftCardDisplayBonus = (rootState: RootState): number => {
    const selectedGiftCard = selectSelectedGiftCard(rootState);
    if (!selectedGiftCard) {
        return 0;
    }
    return selectedGiftCard.display_bonus;
};

export const selectIsCollapsedCheckoutPanelOpen = ({
    checkout: { isCollapsedCheckoutPanelOpen },
}: RootState): boolean => isCollapsedCheckoutPanelOpen;

export default checkoutSlice.reducer;

import React from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { setCheckoutView, toggleIsLoading, selectLoading } from '../../../slices/checkout-slice';
import { selectSelectedOffer, selectSelectedOfferValue } from '../../../slices/offers-slice';
import { mockFetch } from '../../../utils/server-mock';
import { Button } from '../../common';

const CheckoutButton: React.FC = (): React.ReactElement => {
    const { name } = useAppSelector(selectSelectedOffer) || {};
    const { checkout_value_id, cost_in_cents, value_in_cents } = useAppSelector(selectSelectedOfferValue) || {};
    const isLoading = useAppSelector(selectLoading);
    console.log(isLoading);
    const dispatch = useDispatch();

    const buttonText = 'Prizeout Gift Card';
    const buttonHandler = () => {
        dispatch(toggleIsLoading());
        mockFetch('/api/checkout', {
            body: JSON.stringify({
                checkout_value_id,
                cost_in_cents,
                name,
                value_in_cents,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    dispatch(setCheckoutView('checkout-confirmation'));
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch((err) => {
                // TODO: show error in proper modal
                console.error(err);
                alert('Something went wrong, please try again later');
            })
            .finally(() => {
                dispatch(toggleIsLoading());
            });
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={buttonHandler}
                size="medium"
                text={buttonText}
                type="submit"
                isLoading={isLoading}
            />
        </>
    );
};

export default CheckoutButton;

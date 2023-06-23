import React from 'react';
import { Button } from '../../common';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';

interface CheckoutRedemptionProps {
    selectedValue?: PrizeoutOfferValueOptions;
    giftCardName?: string;
    
}

interface Payload {
    checkout_value_id: string;
    cost_in_cents: number;
    name: string;
    value_in_cents: number;
}


const CheckoutButton: React.FC<CheckoutRedemptionProps> = ({ selectedValue, giftCardName }): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';

    const mockApiCall = (payload:Payload ) => {
        return Promise.resolve({
          data: {
            message: 'Success!',
            payload: payload,
          },
        });
      };

    const buttonHandler = async () => {
        try {
            const response = await mockApiCall({
              checkout_value_id: selectedValue?.checkout_value_id,
              cost_in_cents: selectedValue?.cost_in_cents,
              name: giftCardName,
              value_in_cents: selectedValue?.value_in_cents
            });
        
            // Handle successful response
            console.log(response.data.message);
            alert(JSON.stringify(response.data.payload));

          } catch (error) {
            // Handle error
            console.error(error);
          }
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
            />
        </>
    );
};

export default CheckoutButton;

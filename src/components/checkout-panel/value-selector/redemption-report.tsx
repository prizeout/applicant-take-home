import React from 'react';
import { PrizeoutOfferValueOptions } from '../../../slices/offers-slice';
import RedemptionReportLine from './redemption-report-line';

// possible improvement: change display if there is no value bonus
const RedemptionReport: React.FC<{ offer: PrizeoutOfferValueOptions }> = ({ offer }): React.ReactElement => (
    <div className="value-selector__redemption-report">
        <RedemptionReportLine value={offer.cost_in_cents}>Redemption Amount</RedemptionReportLine>
        <RedemptionReportLine highlight value={offer.value_in_cents - offer.cost_in_cents}>
            Prizeout Bonus (+{offer.display_bonus}%)
        </RedemptionReportLine>
        <RedemptionReportLine value={offer.value_in_cents}>You Get</RedemptionReportLine>
    </div>
);

export default RedemptionReport;

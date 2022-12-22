import classNames from 'classnames';
import React from 'react';
import { formatCurrencyUSD } from '../../../utils/formaters';

const RedemptionReportLine: React.FC<{ highlight?: boolean; value: number }> = ({
    children,
    highlight,
    value,
}): React.ReactElement => (
    <div className={classNames('value-selector__report-line', { 'value-selector__report-line-highlight': highlight })}>
        <span>{children}</span>
        <span>{formatCurrencyUSD(value)}</span>
    </div>
);

export default RedemptionReportLine;

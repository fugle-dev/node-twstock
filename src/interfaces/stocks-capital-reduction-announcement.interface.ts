export interface StocksCapitalReductionAnnouncement {
  symbol: string;
  name: string;
  exchange: string;
  haltDate: string;
  resumeDate: string;
  reductionRatio: number | null;
  reason: string;
  refundPerShare: number | null;
  cashIncreaseRatioAfterReduction: number | null;
  subscriptionPrice: number | null;
  // Optional detail fields (available when includeDetail=true)
  sharesPerThousand?: number | null;
  cashDividendPerShare?: number | null;
  paidCapitalIncrease?: number | null;
  publicOffering?: number | null;
  employeeSubscription?: number | null;
  existingShareholderSubscription?: number | null;
  sharesPerThousandSubscription?: number | null;
}

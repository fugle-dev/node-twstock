export interface StockDividends {
  date: string;
  exchange: string;
  symbol: string;
  name: string;
  previousClose: number;
  referencePrice: number;
  dividend: number;
  dividendType: string;
  limitUpPrice: number;
  limitDownPrice: number;
  openingReferencePrice: number;
  exdividendReferencePrice: number;
  cashDividend: number;
  stockDividendShares: number;
  latestFinancialReportDate?: string | null;
  latestNetAssetValuePerShare?: number | null;
  latestEarningsPerShare?: number | null;
  capitalIncreaseRight?: string | null;
  employeeBonusShares?: number | null;
  paidCapitalIncrease?: number | null;
  subscriptionPrice?: number | null;
  publicOffering?: number | null;
  employeeSubscription?: number | null;
  existingShareholderSubscription?: number | null;
  sharesPerThousand?: number | null;
}

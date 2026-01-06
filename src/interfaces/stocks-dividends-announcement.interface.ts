export interface StocksDividendAnnouncement {
  symbol: string;
  name: string;
  exchange: string;
  exdividendDate: string;
  dividendType: '權' | '息' | '權息';
  stockDividendRatio: number | null;
  cashCapitalIncreaseRatio: number | null;
  subscriptionPrice: number | null;
  cashDividend: number | null;
  // Optional financial information fields (from main API)
  latestFinancialReportDate?: string;
  latestNetAssetValuePerShare?: number | null;
  latestEarningsPerShare?: number | null;
  // Optional detail fields (available when includeDetail=true)
  stockDividendShares?: number | null;
  employeeBonusShares?: number | null;
  paidCapitalIncrease?: number | null;
  publicOffering?: number | null;
  employeeSubscription?: number | null;
  existingShareholderSubscription?: number | null;
  sharesPerThousand?: number | null;
}

export interface StockSplits {
  resumeDate: string;
  exchange: string;
  symbol: string;
  name: string;
  splitType: 'split' | 'reverse-split';
  previousClose: number;
  referencePrice: number;
  limitUpPrice: number;
  limitDownPrice: number;
  openingReferencePrice: number;
  haltDate?: string | null;
}

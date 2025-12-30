export interface StocksSplitAnnouncement {
  symbol: string;
  name: string;
  exchange: string;
  haltDate: string;
  resumeDate: string;
  splitRatio: number | null;
  oldFaceValue: number | null;
  newFaceValue: number | null;
  // Optional detail fields (available when includeDetail=true)
  sharesPerOldShare?: number | null;
}

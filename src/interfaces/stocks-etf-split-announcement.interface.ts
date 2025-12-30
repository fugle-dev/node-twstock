export interface StocksEtfSplitAnnouncement {
  symbol: string;
  name: string;
  exchange: string;
  haltDate: string;
  resumeDate: string;
  splitType: '分割' | '反分割';
  splitRatio: number | null;
}

export interface StocksListingApplication {
  symbol: string;                        // 公司代號
  name: string;                          // 公司名稱
  exchange: string;                      // 交易所 (TWSE/TPEx)
  applicationDate: string;               // 申請日期 (ISO format)
  chairman: string;                      // 董事長
  capitalAtApplication: number | null;   // 申請時股本
  reviewCommitteeDate: string | null;    // 審議委員會審議日期
  boardApprovalDate: string | null;      // 董事會通過日期
  contractFilingDate: string | null;     // TWSE: 上市契約報請主管機關備查日期
  contractApprovalDate?: string | null;  // TPEx: 櫃買同意上櫃契約日期
  listedDate: string | null;             // 股票上市/上櫃買賣日期
  underwriter: string | null;            // 承銷商
  underwritingPrice: number | null;      // 承銷價
  remarks: string;                       // 備註
}

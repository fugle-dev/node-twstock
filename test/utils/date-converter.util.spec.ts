import { rocToWestern, westernToRoc, parseFinancialReportDate } from '../../src/utils/date-converter.util';

describe('rocToWestern()', () => {
  it('should convert ROC date with Chinese characters (year/month/day)', () => {
    expect(rocToWestern('114年01月02日')).toBe('2025-01-02');
    expect(rocToWestern('113年12月31日')).toBe('2024-12-31');
    expect(rocToWestern('100年06月15日')).toBe('2011-06-15');
  });

  it('should convert ROC date with Chinese characters without leading zeros', () => {
    expect(rocToWestern('114年1月2日')).toBe('2025-01-02');
    expect(rocToWestern('113年6月5日')).toBe('2024-06-05');
  });

  it('should convert ROC date in slash format', () => {
    expect(rocToWestern('114/01/02')).toBe('2025-01-02');
    expect(rocToWestern('113/12/31')).toBe('2024-12-31');
  });

  it('should convert ROC date in slash format without leading zeros', () => {
    expect(rocToWestern('114/1/2')).toBe('2025-01-02');
    expect(rocToWestern('113/6/5')).toBe('2024-06-05');
  });

  it('should convert ROC date in compact format (YYYMMDD)', () => {
    expect(rocToWestern('1141231')).toBe('2025-12-31');
    expect(rocToWestern('1150112')).toBe('2026-01-12');
    expect(rocToWestern('1130605')).toBe('2024-06-05');
  });

  it('should return original string if format not recognized', () => {
    expect(rocToWestern('2025-01-02')).toBe('2025-01-02');
    expect(rocToWestern('invalid date')).toBe('invalid date');
    expect(rocToWestern('')).toBe('');
  });

  it('should handle null/undefined input', () => {
    expect(rocToWestern(null as any)).toBe(null);
    expect(rocToWestern(undefined as any)).toBe(undefined);
  });
});

describe('westernToRoc()', () => {
  it('should convert Western date to ROC with Chinese characters (default)', () => {
    expect(westernToRoc('2025-01-02')).toBe('114年01月02日');
    expect(westernToRoc('2024-12-31')).toBe('113年12月31日');
    expect(westernToRoc('2011-06-15')).toBe('100年06月15日');
  });

  it('should convert Western date to ROC in slash format', () => {
    expect(westernToRoc('2025-01-02', 'slash')).toBe('114/01/02');
    expect(westernToRoc('2024-12-31', 'slash')).toBe('113/12/31');
  });

  it('should convert Western date to ROC in Chinese format explicitly', () => {
    expect(westernToRoc('2025-01-02', 'chinese')).toBe('114年01月02日');
    expect(westernToRoc('2024-12-31', 'chinese')).toBe('113年12月31日');
  });

  it('should return original string if format not recognized', () => {
    expect(westernToRoc('invalid date')).toBe('invalid date');
    expect(westernToRoc('2025/01/02')).toBe('2025/01/02');
    expect(westernToRoc('114年01月02日')).toBe('114年01月02日');
  });

  it('should return original string for dates before 1912', () => {
    expect(westernToRoc('1911-12-31')).toBe('1911-12-31');
    expect(westernToRoc('1900-01-01')).toBe('1900-01-01');
  });

  it('should handle null/undefined input', () => {
    expect(westernToRoc(null as any)).toBe(null);
    expect(westernToRoc(undefined as any)).toBe(undefined);
  });
});

describe('parseFinancialReportDate()', () => {
  it('should parse date format with link', () => {
    const result = parseFinancialReportDate('113年06月28日(https://mops.twse.com.tw/mops/web/t78sb35)');
    expect(result).toBe('2024-06-28');
  });

  it('should parse date format without link', () => {
    const result = parseFinancialReportDate('113年06月28日');
    expect(result).toBe('2024-06-28');
  });

  it('should parse quarterly format with link', () => {
    const result = parseFinancialReportDate('114年第3季(https://mops.twse.com.tw/mops/web/t163sb01)');
    expect(result).toBe('114年第3季');
  });

  it('should parse quarterly format without link', () => {
    const result = parseFinancialReportDate('114年第1季');
    expect(result).toBe('114年第1季');
  });

  it('should parse all quarters correctly', () => {
    expect(parseFinancialReportDate('114年第1季')).toBe('114年第1季');
    expect(parseFinancialReportDate('114年第2季')).toBe('114年第2季');
    expect(parseFinancialReportDate('114年第3季')).toBe('114年第3季');
    expect(parseFinancialReportDate('114年第4季')).toBe('114年第4季');
  });

  it('should return null for N/A', () => {
    const result = parseFinancialReportDate('N/A');
    expect(result).toBeNull();
  });

  it('should return null for empty string', () => {
    const result = parseFinancialReportDate('');
    expect(result).toBeNull();
  });

  it('should return null for whitespace only', () => {
    const result = parseFinancialReportDate('   ');
    expect(result).toBeNull();
  });
});

/**
 * Convert ROC (Republic of China) date to Western (Gregorian) calendar date
 *
 * @param rocDate - ROC date string in formats:
 *   - "114年01月02日" (year/month/day with Chinese characters)
 *   - "114/01/02" (slash format)
 *   - "114年1月2日" (without leading zeros)
 * @returns ISO format date string "YYYY-MM-DD" or original string if format not recognized
 *
 * @example
 * rocToWestern("114年01月02日") // "2025-01-02"
 * rocToWestern("114/01/02")     // "2025-01-02"
 * rocToWestern("114年1月2日")   // "2025-01-02"
 */
export function rocToWestern(rocDate: string): string {
  if (!rocDate || typeof rocDate !== 'string') {
    return rocDate;
  }

  // Format: "114年01月02日" or "114年1月2日"
  const yearMonthDayMatch = rocDate.match(/(\d+)年(\d+)月(\d+)日/);
  if (yearMonthDayMatch) {
    const [, year, month, day] = yearMonthDayMatch;
    const westernYear = parseInt(year) + 1911;
    return `${westernYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Format: "114/01/02" or "114/1/2"
  const slashMatch = rocDate.match(/^(\d+)\/(\d+)\/(\d+)$/);
  if (slashMatch) {
    const [, year, month, day] = slashMatch;
    const westernYear = parseInt(year) + 1911;
    return `${westernYear}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }

  // Return original if format not recognized
  return rocDate;
}

/**
 * Convert Western (Gregorian) calendar date to ROC (Republic of China) date
 *
 * @param westernDate - Western date string in ISO format "YYYY-MM-DD"
 * @param format - Output format: "chinese" (default) or "slash"
 * @returns ROC date string or original string if format not recognized
 *
 * @example
 * westernToRoc("2025-01-02")              // "114年01月02日"
 * westernToRoc("2025-01-02", "slash")     // "114/01/02"
 * westernToRoc("2025-01-02", "chinese")   // "114年01月02日"
 */
export function westernToRoc(westernDate: string, format: 'chinese' | 'slash' = 'chinese'): string {
  if (!westernDate || typeof westernDate !== 'string') {
    return westernDate;
  }

  // Format: "YYYY-MM-DD"
  const match = westernDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return westernDate;
  }

  const [, year, month, day] = match;
  const rocYear = parseInt(year) - 1911;

  if (rocYear < 1) {
    // Date before 1912 cannot be represented in ROC calendar
    return westernDate;
  }

  if (format === 'slash') {
    return `${rocYear}/${month}/${day}`;
  }

  return `${rocYear}年${month}月${day}日`;
}

/**
 * Parse financial report date that may contain HTML link
 *
 * @param value - Date string that may contain HTML link in parentheses
 *   - "113年06月28日(https://mops.twse.com.tw/mops/web/t78sb35)" (date format)
 *   - "114年第3季(https://mops.twse.com.tw/mops/web/t163sb01)" (quarterly format)
 *   - "113年06月28日" (date without link)
 *   - "114年第3季" (quarter without link)
 *   - "N/A" or empty string
 * @returns ISO format date string "YYYY-MM-DD", quarterly string "XXX年第X季", or null
 *
 * @example
 * parseFinancialReportDate("113年06月28日(https://...)") // "2024-06-28"
 * parseFinancialReportDate("114年第3季(https://...)")     // "114年第3季"
 * parseFinancialReportDate("113年06月28日")             // "2024-06-28"
 * parseFinancialReportDate("114年第1季")                 // "114年第1季"
 * parseFinancialReportDate("N/A")                        // null
 */
export function parseFinancialReportDate(value: string): string | null {
  if (!value || value === 'N/A' || value.trim() === '') {
    return null;
  }

  // Extract content before the link: "113年06月28日(https://..." or "114年第3季(https://..."
  const contentMatch = value.match(/^(.+?)\(/);
  const content = contentMatch ? contentMatch[1].trim() : value.trim();

  // Check if it's a quarterly format: "114年第3季"
  const quarterMatch = content.match(/^\d+年第[1-4]季$/);
  if (quarterMatch) {
    return content; // Return original quarterly string
  }

  // Otherwise, try to convert as date format
  return rocToWestern(content);
}

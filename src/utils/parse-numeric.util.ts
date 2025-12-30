import * as numeral from 'numeral';

/**
 * Parse numeric value from string with null-safe handling
 *
 * Handles various empty/invalid representations:
 * - Empty string, null, undefined
 * - "--" (common placeholder)
 * - "N/A" (not applicable)
 * - Whitespace-only strings
 *
 * @param value - String value to parse
 * @returns Parsed number or null if value is empty/invalid
 *
 * @example
 * parseNumeric("123.45")    // 123.45
 * parseNumeric("--")        // null
 * parseNumeric("")          // null
 * parseNumeric("N/A")       // null
 * parseNumeric("  ")        // null
 * parseNumeric("0")         // 0
 */
export function parseNumeric(value: string | null | undefined): number | null {
  // Check for null/undefined
  if (value == null) {
    return null;
  }

  // Convert to string if needed
  const strValue = String(value).trim();

  // Check for empty or placeholder values
  if (isEmptyValue(strValue)) {
    return null;
  }

  // Parse using numeral
  const parsed = numeral(strValue).value();

  // Validate result
  if (parsed === null || isNaN(parsed)) {
    return null;
  }

  return parsed;
}

/**
 * Check if a value represents an empty/invalid numeric value
 *
 * @param value - String value to check
 * @returns true if value is considered empty/invalid
 */
function isEmptyValue(value: string): boolean {
  if (!value || value.trim() === '') {
    return true;
  }

  // Common placeholder values
  const placeholders = ['--', 'N/A', 'n/a', '－－', '尚未公告', '待公告'];
  return placeholders.includes(value);
}

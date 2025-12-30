/**
 * Strip HTML tags from a string
 *
 * Removes all HTML tags and trims whitespace.
 * Useful for cleaning HTML content in API responses.
 *
 * @param html - String potentially containing HTML tags
 * @returns Plain text with HTML tags removed and whitespace trimmed
 *
 * @example
 * stripHtmlTags("<p>Hello</p>")                                    // "Hello"
 * stripHtmlTags("<p style='color:red;'>World</p>")                 // "World"
 * stripHtmlTags("<p>待公告實際收益分配金額</p>")                  // "待公告實際收益分配金額"
 * stripHtmlTags("Plain text")                                      // "Plain text"
 */
export function stripHtmlTags(html: string | null | undefined): string {
  if (html == null) {
    return '';
  }

  const strValue = String(html);

  // Remove all HTML tags
  const withoutTags = strValue.replace(/<[^>]*>/g, '');

  // Trim whitespace
  return withoutTags.trim();
}

/**
 * Extract text content from table cell that may contain HTML
 *
 * This is a convenience wrapper around stripHtmlTags specifically
 * for extracting text from table cells in scraped data.
 *
 * @param cell - Cell content that may contain HTML
 * @returns Plain text content
 *
 * @example
 * extractTextFromCell("<p style='text-align:center;'>待公告</p>")  // "待公告"
 */
export function extractTextFromCell(cell: string | null | undefined): string {
  return stripHtmlTags(cell);
}

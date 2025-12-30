import { stripHtmlTags, extractTextFromCell } from '../../src/utils/html-cleaner.util';

describe('stripHtmlTags()', () => {
  it('should strip simple HTML tags', () => {
    expect(stripHtmlTags('<p>Hello</p>')).toBe('Hello');
    expect(stripHtmlTags('<div>World</div>')).toBe('World');
    expect(stripHtmlTags('<span>Test</span>')).toBe('Test');
  });

  it('should strip HTML tags with attributes', () => {
    expect(stripHtmlTags('<p style="color:red;">Hello</p>')).toBe('Hello');
    expect(stripHtmlTags('<div class="container">World</div>')).toBe('World');
    expect(stripHtmlTags('<a href="http://example.com">Link</a>')).toBe('Link');
  });

  it('should strip nested HTML tags', () => {
    expect(stripHtmlTags('<div><p>Hello</p></div>')).toBe('Hello');
    expect(stripHtmlTags('<div><span><b>Bold</b></span></div>')).toBe('Bold');
  });

  it('should strip multiple HTML tags and preserve text', () => {
    expect(stripHtmlTags('<p>Hello</p><p>World</p>')).toBe('HelloWorld');
    expect(stripHtmlTags('<div>Line1</div> <div>Line2</div>')).toBe('Line1 Line2');
  });

  it('should handle Chinese text in HTML', () => {
    expect(stripHtmlTags('<p>待公告實際收益分配金額</p>')).toBe('待公告實際收益分配金額');
    expect(stripHtmlTags('<p style="text-align:center;">尚未公告</p>')).toBe('尚未公告');
  });

  it('should trim whitespace', () => {
    expect(stripHtmlTags('  <p>Hello</p>  ')).toBe('Hello');
    expect(stripHtmlTags('<p>  Hello  </p>')).toBe('Hello');
  });

  it('should return plain text unchanged', () => {
    expect(stripHtmlTags('Plain text')).toBe('Plain text');
    expect(stripHtmlTags('No HTML here')).toBe('No HTML here');
  });

  it('should return empty string for empty input', () => {
    expect(stripHtmlTags('')).toBe('');
    expect(stripHtmlTags('  ')).toBe('');
  });

  it('should handle null/undefined input', () => {
    expect(stripHtmlTags(null)).toBe('');
    expect(stripHtmlTags(undefined)).toBe('');
  });

  it('should handle self-closing tags', () => {
    expect(stripHtmlTags('<br/>')).toBe('');
    expect(stripHtmlTags('Line1<br/>Line2')).toBe('Line1Line2');
  });
});

describe('extractTextFromCell()', () => {
  it('should extract text from table cell with HTML', () => {
    expect(extractTextFromCell('<p style="text-align:center;">待公告</p>')).toBe('待公告');
    expect(extractTextFromCell('<div>123.45</div>')).toBe('123.45');
  });

  it('should work same as stripHtmlTags', () => {
    const input = '<p>Test content</p>';
    expect(extractTextFromCell(input)).toBe(stripHtmlTags(input));
  });

  it('should handle null/undefined input', () => {
    expect(extractTextFromCell(null)).toBe('');
    expect(extractTextFromCell(undefined)).toBe('');
  });
});

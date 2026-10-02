/**
 * CodeRa Universal Platform - Security & Input Sanitization Utilities
 * Hardened for Cybersecurity Review & Penetration Testing Compliance
 */

/**
 * Escapes HTML control characters to prevent Cross-Site Scripting (XSS).
 * Neutralizes <script>, <iframe>, <img> onerror, javascript: URIs and SVG payloads.
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips script tags, javascript: pseudo-protocols, and dangerous HTML entities.
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return '';
  // Remove script and iframe tags
  let sanitized = input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/data:text\/html/gi, '')
    .replace(/onload\s*=/gi, '')
    .replace(/onerror\s*=/gi, '');
  return sanitized.trim();
}

/**
 * Validates strictly formatted RFC 5322 standard email addresses.
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 compliant regex for web apps
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(email.trim()) && email.length <= 254;
}

/**
 * Password Strength Policy:
 * - Minimum 8 characters
 * - At least one uppercase letter (A-Z)
 * - At least one special symbol or number (!@#$%^&*... or 0-9)
 */
export function validatePassword(password: string): {
  isValid: boolean;
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasSymbolOrNumber: boolean;
} {
  const hasMinLength = (password || '').length >= 8;
  const hasUppercase = /[A-Z]/.test(password || '');
  const hasSymbolOrNumber = /[^A-Za-z]/.test(password || '');
  return {
    isValid: hasMinLength && hasUppercase && hasSymbolOrNumber,
    hasMinLength,
    hasUppercase,
    hasSymbolOrNumber,
  };
}

/**
 * Validates standard 6-digit numeric OTP code.
 */
export function validateOtp(otp: string | string[]): boolean {
  const code = Array.isArray(otp) ? otp.join('') : otp;
  return /^\d{6}$/.test(code.trim());
}

/**
 * Validates international phone format (E.164 compliant with common regional patterns).
 */
export function validatePhone(phone: string): boolean {
  if (!phone) return true; // Optional field
  return /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\./0-9]{6,15}$/.test(phone.trim());
}

/**
 * Sanitizes uploaded file names against directory traversal (../, ..\) and null-byte injection.
 */
export function sanitizeFileName(fileName: string): string {
  if (!fileName) return 'unnamed_file';
  // Strip path traversal sequences and control characters
  let clean = fileName
    .replace(/\.\.+[/\\]/g, '')
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '_')
    .trim();
  // Ensure extension is preserved safely
  return clean || 'document.pdf';
}

/**
 * Prototype pollution safe JSON parser for Client-Side storage and state.
 */
export function safeJsonParse<T>(jsonString: string | null, fallback: T): T {
  if (!jsonString) return fallback;
  try {
    const parsed = JSON.parse(jsonString);
    if (parsed && typeof parsed === 'object') {
      // Remove prototype pollution vectors
      const record = parsed as Record<string, unknown>;
      delete record.__proto__;
      delete record.constructor;
      delete record.prototype;
    }
    return parsed as T;
  } catch {
    return fallback;
  }
}

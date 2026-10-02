import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeInput, validateEmail, validatePassword, sanitizeFileName, safeJsonParse } from '../src/utils/security';

describe('Security & Public View Integrity Tests', () => {
  describe('Input Sanitization & XSS Prevention', () => {
    it('should neutralize malicious script and iframe injections', () => {
      const maliciousScript = '<script>alert("xss")</script>Hello World';
      expect(sanitizeInput(maliciousScript)).toBe('Hello World');

      const maliciousIframe = '<iframe src="javascript:alert(1)"></iframe>Content';
      expect(sanitizeInput(maliciousIframe)).toBe('Content');
    });

    it('should escape dangerous HTML control characters in sanitizeHtml', () => {
      const htmlPayload = '<div class="alert" onclick="stealCookies()">Test</div>';
      const escaped = sanitizeHtml(htmlPayload);
      expect(escaped).not.toContain('<');
      expect(escaped).not.toContain('>');
      expect(escaped).toContain('&lt;div');
      expect(escaped).toContain('&gt;');
    });

    it('should neutralize prototype pollution vectors in safeJsonParse', () => {
      const payload = '{"__proto__": {"isAdmin": true}, "constructor": {"polluted": true}, "name": "Omar"}';
      const parsed = safeJsonParse<{ name: string; isAdmin?: boolean }>(payload, { name: '' });
      expect(parsed.name).toBe('Omar');
      expect((Object.prototype as { isAdmin?: boolean }).isAdmin).toBeUndefined();
    });

    it('should strip path traversal characters from file names', () => {
      const maliciousPath = '../../../etc/passwd.pdf';
      const safe = sanitizeFileName(maliciousPath);
      expect(safe).not.toContain('..');
      expect(safe).not.toContain('/');
    });
  });

  describe('Form Validation Policy Compliance', () => {
    it('should accurately validate RFC 5322 email formatting', () => {
      expect(validateEmail('student@codera.edu')).toBe(true);
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });

    it('should enforce 8+ chars, uppercase, and special character password policies', () => {
      expect(validatePassword('Weak1').isValid).toBe(false);
      expect(validatePassword('StrongPassword123!').isValid).toBe(true);
    });
  });
});

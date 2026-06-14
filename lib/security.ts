const rateBuckets = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  id: string,
  max: number,
  windowMs: number,
): { allowed: boolean } {
  const now = Date.now();
  const b = rateBuckets.get(id);
  if (!b || now > b.resetAt) {
    rateBuckets.set(id, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }
  if (b.count >= max) return { allowed: false };
  b.count += 1;
  return { allowed: true };
}

export function validateJsonInput(
  text: string,
  maxLength: number,
): { valid: boolean; error?: string } {
  if (text.length > maxLength) {
    return { valid: false, error: "Request body too large" };
  }
  try {
    JSON.parse(text);
    return { valid: true };
  } catch {
    return { valid: false, error: "Invalid JSON" };
  }
}

export function containsDangerousPatterns(s: string): boolean {
  const lower = s.toLowerCase();
  if (/<\s*script|<\s*iframe|javascript:\s*|on\w+\s*=/.test(lower)) {
    return true;
  }
  return false;
}

/** Телефон: лише + на початку та цифри, мінімум 9 цифр. */
export function isValidPhone(phone: string): boolean {
  const normalized = phone.trim().replace(/\s/g, "");
  if (!normalized) return false;
  if (!/^\+?\d+$/.test(normalized)) return false;
  const digits = normalized.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 15;
}

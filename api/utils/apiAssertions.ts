import { expect } from '@playwright/test';

export function expectIsoTimestamp(value: string): void {
  expect(Number.isNaN(Date.parse(value))).toBeFalsy();
}

export function expectFastResponse(durationMs: number, maxDurationMs = 3000): void {
  expect(durationMs).toBeLessThan(maxDurationMs);
}

export function expectReqResEmail(email: string): void {
  expect(email).toMatch(/^[^@\s]+@reqres\.in$/);
}

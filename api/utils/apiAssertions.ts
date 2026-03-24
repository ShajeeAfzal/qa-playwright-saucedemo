import { expect } from '@playwright/test';
import type {
  CreateUserResponse,
  SingleUserResponse,
  UpdateUserResponse,
} from '../types/user.types';

export function expectIsoTimestamp(value: string): void {
  expect(Number.isNaN(Date.parse(value))).toBeFalsy();
}

export function expectFastResponse(durationMs: number, maxDurationMs = 3000): void {
  expect(durationMs).toBeLessThan(maxDurationMs);
}

export function expectReqResEmail(email: string): void {
  expect(email).toMatch(/^[^@\s]+@reqres\.in$/);
}

export function expectCreateUserContract(response: CreateUserResponse): void {
  expect(response.id).toBeTruthy();
  expect(response.name).toBeTruthy();
  expect(response.job).toBeTruthy();
  expectIsoTimestamp(response.createdAt);
}

export function expectUpdateUserContract(response: UpdateUserResponse): void {
  expect(response.name).toBeTruthy();
  expect(response.job).toBeTruthy();
  expectIsoTimestamp(response.updatedAt);
}

export function expectSingleUserContract(response: SingleUserResponse): void {
  expect(response.data.id).toBeGreaterThan(0);
  expectReqResEmail(response.data.email);
  expect(response.data.first_name).toBeTruthy();
  expect(response.data.last_name).toBeTruthy();
  expect(() => new URL(response.data.avatar)).not.toThrow();
  expect(() => new URL(response.support.url)).not.toThrow();
  expect(response.support.text).toBeTruthy();
}

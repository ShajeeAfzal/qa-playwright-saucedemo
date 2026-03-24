import type { CreateUserRequest, UpdateUserRequest } from '../types/user.types';

export function buildCreateUserPayload(overrides: Partial<CreateUserRequest> = {}): CreateUserRequest {
  const uniqueSuffix = Date.now();

  return {
    name: `ui-seed-user-${uniqueSuffix}`,
    job: 'standard_user',
    ...overrides,
  };
}

export function buildUpdateUserPayload(overrides: Partial<UpdateUserRequest> = {}): UpdateUserRequest {
  const uniqueSuffix = Date.now();

  return {
    name: `updated-user-${uniqueSuffix}`,
    job: 'qa-engineer',
    ...overrides,
  };
}

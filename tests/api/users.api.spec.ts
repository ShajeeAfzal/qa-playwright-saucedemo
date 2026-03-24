import { expect, test } from '../../fixtures/apiTestFixtures';
import {
  expectCreateUserContract,
  expectFastResponse,
  expectSingleUserContract,
  expectUpdateUserContract,
} from '../../api/utils/apiAssertions';
import { buildCreateUserPayload, buildUpdateUserPayload } from '../../api/data/user.factory';
import { request } from '@playwright/test';

const apiBaseUrl = process.env.REQRES_API_BASE_URL ?? 'https://reqres.in/api/';
const reqResEnv = process.env.REQRES_ENV ?? 'prod';

test('should create a user', async ({ usersApi }) => {
  const createPayload = buildCreateUserPayload();

  const { data, response, durationMs } = await usersApi.createUser(createPayload);

  expect(response.status()).toBe(201);
  expect(data.name).toBe(createPayload.name);
  expect(data.job).toBe(createPayload.job);
  expectCreateUserContract(data);
  expectFastResponse(durationMs);
});

test('should read an existing user', async ({ usersApi }) => {
  const { data, response, durationMs } = await usersApi.getUser(2);

  expect(response.status()).toBe(200);
  expect(data.data.id).toBe(2);
  expectSingleUserContract(data);
  expectFastResponse(durationMs);
});

test('should update a user', async ({ usersApi }) => {
  const updatePayload = buildUpdateUserPayload();

  const { data, response, durationMs } = await usersApi.updateUser(2, updatePayload);

  expect(response.status()).toBe(200);
  expect(data.name).toBe(updatePayload.name);
  expect(data.job).toBe(updatePayload.job);
  expectUpdateUserContract(data);
  expectFastResponse(durationMs);
});

test('should delete a user', async ({ usersApi }) => {
  const response = await usersApi.deleteUser(2);

  expect(response.status()).toBe(204);
});

test('should return 404 for an unknown user', async ({ usersApi }) => {
  const response = await usersApi.getUserResponse(23);

  expect(response.status()).toBe(404);
  await expect(response.json()).resolves.toEqual({});
});

test('should reject a request when the API key is missing', async () => {
  const apiContext = await request.newContext({
    extraHTTPHeaders: {
      'X-Reqres-Env': reqResEnv,
    },
  });

  try {
    const response = await apiContext.get(new URL('users/2', apiBaseUrl).toString());

    expect(response.status()).toBe(403);
  } finally {
    await apiContext.dispose();
  }
});

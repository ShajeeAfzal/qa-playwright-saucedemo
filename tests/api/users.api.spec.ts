import { expect, test } from '../../fixtures/apiTestFixtures';
import { expectFastResponse, expectIsoTimestamp, expectReqResEmail } from '../../api/utils/apiAssertions';
import { buildCreateUserPayload, buildUpdateUserPayload } from '../../api/data/user.factory';

test.describe('Users API CRUD', () => {
  test('should create a user', async ({ usersApi }) => {
    const createPayload = buildCreateUserPayload();

    const { data, response, durationMs } = await usersApi.createUser(createPayload);

    expect(response.status()).toBe(201);
    expect(data.name).toBe(createPayload.name);
    expect(data.job).toBe(createPayload.job);
    expect(data.id).toBeTruthy();
    expectIsoTimestamp(data.createdAt);
    expectFastResponse(durationMs);
  });

  test('should read an existing user', async ({ usersApi }) => {
    const { data, response, durationMs } = await usersApi.getUser(2);

    expect(response.status()).toBe(200);
    expect(data.data.id).toBe(2);
    expectReqResEmail(data.data.email);
    expect(data.data.first_name).toBeTruthy();
    
    //expect(data.support.url).toContain('reqres.in');

    expect(() => new URL(data.support.url)).not.toThrow();
    expect(data.support.text).toBeTruthy();
    
    expectFastResponse(durationMs);
  });

  test('should update a user', async ({ usersApi }) => {
    const updatePayload = buildUpdateUserPayload();

    const { data, response, durationMs } = await usersApi.updateUser(2, updatePayload);

    expect(response.status()).toBe(200);
    expect(data.name).toBe(updatePayload.name);
    expect(data.job).toBe(updatePayload.job);
    expectIsoTimestamp(data.updatedAt);
    expectFastResponse(durationMs);
  });

  test('should delete a user', async ({ usersApi }) => {
    const response = await usersApi.deleteUser(2);

    expect(response.status()).toBe(204);
  });
});

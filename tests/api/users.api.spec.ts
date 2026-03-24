import { expect, test } from '@playwright/test';
import { createReqResContext } from '../../api/client/createReqResContext';
import { buildCreateUserPayload, buildUpdateUserPayload } from '../../api/data/user.factory';
import { UsersApi } from '../../api/endpoints/UsersApi';

test.describe('Users API CRUD', () => {
  test('should create a user', async () => {
    const apiContext = await createReqResContext();
    const usersApi = new UsersApi(apiContext);
    const createPayload = buildCreateUserPayload();

    const { data, response } = await usersApi.createUser(createPayload);

    expect(response.status()).toBe(201);
    expect(data.name).toBe(createPayload.name);
    expect(data.job).toBe(createPayload.job);
    expect(data.id).toBeTruthy();
    expect(data.createdAt).toBeTruthy();

    await apiContext.dispose();
  });

  test('should read an existing user', async () => {
    const apiContext = await createReqResContext();
    const usersApi = new UsersApi(apiContext);

    const { data, response } = await usersApi.getUser(2);

    expect(response.status()).toBe(200);
    expect(data.data.id).toBe(2);
    expect(data.data.email).toContain('@reqres.in');
    expect(data.data.first_name).toBeTruthy();

    await apiContext.dispose();
  });

  test('should update a user', async () => {
    const apiContext = await createReqResContext();
    const usersApi = new UsersApi(apiContext);
    const updatePayload = buildUpdateUserPayload();

    const { data, response } = await usersApi.updateUser(2, updatePayload);

    expect(response.status()).toBe(200);
    expect(data.name).toBe(updatePayload.name);
    expect(data.job).toBe(updatePayload.job);
    expect(data.updatedAt).toBeTruthy();

    await apiContext.dispose();
  });

  test('should delete a user', async () => {
    const apiContext = await createReqResContext();
    const usersApi = new UsersApi(apiContext);

    const response = await usersApi.deleteUser(2);

    expect(response.status()).toBe(204);

    await apiContext.dispose();
  });
});

import { createReqResContext } from '../api/client/createReqResContext';
import { UsersApi } from '../api/endpoints/UsersApi';
import { expect, test as uiTest } from './uiFixtures';

type ApiFixtures = {
  usersApi: UsersApi;
};

export const test = uiTest.extend<ApiFixtures>({
  usersApi: async ({}, use) => {
    const apiContext = await createReqResContext();
    const usersApi = new UsersApi(apiContext);

    await use(usersApi);
    await apiContext.dispose();
  },
});

export { expect };

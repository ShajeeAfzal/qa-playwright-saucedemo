import { request, type APIRequestContext } from '@playwright/test';

const reqResApiKey = process.env.REQRES_API_KEY;
const DEFAULT_REQRES_ENV = process.env.REQRES_ENV ?? 'prod';

function getReqResApiKey(): string {
  if (!reqResApiKey) {
    throw new Error(
      'REQRES_API_KEY is not set. Set it in your shell before running the tests.',
    );
  }

  return reqResApiKey;
}

export async function createReqResContext(): Promise<APIRequestContext> {
  return request.newContext({
    extraHTTPHeaders: {
      'x-api-key': getReqResApiKey(),
      'X-Reqres-Env': DEFAULT_REQRES_ENV,
    },
  });
}

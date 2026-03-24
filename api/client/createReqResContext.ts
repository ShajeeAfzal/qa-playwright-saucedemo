import { request, type APIRequestContext } from '@playwright/test';

function getReqResApiKey(): string {
  const reqResApiKey = process.env.REQRES_API_KEY;

  if (!reqResApiKey) {
    throw new Error(
      'REQRES_API_KEY is not set. Add it to your shell or .env before running API-backed tests.',
    );
  }

  return reqResApiKey;
}

export async function createReqResContext(): Promise<APIRequestContext> {
  return request.newContext({
    extraHTTPHeaders: {
      'x-api-key': getReqResApiKey(),
      'X-Reqres-Env': process.env.REQRES_ENV ?? 'prod',
    },
  });
}

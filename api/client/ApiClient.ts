import type { APIRequestContext, APIResponse } from '@playwright/test';

export interface ApiResult<T> {
  data: T;
  response: APIResponse;
  durationMs: number;
}

export class ApiClient {
  constructor(
    private readonly request: APIRequestContext,
    private readonly baseUrl: string,
  ) {}

  async get<T>(path: string): Promise<ApiResult<T>> {
    const startedAt = Date.now();
    const response = await this.getRaw(path);
    await this.assertOk(response, 'GET', path);
    return {
      data: (await response.json()) as T,
      response,
      durationMs: Date.now() - startedAt,
    };
  }

  async post<TResponse, TRequest>(
    path: string,
    payload: TRequest,
  ): Promise<ApiResult<TResponse>> {
    const startedAt = Date.now();
    const response = await this.request.post(this.buildUrl(path), {
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    await this.assertOk(response, 'POST', path);
    return {
      data: (await response.json()) as TResponse,
      response,
      durationMs: Date.now() - startedAt,
    };
  }

  async put<TResponse, TRequest>(
    path: string,
    payload: TRequest,
  ): Promise<ApiResult<TResponse>> {
    const startedAt = Date.now();
    const response = await this.request.put(this.buildUrl(path), {
      headers: {
        'Content-Type': 'application/json',
      },
      data: payload,
    });
    await this.assertOk(response, 'PUT', path);
    return {
      data: (await response.json()) as TResponse,
      response,
      durationMs: Date.now() - startedAt,
    };
  }

  async delete(path: string): Promise<APIResponse> {
    const response = await this.request.delete(this.buildUrl(path));
    if (!response.ok() && response.status() !== 204) {
      const body = await response.text();
      throw new Error(`DELETE ${path} failed with ${response.status()}: ${body}`);
    }
    return response;
  }

  async getRaw(path: string): Promise<APIResponse> {
    return this.request.get(this.buildUrl(path));
  }

  private buildUrl(path: string): string {
    return new URL(path, this.baseUrl).toString();
  }

  private async assertOk(
    response: APIResponse,
    method: string,
    path: string,
  ): Promise<void> {
    if (response.ok()) {
      return;
    }

    const body = await response.text();
    throw new Error(`${method} ${path} failed with ${response.status()}: ${body}`);
  }
}

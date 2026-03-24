import type { APIRequestContext, APIResponse } from '@playwright/test';
import { ApiClient, type ApiResult } from '../client/ApiClient';
import type {
  CreateUserRequest,
  CreateUserResponse,
  SingleUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '../types/user.types';

const DEFAULT_API_BASE_URL = process.env.REQRES_API_BASE_URL ?? 'https://reqres.in/api/';

export class UsersApi {
  private readonly client: ApiClient;

  constructor(request: APIRequestContext, baseUrl = DEFAULT_API_BASE_URL) {
    this.client = new ApiClient(request, baseUrl);
  }

  async createUser(payload: CreateUserRequest): Promise<ApiResult<CreateUserResponse>> {
    return this.client.post<CreateUserResponse, CreateUserRequest>('users', payload);
  }

  async getUser(userId: number): Promise<ApiResult<SingleUserResponse>> {
    return this.client.get<SingleUserResponse>(`users/${userId}`);
  }

  async getUserResponse(userId: string | number): Promise<APIResponse> {
    return this.client.getRaw(`users/${userId}`);
  }

  async updateUser(
    userId: string | number,
    payload: UpdateUserRequest,
  ): Promise<ApiResult<UpdateUserResponse>> {
    return this.client.put<UpdateUserResponse, UpdateUserRequest>(`users/${userId}`, payload);
  }

  async deleteUser(userId: string | number): Promise<APIResponse> {
    return this.client.delete(`users/${userId}`);
  }
}

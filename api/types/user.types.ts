export interface CreateUserRequest {
  name: string;
  job: string;
}

export interface CreateUserResponse extends CreateUserRequest {
  id: string;
  createdAt: string;
}

export interface UpdateUserRequest {
  name: string;
  job: string;
}

export interface UpdateUserResponse extends UpdateUserRequest {
  updatedAt: string;
}

export interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface SingleUserResponse {
  data: ReqResUser;
  support: {
    url: string;
    text: string;
  };
}

export type UserRole = "Free" | "Premium";

export interface CreateUserDTO {
  username: string;
  email: string;
  password: string;
  fullName: string;
}

export interface LoginUserResponseDTO {
  user: User;
  token: string;
}

export interface User {
  username: string;
  email: string;
  fullName: string;
  active: boolean;
  userRole: UserRole;
  createdAt: Date;
}

export interface IUserService {
  createUser(data: CreateUserDTO): Promise<boolean>;
  loginUser(login: string, password: string): Promise<User | null>;
}

export interface IUserClient {
  requestUserCreation(data: CreateUserDTO): Promise<boolean>;
  requestUserLogin(
    login: string,
    password: string
  ): Promise<LoginUserResponseDTO>;
}

export interface IUserStore {
  user: User | null;
  loading: boolean;
  error: boolean;
  createUser(data: CreateUserDTO): Promise<void>;
  loginUser(username: string, password: string): Promise<void>;
}

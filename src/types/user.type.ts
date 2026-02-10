export type User = {
  name: string;
  username: string;
  password: string;
};
export type CreateUserDTO = User;
export type UpdateUserDTO = Partial<User>;
export type LoginDTO = {
  username: string;
  password: string;
};

export type LoginResponse = {
  message: string;
  status: number;
  data: {
    user: {
      username: string;
      name: string;
    };
    token: {
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type UserResponse = {
  message: string;
  data: {
    name: string;
    username: string;
  }[];
};

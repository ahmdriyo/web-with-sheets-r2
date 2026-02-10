export type User = {
  name: string;
  username: string;
  password: string;
};
export type CreateUserDTO = User;
export type UpdateUserDTO = Partial<User>;
export type LoginDTO = User;
